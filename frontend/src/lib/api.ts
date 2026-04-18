import axios from 'axios'
import type { ContactFormData, ApiError } from '../types'

// Standard timeout for most requests
const DEFAULT_TIMEOUT = 15_000

// Extended timeout for the blog — Render free tier can take up to 60s on cold start
const BLOG_TIMEOUT = 65_000

// No baseURL — all paths are relative to the current origin.
// Dev:  Vite proxy in vite.config.ts forwards /api/* → localhost:5000
// Prod: Vercel rewrite in vercel.json forwards /api/* → Render backend
// This eliminates cross-origin requests entirely — no CORS config needed.
const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: DEFAULT_TIMEOUT,
})

// Attach JWT for admin routes and blog sync
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  const isProtected =
    config.url?.startsWith('/api/admin') ||
    config.url?.startsWith('/api/blog/sync')
  if (token && isProtected) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Give blog endpoints the extended cold-start timeout
  if (config.url?.startsWith('/api/blog')) {
    config.timeout = BLOG_TIMEOUT
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const data   = error.response?.data
    const status = error.response?.status

    // ASP.NET Core ValidationProblemDetails → { errors: { Field: ["msg"] } }
    // ProblemDetails                         → { title, detail }
    const apiError: ApiError = {
      message:
        status === 429
          ? 'Too many requests. Please wait a moment before trying again.'
          : data?.detail ?? data?.title ?? data?.message ?? 'An unexpected error occurred.',
      errors: data?.errors,
    }
    return Promise.reject(apiError)
  },
)

export const contactApi = {
  submit: (data: ContactFormData) =>
    api.post('/api/contact', data),
}

export const adminApi = {
  login: (password: string) =>
    api.post<{ token: string }>('/api/admin/login', { password }),

  getSubmissions: () =>
    api.get('/api/admin/submissions'),

  markRead: (id: string) =>
    api.patch(`/api/admin/submissions/${id}/read`),

  syncBlog: () =>
    api.post<{ message: string; synced: number; skipped: string[] }>('/api/blog/sync'),
}

export default api
