using Portfolio.Application.Common;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Blog.Commands;

/// <summary>
/// Fetches all .md files from the configured GitHub repository and upserts them
/// into the database, replacing stale placeholder content.
///
/// Expected front-matter format for every .md file:
/// ---
/// title: My Post Title
/// date: 2026-04-08
/// excerpt: A short summary shown on the blog list page.
/// tags: C#, ASP.NET Core, Clean Architecture
/// status: published
/// ---
///
/// status values:
///   published  — live on the public blog (default when omitted)
///   draft      — visible with a "Draft" badge but not finalized
///
/// Anything after the closing --- is the markdown body (Content).
/// The slug is derived from the filename (e.g. "my-post.md" → "my-post").
/// </summary>
public class SyncBlogPostsHandler
{
    private readonly IGitHubService _gitHub;
    private readonly IBlogPostRepository _repository;

    public SyncBlogPostsHandler(IGitHubService gitHub, IBlogPostRepository repository)
    {
        _gitHub     = gitHub;
        _repository = repository;
    }

    public async Task<Result<SyncResult>> HandleAsync(CancellationToken ct = default)
    {
        IReadOnlyList<(string FileName, string Content)> files;

        try
        {
            files = await _gitHub.GetMarkdownFilesAsync(ct);
        }
        catch (Exception ex)
        {
            return Result<SyncResult>.Failure($"GitHub fetch failed: {ex.Message}");
        }

        if (files.Count == 0)
            return Result<SyncResult>.Failure("No markdown files found in the configured GitHub repository.");

        var posts   = new List<BlogPost>();
        var skipped = new List<string>();

        foreach (var (fileName, rawContent) in files)
        {
            var parsed = FrontMatterParser.TryParse(fileName, rawContent);
            if (parsed is null)
            {
                skipped.Add(fileName);
                continue;
            }
            posts.Add(parsed);
        }

        await _repository.UpsertManyAsync(posts, ct);
        await _repository.SaveChangesAsync(ct);

        return Result<SyncResult>.Success(new SyncResult(posts.Count, skipped));
    }
}

public record SyncResult(int Synced, IReadOnlyList<string> Skipped);

// ── Front-matter parser ───────────────────────────────────────────────────────

internal static class FrontMatterParser
{
    /// <summary>
    /// Parses YAML-style front-matter from a markdown string and returns a <see cref="BlogPost"/>,
    /// or <c>null</c> if the file is missing required fields (title).
    /// </summary>
    public static BlogPost? TryParse(string fileName, string rawContent)
    {
        var slug       = Path.GetFileNameWithoutExtension(fileName).ToLowerInvariant();
        var normalized = rawContent.ReplaceLineEndings("\n").Trim();

        if (!normalized.StartsWith("---"))
            return null;

        var endIndex = normalized.IndexOf("\n---", 3);
        if (endIndex < 0)
            return null;

        var frontMatterBlock = normalized[3..endIndex].Trim();
        var body             = normalized[(endIndex + 4)..].Trim();

        var meta = ParseYamlBlock(frontMatterBlock);

        if (!meta.TryGetValue("title", out var title) || string.IsNullOrWhiteSpace(title))
            return null;

        meta.TryGetValue("excerpt", out var excerpt);
        meta.TryGetValue("tags",    out var tagsRaw);
        meta.TryGetValue("date",    out var dateRaw);
        meta.TryGetValue("status",  out var status);

        var tags          = tagsRaw?.Split(',').Select(t => t.Trim()) ?? [];
        var datePublished = DateOnly.TryParse(dateRaw, out var d) ? d : DateOnly.FromDateTime(DateTime.UtcNow);
        var resolvedStatus = status ?? BlogPostStatus.Published;

        return BlogPost.Create(slug, title, excerpt ?? string.Empty, body, tags, datePublished, resolvedStatus);
    }

    private static Dictionary<string, string> ParseYamlBlock(string block)
    {
        var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var line in block.Split('\n'))
        {
            var colon = line.IndexOf(':');
            if (colon < 0) continue;
            var key   = line[..colon].Trim();
            var value = line[(colon + 1)..].Trim().Trim('"').Trim('\'');
            if (!string.IsNullOrWhiteSpace(key))
                result[key] = value;
        }
        return result;
    }
}
