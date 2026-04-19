/**
 * supabase-blog.ts
 *
 * Fetches blog data directly from Supabase's PostgREST API.
 * No library required — plain fetch with the public anon key.
 *
 * Why bypass the Render backend?
 *   Render free-tier cold starts take 30–60 s. Vercel's edge proxy cuts
 *   connections after ~10 s, producing a 504 before Render ever wakes up.
 *   Supabase is always on, so this path has zero cold-start latency.
 */

import type { BlogPost, BlogPostDetail } from '../types'

const SUPABASE_URL = 'https://qwaisknldjzfjiswjgcn.supabase.co'

// Prefer an env var so the key is not in the public repo.
// Add VITE_SUPABASE_ANON_KEY to your Vercel environment variables.
// The fallback keeps the blog working if the env var is not yet set.
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YWlza25sZGp6Zmppc3dqZ2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzg3MzMsImV4cCI6MjA5MDcxNDczM30.' +
  'NBzYRTXlaqoDXi6eVhqHhcGqMR2uXT5859lMT-ybfdA'

const BASE = `${SUPABASE_URL}/rest/v1/BlogPosts`

const HEADERS = {
  apikey:        SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

// ── Row shape returned by PostgREST (PascalCase, matches EF Core columns) ───

interface BlogRow {
  Slug:          string
  Title:         string
  Excerpt:       string
  Tags:          string   // comma-separated
  DatePublished: string   // "YYYY-MM-DD"
  Status:        string
  Content?:      string
  LastSyncedAt?: string
}

// ── Mappers ───────────────────────────────────────────────────────────────────

function rowToSummary(row: BlogRow): BlogPost {
  return {
    slug:          row.Slug,
    title:         row.Title,
    excerpt:       row.Excerpt,
    tags:          row.Tags
                     ? row.Tags.split(',').map(t => t.trim()).filter(Boolean)
                     : [],
    datePublished: row.DatePublished,
    status:        row.Status as BlogPost['status'],
  }
}

function rowToDetail(row: BlogRow): BlogPostDetail {
  return {
    ...rowToSummary(row),
    content:      row.Content      ?? '',
    lastSyncedAt: row.LastSyncedAt ?? new Date().toISOString(),
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Returns all published posts ordered newest-first. */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    Status: 'eq.published',
    select: 'Slug,Title,Excerpt,Tags,DatePublished,Status',
    order:  'DatePublished.desc',
  })

  const res = await fetch(`${BASE}?${params}`, { headers: HEADERS })
  if (!res.ok) throw new Error(`Supabase error ${res.status}`)

  const rows: BlogRow[] = await res.json()
  return rows.map(rowToSummary)
}

/** Returns the full content of a single post by slug. */
export async function fetchBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const params = new URLSearchParams({
    Slug:   `eq.${slug}`,
    select: 'Slug,Title,Excerpt,Tags,DatePublished,Status,Content,LastSyncedAt',
  })

  const res = await fetch(`${BASE}?${params}`, { headers: HEADERS })
  if (!res.ok) throw new Error(`Supabase error ${res.status}`)

  const rows: BlogRow[] = await res.json()
  return rows.length > 0 ? rowToDetail(rows[0]) : null
}
