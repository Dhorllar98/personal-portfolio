import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../lib/api'
import type { ContactSubmission } from '../../types'

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading,     setLoading]     = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/admin'); return }

    adminApi.getSubmissions()
      .then((res) => setSubmissions(res.data))
      .catch(() => { localStorage.removeItem('admin_token'); navigate('/admin') })
      .finally(() => setLoading(false))
  }, [navigate])

  const markRead = async (id: string) => {
    await adminApi.markRead(id)
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRead: true } : s))
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  const unreadCount = submissions.filter(s => !s.isRead).length

  return (
    <main
      className="section-padding pt-24 min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-max">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase block mb-1"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Admin
            </span>
            <h1
              className="font-display text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact Submissions
            </h1>
            {!loading && submissions.length > 0 && (
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {unreadCount > 0
                  ? `${unreadCount} unread of ${submissions.length} total`
                  : `All ${submissions.length} read`}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-xs hover:underline mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Sign out
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <ul className="space-y-4">
            {[1, 2, 3].map(i => (
              <li key={i} className="card-glow p-5 animate-pulse">
                <div className="h-3 w-32 rounded mb-3" style={{ background: 'var(--bg-primary)' }} />
                <div className="h-4 w-1/2 rounded mb-2" style={{ background: 'var(--bg-primary)' }} />
                <div className="h-3 w-full rounded" style={{ background: 'var(--bg-primary)' }} />
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {!loading && submissions.length === 0 && (
          <p className="italic text-sm" style={{ color: 'var(--text-secondary)' }}>
            No submissions yet.
          </p>
        )}

        {/* Submission list */}
        {!loading && submissions.length > 0 && (
          <ul className="space-y-4">
            {submissions.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: 'var(--bg-card)',
                  border: s.isRead
                    ? '1px solid var(--border)'
                    : '1px solid rgba(0,212,255,0.30)',
                  boxShadow: s.isRead
                    ? 'none'
                    : '0 0 18px rgba(0,212,255,0.06)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">

                    {/* Unread badge */}
                    {!s.isRead && (
                      <span
                        className="inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest mb-2"
                        style={{
                          background: 'rgba(0,212,255,0.10)',
                          color: 'var(--accent-cyan)',
                          border: '1px solid rgba(0,212,255,0.25)',
                        }}
                      >
                        New
                      </span>
                    )}

                    {/* Sender info */}
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {s.name}
                    </p>
                    <a
                      href={`mailto:${s.email}`}
                      className="font-mono text-xs hover:underline"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      {s.email}
                    </a>
                    <time
                      className="block font-mono text-xs mt-0.5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {new Date(s.submittedAt).toLocaleString()}
                    </time>
                  </div>

                  {/* Mark read button */}
                  {!s.isRead && (
                    <button
                      onClick={() => markRead(s.id)}
                      className="shrink-0 font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                      style={{
                        border: '1px solid rgba(0,212,255,0.30)',
                        color: 'var(--accent-cyan)',
                        background: 'transparent',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,212,255,0.08)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                      }}
                    >
                      Mark read
                    </button>
                  )}
                </div>

                {/* Subject */}
                {s.subject && (
                  <p
                    className="mt-3 text-xs font-semibold font-mono uppercase tracking-wider"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Re: {s.subject}
                  </p>
                )}

                {/* Message */}
                <p
                  className="mt-2 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
