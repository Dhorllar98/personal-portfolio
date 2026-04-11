using System.Text;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Application;
using Portfolio.Infrastructure;
using Portfolio.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// ── Logging bootstrap (visible in Render logs before DI is ready) ────────────
var startupLogger = LoggerFactory
    .Create(b => b.AddConsole().SetMinimumLevel(LogLevel.Information))
    .CreateLogger("Startup");

// ── Services ─────────────────────────────────────────────────────────────────

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddControllers();

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title       = "Portfolio API",
        Version     = "v1",
        Description = "Backend API for the Dhorllar developer portfolio.",
    });

    options.AddSecurityDefinition("Bearer", new()
    {
        Name        = "Authorization",
        Type        = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme      = "bearer",
        BearerFormat = "JWT",
        In          = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter your JWT token.",
    });
    options.AddSecurityRequirement(new()
    {
        {
            new() { Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" } },
            []
        }
    });

    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath)) options.IncludeXmlComments(xmlPath);
});

// ── CORS ─────────────────────────────────────────────────────────────────────
// Env vars: Cors__AllowedOrigins__0=https://www.dhorllar98.com  Cors__AllowedOrigins__1=https://dhorllar98.com
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

if (allowedOrigins.Length == 0)
    startupLogger.LogWarning("CORS: No AllowedOrigins configured. Requests from the frontend will be blocked.");
else
    startupLogger.LogInformation("CORS: Allowing origins → {Origins}", string.Join(", ", allowedOrigins));

builder.Services.AddCors(options =>
{
    options.AddPolicy("PortfolioPolicy", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// ── JWT Authentication ────────────────────────────────────────────────────────
// Env var (Render):  Jwt__Key=<your-secret>   Jwt__Issuer=portfolio-api   Jwt__Audience=portfolio-client
// IMPORTANT: The app intentionally does NOT crash when Jwt:Key is absent so that
// Render's health-check endpoint (/health) can return 200 during initial cold-boot
// before environment variables are fully propagated. Admin routes will still
// return 401 until the key is properly configured.
var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    startupLogger.LogWarning(
        "JWT: Jwt:Key (env var Jwt__Key) is not configured. " +
        "Authentication is DISABLED — admin routes will return 401. " +
        "Set the Jwt__Key environment variable in Render and redeploy.");

    // Use a runtime-generated placeholder so the DI chain succeeds.
    // Tokens signed with this key will NOT be valid across restarts.
    jwtKey = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = builder.Configuration["Jwt:Issuer"] ?? "portfolio-api",
            ValidAudience            = builder.Configuration["Jwt:Audience"] ?? "portfolio-client",
            IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };
    });

builder.Services.AddAuthorization();

// ── Rate Limiting ─────────────────────────────────────────────────────────────
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddInMemoryRateLimiting();

// ── Pipeline ─────────────────────────────────────────────────────────────────

var app = builder.Build();

// Global exception handler — always returns structured ProblemDetails, never raw stack traces
app.UseExceptionHandler(errApp => errApp.Run(async ctx =>
{
    ctx.Response.ContentType = "application/problem+json";
    ctx.Response.StatusCode  = StatusCodes.Status500InternalServerError;

    var feature = ctx.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
    var logger  = ctx.RequestServices.GetRequiredService<ILogger<Program>>();

    if (feature?.Error is not null)
        logger.LogError(feature.Error, "Unhandled exception on {Method} {Path}",
            ctx.Request.Method, ctx.Request.Path);

    var problem = new ProblemDetails
    {
        Title  = "An unexpected error occurred.",
        Status = StatusCodes.Status500InternalServerError,
        Detail = app.Environment.IsDevelopment() ? feature?.Error?.Message : null,
    };

    await ctx.Response.WriteAsJsonAsync(problem);
}));

// Swagger — enabled in Development and also when explicitly requested via env var
if (app.Environment.IsDevelopment() ||
    builder.Configuration["Swagger:Enabled"]?.Equals("true", StringComparison.OrdinalIgnoreCase) == true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1"));
}

app.UseIpRateLimiting();
if (!app.Environment.IsProduction()) app.UseHttpsRedirection();
app.UseCors("PortfolioPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Health check — Render routes traffic here before any other endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
   .ExcludeFromDescription();

// ── Database migration on startup ─────────────────────────────────────────────
// Idempotent — safe to run on every deploy. Any migration failure is logged
// but does NOT crash the process so Render's health check can still pass.
using (var scope = app.Services.CreateScope())
{
    var dbLogger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var connString = builder.Configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connString))
        {
            dbLogger.LogWarning(
                "DB: ConnectionStrings:DefaultConnection (env var ConnectionStrings__DefaultConnection) " +
                "is not set. Skipping migrations — database features will not work.");
        }
        else
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await db.Database.MigrateAsync();
            dbLogger.LogInformation("DB: Migrations applied successfully.");
        }
    }
    catch (Exception ex)
    {
        dbLogger.LogError(ex,
            "DB: Migration failed. The app will continue running but database features may not work. " +
            "Check your Supabase connection string and ensure the DB is reachable.");
    }
}

app.Run();
