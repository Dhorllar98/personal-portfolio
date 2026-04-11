using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Blog.Commands;
using Portfolio.Application.Blog.Queries;
using Portfolio.Application.Contacts.Commands;
using Portfolio.Application.Contacts.Queries;

namespace Portfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // ── Contact use cases ─────────────────────────────────────────────────
        services.AddScoped<SubmitContactHandler>();
        services.AddScoped<GetSubmissionsHandler>();
        services.AddScoped<MarkSubmissionReadHandler>();

        // ── Blog use cases ────────────────────────────────────────────────────
        services.AddScoped<GetBlogPostsHandler>();
        services.AddScoped<GetBlogPostBySlugHandler>();
        services.AddScoped<SyncBlogPostsHandler>();

        return services;
    }
}
