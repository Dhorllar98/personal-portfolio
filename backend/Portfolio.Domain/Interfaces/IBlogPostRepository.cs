using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

/// <summary>Persistence contract for blog posts.</summary>
public interface IBlogPostRepository
{
    Task<IReadOnlyList<BlogPost>> GetAllAsync(CancellationToken ct = default);
    Task<BlogPost?> GetBySlugAsync(string slug, CancellationToken ct = default);
    Task AddAsync(BlogPost post, CancellationToken ct = default);

    /// <summary>Replaces all blog posts with the provided list (full sync).</summary>
    Task UpsertManyAsync(IEnumerable<BlogPost> posts, CancellationToken ct = default);
    Task SaveChangesAsync(CancellationToken ct = default);
}
