FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files first (layer-cache friendly)
COPY Portfolio.sln .
COPY Portfolio.Api/Portfolio.Api.csproj             Portfolio.Api/
COPY Portfolio.Application/Portfolio.Application.csproj Portfolio.Application/
COPY Portfolio.Infrastructure/Portfolio.Infrastructure.csproj Portfolio.Infrastructure/
COPY Portfolio.Domain/Portfolio.Domain.csproj       Portfolio.Domain/

RUN dotnet restore Portfolio.Api/Portfolio.Api.csproj

# Copy everything else and publish
COPY . .
RUN dotnet publish Portfolio.Api/Portfolio.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# ── Runtime image ────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Render injects PORT at runtime; ASP.NET Core reads ASPNETCORE_URLS
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
