# 📓 Prompt Log — Dhorllar98 Portfolio Build

> **Developer:** Olaniran Oluwadamilola (Dhorllar98)
> **Program:** AI-Assisted Development Program · Phase 1
> **Stack:** React 18 · TypeScript · Vite · Tailwind CSS · ASP.NET Core 9 · Supabase
> **Repo:** github.com/Dhorllar98/personal-portfolio
> **Started:** April 2, 2026 · **Due:** April 4, 2026

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

**Lesson:** Create the GitHub repository before running git push.

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
Turso specifically for this use case — I need something with a
generous free tier, simple setup with EF Core or direct HTTP API,
and that won't require significant infrastructure management. For
each option, tell me: how it integrates with ASP.NET Core, the
free tier limits, and any gotchas. Give me your final
recommendation with a clear reason. I will document your
suggestion and my own reasoning separately.
**Why skipped:**
My response to Prompt 1 already covered the database decision in full — I evaluated Supabase vs Neon, gave my reasoning, and made a firm decision within that same conversation. Sending this as a separate prompt would have produced no new information or decisions.

Sending a prompt you've already answered is not diligence — it's noise. Claude had complete context. Decision was made, documented, and locked.

**Decision recorded:** Supabase — time constraint. Neon documented as preferred long-term in README.

---

## 📬 Prompt 3 — Hosting Recommendation

**Date:** April 2, 2026
**Status:** ⏭️ Reviewed and intentionally skipped

**Prompt prepared:**
```
My fashion-and-lifestyle-v1 project is already deployed on Vercel
for the React frontend and Render for the ASP.NET Core backend —
I have a render.yaml in that repo. For this portfolio, I want to
follow the same pattern unless there's a strong reason not to.
Evaluate whether Vercel + Render is still the right combination
for this portfolio, or if there's a better option. Consider that
my backend is lightweight — it only needs to handle contact form
submissions. Tell me exactly what to change or keep, and why.
**Why skipped:**
Same reasoning as Prompt 2. My Prompt 1 response confirmed Vercel + Render as the hosting choice — consistent with fashion-and-lifestyle-v1, avoids cold starts, suits a lightweight backend. No new evaluation was needed.

After reviewing both Prompts 2 and 3, I confirmed neither would produce decisions beyond what Prompt 1 established. Moved directly to Prompt 4.

**Decision recorded:** Vercel (frontend) + Render (backend).

---

## 📬 Prompt 4 — Project Scaffold

**Date:** April 2, 2026 · **Sent to:** Claude Code (VS Code)

**Prompt sent:**
```
Scaffold the full monorepo structure for my portfolio project
inside the current folder. Use the same structure as my existing
projects:

- frontend/ — React 18, TypeScript, Vite, Tailwind CSS. Include
  tsconfig.json, vite.config.ts, tailwind.config.ts, .env.example,
  and a clean src/ folder with components/, pages/, services/,
  types/, and hooks/ subfolders.

- backend/ — ASP.NET Core 9 Web API in C#, clean architecture
  with four projects: Portfolio.Domain, Portfolio.Application,
  Portfolio.Infrastructure, Portfolio.Api. Include a .gitignore
  for .NET, appsettings.json with environment variable
  placeholders, and Swagger setup identical to my other APIs.

- Root level: .gitignore for Node and .NET, README.md,
  CHANGELOG.md, VERSION starting at 1.0.0.

Do not write any feature code yet. Just the scaffolding. Walk me
through every folder and file you create and explain its purpose.
**What Claude built:**

Root level:
| File | Purpose |
|---|---|
| README.md | Full architectural decision log |
| .gitignore | Node + .NET build artifacts and secrets |
| CHANGELOG.md | Keep-a-Changelog format |
| VERSION | Plain text 1.0.0 |

