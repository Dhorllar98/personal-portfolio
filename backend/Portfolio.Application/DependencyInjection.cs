using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Contacts.Commands;
using Portfolio.Application.Contacts.Queries;

namespace Portfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<SubmitContactHandler>();
        services.AddScoped<GetSubmissionsHandler>();
        services.AddScoped<MarkSubmissionReadHandler>();

        return services;
    }
}
