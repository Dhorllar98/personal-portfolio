using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence;

public class BlogPostRepository : IBlogPostRepository
{
    private readonly AppDbContext _context;

    public BlogPostRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<BlogPost>> GetAllAsync(CancellationToken ct = default)
        => await _context.BlogPosts
            .OrderByDescending(p => p.DatePublished)
            .ToListAsync(ct);

    public async Task<BlogPost?> GetBySlugAsync(string slug, CancellationToken ct = default)
        => await _context.BlogPosts
            .FirstOrDefaultAsync(p => p.Slug == slug.ToLowerInvariant(), ct);

    public async Task AddAsync(BlogPost post, CancellationToken ct = default)
        => await _context.BlogPosts.AddAsync(post, ct);

    /// <summary>
    /// Upserts a collection of posts by slug.
    /// New slugs are inserted; existing slugs have their content updated (including status).
    /// Posts no longer present in the GitHub source are NOT auto-deleted —
    /// trigger a full sync explicitly via POST /api/blog/sync.
    /// </summary>
    public async Task UpsertManyAsync(IEnumerable<BlogPost> posts, CancellationToken ct = default)
    {
        foreach (var incoming in posts)
        {
            var existing = await _context.BlogPosts
                .FirstOrDefaultAsync(p => p.Slug == incoming.Slug, ct);

            if (existing is null)
            {
                await _context.BlogPosts.AddAsync(incoming, ct);
            }
            else
            {
                existing.Update(
                    incoming.Title,
                    incoming.Excerpt,
                    incoming.Content,
                    incoming.GetTags(),
                    incoming.DatePublished,
                    incoming.Status);
            }
        }
    }

    public async Task SaveChangesAsync(CancellationToken ct = default)
        => await _context.SaveChangesAsync(ct);
}
