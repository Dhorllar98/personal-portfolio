import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const headingRef  = useScrollReveal()
  const featuredRef = useScrollReveal<HTMLDivElement>()
  const gridRef     = useScrollReveal<HTMLDivElement>()

  const [featured, ...rest] = projects

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">

        {/* Section label */}
        <div ref={headingRef} className="reveal flex items-center gap-4 mb-12">
          <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>02.</span>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Projects
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Featured project */}
        <div ref={featuredRef} className="reveal mb-8">
          <FeaturedCard project={featured} />
        </div>

        {/* Remaining projects grid */}
        <div ref={gridRef} className="reveal-children grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Dhorllar98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono transition-colors group"
            style={{ color: 'var(--accent-cyan)' }}
          >
            View all projects on GitHub
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Featured project card ─────────────────────────────────────────────── */
function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const hasDemoLink = project.demo && project.demo !== '#'

  return (
    <article
      className="relative rounded-2xl p-7 sm:p-9 overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(0,212,255,0.18)',
        boxShadow: '0 0 40px rgba(0,212,255,0.06), 0 16px 48px rgba(0,0,0,0.3)',
      }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(121,40,202,0.12) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.20)',
              color: 'var(--accent-cyan)',
            }}
          >
            Featured Project
          </span>
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository`}
                className="transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
            {hasDemoLink && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed max-w-2xl mb-5" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
