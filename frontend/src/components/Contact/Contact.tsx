import { useState } from 'react'
import type { ContactFormData, ApiError } from '../../types'
import { contactApi } from '../../lib/api'
import { useScrollReveal } from '../../hooks/useScrollReveal'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [form, setForm]     = useState<ContactFormData>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const ref = useScrollReveal<HTMLFormElement>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      await contactApi.submit(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setErrorMsg((err as ApiError).message)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max max-w-2xl">
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>04.</span>
          Get In Touch
        </h2>
        <p className="mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Have a project in mind or just want to say hello? Send me a message and I&apos;ll get back to you.
        </p>

        {status === 'success' ? (
          <div className="card-glow p-6" style={{ borderColor: 'rgba(0,212,255,0.3)' }}>
            <p className="font-semibold" style={{ color: 'var(--accent-cyan)' }}>Message sent!</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Thanks for reaching out — I&apos;ll be in touch soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm transition-colors"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form ref={ref} onSubmit={handleSubmit} noValidate className="reveal space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Name
              </label>
              <input
                id="name" name="name" type="text" required
                value={form.name} onChange={handleChange}
                placeholder="Jane Doe"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <input
                id="email" name="email" type="email" required
                value={form.email} onChange={handleChange}
                placeholder="jane@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Message
              </label>
              <textarea
                id="message" name="message" required rows={5}
                value={form.message} onChange={handleChange}
                placeholder="Your message..."
                className="input-field resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm" style={{ color: '#f87171' }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
