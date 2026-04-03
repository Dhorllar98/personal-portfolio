import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const headingRef = useScrollReveal()
  const gridRef    = useScrollReveal<HTMLDivElement>()

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <h2 ref={headingRef} className="reveal font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>02.</span>
          Projects
        </h2>
        <p className="mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
          A selection of things I&apos;ve built.
        </p>

        <div ref={gridRef} className="reveal-children grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Dhorllar98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--accent-cyan)' }}
          >
            See more on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
