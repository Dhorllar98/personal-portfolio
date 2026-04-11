# Portfolio — Refactor Plan & Prioritised TODO

_Last updated: April 8, 2026_

---

## Backend Scaffold (After Refactor)

```
backend/
├── Portfolio.Api/
│   ├── Controllers/
│   │   ├── AdminController.cs       ← [Authorize], uses ITokenService
│   │   ├── BlogController.cs        ← GET /api/blog, GET /api/blog/{slug}, POST /api/blog/sync [Authorize]
│   │   └── ContactController.cs     ← [AllowAnonymous] POST /api/contact
│   ├── Program.cs                   ← Graceful startup; no ?? throw on missing env vars
│   ├── appsettings.json             ← Empty-string defaults only — NO secrets
│   └── appsettings.Development.json ← Local secrets ONLY — gitignored
│
├── Portfolio.Application/
│   ├── Common/
│   │   └── Result.cs
│   ├── Blog/
│   │   ├── Commands/SyncBlogPostsCommand.cs    ← FrontMatterParser, SyncBlogPostsHandler
│   │   └── Queries/GetBlogPostsQuery.cs        ← GetBlogPostsHandler, GetBlogPostBySlugHandler
│   ├── Contacts/
│   │   ├── Commands/SubmitContactCommand.cs
│   │   └── Queries/GetSubmissionsQuery.cs
│   └── DependencyInjection.cs
│
├── Portfolio.Domain/
│   ├── Entities/
│   │   ├── BlogPost.cs              ← Create(), Update(), GetTags()
│   │   └── ContactSubmission.cs
│   └── Interfaces/
│       ├── IBlogPostRepository.cs
│       ├── IContactSubmissionRepository.cs
│       ├── IGitHubService.cs
│       └── ITokenService.cs
│
└── Portfolio.Infrastructure/
    ├── Migrations/
    │   ├── 20260403070312_InitialCreate.cs
    │   ├── 20260404101039_AddSubjectToContactSubmission.cs
    │   ├── 20260408000000_AddBlogPosts.cs      ← NEW
    │   └── AppDbContextModelSnapshot.cs        ← Updated
    ├── Persistence/
    │   ├── AppDbContext.cs                     ← BlogPosts DbSet added
    │   ├── BlogPostRepository.cs               ← NEW
    │   └── ContactSubmissionRepository.cs
    ├── Services/
    │   ├── GitHubSyncService.cs                ← NEW — fetches .md files via GitHub API
    │   └── JwtTokenService.cs                  ← NEW — ITokenService implementation
    └── DependencyInjection.cs                  ← Registers all new services
```

---

## Prioritised TODO List

### P0 — Do These Before Next Deploy (Blockers)

- [ ] **Rotate compromised credentials.** The Supabase password, JWT key, and admin password from `appsettings.Development.json` have been seen outside git. Change them immediately:
  1. Supabase → Settings → Database → Reset password
  2. Generate a new JWT key: `openssl rand -base64 48`
  3. Set a new admin password

- [ ] **Set Render environment variables** using the `__` naming convention (see `docs/ai-fix-prompt.md` for the full table). Remove any old `JWT_SECRET_KEY` / `ADMIN_PASSWORD` / `SUPABASE_CONNECTION_STRING` style keys — they are NOT read by .NET config.

- [ ] **Apply the new EF migration** to Supabase. From the `backend/` directory:
  ```bash
  dotnet ef database update --project Portfolio.Infrastructure --startup-project Portfolio.Api
  ```
  This creates the `BlogPosts` table. The migration runs automatically on next deploy too (Program.cs calls `MigrateAsync`).

---

### P1 — High Priority (This Week)

- [ ] **Update frontend blog component** — Replace the static `posts.ts` import with a live API call:
  ```ts
  // In Blog.tsx — replace static import with:
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    api.get('/api/blog').then(r => setPosts(r.data))
  }, [])
  ```

