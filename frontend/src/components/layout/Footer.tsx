export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }} className="py-8">
      <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          &copy; {new Date().getFullYear()} Oluwadamilola Dolapo. Built with React + ASP.NET Core.
        </p>
        <a
          href="https://github.com/Dhorllar98"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
