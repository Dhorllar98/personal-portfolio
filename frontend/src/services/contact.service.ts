import { contactApi } from '../lib/api'
import type { ContactFormData } from '../types'

export const ContactService = {
  submit: (data: ContactFormData) => contactApi.submit(data),
}
