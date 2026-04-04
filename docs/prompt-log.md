# 📓 Prompt Log — Dhorllar98 Portfolio Build

> **Developer:** Olaniran Oluwadamilola (Dhorllar98)
> **Program:** AI-Assisted Development Program · Phase 1
> **Stack:** React 18 · TypeScript · Vite · Tailwind CSS · ASP.NET Core 9 · Supabase
> **Repo:** github.com/Dhorllar98/personal-portfolio
> **Started:** April 1, 2026 · **Due:** April 4, 2026

> 💡 A real-time log of every prompt sent to Claude — what I asked, what Claude said, what I pushed back on, and every decision made. Written as the build happened, not after.

---

## 📅 Day 1 — Planning, Brainstorming & Prompt Engineering

**Date:** April 1–2, 2026
**Type:** Pre-build preparation — no code written

Before a single line of code was touched, I spent an **entire day** working with Claude to plan, structure, and organise the full build strategy for this project.

This wasn't passive reading. It was deliberate, back-and-forth brainstorming — reading the assignment brief carefully, studying both required articles, reviewing my existing repositories to understand patterns already established, and working through every decision that would need to be made before building could begin.

**What this day covered:**
- Read and analysed the full Task 01 / Phase 1 assignment brief in detail
- Studied both required articles:
  - *Build a complete website with Claude Code* — Aiblew My Mind (Substack)
  - *Claude Code in practice* — Akshay Pachaar (X/Twitter thread)
- Reviewed existing GitHub repositories for patterns to carry forward:
  - `clinical-task-management-api` — clean architecture, JWT, EF Core, FluentValidation
  - `fashion-and-lifestyle-v1` — React+Vite+Tailwind, ASP.NET Core, Vercel + Render
  - `qr-attendance-api` (conclase-cohort-8) — pull request contributions, backend patterns
- Worked through every technology decision — framework, database, hosting, architecture, blog, auth
- Drafted, refined, and organised a complete library of 17 prompts in deliberate sequence
- Planned the CoWork + Claude Code workflow division of responsibilities

By the end of this day, I had a clear, structured picture of exactly where the build was going. The prompts weren't written in one pass — they were iterated on, challenged, rewritten, and stress-tested against the assignment requirements.

**Lesson:** Prompt engineering is not something you do on the fly. A day of thinking through the full picture before touching the keyboard is not wasted time — it is the difference between directing Claude and being led by it.

---

## 🛠️ Day 2 — Environment Setup

### Issue 1 — CoWork: Virtualization Not Available

**Date:** April 2, 2026

**Error received:**
```
Virtualization is not available.
Claude's workspace requires Virtual Machine Platform,
but the virtualization service isn't responding.
```

**Fixes attempted:**

**Attempt 1 — Windows Features UI:**
- `Windows + R` → `optionalfeatures` → checked Virtual Machine Platform → restarted
- ❌ Failed

**Attempt 2 — PowerShell (Admin):**
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
- ❌ Failed

**Attempt 3 — BIOS + Hyper-V (Root Fix):**
1. Entered HP BIOS Setup via F10 on boot
2. Advanced → Device Configurations → VTx already enabled ✅
3. Root cause: Hyper-V not enabled in Windows
4. Ran:
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
5. ✅ CoWork loaded after restart

**Time lost:** ~45 minutes
**Lesson:** VTx in BIOS is necessary but not sufficient. Hyper-V must also be enabled inside Windows.

---

### Issue 2 — Git Push: Repository Not Found

**Date:** April 2, 2026

**Error:**
```
error: src refspec main does not match any
remote: Repository not found.
fatal: repository 'https://github.com/Dhorllar98/personal-portfolio/' not found
```

**Root cause:** Remote repo didn't exist on GitHub yet.

**Fix:**
1. github.com → "+" → New repository → `personal-portfolio` → Public → no README
2. Then:
```powershell
git init
git remote add origin https://github.com/Dhorllar98/personal-portfolio
echo "# Dhorllar Portfolio" > README.md
git add .
git commit -m "chore: initialize portfolio repository"
git push -u origin main
```
✅ Pushed successfully

