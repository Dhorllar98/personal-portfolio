import { useScrollReveal } from '../../hooks/useScrollReveal'

const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['ASP.NET Core 9', 'C#', 'Clean Architecture', 'REST APIs'],
  },
  {
    label: 'Data & Infra',
    skills: ['EF Core', 'PostgreSQL', 'Supabase', 'Docker'],
  },
  {
    label: 'Tooling',
    skills: ['Git', 'GitHub', 'Render', 'Vercel'],
  },
]

export default function About() {
  const headingRef = useScrollReveal()
  const leftRef    = useScrollReveal<HTMLDivElement>()
  const rightRef   = useScrollReveal<HTMLDivElement>()

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">

        {/* Section label */}
        <div ref={headingRef} className="reveal flex items-center gap-4 mb-12">
          <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>01.</span>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            About Me
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left — bio */}
          <div ref={leftRef} className="reveal lg:col-span-3 space-y-5">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm a Computer Science graduate and backend developer focused on building
              production-grade systems that are maintainable, well-structured, and deployed
              for real use. My primary stack is{' '}
              <span style={{ color: 'var(--text-primary)' }}>ASP.NET Core 9 and C#</span>,
              applied with clean architecture{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                {'{ Domain, Application, Infrastructure, and API layers }'}
              </span>,
              together with{' '}
              <span style={{ color: 'var(--text-primary)' }}>JWT authentication</span> and{' '}
              <span style={{ color: 'var(--text-primary)' }}>Entity Framework Core</span>.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm currently expanding into Generative AI engineering, building real-world
              applications with the{' '}
              <span style={{ color: 'var(--text-primary)' }}>Anthropic API</span> and{' '}
              <span style={{ color: 'var(--text-primary)' }}>Claude Code</span> as part of
              a structured AI-assisted development program.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I care about the discipline of clean architecture as much as I care about
              the product it produces. I believe that how you structure a system is a
              decision with long-term consequences, and I take that seriously from day one.
            </p>

            {/* Quick facts */}
            <div className="pt-4 grid grid-cols-2 gap-3">
              {[
                { icon: '📍', text: 'Nigeria' },
                { icon: '🎓', text: 'AI-Assisted Dev Program' },
                { icon: '💼', text: 'Open to opportunities' },
                { icon: '⚡', text: 'Backend-first thinker' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — skill groups */}
          <div ref={rightRef} className="reveal lg:col-span-2 space-y-6">
            {skillGroups.map(({ label, skills }) => (
              <div key={label}>
                <p className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent-cyan)' }}>
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
