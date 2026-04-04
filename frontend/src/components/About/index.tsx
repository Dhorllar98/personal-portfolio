import { useScrollReveal } from '../../hooks/useScrollReveal'

const skills = [
  'C#', 'ASP.NET Core 9', 'Entity Framework Core', 'JWT Authentication',
  'Clean Architecture', 'React 18', 'TypeScript', 'Vite',
  'Tailwind CSS', 'REST APIs', 'PostgreSQL', 'Supabase', 'Git',
]

const experiences = [
  {
    title: 'AI-Assisted Development Program',
    sub:   'Phase 1 — current',
  },
  {
    title: 'Anthropic API & Claude Code',
    sub:   null,
  },
  {
    title: 'QR Attendance API',
    sub:   'Team Contributor · conclase-cohort-8',
  },
  {
    title: 'Fashion & Lifestyle v1',
    sub:   'Full-stack · Vercel + Render',
  },
  {
    title: 'Clinical Task Management API',
    sub:   'Clean Architecture, JWT',
  },
]

export default function About() {
  const headingRef = useScrollReveal()
  const bioRef     = useScrollReveal()
  const rightRef   = useScrollReveal()

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">

        {/* Section heading */}
        <h2
          ref={headingRef}
          className="reveal font-display text-2xl font-bold mb-10"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>01.</span>
          About Me
        </h2>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left — Bio ───────────────────────────────────────── */}
          <div ref={bioRef} className="reveal space-y-5">
            <div className="space-y-4 text-sm leading-[1.85] " style={{ color: 'var(--text-secondary)' }}>
              <p>
                I&apos;m a Computer Science graduate and backend developer focused on building
                production-grade systems that are maintainable, well-structured, and deployed for
                real use. My primary stack is <span style={{ color: 'var(--text-primary)' }}>ASP.NET Core 9</span> and{' '}
                <span style={{ color: 'var(--text-primary)' }}>C#</span>, applied with clean
                architecture — Domain, Application, Infrastructure, and API layers — together with
                JWT authentication and Entity Framework Core.
              </p>
              <p>
                I&apos;m currently expanding into{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>Generative AI engineering</span>,
                building real-world applications with the Anthropic API and Claude Code as part of a
                structured AI-assisted development program. I care about the discipline of clean
                architecture as much as I care about the product it produces.
              </p>
              <p>
                I believe that how you structure a system is a decision with long-term consequences —
                and I take that seriously from day one.
              </p>
            </div>

            {/* Download CV */}
            <a
              href="#"
              className="btn-outline mt-2 w-fit"
              aria-label="Download CV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>

            {/* Profile photo placeholder */}
            <div className="mt-6 flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden style={{ color: 'var(--text-secondary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                Photo coming soon
              </span>
            </div>
          </div>

          {/* ── Right — Skills + Experience ──────────────────────── */}
          <div ref={rightRef} className="reveal space-y-8">

            {/* Skills */}
            <div>
              <p
                className="font-mono text-xs font-medium mb-4 tracking-widest uppercase"
                style={{ color: 'var(--accent-cyan)' }}
              >
                Technologies
              </p>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="tag">{skill}</li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div>
              <p
                className="font-mono text-xs font-medium mb-4 tracking-widest uppercase"
                style={{ color: 'var(--accent-cyan)' }}
              >
                Experience &amp; Interactions
              </p>
              <ul className="space-y-3">
                {experiences.map((exp) => (
                  <li
                    key={exp.title}
                    className="pl-4 py-2 text-sm"
                    style={{
                      borderLeft: '2px solid var(--accent-cyan)',
                    }}
                  >
                    <span
                      className="font-medium block leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {exp.title}
                    </span>
                    {exp.sub && (
                      <span
                        className="font-mono text-xs mt-0.5 block"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {exp.sub}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
