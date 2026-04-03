import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          <span className="font-mono text-brand-600 dark:text-brand-400 text-lg mr-2">02.</span>
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          A selection of things I&apos;ve built.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Dhorllar98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium"
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
