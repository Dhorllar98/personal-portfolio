using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Contacts.Queries;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Api.Controllers;

/// <summary>Admin-only endpoints for managing contact submissions.</summary>
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;
    private readonly GetSubmissionsHandler _getSubmissionsHandler;
    private readonly MarkSubmissionReadHandler _markReadHandler;

    public AdminController(
        IConfiguration config,
        ITokenService tokenService,
        GetSubmissionsHandler getSubmissionsHandler,
        MarkSubmissionReadHandler markReadHandler)
    {
        _config               = config;
        _tokenService         = tokenService;
        _getSubmissionsHandler = getSubmissionsHandler;
        _markReadHandler      = markReadHandler;
    }

    /// <summary>Authenticate as admin and receive a JWT.</summary>
    /// <remarks>Rate-limited to 10 attempts per 5 minutes per IP.</remarks>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public IActionResult Login([FromBody] AdminLoginRequest request)
    {
        var adminPassword = _config["Admin:Password"];

        if (string.IsNullOrEmpty(adminPassword))
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                new ProblemDetails
                {
                    Title  = "Service Unavailable",
                    Detail = "Admin authentication is not yet configured on this server.",
                    Status = StatusCodes.Status503ServiceUnavailable,
                });
        }

        if (request.Password != adminPassword)
            return Unauthorized(new { message = "Invalid credentials." });

        string token;
        try
        {
            token = _tokenService.GenerateAdminToken();
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                new ProblemDetails
                {
                    Title  = "Service Unavailable",
                    Detail = ex.Message,
                    Status = StatusCodes.Status503ServiceUnavailable,
                });
        }

        return Ok(new { token });
    }

    /// <summary>List all contact submissions (admin only).</summary>
    [HttpGet("submissions")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetSubmissions(CancellationToken ct)
    {
        var result = await _getSubmissionsHandler.HandleAsync(ct);
        return Ok(result.Value);
    }

    /// <summary>Mark a submission as read (admin only).</summary>
    [HttpPatch("submissions/{id:guid}/read")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MarkRead(Guid id, CancellationToken ct)
    {
        var result = await _markReadHandler.HandleAsync(id, ct);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Error });

        return NoContent();
    }
}

public record AdminLoginRequest(string Password);
