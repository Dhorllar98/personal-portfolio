import { useScrollReveal } from '../../hooks/useScrollReveal'

const skills = [
  'TypeScript', 'React', 'ASP.NET Core', 'C#',
  'EF Core', 'PostgreSQL', 'Tailwind CSS', 'Docker',
  'Clean Architecture', 'REST APIs', 'Git',
]

export default function About() {
  const headingRef = useScrollReveal()
  const contentRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <h2 ref={headingRef} className="reveal font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>01.</span>
          About Me
        </h2>

        <div ref={contentRef} className="reveal mt-8 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-4 leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I&apos;m a full-stack developer who enjoys building well-structured, maintainable software.
              My main tools are React + TypeScript on the frontend and ASP.NET Core + C# on the backend,
              usually organised with clean architecture principles.
            </p>
            <p>
              I&apos;m drawn to the intersection of good software design and real-world usability —
              the belief that the right architecture makes a codebase easier to change, not harder.
            </p>
            <p>
              When I&apos;m not coding I&apos;m usually reading about distributed systems, contributing
              to open source, or writing about things I&apos;ve learned.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
              Technologies I work with:
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-xs select-none" style={{ color: 'var(--accent-cyan)' }} aria-hidden>▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
