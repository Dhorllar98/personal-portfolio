import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../lib/api'
import type { ApiError } from '../../types'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.login(password)
      localStorage.setItem('admin_token', res.data.token)
      navigate('/admin/submissions')
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-3 block"
            style={{ color: 'var(--accent-cyan)' }}
          >
            Admin
          </span>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Sign in
          </h1>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-xs" style={{ color: '#f87171' }} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={loading ? { transform: 'none', boxShadow: 'none' } : {}}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}
