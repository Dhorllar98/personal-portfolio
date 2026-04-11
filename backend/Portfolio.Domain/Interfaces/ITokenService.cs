namespace Portfolio.Domain.Interfaces;

/// <summary>
/// Generates signed authentication tokens.
/// Implemented by <c>JwtTokenService</c> in Portfolio.Infrastructure.
/// </summary>
public interface ITokenService
{
    /// <summary>Creates a signed JWT for the admin role.</summary>
    /// <returns>A compact serialised JWT string.</returns>
    string GenerateAdminToken();
}
