export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
}

// ── Blog ─────────────────────────────────────────────────────────────────────

/** Matches the API response from GET /api/blog */
export interface BlogPost {
  slug:          string
  title:         string
  excerpt:       string
  tags:          string[]
  datePublished: string   // ISO date string e.g. "2026-04-08"
  status:        BlogPostStatus
}

/** Matches the API response from GET /api/blog/:slug */
export interface BlogPostDetail extends BlogPost {
  content:      string
  lastSyncedAt: string
}

export type BlogPostStatus = 'published' | 'draft'

export type BlogTab = 'all' | BlogPostStatus

// ── Contact ──────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name:    string
  email:   string
  subject: string
  message: string
}

export interface ContactSubmission {
  id:          string
  name:        string
  email:       string
  subject:     string
  message:     string
  submittedAt: string
  isRead:      boolean
}

// ── API utilities ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data:     T
  message?: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
