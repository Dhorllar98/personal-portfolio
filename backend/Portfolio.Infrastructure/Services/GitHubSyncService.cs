using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Services;

/// <summary>
/// Fetches markdown (.md) files from a GitHub repository using the GitHub REST API.
///
/// Required Render environment variables (set via Render dashboard):
///   GitHub__Token       — Personal Access Token (read:contents scope only)
///   GitHub__Username    — GitHub username/org  (e.g. Dhorllar98)
///   GitHub__Repository  — Repository name      (e.g. blog-content)
///
/// Markdown files must be in the root of the repository.
/// Sub-directory support can be added by making the path configurable (GitHub__ContentPath).
/// </summary>
public sealed class GitHubSyncService : IGitHubService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;
    private readonly ILogger<GitHubSyncService> _logger;

    private static readonly JsonSerializerOptions JsonOpts =
        new() { PropertyNameCaseInsensitive = true };

    public GitHubSyncService(
        HttpClient http,
        IConfiguration config,
        ILogger<GitHubSyncService> logger)
    {
        _http   = http;
        _config = config;
        _logger = logger;
    }

    /// <inheritdoc/>
    public async Task<IReadOnlyList<(string FileName, string Content)>> GetMarkdownFilesAsync(
        CancellationToken ct = default)
    {
        var token    = _config["GitHub:Token"];
        var username = _config["GitHub:Username"];
        var repo     = _config["GitHub:Repository"];
        var path     = _config["GitHub:ContentPath"] ?? string.Empty; // optional sub-folder

        if (string.IsNullOrWhiteSpace(token) ||
            string.IsNullOrWhiteSpace(username) ||
            string.IsNullOrWhiteSpace(repo))
        {
            _logger.LogWarning(
                "GitHubSyncService: GitHub:Token, GitHub:Username, or GitHub:Repository is not configured. " +
                "Set GitHub__Token, GitHub__Username, GitHub__Repository in Render environment variables.");
            return [];
        }

        // GitHub API: list contents of a directory
        var contentsUrl = string.IsNullOrWhiteSpace(path)
            ? $"https://api.github.com/repos/{username}/{repo}/contents"
            : $"https://api.github.com/repos/{username}/{repo}/contents/{path.TrimStart('/')}";

        using var request = new HttpRequestMessage(HttpMethod.Get, contentsUrl);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Headers.Add("X-GitHub-Api-Version", "2022-11-28");

        HttpResponseMessage response;
        try
        {
            response = await _http.SendAsync(request, ct);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "GitHubSyncService: Failed to reach GitHub API.");
            throw;
        }

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(ct);
            _logger.LogError(
                "GitHubSyncService: GitHub API returned {Status} for {Url}. Body: {Body}",
                (int)response.StatusCode, contentsUrl, body);
            throw new HttpRequestException(
                $"GitHub API error {(int)response.StatusCode}: {response.ReasonPhrase}");
        }

        var json  = await response.Content.ReadAsStringAsync(ct);
        var items = JsonSerializer.Deserialize<List<GitHubContentItem>>(json, JsonOpts) ?? [];
        var mdFiles = items.Where(i =>
            i.Type == "file" &&
            i.Name.EndsWith(".md", StringComparison.OrdinalIgnoreCase)).ToList();

        _logger.LogInformation(
            "GitHubSyncService: Found {Count} markdown file(s) in {Repo}.",
            mdFiles.Count, repo);

        var results = new List<(string, string)>(mdFiles.Count);

        foreach (var file in mdFiles)
        {
            if (string.IsNullOrWhiteSpace(file.DownloadUrl))
                continue;

            try
            {
                using var rawRequest = new HttpRequestMessage(HttpMethod.Get, file.DownloadUrl);
                rawRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                rawRequest.Headers.Add("X-GitHub-Api-Version", "2022-11-28");

                using var rawResponse = await _http.SendAsync(rawRequest, ct);
                rawResponse.EnsureSuccessStatusCode();

                var content = await rawResponse.Content.ReadAsStringAsync(ct);
                results.Add((file.Name, content));

                _logger.LogDebug("GitHubSyncService: Fetched {File} ({Bytes} bytes).",
                    file.Name, content.Length);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "GitHubSyncService: Skipping {File} — could not fetch content.", file.Name);
            }
        }

        return results;
    }

    // ── GitHub API response model ─────────────────────────────────────────────

    private sealed class GitHubContentItem
    {
        public string Name        { get; set; } = default!;
        public string Type        { get; set; } = default!;   // "file" | "dir"
        public string? DownloadUrl { get; set; }
    }
}
