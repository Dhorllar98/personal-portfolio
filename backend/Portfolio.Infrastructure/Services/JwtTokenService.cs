using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Services;

/// <summary>
/// Generates signed JWTs for admin authentication.
/// Configuration keys (set via Render env vars using __ separator):
///   Jwt__Key             — signing secret (min 32 chars)
///   Jwt__Issuer          — token issuer  (default: portfolio-api)
///   Jwt__Audience        — token audience (default: portfolio-client)
///   Jwt__ExpiryMinutes   — token lifetime in minutes (default: 60)
/// </summary>
public sealed class JwtTokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly ILogger<JwtTokenService> _logger;

    public JwtTokenService(IConfiguration config, ILogger<JwtTokenService> logger)
    {
        _config = config;
        _logger = logger;
    }

    /// <inheritdoc/>
    public string GenerateAdminToken()
    {
        var jwtKey = _config["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            _logger.LogError(
                "TokenService: Jwt:Key is not configured. " +
                "Ensure the Jwt__Key environment variable is set in Render.");

            throw new InvalidOperationException(
                "JWT signing key is not configured. Contact the site owner.");
        }

        var key        = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds      = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var issuer     = _config["Jwt:Issuer"]    ?? "portfolio-api";
        var audience   = _config["Jwt:Audience"]  ?? "portfolio-client";
        var expiryMins = double.TryParse(_config["Jwt:ExpiryMinutes"], out var mins) ? mins : 60;

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             [new Claim(ClaimTypes.Role, "Admin")],
            expires:            DateTime.UtcNow.AddMinutes(expiryMins),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
