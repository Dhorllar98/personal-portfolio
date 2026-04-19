# Build Workflow — Step by Step
**AI-Assisted Development Program · Phase 1 · Task 01**
**Developer:** Olaniran Oluwadamilola (Dhorllar98)

---

## Overview

Total build time: approximately 1 week across two phases — VS Code + Claude Code, then Cowork. Every step below represents a deliberate decision point, not just a sequence of commands.

---

## Day 1 — Pre-Build Planning (No Code Written)

Before opening VS Code, I spent a full day working with Claude to plan the entire build.

1. Read the full Task 01 brief twice and noted every explicit requirement
2. Read both required articles:
   - *Build a complete website with Claude Code* — Aiblew My Mind
   - *Claude Code in practice* — Akshay Pachaar (X thread)
3. Reviewed three of my existing repositories to identify patterns to carry forward:
   - `clinical-task-management-api` — Clean Architecture, JWT, EF Core, FluentValidation
   - `fashion-and-lifestyle-v1` — React + Vite + Tailwind, ASP.NET Core, Vercel + Render
   - `qr-attendance-api` — pull request patterns, backend structure
4. Used Claude to evaluate tech stack options and document decisions (see `tech-stack.md`)
5. Used Claude to evaluate hosting platforms (see `hosting.md`)
6. Used Claude to evaluate database options (see `database.md`)
7. Drafted 17 prompts in deliberate sequence before any scaffolding began
8. Planned the Clean Architecture layer structure: Domain, Application, Infrastructure, API

**Decision locked:** Monorepo with separate `frontend/` and `backend/` folders. ASP.NET Core 9, EF Core, Supabase, Vercel + Render.

---

## Day 2–3 — Backend Scaffolding (VS Code + Claude Code)

1. Initialised the GitHub repository and set up the monorepo structure
2. Scaffolded the ASP.NET Core 9 backend using Claude Code with explicit architecture constraints
3. Wired Clean Architecture layers — Domain entities, Application handlers, Infrastructure (EF Core + Supabase), API controllers
4. Implemented JWT authentication for the admin route
5. Created the contact form `POST /api/contact` endpoint with validation
6. Wrote the `BlogPost` domain entity and repository
7. Generated and applied EF Core migrations against Supabase
8. Configured CORS policy with environment-variable-driven allowed origins
9. Added health check endpoint for Render's startup probe
10. Wrote `render.yaml` and `Dockerfile` for Render deployment
11. Deployed backend to Render — verified `/health` returned 200

**Bug encountered:** EF Core migration silently blocked by `PendingModelChangesWarning` — missing field in model snapshot. Updated snapshot manually, migration ran clean on next attempt.

---

## Day 3–4 — Frontend Build (VS Code + Claude Code)

1. Scaffolded React 18 + TypeScript + Vite + Tailwind CSS frontend
2. Built all five sections: Hero, About, Projects, Blog, Contact
3. Connected the contact form to `POST /api/contact` via axios
4. Set up React Router with routes for `/`, `/blog/:slug`, `/admin`, `/admin/submissions`
5. Implemented `useScrollReveal` hook using `IntersectionObserver` for entrance animations
6. Added JWT-authenticated admin panel for viewing contact submissions
7. Configured `vercel.json` SPA rewrite (`"destination": "/index.html"`) — note: "/" breaks React Router
8. Set `VITE_API_BASE_URL` environment variable in Vercel dashboard
9. Deployed frontend to Vercel

**Bug encountered:** Blog post detail pages returning blank — vercel.json destination was `"/"` instead of `"/index.html"`. React Router never received the route. Fixed by correcting the SPA rewrite.

---

## Day 4 — Content and Design Refinement

1. Replaced all placeholder content with real personal information
2. Rewrote Hero sub-statement with specific stack references
3. Rewrote About bio with exact technologies and no generic filler
4. Updated Projects section with real project descriptions
5. Pushed back on Claude's first design output — re-prompted with explicit visual constraints
6. Ran `tsc --noEmit` and resolved all TypeScript strict-mode errors:
   - Missing `vite-env.d.ts` (created from scratch — was completely absent)
   - Untyped `projects` array — annotated as `Project[]`
   - Unused `catch` parameter in `BlogPostPage.tsx` — changed to `catch(() =>`

