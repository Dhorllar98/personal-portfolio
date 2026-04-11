// ─────────────────────────────────────────────────────────────────────────────
// This file is intentionally empty.
//
// Blog posts are no longer stored here as static data.
// All posts are fetched live from the backend API (GET /api/blog)
// which syncs content from the GitHub content repository via POST /api/blog/sync.
//
// To add a new post:
//   1. Create a .md file in your GitHub blog-content repository
//      with the following front-matter:
//
//      ---
//      title: My Post Title
//      date: 2026-04-08
//      excerpt: A short summary.
//      tags: C#, ASP.NET Core
//      status: published   ← or 'draft' for work-in-progress
//      ---
//
//   2. Push to GitHub.
//   3. Call POST /api/blog/sync (admin auth required) to pull changes into Supabase.
//
// ─────────────────────────────────────────────────────────────────────────────
