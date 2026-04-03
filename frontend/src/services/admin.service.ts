import { adminApi } from '../lib/api'

export const AdminService = {
  login: (password: string) => adminApi.login(password),
  getSubmissions: () => adminApi.getSubmissions(),
  markRead: (id: string) => adminApi.markRead(id),
}