---

## Day 5 — Cowork Phase: Blog and Infrastructure Debugging

Claude.ai weekly allocation ran out during the VS Code phase. Moved to Cowork for the remaining work.

Cowork advantages used in this phase:
- Direct file system access — no copy-pasting
- Live Supabase MCP — SQL executed directly against the database
- Sandboxed bash shell — TypeScript checks, Python scripts, git operations in one session

**Blog post created and published:**
1. Drafted blog article using Claude as writing partner
2. Updated blog post title and content directly in Supabase via MCP SQL
3. Confirmed post slug: `building-my-portfolio-with-claude-honest-version`

**Contact form 500 errors (Render):**
- Root cause: Npgsql keepalive pings hitting stale connections on Supabase's transaction pooler
- Fix: switched connection string from port 6543 (transaction pooler) to port 5432 (session mode)

---

## Day 6 — Blog Section Debugging (Three-Layer Problem)

The blog section showed a count of 1 post but nothing rendered. Three separate root causes were identified and fixed in sequence.

**Bug 1 — CORS:**
- The live Vercel URL (`portfolio-frontend-steel-three.vercel.app`) was not in the Render backend's `Cors__AllowedOrigins` list
- Every API request from the browser was rejected before reaching any route handler
- Fix: added the URL to `render.yaml` and committed

**Bug 2 — Invisible cards:**
- The `reveal` CSS class sets `opacity: 0`. A `useScrollReveal` hook adds `visible` via `IntersectionObserver`
- The hook fires on component mount — at which point the `<ul>` is hidden behind a loading skeleton and does not exist in the DOM
- By the time data loads and the list renders, the observer has already fired and never runs again
- Cards were rendered but permanently invisible
- Fix: replaced `useScrollReveal` with a plain `useRef` + `requestAnimationFrame` to add `visible` imperatively after loading resolves

**Bug 3 — Vercel proxy timeout:**
- Attempted to route `/api/*` through Vercel's rewrite layer to eliminate CORS entirely
- Vercel's edge network closes external connections after ~10 seconds
- Render free tier cold-starts in 30–60 seconds
- Guaranteed 504 timeout before Render woke up
- Fix: bypassed Render for blog data entirely — queried Supabase PostgREST API directly from the frontend using the public anon key. Zero cold-start latency, no CORS, always on.

---

## Day 7 — Final Deliverables

1. Built 3-slide presentation (Problem / Method / Results) using python-pptx
   - pptxgenjs was blocked by npm proxy restrictions in the sandbox — used python-pptx instead
   - Fixed `type="screen4x3"` → `type="screen16x9"` bug that caused slide 3 to render incorrectly in PowerPoint
2. Wrote `/docs` folder documents: `tech-stack.md`, `hosting.md`, `database.md`, `prompt-log.md`, `linkedin-post-draft.md`, `workflow.md`
3. Added custom 404 page (`NotFoundPage.tsx`) — catch-all route for unmatched URLs
4. Updated blog post with full debugging chapter
5. Final TypeScript check — zero errors
6. Final git push — all commits on `main`

---

## Commit History Summary

All commits are on the `main` branch of `github.com/Dhorllar98/personal-portfolio`. Key commits:

- `feat: full design overhaul — serif hero, WhyMe section, slide-out nav, FAQ`
- `fix: resolve all TypeScript strict-mode errors`
- `content: update About bio to reflect CS graduate and backend focus`
- `fix: handle Render free-tier cold start in blog fetch`
- `fix(cors): allow portfolio-frontend-steel-three.vercel.app origin`
- `fix(blog): make post cards visible — reveal class had no observer`
- `fix(blog): fetch posts directly from Supabase, bypass Render cold start`
- `feat(ux): add custom 404 page for unmatched routes`
- `fix(blog): manually trigger reveal after async data loads`