**Lesson:** Always create the GitHub repository before running git push.

---

## 📬 Prompt 1 — Stack Confirmation

**Date:** April 2, 2026 · **Sent to:** Claude Code (VS Code)

**Prompt sent:**
```
I'm building a personal developer portfolio website. My existing
projects use React 18 with TypeScript, Vite, and Tailwind CSS on
the frontend, and ASP.NET Core 9 with C# on the backend using
clean architecture — separate Domain, Application, Infrastructure,
and Api layers, with JWT authentication and EF Core. I want this
portfolio to follow the same monorepo structure I already use: a
frontend/ folder for the React app and a backend/ folder for the
ASP.NET Core API.

The site needs five sections: Hero, About, Projects, Blog, and
Contact. The contact form will store submissions in a database.
Before you write any code, confirm this stack makes sense for a
portfolio site, flag any tradeoffs I should know about, and tell
me if there's anything you'd adjust specifically for a portfolio
use case versus a production app. Then wait for my confirmation
before proceeding.
```

**What Claude recommended:**
- Next.js instead of React+Vite for better SEO
- Remove JWT — flagged as overkill for a portfolio
- Simplify clean architecture — too heavy for this use case
- Supabase for database
- Vercel + Render for hosting
- Markdown-only blog with no backend involvement

**My decisions after reviewing:**

| Decision | My Choice | Reasoning |
|---|---|---|
| Frontend | React + Vite | Consistent with existing repos. Next.js as v2 upgrade in README |
| SEO | react-helmet (v1) | Practical given deadline. SSR planned for v2 |
| Architecture | Clean — kept | Demonstrates engineering discipline. In README |
| JWT | Kept | Admin panel planned. Infrastructure already familiar |
| Blog | Markdown (v1) | DB-backed as future milestone in README |
| Database | Supabase | Time constraint over Neon. Neon preferred long-term in README |
| Hosting | Vercel + Render | Avoids cold starts. Consistent with fashion-and-lifestyle-v1 |
| Rate limiting | Full policy | Scoped to /api/contact only |

---

## 📬 Prompt 2 — Database Recommendation

**Date:** April 2, 2026
**Status:** ⏭️ Reviewed and intentionally skipped

**Prompt prepared:**
```
I need to choose a database for my portfolio's contact form
submissions. My backend is ASP.NET Core 9 with EF Core already
configured in my other projects. Evaluate Supabase, Neon, and
Turso specifically for this use case...
```

**Why skipped:**
My response to Prompt 1 already covered the database decision in full. Sending this as a separate prompt would have produced no new information or decisions. Claude had complete context. Decision was made, documented, and locked.

**Decision recorded:** Supabase — time constraint. Neon documented as preferred long-term in README.

---

## 📬 Prompt 3 — Hosting Recommendation

**Date:** April 2, 2026
**Status:** ⏭️ Reviewed and intentionally skipped

**Prompt prepared:**
```
My fashion-and-lifestyle-v1 project is already deployed on Vercel
for the React frontend and Render for the ASP.NET Core backend...
```

**Why skipped:**
Same reasoning as Prompt 2. Prompt 1 response confirmed Vercel + Render. No new evaluation needed. Moved directly to Prompt 4.

**Decision recorded:** Vercel (frontend) + Render (backend).

---

## 📬 Prompt 4 — Project Scaffold

**Date:** April 2, 2026 · **Sent to:** Claude Code (VS Code)

**Prompt sent:**
```
Scaffold the full monorepo structure for my portfolio project
inside the current folder. Use the same structure as my existing
projects:

- frontend/ — React 18, TypeScript, Vite, Tailwind CSS...
- backend/ — ASP.NET Core 9 Web API in C#, clean architecture
  with four projects: Portfolio.Domain, Portfolio.Application,
  Portfolio.Infrastructure, Portfolio.Api...
- Root level: .gitignore for Node and .NET, README.md,
  CHANGELOG.md, VERSION starting at 1.0.0.

Do not write any feature code yet. Just the scaffolding.
```

**What Claude built:**

