using Portfolio.Application.Common;
using Portfolio.Domain.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Contacts.Commands;

public record SubmitContactCommand(string Name, string Email, string Message);

public class SubmitContactHandler
{
    private readonly IContactSubmissionRepository _repository;

    public SubmitContactHandler(IContactSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result> HandleAsync(SubmitContactCommand command, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(command.Name) ||
            string.IsNullOrWhiteSpace(command.Email) ||
            string.IsNullOrWhiteSpace(command.Message))
        {
            return Result.Failure("Name, email, and message are required.");
        }

        if (!command.Email.Contains('@'))
            return Result.Failure("A valid email address is required.");

        var submission = ContactSubmission.Create(command.Name, command.Email, command.Message);
        await _repository.AddAsync(submission, ct);
        await _repository.SaveChangesAsync(ct);

        return Result.Success();
    }
}