- [ ] **Set VITE_API_BASE_URL in Vercel** → Settings → Environment Variables → `VITE_API_BASE_URL=https://<your-render-subdomain>.onrender.com`

- [ ] **Create a blog content repository on GitHub** — Any public or private repo with `.md` files at the root using the front-matter format defined in `docs/ai-fix-prompt.md`. Then set `GitHub__Token`, `GitHub__Username`, `GitHub__Repository` in Render and trigger the first sync via `POST /api/blog/sync`.

- [ ] **Test all three flows end-to-end:**
  1. Submit the contact form → check Supabase `ContactSubmissions` table has a new row
  2. Admin login (`POST /api/admin/login`) → receive a JWT → use it to `GET /api/admin/submissions`
  3. Blog sync (`POST /api/blog/sync` with Bearer token) → `GET /api/blog` returns real posts

---

### P2 — Nice to Have (Next Sprint)

- [ ] **Enable Swagger in Production** — Set `Swagger__Enabled=true` in Render to expose the Swagger UI at `https://<render-url>/swagger`. Useful for manual API testing.

- [ ] **Add email notification** on new contact submission — Use SendGrid or Resend (a free tier SMTP service). Add `IEmailService` to Domain, `SendGridEmailService` to Infrastructure, and call it from `SubmitContactHandler`.

- [ ] **Add a `GitHub__ContentPath` env var** to `GitHubSyncService` so markdown files can live in a sub-folder (e.g. `posts/`) rather than the repo root.

- [ ] **Auto-sync blog on GitHub push** — Add a GitHub Actions workflow that calls `POST /api/blog/sync` (with the admin JWT stored as a GitHub Actions secret) whenever a `.md` file is pushed to the blog content repo. This removes the need to manually trigger the sync.

- [ ] **Add blog pagination** — `GetBlogPostsHandler` currently returns all posts. Add `page` and `pageSize` query parameters and update `BlogController`.

- [ ] **Frontend redesign** — The current design is acknowledged as "too generic." Reference sites to draw from (provide URLs here) — replace the current Hero section's font, colour palette, and layout based on the chosen reference. Suggested changes: stronger typographic hierarchy, a custom accent colour (not generic blue), a more distinctive hero section.

---

### P3 — Future / Stretch Goals

- [ ] Add dark mode toggle (Tailwind dark: classes are already partially configured)
- [ ] Add project detail pages with individual routes (currently cards only)
- [ ] Add reading-time estimate to blog post cards
- [ ] Add sitemap.xml and robots.txt for SEO
- [ ] Add OpenGraph meta tags to blog post pages for social sharing
- [ ] Consider replacing IP-based rate limiting (AspNetCoreRateLimit) with ASP.NET Core's built-in `RateLimiter` middleware (available in .NET 7+, no third-party package required)

---

## Architecture Decisions & Rationale

**Why is there no MediatR?** The project uses plain handler classes (`SubmitContactHandler`, `GetBlogPostsHandler`, etc.) instead of MediatR. This keeps the dependency surface minimal and avoids "magic" dispatch that makes stack traces harder to follow. If the project grows to 20+ use cases, MediatR can be introduced by implementing `IRequestHandler<TRequest, TResponse>` on existing handlers.

**Why does the app not crash if Jwt:Key is missing?** Render runs a health check (`/health`) before routing traffic. If the app crashes at startup due to a missing env var, the health check never returns 200 and Render continuously retries with exponential backoff — effectively taking the service down. By starting gracefully and logging a clear warning instead, the health check passes and you can diagnose the missing env var from the Render logs without a full outage.

**Why is Tags stored as a comma-separated string?** For a personal portfolio blog, the number of tags per post is small and never queried with a `WHERE tags CONTAINS` filter. A normalised `BlogPostTag` junction table would add two extra joins for no practical benefit. If tag-based filtering is added later, this is a one-migration refactor.
