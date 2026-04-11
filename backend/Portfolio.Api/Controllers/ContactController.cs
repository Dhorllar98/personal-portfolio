using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Contacts.Commands;

namespace Portfolio.Api.Controllers;

/// <summary>Public endpoint for the "Get In Touch" contact form.</summary>
[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]   // No authentication required — this is a public form
public class ContactController : ControllerBase
{
    private readonly SubmitContactHandler _handler;

    public ContactController(SubmitContactHandler handler)
    {
        _handler = handler;
    }

    /// <summary>Submit a contact form message.</summary>
    /// <remarks>Rate-limited to 5 requests per minute per IP.</remarks>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Submit(
        [FromBody] SubmitContactRequest request,
        CancellationToken ct)
    {
        var command = new SubmitContactCommand(
            request.Name,
            request.Email,
            request.Subject,
            request.Message);

        var result = await _handler.HandleAsync(command, ct);

        if (!result.IsSuccess)
        {
            if (result.IsValidationFailure)
            {
                foreach (var (field, errors) in result.ValidationErrors!)
                    foreach (var error in errors)
                        ModelState.AddModelError(field, error);

                return ValidationProblem(ModelState);
            }

            return BadRequest(new ProblemDetails
            {
                Title  = "Bad Request",
                Detail = result.Error,
                Status = StatusCodes.Status400BadRequest,
            });
        }

        return Ok(new { message = "Message received. I'll be in touch soon." });
    }
}

public record SubmitContactRequest(string Name, string Email, string Subject, string Message);
