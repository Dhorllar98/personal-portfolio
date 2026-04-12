using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Services;

namespace Portfolio.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // ── Database (Supabase / PostgreSQL via EF Core) ──────────────────────
        services.AddDbContext<AppDbContext>(options =>
            options
                .UseNpgsql(
                    configuration.GetConnectionString("DefaultConnection"),
                    npgsql => npgsql.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName))
                .ConfigureWarnings(w =>
                    w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning)));

        // ── Repositories ──────────────────────────────────────────────────────
        services.AddScoped<IContactSubmissionRepository, ContactSubmissionRepository>();
        services.AddScoped<IBlogPostRepository, BlogPostRepository>();

        // ── Token service ─────────────────────────────────────────────────────
        services.AddScoped<ITokenService, JwtTokenService>();

        // ── GitHub sync service ───────────────────────────────────────────────
        // Registered as a named HttpClient so the User-Agent header is always set
        // (GitHub API rejects requests without a User-Agent).
        services.AddHttpClient<GitHubSyncService>(client =>
        {
            client.DefaultRequestHeaders.Add(
                "User-Agent", "Portfolio-BlogSync/1.0 (https://github.com/Dhorllar98)");
        });
        services.AddScoped<IGitHubService, GitHubSyncService>();

        return services;
    }
}
