namespace Portfolio.Domain.Entities;

/// <summary>
/// Represents a blog post synced from a GitHub repository markdown file.
/// The slug is derived from the filename (e.g. "why-clean-architecture.md" → "why-clean-architecture").
///
/// Front-matter status values:
///   status: published  — live, visible on the public blog
///   status: draft      — work in progress, shown with a Draft badge
/// Omitting the status field defaults to "published".
/// </summary>
public class BlogPost
{
    public Guid    Id            { get; private set; }
    public string  Slug          { get; private set; } = default!;
    public string  Title         { get; private set; } = default!;
    public string  Excerpt       { get; private set; } = default!;
    public string  Content       { get; private set; } = default!;
    public string  Tags          { get; private set; } = default!;  // Comma-separated
    public DateOnly DatePublished { get; private set; }
    public string  Status        { get; private set; } = BlogPostStatus.Published;
    public DateTime LastSyncedAt  { get; private set; }

    private BlogPost() { }

    public static BlogPost Create(
        string slug,
        string title,
        string excerpt,
        string content,
        IEnumerable<string> tags,
        DateOnly datePublished,
        string status = BlogPostStatus.Published)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(slug);
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(content);

        return new BlogPost
        {
            Id            = Guid.NewGuid(),
            Slug          = slug.Trim().ToLowerInvariant(),
            Title         = title.Trim(),
            Excerpt       = excerpt.Trim(),
            Content       = content.Trim(),
            Tags          = string.Join(",", tags.Select(t => t.Trim())),
            DatePublished = datePublished,
            Status        = NormaliseStatus(status),
            LastSyncedAt  = DateTime.UtcNow,
        };
    }

    /// <summary>Updates an existing post with the latest content from GitHub.</summary>
    public void Update(
        string title,
        string excerpt,
        string content,
        IEnumerable<string> tags,
        DateOnly datePublished,
        string status)
    {
        Title         = title.Trim();
        Excerpt       = excerpt.Trim();
        Content       = content.Trim();
        Tags          = string.Join(",", tags.Select(t => t.Trim()));
        DatePublished = datePublished;
        Status        = NormaliseStatus(status);
        LastSyncedAt  = DateTime.UtcNow;
    }

    public IReadOnlyList<string> GetTags()
        => Tags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    private static string NormaliseStatus(string raw)
        => raw.Trim().ToLowerInvariant() switch
        {
            BlogPostStatus.Draft => BlogPostStatus.Draft,
            _                    => BlogPostStatus.Published,
        };
}

/// <summary>Valid values for <see cref="BlogPost.Status"/>.</summary>
public static class BlogPostStatus
{
    public const string Published = "published";
    public const string Draft     = "draft";
}
