using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Contacts.Commands;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly SubmitContactHandler _handler;

    public ContactController(SubmitContactHandler handler)
    {
        _handler = handler;
    }

    /// <summary>Submit a contact form message.</summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Submit(
        [FromBody] SubmitContactRequest request,
        CancellationToken ct)
    {
        var command = new SubmitContactCommand(request.Name, request.Email, request.Message);
        var result = await _handler.HandleAsync(command, ct);

        if (!result.IsSuccess)
            return BadRequest(new { message = result.Error });

        return Ok(new { message = "Message received. I'll be in touch soon." });
    }
}

public record SubmitContactRequest(string Name, string Email, string Message);
