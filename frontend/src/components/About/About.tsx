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
              I'm a full-stack developer with a bias toward the backend — the kind who reads
              the architecture decision records before touching the code. My tools of choice are{' '}
              <span style={{ color: 'var(--text-primary)' }}>React + TypeScript</span> on the
              frontend and{' '}
              <span style={{ color: 'var(--text-primary)' }}>ASP.NET Core + C#</span> on
              the backend, structured with clean architecture so the codebase stays honest as it grows.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I care about the gap between "it works" and "it's maintainable" — reducing
              coupling, naming things properly, writing handlers you can test without spinning up
              a server. That attention to structure shows up in every project I ship.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Right now I'm deepening my work with AI-assisted development through a structured
              program — not just prompting faster, but understanding how to direct AI with
              intention and integrate it into real production workflows.
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
