using Portfolio.Application.Common;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Contacts.Queries;

public record SubmissionDto(
    Guid Id,
    string Name,
    string Email,
    string Message,
    DateTime SubmittedAt,
    bool IsRead);

public class GetSubmissionsHandler
{
    private readonly IContactSubmissionRepository _repository;

    public GetSubmissionsHandler(IContactSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IReadOnlyList<SubmissionDto>>> HandleAsync(CancellationToken ct = default)
    {
        var submissions = await _repository.GetAllAsync(ct);
        var dtos = submissions
            .OrderByDescending(s => s.SubmittedAt)
            .Select(s => new SubmissionDto(s.Id, s.Name, s.Email, s.Message, s.SubmittedAt, s.IsRead))
            .ToList();

        return Result<IReadOnlyList<SubmissionDto>>.Success(dtos);
    }
}

public class MarkSubmissionReadHandler
{
    private readonly IContactSubmissionRepository _repository;

    public MarkSubmissionReadHandler(IContactSubmissionRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result> HandleAsync(Guid id, CancellationToken ct = default)
    {
        var submission = await _repository.GetByIdAsync(id, ct);
        if (submission is null)
            return Result.Failure("Submission not found.");

        submission.MarkAsRead();
        await _repository.SaveChangesAsync(ct);
        return Result.Success();
    }
}