Root level: `README.md`, `.gitignore`, `CHANGELOG.md`, `VERSION`

Frontend: Full structure — `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, all component folders (Hero, About, Projects, Blog, Contact, Admin), `App.tsx` with routing, `src/lib/api.ts` with Axios + JWT interceptor

Backend: Complete clean architecture —
- `Portfolio.Domain` — `ContactSubmission.cs` entity, repository interface
- `Portfolio.Application` — `Result<T>`, `SubmitContactHandler`, `GetSubmissionsHandler`
- `Portfolio.Infrastructure` — `AppDbContext.cs` (EF Core + Npgsql), repository implementation
- `Portfolio.Api` — `ContactController.cs` (rate limited), `AdminController.cs` (JWT), `Program.cs`

**⚠️ Issue caught — Claude overstepped the brief:**
The prompt said *"Do not write any feature code yet."* Claude built the entire application — handlers, controllers, repositories, EF Core context, full routing — in one run.

**My decision — accepted with verification:**
Given the Saturday deadline, rolling back would cost time without adding quality. Architecture was verified against existing repos before accepting.

Verified:
- Clean architecture layers properly separated ✅
- Repository pattern matches `clinical-task-management-api` ✅
- JWT setup consistent with existing APIs ✅
- Rate limiting scoped to /api/contact ✅
- Swagger with Bearer JWT input box ✅
- DependencyInjection.cs per layer ✅

---

## 🔧 Environment Configuration — Supabase + JWT

**Date:** April 2, 2026

**Steps completed:**
1. Supabase project created: `portfolio-db` (Project ID: `qwaisknldjzfjiswjgcn`)
2. Connection string built using pooler URL (direct hostname blocked by ISP DNS)
3. JWT key generated via PowerShell random string command
4. `appsettings.Development.json` configured with all credentials
5. `.gitignore` verified — credentials protected before any commit

**Common mistake caught:** Used project name instead of project ID in host URL initially. Corrected before saving.

---

## 🔧 EF Core Migration — Interrupted & Resolved via SQL Editor

**Date:** April 2–3, 2026

**Issues encountered:**

**Issue 1 — Package version mismatch:**
NuGet auto-grabbed EF Core Design 10.0.5 (requires .NET 10). Project targets .NET 9.
```powershell
dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.4
dotnet add package Microsoft.EntityFrameworkCore.Relational --version 9.0.4
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 9.0.4
```

**Issue 2 — DNS blocking Supabase direct hostname:**
ISP-level DNS could not resolve `db.qwaisknldjzfjiswjgcn.supabase.co`.
Fix: switched to Google DNS (8.8.8.8) + switched to Supabase connection pooler URL.

**Issue 3 — Migration timeout on CREATE TABLE:**
Network instability caused DDL writes to drop after ~63 seconds consistently. SELECT queries ran fine. EF Core migration kept timing out.

**Workaround — Manual SQL via Supabase SQL Editor:**
```sql
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (...);
CREATE TABLE IF NOT EXISTS "ContactSubmissions" (...);
INSERT INTO "__EFMigrationsHistory" VALUES ('20260403070312_InitialCreate', '9.0.4');
```
✅ Both tables created. Migration tracked manually.

**Lesson:** When infrastructure tooling fails due to network conditions, understanding the underlying SQL is what makes the workaround possible.

---

## 🔧 Frontend Local Setup — Node/esbuild Fix

**Date:** April 3, 2026

**Error:**
```
spawnSync esbuild.exe EFTYPE — binary incompatibility
```

**Root cause:** Scaffolded esbuild version incompatible with Node v24.14.1 (current LTS).

**Fix:**
```powershell
npm install esbuild@latest --save-dev
npm install
```
✅ 368 packages installed. Frontend running at `http://localhost:5173`.

**Additional setup:** Visual Studio 2026 Build Tools + Python 3.14 installed via Chocolatey for Node native module compilation. One-time setup, ~15 minutes.

---

## ✅ Frontend Running Locally — All 5 Sections Confirmed

**Date:** April 3, 2026

