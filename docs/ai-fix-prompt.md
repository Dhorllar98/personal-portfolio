# Portfolio Backend — AI Fix Prompt (Standardised)

> Copy and paste this entire prompt into any AI assistant (Claude, ChatGPT, Copilot) to get precise,
> context-aware help with backend issues. Update the "Current Status" section before each session.

---

## Project Overview

**Stack:** .NET 9 (ASP.NET Core) backend on Render (Docker) · React + Vite + TypeScript frontend on Vercel · Supabase (PostgreSQL) database.

**Architecture:** Clean Architecture — four projects:
- `Portfolio.Domain` — entities, repository/service interfaces. Zero external dependencies.
- `Portfolio.Application` — use-case handlers, validators (FluentValidation), Result<T> pattern. Depends only on Domain.
- `Portfolio.Infrastructure` — EF Core persistence (AppDbContext), repositories, JwtTokenService, GitHubSyncService. Depends on Application + Domain.
- `Portfolio.Api` — ASP.NET Core controllers, Program.cs, appsettings.json. Depends on Application + Infrastructure.

**Key conventions:**
- Environment variables use the .NET `__` double-underscore separator (`Jwt__Key` maps to `Jwt:Key` in config).
- The `appsettings.json` holds only empty-string defaults. Real secrets are injected via Render dashboard (never hardcoded).
- All handlers return `Result<T>` or `Result`. Controllers never throw; they map Result failures to the correct HTTP status code.
- Public endpoints are decorated with `[AllowAnonymous]`. Admin endpoints use `[Authorize]`.

---

## Confirmed Environment Variables (Render Dashboard)

Set these in **Render → Service → Environment** using the exact key names below:

| Key | Value / Notes |
|-----|---------------|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ASPNETCORE_URLS` | `http://+:10000` |
| `ConnectionStrings__DefaultConnection` | Full Supabase PostgreSQL connection string |
| `Jwt__Key` | Random secret, min 32 chars (`openssl rand -base64 48`) |
| `Jwt__Issuer` | `portfolio-api` |
| `Jwt__Audience` | `portfolio-client` |
| `Jwt__ExpiryMinutes` | `60` |
| `Admin__Password` | Your admin dashboard password |
| `Cors__AllowedOrigins__0` | `https://dhorllar98.vercel.app` |
| `GitHub__Token` | GitHub Personal Access Token (read:contents scope) |
| `GitHub__Username` | Your GitHub username |
| `GitHub__Repository` | The repository that holds your `.md` blog files |

> **Security rule:** Never put real credentials in `appsettings.json` or `appsettings.Development.json`.
> The `.gitignore` excludes `appsettings.Development.json` — use it locally only.

---

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Render health check — always returns 200 |
| POST | `/api/contact` | Submit a contact form message |
| GET | `/api/blog` | List all blog posts (summary) |
| GET | `/api/blog/{slug}` | Full blog post content |

### Admin (requires Bearer JWT)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/login` | Returns a JWT (`{ "token": "..." }`) |
| GET | `/api/admin/submissions` | List all contact submissions |
| PATCH | `/api/admin/submissions/{id}/read` | Mark a submission as read |
| POST | `/api/blog/sync` | Trigger GitHub → Supabase blog sync |

---

## Blog Markdown Format

Every `.md` file in your GitHub blog-content repository must begin with YAML front-matter:

```markdown
---
title: Why I Use Clean Architecture
date: 2026-04-08
excerpt: Clean architecture is often criticised as over-engineering. Here is why I disagree.
tags: C#, ASP.NET Core, Architecture
---

# Body starts here

Your markdown content...
```

The slug is derived from the filename (e.g. `why-clean-architecture.md` → slug `why-clean-architecture`).

---

## Current Status (update this before each AI session)

- [ ] Startup crash resolved (Program.cs no longer throws on missing Jwt:Key)
- [ ] Render env vars set using `__` naming (not old `${...}` syntax)
- [ ] ContactController has `[AllowAnonymous]`
- [ ] AdminController uses `ITokenService` (no JWT logic in controller)
- [ ] Blog backend added (BlogPost entity, BlogController, GitHubSyncService, migration)
- [ ] EF migration `AddBlogPosts` applied (`dotnet ef database update` from Portfolio.Infrastructure)
- [ ] Frontend blog component updated to call `GET /api/blog` instead of using static posts.ts
- [ ] Frontend API base URL set in Vercel env vars (`VITE_API_BASE_URL=https://your-render-url.onrender.com`)

---

## How to Ask for Help

Paste this prompt header, then describe your specific issue using the template below:

```
## Issue I'm Facing

**Which endpoint / feature:** e.g. POST /api/contact
**Error message (exact):** e.g. "An unexpected error occurred."
**Where the error appears:** Frontend browser console / Render logs / both
**Render logs (paste relevant lines):**

[paste log lines here]

**What I've already tried:**

[describe steps taken]
```

---

## Common Mistakes Reference

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| App crashes at startup with `Jwt:Key is not configured` | `Jwt__Key` env var not set in Render | Add `Jwt__Key` to Render environment |
| CORS preflight blocked | `Cors__AllowedOrigins__0` not set, or set to wrong URL | Verify the Render env var matches the exact Vercel URL |
| Contact form → "Unexpected error" | `ConnectionStrings__DefaultConnection` missing | Add Supabase connection string to Render |
| Admin login → "Service Unavailable" | `Admin__Password` or `Jwt__Key` not set | Add both env vars to Render |
| Blog shows no posts | Migration not applied or GitHub env vars missing | Run `dotnet ef database update`; set GitHub env vars; call POST `/api/blog/sync` |
| Blog sync → "GitHub fetch failed" | Wrong token scope or missing `GitHub__Repository` | Regenerate PAT with `read:contents`; verify username and repo name |
