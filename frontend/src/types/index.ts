export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  isRead: boolean
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
