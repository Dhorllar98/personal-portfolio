import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

const links = [
  { num: '01', label: 'About',    href: '#about' },
  { num: '02', label: 'Projects', href: '#projects' },
  { num: '03', label: 'Blog',     href: '#blog' },
  { num: '04', label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-1.5" onClick={close}>
            <span className="font-mono font-bold text-sm" style={{ color: 'var(--accent-cyan)' }}>
              dhorllar
            </span>
            <span className="font-mono font-bold text-sm" style={{ color: 'var(--text-secondary)' }}>
              98
            </span>
            <span className="font-mono text-sm" style={{ color: 'var(--accent-violet)' }}>
              .com
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group flex items-baseline gap-1 text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span className="font-mono text-[10px]" style={{ color: 'var(--accent-cyan)' }}>
                      {l.num}.
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-1.5 rounded-md transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Dhorllar98"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200"
              style={{ border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,212,255,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
            >
              GitHub
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
            <button
              className="p-1.5 rounded-md"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Slide-out drawer ──────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className="fixed inset-0 z-[60] transition-opacity duration-300 md:hidden"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
        }}
      />

      {/* Panel */}
      <aside
        aria-label="Site navigation"
        className="fixed top-0 right-0 bottom-0 z-[70] w-72 flex flex-col md:hidden transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)]"
        style={{
          background: '#0a0a0f',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-6 h-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            NAVIGATION
          </span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="p-1.5 rounded-md transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-6 pt-8 space-y-1">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={close}
              className="flex items-baseline gap-3 py-3 text-lg transition-colors group"
              style={{
                color: 'rgba(228,228,240,0.65)',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(228,228,240,0.65)')}
            >
              <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
                {l.num}.
              </span>
              <span className="font-serif-display">{l.label}</span>
            </a>
          ))}
        </nav>

        {/* Panel footer */}
        <div
          className="px-6 py-8 space-y-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a
            href="https://github.com/Dhorllar98"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono transition-colors"
            style={{ color: 'var(--accent-cyan)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
            GitHub
          </a>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            dhorllar98@gmail.com
          </p>
        </div>
      </aside>
    </>
  )
}