Frontend:
| Path | Purpose |
|---|---|
| vite.config.ts | Vite config + /api proxy to backend |
| tsconfig.json | Strict TypeScript, path alias @/* → src/* |
| tailwind.config.ts | Brand palette, Inter + JetBrains Mono |
| .env.example | VITE_API_BASE_URL placeholder |
| src/types/index.ts | Shared TypeScript interfaces |
| src/lib/api.ts | Axios client with JWT interceptor |
| src/components/Hero/ | Hero + react-helmet-async |
| src/components/About/ | About + skills list |
| src/components/Projects/ | Cards from src/data/projects.ts |
| src/components/Blog/ | Markdown blog + post pages |
| src/components/Contact/ | Form → POST /api/contact |
| src/components/Admin/ | JWT login + submissions list |
| src/pages/HomePage.tsx | Assembles all sections |
| src/App.tsx | React Router — /, /blog/:slug, /admin |

Backend:
| Path | Purpose |
|---|---|
| Portfolio.Domain/Entities/ContactSubmission.cs | Entity, private setters, factory method |
| Portfolio.Domain/Interfaces/IContactSubmissionRepository.cs | Repository interface |
| Portfolio.Application/Common/Result.cs | Result<T> pattern |
| Portfolio.Application/Contacts/Commands/ | SubmitContactHandler |
| Portfolio.Application/Contacts/Queries/ | GetSubmissionsHandler, MarkSubmissionReadHandler |
| Portfolio.Application/DependencyInjection.cs | Application DI registration |
| Portfolio.Infrastructure/Persistence/AppDbContext.cs | EF Core + Npgsql |
| Portfolio.Infrastructure/Persistence/ContactSubmissionRepository.cs | Repo implementation |
| Portfolio.Infrastructure/DependencyInjection.cs | Registers DbContext + repo |
| Portfolio.Api/Controllers/ContactController.cs | POST /api/contact (rate limited) |
| Portfolio.Api/Controllers/AdminController.cs | JWT-protected admin routes |
| Portfolio.Api/Program.cs | CORS, JWT, rate limiting, Swagger |
| Portfolio.Api/appsettings.json | Env var placeholders |
| Portfolio.Api/appsettings.Development.json.example | Local dev template |

**⚠️ Issue caught — Claude overstepped the brief:**
The prompt said *"Do not write any feature code yet."* Claude built the entire application in one run — handlers, controllers, repositories, EF Core context, full routing.

**My decision — accepted with verification:**
Given the Saturday deadline, rolling back would cost time without adding quality. Architecture was verified against my existing repos before accepting.

Verified:
- Clean architecture layers properly separated ✅
- Repository pattern matches clinical-task-management-api ✅
- JWT setup consistent with existing APIs ✅
- Rate limiting scoped to /api/contact ✅
- Swagger with Bearer JWT input box ✅
- DependencyInjection.cs per layer ✅

**Note — QR Attendance API patterns:**
The `qr-attendance-api` pull request contributions (conclase-cohort-8) should also be cross-referenced against this scaffold. That repo is organisation-private and could not be accessed during this session. A manual cross-check of Program.cs middleware pipeline order and exception handling middleware should be done in the next session to ensure patterns are consistent.

---

## 🔧 Environment Configuration — Supabase + JWT

**Date:** April 2, 2026 · **Type:** Manual configuration

**Step 1 — Supabase project created:**
- Project: portfolio-db
- Project ID: qwaisknldjzfjiswjgcn
- Schema confirmed empty — ready for migration

**Step 2 — Connection string built:**
```
Host=db.qwaisknldjzfjiswjgcn.supabase.co;
Database=postgres;Username=postgres;
Password=[REDACTED];Port=5432;
SSL Mode=Require;Trust Server Certificate=true
```
Common mistake caught: used project name instead of project ID initially. Corrected before saving.

**Step 3 — JWT key generated:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 48 | % {[char]$_})
**Step 4 — Config file finalised:**
Renamed `appsettings.Development.json.example` → `appsettings.Development.json`
Deleted the .example file after confirming real file was complete.

**Step 5 — .gitignore verified before any commit:**
```
backend/Portfolio.Api/appsettings.Development.json
backend/Portfolio.Api/appsettings.Production.json
```
✅ Credentials will never be pushed to GitHub.

---

## 🔧 EF Core Migration — Interrupted by Power Outage

**Date:** April 2, 2026 · **Status:** ⚠️ Incomplete

**Command attempted:**
```powershell
cd backend
dotnet ef migrations add InitialCreate --project Portfolio.Infrastructure --startup-project Portfolio.Api
**What happened:** Workstation lost power before migration completed.

**Current state:**
- appsettings.Development.json fully configured ✅
- Supabase database provisioned and waiting ✅
- Migration needs re-running next session ⏳
- ContactSubmissions table not yet created ⏳

**Resumption plan:**
```powershell
# 1. Re-run migration
cd backend
dotnet ef migrations add InitialCreate --project Portfolio.Infrastructure --startup-project Portfolio.Api

# 2. Apply to Supabase
dotnet ef database update --project Portfolio.Infrastructure --startup-project Portfolio.Api

# 3. Verify: Supabase → Database → Tables → ContactSubmissions exists

# 4. Start frontend
cd ../frontend && npm install && npm run dev
**Lesson:** Power outages are outside developer control. What matters is that all config work was completed and state was clearly documented. The migration is stateless and re-runs cleanly.

---

## 📊 Build Progress

| Phase | Status |
|---|---|
| Brainstorming & Prompt Planning | ✅ Complete |
| Environment Setup | ✅ Complete |
| Stack Confirmation | ✅ Complete |
| Database & Hosting Decisions | ✅ Complete |
| Project Scaffold | ✅ Complete |
| Supabase Setup | ✅ Complete |
| appsettings.Development.json | ✅ Complete |
| .gitignore Verified | ✅ Complete |
| EF Core Migration | ⚠️ Interrupted |
| Frontend Running Locally | ⏳ Pending |
| Design System | ⏳ Pending |
| Five Sections Built | ⏳ Pending |
| Database Integration Verified | ⏳ Pending |
| Blog Article Published | ⏳ Pending |
| Deployment (Vercel + Render) | ⏳ Pending |
| /docs Folder Complete | ⏳ Pending |
| LinkedIn Post Drafted | ⏳ Pending |
| 3-Slide Presentation | ⏳ Pending |

---

## 🧠 Key Lessons

1. A day of planning is not a day lost — it made the build day focused and deliberate.
2. Prompt engineering is a skill, not a shortcut — every prompt was drafted, challenged, and refined.
3. Knowing when to skip a prompt is judgment, not laziness — Prompts 2 and 3 were reviewed, found redundant, and deliberately skipped.
4. Claude runs ahead if you don't constrain it — Prompt 4 proved this.
5. Knowing when to accept overreach is also a skill — evaluate against your standards before rolling back.
6. BIOS is the ground floor — Hyper-V and VTx are two separate things.
7. Project ID ≠ Project name in Supabase connection strings.
8. Protect credentials before the first commit — .gitignore first, always.
9. Interruptions don't erase progress — document the state and resume cleanly.
10. Cross-check Claude's output against ALL your existing repos — not just the most recent one.

---

*Last updated: April 2, 2026 — Session ended due to power outage. Resume from EF Core migration.*
