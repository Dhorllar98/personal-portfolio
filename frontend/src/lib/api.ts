import axios from 'axios'
import type { ContactFormData, ApiError } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token && config.url?.startsWith('/api/admin')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? 'An unexpected error occurred.',
      errors: error.response?.data?.errors,
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
}

export default api
