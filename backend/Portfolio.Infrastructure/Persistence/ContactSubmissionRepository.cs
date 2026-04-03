using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence;

public class ContactSubmissionRepository : IContactSubmissionRepository
{
    private readonly AppDbContext _context;

    public ContactSubmissionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(ContactSubmission submission, CancellationToken ct = default)
        => await _context.ContactSubmissions.AddAsync(submission, ct);

    public async Task<IReadOnlyList<ContactSubmission>> GetAllAsync(CancellationToken ct = default)
        => await _context.ContactSubmissions
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync(ct);

    public async Task<ContactSubmission?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _context.ContactSubmissions.FindAsync([id], ct);

    public async Task SaveChangesAsync(CancellationToken ct = default)
        => await _context.SaveChangesAsync(ct);
}