All five sections rendered at `localhost:5173`. Backend running at `localhost:7000`.
However, after reviewing the live site critically, the sections built by Claude during the scaffold overstep were assessed as **not acceptable for submission** — generic placeholders, wrong copy, no personal identity, incorrect bio, and a shabby overall presentation that did not reflect the professional standard required.

---

## ⚠️ Critical Pushback — Sections 5–11 Rejected & Rebuilt

**Date:** April 3, 2026

**What happened:**
Claude built all five frontend sections plus the design system and database integration during the scaffold overstep (Prompt 4). While the code was architecturally correct, the visual output and content were reviewed and found to be unacceptable:

- **Design system:** Generic light theme, no personality, basic Tailwind defaults. Not dark, not branded, not captivating.
- **Hero section:** Tagline was *"I build things for the web"* — anonymous and generic. Name was present but no credential positioning, no animations, no identity.
- **About section:** Template bio that could belong to any developer. Wrong skills (Docker listed but not in my stack). No mention of CS degree, Anthropic, or AI-assisted development journey.
- **Projects section:** "Project One" and "Project Two" — pure placeholder content with no real repo data.
- **Blog section:** Placeholder article titled *"Why I Use Clean Architecture"* — not the required article. The required post is about setting up VS Code and Claude Code.
- **Contact section:** Missing the Subject field. No inline validation. Not production-grade.

**My decision:** Reject all section outputs and explicitly re-prompt each one with precise, personal specifications. This took additional time but was non-negotiable — this portfolio determines professional trajectory and capabilities, not just assignment completion.

---

## 📬 Prompt A — Global Design System (Re-prompted with Specifications)

**Date:** April 3, 2026 · **Sent to:** Claude Code

**Why re-prompted:** Claude's original design was a basic light-mode Tailwind setup with no brand identity. Completely replaced.

**My specifications:**
- Dark mode default with light mode toggle
- Color palette: `#0a0a0f` background, `#00d4ff` cyan accent, `#7928ca` violet accent
- Typography: Space Grotesk (headings) + Inter (body) from Google Fonts
- Animated gradient blobs, scroll reveal animations, card glow effects, section dividers
- Dark mode toggle in navbar

**Session interruption note:** Claude's usage limit was reached mid-session. Used a continuation prompt on restart:
> *"The previous implementation was interrupted mid-way. Review what currently exists in tailwind.config.ts, index.css, and component files. Complete anything that was started and fill any gaps."*

**What was built:**

Config:
- `tailwind.config.ts` — Space Grotesk display font, Inter sans font, cyan/violet color tokens, gradient-shift and fade-up keyframes
- `src/index.css` — CSS variables for dark/light modes, `.card-glow`, `.btn-primary`, `.btn-outline`, `.tag`, `.gradient-text`, `.navbar-blur`, `.input-field`, `.reveal`, `.reveal-children`, `.section-divider`, `.hero-gradient`
- `index.html` — Space Grotesk Google Fonts link, `class="dark"` on `<html>`

New hooks:
- `src/hooks/useTheme.ts` — toggles dark/light class on `<html>`, persists to localStorage
- `src/hooks/useScrollReveal.ts` — IntersectionObserver triggers CSS transitions on scroll

All components updated: Navbar, Hero, About, ProjectCard, Projects, Blog, Contact, Footer, HomePage — all old tokens replaced with CSS variables.

✅ Design system fully applied

---

## 📬 Prompt B — Hero Section (Re-prompted with Specifications)

**Date:** April 3, 2026 · **Sent to:** Claude Code

**Why re-prompted:** Original hero said *"I build things for the web"* — anonymous, generic, no credential positioning.

**My specifications:**
- Label: `Hi, I'm`
- H1: `Oluwadamilola Dolapo.` with typewriter animation on load
- Tagline: `Backend Developer & Generative AI Engineer` in cyan accent
- Sub-description: production-grade systems, ASP.NET Core 9, Anthropic API
- Credential pill badges: `CS Graduate` · `Claude API Developer` · `Anthropic AI Courses Graduate` · `Clean Architecture`
- Two CTAs: `See My Work` (primary filled) + `Get In Touch` (outlined)
- Animated cyan/violet gradient blobs in background
- react-helmet-async SEO meta tags

