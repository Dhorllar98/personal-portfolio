using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IContactSubmissionRepository
{
    Task AddAsync(ContactSubmission submission, CancellationToken ct = default);
    Task<IReadOnlyList<ContactSubmission>> GetAllAsync(CancellationToken ct = default);
    Task<ContactSubmission?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
}
