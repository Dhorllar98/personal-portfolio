import { useState, useEffect, useRef } from 'react'
import type { ContactFormData, ApiError } from '../../types'
import { contactApi } from '../../lib/api'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// ── Types ────────────────────────────────────────────────────────────────────

type FieldName = keyof ContactFormData
type TouchedMap = Partial<Record<FieldName, boolean>>
type ErrorMap   = Partial<Record<FieldName, string>>

const EMPTY: ContactFormData = { name: '', email: '', subject: '', message: '' }
const MESSAGE_MAX = 1000

// ── Inline validation rules (mirrors backend FluentValidation) ───────────────

function validate(form: ContactFormData): ErrorMap {
  const e: ErrorMap = {}
  if (!form.name.trim())                   e.name    = 'Full name is required.'
  else if (form.name.trim().length < 2)    e.name    = 'Name must be at least 2 characters.'
  if (!form.email.trim())                  e.email   = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                           e.email   = 'A valid email address is required.'
  if (!form.subject.trim())                e.subject = 'Subject is required.'
  else if (form.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters.'
  if (!form.message.trim())                e.message = 'Message is required.'
  else if (form.message.trim().length < 10)e.message = 'Message must be at least 10 characters.'
  else if (form.message.length > MESSAGE_MAX)
                                           e.message = `Message cannot exceed ${MESSAGE_MAX} characters.`
  return e
}

// ── Toast ────────────────────────────────────────────────────────────────────

function Toast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        zIndex: 100,
        padding: '0.875rem 1.25rem',
        borderRadius: '0.75rem',
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,212,255,0.35)',
        boxShadow: '0 0 24px rgba(0,212,255,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        animation: 'heroFadeUp 0.3s ease-out forwards',
        maxWidth: '340px',
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '1.75rem', height: '1.75rem', borderRadius: '50%',
        background: 'rgba(0,212,255,0.12)', flexShrink: 0,
      }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{ color: 'var(--accent-cyan)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <div>
        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Message sent!
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          I&apos;ll get back to you soon.
        </p>
      </div>
      <button
        onClick={onDone}
        aria-label="Dismiss"
        className="ml-auto p-1 rounded transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// ── Field component ──────────────────────────────────────────────────────────

function Field({
  id, label, error, touched, children,
}: {
  id: string
  label: string
  error?: string
  touched?: boolean
  children: React.ReactNode
}) {
  const showError = touched && error
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium mb-1.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      {children}
      {showError && (
        <p className="mt-1 text-xs" style={{ color: '#f87171' }} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const [form,    setForm]    = useState<ContactFormData>(EMPTY)
  const [touched, setTouched] = useState<TouchedMap>({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError,   setApiError]   = useState<string | null>(null)
  const [apiFieldErrors, setApiFieldErrors] = useState<ErrorMap>({})
  const [showToast, setShowToast] = useState(false)
  const sectionRef = useScrollReveal()

  const errors = validate(form)
  // Merge client errors with any server field errors (server wins on overlap)
  const displayErrors: ErrorMap = { ...errors, ...apiFieldErrors }
  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear server field error for this field once user edits it
    if (apiFieldErrors[name as FieldName]) {
      setApiFieldErrors(prev => { const n = { ...prev }; delete n[name as FieldName]; return n })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Touch all fields so errors show
    setTouched({ name: true, email: true, subject: true, message: true })
    if (!isFormValid) return

    setSubmitting(true)
    setApiError(null)
    setApiFieldErrors({})

    try {
      await contactApi.submit(form)
      setForm(EMPTY)
      setTouched({})
      setShowToast(true)
    } catch (err) {
      const e = err as ApiError
      // If the server returned field-level errors, map them to our fields
      if (e.errors && Object.keys(e.errors).length > 0) {
        const mapped: ErrorMap = {}
        for (const [key, msgs] of Object.entries(e.errors)) {
          // FluentValidation key is PascalCase (e.g. "Name"), normalise to camelCase
          const camel = key.charAt(0).toLowerCase() + key.slice(1) as FieldName
          mapped[camel] = msgs[0]
        }
        setApiFieldErrors(mapped)
        setTouched({ name: true, email: true, subject: true, message: true })
      } else {
        setApiError(e.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {showToast && <Toast onDone={() => setShowToast(false)} />}

      <section
        id="contact"
        className="section-padding"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container-max max-w-2xl">

          <h2
            ref={sectionRef}
            className="reveal font-display text-2xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>04.</span>
            Get In Touch
          </h2>
          <p className="mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind or just want to say hello? Send me a message and I&apos;ll get back to you.
          </p>

          {/* ── Form ─────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Row: Full Name + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Full Name" error={displayErrors.name} touched={touched.name}>
                <input
                  id="name" name="name" type="text" autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Oluwadamilola Dolapo"
                  className="input-field"
                  style={touched.name && displayErrors.name
                    ? { borderColor: 'rgba(248,113,113,0.6)' } : {}}
                />
              </Field>

              <Field id="email" label="Email Address" error={displayErrors.email} touched={touched.email}>
                <input
                  id="email" name="email" type="email" autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className="input-field"
                  style={touched.email && displayErrors.email
                    ? { borderColor: 'rgba(248,113,113,0.6)' } : {}}
                />
              </Field>
            </div>

            {/* Subject */}
            <Field id="subject" label="Subject" error={displayErrors.subject} touched={touched.subject}>
              <input
                id="subject" name="subject" type="text"
                value={form.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Project enquiry, collaboration, or just hello"
                className="input-field"
                style={touched.subject && displayErrors.subject
                  ? { borderColor: 'rgba(248,113,113,0.6)' } : {}}
              />
            </Field>

            {/* Message + char counter */}
            <Field id="message" label="Message" error={displayErrors.message} touched={touched.message}>
              <div className="relative">
                <textarea
                  id="message" name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project, what you need, or anything else on your mind…"
                  className="input-field resize-none pb-7"
                  style={touched.message && displayErrors.message
                    ? { borderColor: 'rgba(248,113,113,0.6)' } : {}}
                />
                <span
                  className="absolute bottom-2.5 right-3 font-mono text-xs select-none"
                  style={{
                    color: form.message.length > MESSAGE_MAX * 0.9
                      ? '#f87171'
                      : 'var(--text-secondary)',
                  }}
                >
                  {form.message.length}/{MESSAGE_MAX}
                </span>
              </div>
            </Field>

            {/* API-level error (non-field) */}
            {apiError && (
              <p className="text-sm" style={{ color: '#f87171' }} role="alert">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              style={submitting ? { transform: 'none', boxShadow: 'none' } : {}}
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : 'Send Message'}
            </button>
          </form>

          {/* ── Contact alternatives ──────────────────────────────────────── */}
          <div
            className="mt-12 pt-8 grid sm:grid-cols-2 gap-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <a
              href="mailto:your-email@example.com"
              className="flex items-center gap-3 p-4 card-glow group"
              aria-label="Send me an email"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: 'var(--accent-cyan)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>Email</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  your-email@example.com
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 card-glow group"
              aria-label="Connect on LinkedIn"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                style={{ background: 'rgba(121,40,202,0.08)', border: '1px solid rgba(121,40,202,0.15)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"
                  style={{ color: 'var(--accent-violet)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <div>
                <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>LinkedIn</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  your-profile
                </p>
              </div>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