**On the tagline decision:** Originally considered the full string *"Backend Developer | Generative AI Engineer | Claude API Developer | Anthropic AI Courses Graduate"* for the hero. Decided against it — too long for a hero tagline. Kept it as `Backend Developer & Generative AI Engineer` in the hero. Full credentials moved to pill badges below the tagline. Best of both worlds — sharp hero, full credentials visible.

**What was built:**
- Typewriter effect animating name character by character
- Cursor blink effect that disappears after typing completes
- Sequential fade-up animations for tagline, description, badges, CTAs — all triggered after typing finishes
- Two radial gradient blobs (cyan top-left, violet bottom-right) with slow breathing animation
- Fully responsive with `clamp()` font sizing
- react-helmet-async meta title and description

✅ Hero rebuilt and committed

---

## 📬 Prompt C — About Section (Re-prompted with Specifications)

**Date:** April 3, 2026 · **Sent to:** Claude Code

**Why re-prompted:** Original bio was a generic full-stack developer template. Wrong skills (Docker). No mention of CS degree, Anthropic, AI-assisted development, or any personal identity.

**My specifications:**
- Two-column desktop layout (bio left, skills right), single column mobile
- Precise first-person bio: CS graduate → backend developer → expanding into AI-assisted development with Anthropic
- Download CV button (href `#`, placeholder)
- Circular profile photo placeholder with label
- Skills grid (13 technologies): C#, ASP.NET Core 9, EF Core, JWT Authentication, Clean Architecture, React 18, TypeScript, Vite, Tailwind CSS, REST APIs, PostgreSQL, Supabase, Git
- Experience & Interactions section with cyan left-border accent entries

**What was built:**
- Three-paragraph bio with key terms highlighted in `--text-primary`, AI track highlighted in `--accent-cyan`
- `btn-outline` Download CV button
- Circular placeholder with SVG user icon and `font-mono` "Photo coming soon" label
- 13 skill `.tag` pills
- Experience entries with `border-left: 2px solid var(--accent-cyan)`
- Three separate `useScrollReveal` refs for staggered scroll animation

✅ About rebuilt and committed

---

## 📬 Prompt D — Contact Section + Backend API Fix

**Date:** April 3, 2026 · **Sent to:** Claude Code
**Status:** ⚠️ Interrupted mid-session — Claude Code usage limit reached

**Why re-prompted:** Original contact form was missing the Subject field and had no inline validation. Backend pipeline unverified end-to-end.

**Specifications sent:**
- Four fields: Full Name, Email Address, Subject, Message
- Inline validation per field on blur with specific rules
- Success toast on submission, specific error messages on failure
- Loading spinner + disabled submit button during request
- Static email and LinkedIn placeholders below form
- Full backend verification: ContactController, SubmitContactHandler, ContactSubmissionRepository, Program.cs, FluentValidation

**Status:** Claude Code session was interrupted by usage limit mid-implementation. Will resume with continuation prompt on next session.

---

## 📝 Projects Section — Manually Updated

**Date:** April 3, 2026 · **Type:** Direct file edit (no prompt needed)

**File edited:** `frontend/src/data/projects.ts`

**What was wrong:** Claude's scaffold had "Project One" and "Project Two" placeholder cards with dummy content.

**What was replaced:** Four real projects added:

1. **Personal Portfolio** — this project, with AI-assisted development angle (description blending Option B personal tone with Option C engineering credentials)
2. **Clinical Task Management API** — pure C# backend, clean architecture, JWT, EF Core. Correctly represented as backend-only — no React/TypeScript tags added to misrepresent it.
3. **Fashion & Lifestyle v1** — full-stack, live on Vercel + Render, real demo link included
4. **QR Attendance API** — team contribution via pull request (conclase-cohort-8)

**Key decision:** Backend-only projects are valid portfolio items. Clinical Task Management API was not given frontend tags just to look more impressive. Honesty in representation matters.

