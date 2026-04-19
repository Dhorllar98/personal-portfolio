import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found · Dhorllar</title>
      </Helmet>

      <main
        className="min-h-screen flex flex-col items-center justify-center section-padding text-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* Glitch number */}
        <p
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(6rem, 20vw, 10rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '2px var(--accent-cyan)',
            opacity: 0.18,
          }}
        >
          404
        </p>

        <div style={{ marginTop: '-2rem' }}>
          <h1
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              color: 'var(--text-primary)',
            }}
          >
            Page not found.
          </h1>

          <p
            className="mt-3 font-mono text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            The URL you followed doesn&apos;t exist or has moved.
            <br />
            No 500 errors here — just a wrong turn.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="font-mono text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{
                background: 'var(--accent-cyan)',
                color: '#0a0a0f',
                fontWeight: 600,
              }}
            >
              ← Back to home
            </Link>

            <Link
              to="/#blog"
              className="font-mono text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              Read the blog
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
