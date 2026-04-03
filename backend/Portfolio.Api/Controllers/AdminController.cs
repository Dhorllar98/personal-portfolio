using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Portfolio.Application.Contacts.Queries;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly GetSubmissionsHandler _getSubmissionsHandler;
    private readonly MarkSubmissionReadHandler _markReadHandler;

    public AdminController(
        IConfiguration config,
        GetSubmissionsHandler getSubmissionsHandler,
        MarkSubmissionReadHandler markReadHandler)
    {
        _config = config;
        _getSubmissionsHandler = getSubmissionsHandler;
        _markReadHandler = markReadHandler;
    }

    /// <summary>Authenticate as admin and receive a JWT.</summary>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] AdminLoginRequest request)
    {
        var adminPassword = _config["Admin:Password"];
        if (string.IsNullOrEmpty(adminPassword) || request.Password != adminPassword)
            return Unauthorized(new { message = "Invalid credentials." });

        var token = GenerateToken();
        return Ok(new { token });
    }

    /// <summary>List all contact submissions (admin only).</summary>
    [HttpGet("submissions")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSubmissions(CancellationToken ct)
    {
        var result = await _getSubmissionsHandler.HandleAsync(ct);
        return Ok(result.Value);
    }

    /// <summary>Mark a submission as read (admin only).</summary>
    [HttpPatch("submissions/{id:guid}/read")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MarkRead(Guid id, CancellationToken ct)
    {
        var result = await _markReadHandler.HandleAsync(id, ct);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Error });

        return NoContent();
    }

    private string GenerateToken()
    {
        var jwtKey = _config["Jwt:Key"]!;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: [new Claim(ClaimTypes.Role, "Admin")],
            expires: DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"] ?? "60")),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public record AdminLoginRequest(string Password);