✅ Projects personalised and committed

---

## 📝 Blog Article — In Progress

**Date:** April 3, 2026 · **Type:** Content work (claude.ai browser)

**Status:** Blog article about the VS Code and Claude Code setup experience has been drafted and is currently going through review and refinement iterations. Not yet published to the live site.

**What's done:**
- Initial draft generated using Prompt 12 (Blog Article Draft)
- Multiple review and edit passes completed
- Content being refined for accuracy, tone, and personal voice

**What's pending:**
- Final edit and approval
- Publishing to `frontend/src/content/posts/setting-up-vscode-and-claude-code.md`
- Confirming it renders correctly at `/blog/setting-up-vscode-and-claude-code`

---

## 📊 Build Progress — Current State (April 3, 2026)

| Phase | Status |
|---|---|
| Brainstorming & Prompt Planning | ✅ Complete |
| Environment Setup (CoWork + Git) | ✅ Complete |
| Stack Confirmation | ✅ Complete |
| Database & Hosting Decisions | ✅ Complete |
| Project Scaffold | ✅ Complete |
| Supabase Setup | ✅ Complete |
| appsettings.Development.json | ✅ Complete |
| .gitignore Verified | ✅ Complete |
| EF Core Packages Aligned (9.0.4) | ✅ Complete |
| DNS Fixed (Google DNS + Pooler URL) | ✅ Complete |
| EF Core Migration File Created | ✅ Complete |
| Database Tables Created (SQL Editor) | ✅ Complete |
| Node/esbuild Compatibility Fixed | ✅ Complete |
| Frontend Running Locally | ✅ Complete |
| Backend Running Locally | ✅ Complete |
| Global Design System | ✅ Complete |
| Hero Section — Rebuilt | ✅ Complete |
| About Section — Rebuilt | ✅ Complete |
| Projects Section — Personalised | ✅ Complete |
| Blog Section | ✅ Scaffolded (article pending) |
| Contact Section + Backend API | ⚠️ Interrupted — resuming |
| Database Integration End-to-End Test | ⏳ Pending |
| Blog Article Published on Site | ⏳ Pending |
| Deployment (Vercel + Render) | ⏳ Pending |
| /docs Folder Complete | 🔄 In Progress |
| LinkedIn Post Drafted | ⏳ Pending |
| 3-Slide Presentation | ⏳ Pending |

---

## 🧠 Key Lessons — Full List

1. A day of planning is not a day lost — it made the build day focused and deliberate.
2. Prompt engineering is a skill, not a shortcut — every prompt was drafted, challenged, and refined.
3. Knowing when to skip a prompt is judgment, not laziness — Prompts 2 and 3 were deliberately skipped.
4. Claude runs ahead if you don't constrain it — Prompt 4 proved this.
5. Knowing when to accept overreach is also a skill — evaluate against your standards before rolling back.
6. BIOS is the ground floor — Hyper-V and VTx are two separate things.
7. Project ID ≠ Project name in Supabase connection strings.
8. Protect credentials before the first commit — .gitignore first, always.
9. Interruptions don't erase progress — document the state and resume cleanly.
10. Cross-check Claude's output against ALL your existing repos — not just the most recent one.
11. When infrastructure tooling fails due to network conditions, understand the underlying SQL.
12. When a binary error occurs, update the package first before downgrading the runtime.
13. Backend-only projects are valid portfolio items — don't misrepresent a C# API as full-stack.
14. Always push back on Claude's initial output — Node v24 correction proved Claude's advice can be wrong.
15. Generic AI output is not acceptable for a portfolio that determines professional trajectory. Every section must be rebuilt with explicit personal specifications when Claude's default output is not good enough.
16. The hero tagline choice matters — a long credential string was evaluated and simplified. Full credentials were preserved as pill badges, keeping the hero sharp and the information complete.
17. Claude Code usage limits mid-session are a workflow reality — always save, commit, and document state before a session ends so resumption is seamless.

---

*Last updated: April 3, 2026 — Contact section interrupted mid-session. Resume with continuation prompt. Blog article in final review. Deployment pending.*
