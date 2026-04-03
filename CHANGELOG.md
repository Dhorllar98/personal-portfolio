# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — versions follow [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Initial monorepo scaffold — `frontend/` (React 18 + Vite + Tailwind) and `backend/` (ASP.NET Core 9, clean architecture)
- Five portfolio sections: Hero, About, Projects, Blog (markdown), Contact
- Contact form with Supabase-backed storage via EF Core
- JWT-protected admin panel to read contact submissions
- Full CORS policy and IP-based rate limiting on all API routes
- Swagger UI at `/swagger` in development
- `react-helmet-async` for basic SEO meta tags

---

## [1.0.0] — TBD

_First public release. Deployed to Vercel (frontend) + Render (backend)._
