using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Blog.Commands;
using Portfolio.Application.Blog.Queries;

namespace Portfolio.Api.Controllers;

/// <summary>Blog endpoints — public read, admin-only sync trigger.</summary>
[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly GetBlogPostsHandler      _getPostsHandler;
    private readonly GetBlogPostBySlugHandler _getBySlugHandler;
    private readonly SyncBlogPostsHandler     _syncHandler;

    public BlogController(
        GetBlogPostsHandler      getPostsHandler,
        GetBlogPostBySlugHandler getBySlugHandler,
        SyncBlogPostsHandler     syncHandler)
    {
        _getPostsHandler  = getPostsHandler;
        _getBySlugHandler = getBySlugHandler;
        _syncHandler      = syncHandler;
    }

    /// <summary>Returns a list of all published blog posts (newest first).</summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var result = await _getPostsHandler.HandleAsync(ct);
        return Ok(result.Value);
    }

    /// <summary>Returns the full content of a single blog post by its slug.</summary>
    [HttpGet("{slug}")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetBySlug(string slug, CancellationToken ct)
    {
        var result = await _getBySlugHandler.HandleAsync(slug, ct);

        if (!result.IsSuccess)
            return NotFound(new ProblemDetails
            {
                Title  = "Not Found",
                Detail = result.Error,
                Status = StatusCodes.Status404NotFound,
            });

        return Ok(result.Value);
    }

    /// <summary>
    /// Triggers a manual sync from GitHub into the database (admin only).
    /// Call this after pushing new .md files to your blog content repository.
    /// </summary>
    [HttpPost("sync")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Sync(CancellationToken ct)
    {
        var result = await _syncHandler.HandleAsync(ct);

        if (!result.IsSuccess)
            return BadRequest(new ProblemDetails
            {
                Title  = "Sync Failed",
                Detail = result.Error,
                Status = StatusCodes.Status400BadRequest,
            });

        return Ok(new
        {
            message = $"Blog sync complete. {result.Value!.Synced} post(s) upserted.",
            synced  = result.Value.Synced,
            skipped = result.Value.Skipped,
        });
    }
}
