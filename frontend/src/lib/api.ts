import axios from 'axios'
import type { ContactFormData, ApiError } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
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
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data
    const status = error.response?.status

    // ASP.NET Core ValidationProblemDetails returns errors as { errors: { Field: ["msg"] } }
    // ProblemDetails returns { title, detail }
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
