# Hosting Platform Decision
**AI-Assisted Development Program · Phase 1 · Task 01**
**Developer:** Olaniran Oluwadamilola (Dhorllar98)

---

## What Claude Recommended

When asked for a hosting recommendation based on the stack (React/Vite frontend, ASP.NET Core 9 backend), Claude recommended splitting the deployment across two platforms:

- **Vercel** for the frontend: optimised for static site and SPA deployments, zero-configuration Vite support, automatic deployments on every GitHub push, global CDN, generous free tier.
- **Render** for the backend: supports Dockerised ASP.NET Core services, handles environment variables cleanly via dashboard, free tier available, straightforward deployment from a GitHub repo.

Claude also surfaced Netlify, Cloudflare Pages, and Railway as alternatives, with notes on their trade-offs (Cloudflare Pages integrates natively with D1 and Workers; Railway has simpler pricing but less documentation for .NET).

---

## My Evaluation

I evaluated the recommendation against three criteria:

1. **Compatibility with the stack.** Vercel has first-class support for Vite/React SPAs. The `vercel.json` rewrite rule handles React Router client-side routing with a single line of configuration. Render supports Docker-based ASP.NET Core deployments with environment variable injection that maps cleanly to .NET's `__` double-underscore config convention.

2. **Prior experience.** Both Vercel and Render are already in use on my `fashion-and-lifestyle-v1` project. Using familiar platforms under a one-week deadline reduced deployment risk.

3. **Free tier viability.** Both platforms offer functional free tiers for a portfolio. Render's free tier spins down after 15 minutes of inactivity (cold start penalty), which is an acceptable trade-off for a personal project.

---

## Decision

**Frontend: Vercel**
**Backend: Render**

The split-deployment pattern is appropriate here because the frontend and backend have independent deployment cadences and independent concerns. The frontend is a static build artifact. The backend is a long-running service. Coupling them on the same platform would add unnecessary complexity.

The main trade-off accepted is Render's free-tier cold start. This was mitigated in the frontend by increasing the blog API timeout to 65 seconds and surfacing a "server is waking up" message after 6 seconds of loading.
