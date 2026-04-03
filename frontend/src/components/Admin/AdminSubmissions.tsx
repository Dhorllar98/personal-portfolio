import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../lib/api'
import type { ContactSubmission } from '../../types'

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
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

  return (
    <main className="section-padding pt-24">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Submissions</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Sign out
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading…</p>}

        {!loading && submissions.length === 0 && (
          <p className="text-gray-500 italic">No submissions yet.</p>
        )}

        <ul className="space-y-4">
          {submissions.map((s) => (
            <li
              key={s.id}
              className={`rounded-xl border p-5 transition-colors ${
                s.isRead
                  ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950'
                  : 'border-brand-300 dark:border-brand-700 bg-brand-50 dark:bg-brand-950/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                  <a href={`mailto:${s.email}`} className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                    {s.email}
                  </a>
                  <time className="block font-mono text-xs text-gray-400 mt-1">
                    {new Date(s.submittedAt).toLocaleString()}
                  </time>
                </div>
                {!s.isRead && (
                  <button
                    onClick={() => markRead(s.id)}
                    className="shrink-0 text-xs text-brand-600 dark:text-brand-400 border border-brand-300 dark:border-brand-700 px-3 py-1 rounded-md hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{s.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
