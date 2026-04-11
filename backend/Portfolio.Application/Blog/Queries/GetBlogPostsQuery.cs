using Portfolio.Application.Common;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Blog.Queries;

// ── DTOs ─────────────────────────────────────────────────────────────────────

public record BlogPostSummaryDto(
    string   Slug,
    string   Title,
    string   Excerpt,
    string[] Tags,
    DateOnly DatePublished,
    string   Status);

public record BlogPostDetailDto(
    string   Slug,
    string   Title,
    string   Excerpt,
    string   Content,
    string[] Tags,
    DateOnly DatePublished,
    string   Status,
    DateTime LastSyncedAt);

// ── Handlers ─────────────────────────────────────────────────────────────────

/// <summary>
/// Returns published blog posts ordered by date descending (public endpoint).
/// Drafts are intentionally excluded — they are not visible to anonymous visitors.
/// </summary>
public class GetBlogPostsHandler
{
    private readonly IBlogPostRepository _repository;

    public GetBlogPostsHandler(IBlogPostRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<IReadOnlyList<BlogPostSummaryDto>>> HandleAsync(CancellationToken ct = default)
    {
        var posts = await _repository.GetAllAsync(ct);

        var dtos = posts
            .Where(p => p.Status == BlogPostStatus.Published)
            .OrderByDescending(p => p.DatePublished)
            .Select(p => new BlogPostSummaryDto(
                p.Slug,
                p.Title,
                p.Excerpt,
                p.GetTags().ToArray(),
                p.DatePublished,
                p.Status))
            .ToList();

        return Result<IReadOnlyList<BlogPostSummaryDto>>.Success(dtos);
    }
}

/// <summary>Returns the full content of a single blog post by slug.</summary>
public class GetBlogPostBySlugHandler
{
    private readonly IBlogPostRepository _repository;

    public GetBlogPostBySlugHandler(IBlogPostRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<BlogPostDetailDto>> HandleAsync(string slug, CancellationToken ct = default)
    {
        var post = await _repository.GetBySlugAsync(slug, ct);

        if (post is null)
            return Result<BlogPostDetailDto>.Failure($"Blog post '{slug}' was not found.");

        var dto = new BlogPostDetailDto(
            post.Slug,
            post.Title,
            post.Excerpt,
            post.Content,
            post.GetTags().ToArray(),
            post.DatePublished,
            post.Status,
            post.LastSyncedAt);

        return Result<BlogPostDetailDto>.Success(dto);
    }
}
