namespace Portfolio.Domain.Interfaces;

/// <summary>Contract for fetching markdown blog content from a GitHub repository.</summary>
public interface IGitHubService
{
    /// <summary>
    /// Returns all .md files from the configured GitHub repository as (filename, content) pairs.
    /// </summary>
    Task<IReadOnlyList<(string FileName, string Content)>> GetMarkdownFilesAsync(
        CancellationToken ct = default);
}
