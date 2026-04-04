using FluentValidation;
using Portfolio.Application.Common;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Contacts.Commands;

public record SubmitContactCommand(string Name, string Email, string Subject, string Message);

public class SubmitContactCommandValidator : AbstractValidator<SubmitContactCommand>
{
    public SubmitContactCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Full name is required.")
            .MinimumLength(2).WithMessage("Name must be at least 2 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.Subject)
            .NotEmpty().WithMessage("Subject is required.")
            .MinimumLength(3).WithMessage("Subject must be at least 3 characters.");

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("Message is required.")
            .MinimumLength(10).WithMessage("Message must be at least 10 characters.")
            .MaximumLength(1000).WithMessage("Message cannot exceed 1000 characters.");
    }
}

public class SubmitContactHandler
{
    private readonly IContactSubmissionRepository _repository;
    private static readonly SubmitContactCommandValidator Validator = new();

    public SubmitContactHandler(IContactSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result> HandleAsync(SubmitContactCommand command, CancellationToken ct = default)
    {
        var validation = await Validator.ValidateAsync(command, ct);
        if (!validation.IsValid)
        {
            var errors = validation.Errors
                .GroupBy(e => e.PropertyName, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray());

            return Result.ValidationFailure(errors);
        }

        var submission = ContactSubmission.Create(
            command.Name,
            command.Email,
            command.Subject,
            command.Message);

        await _repository.AddAsync(submission, ct);
        await _repository.SaveChangesAsync(ct);

        return Result.Success();
    }
}
