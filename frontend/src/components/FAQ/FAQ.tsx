import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const faqs = [
  {
    q: 'What stack do you work with?',
    a: 'My primary stack is ASP.NET Core 9 (C#) on the backend with React + TypeScript on the frontend, structured using Clean Architecture. On the data side I use EF Core with PostgreSQL. I\'m comfortable picking up other stacks when the job calls for it — the principles transfer.',
  },
  {
    q: 'Are you open to full-time roles or freelance work?',
    a: 'Both. I\'m actively looking for full-time or contract positions where I can contribute to a team building meaningful products. If you have a project that needs a focused, reliable engineer, let\'s talk.',
  },
  {
    q: 'How do you approach a new codebase?',
    a: 'I start by reading — architecture diagrams, ADRs, domain models, existing tests. I want to understand the problem the code is solving before I touch anything. Then I find the seams: what\'s well-structured, what\'s brittle, and where the risk lives.',
  },
  {
    q: 'What does clean architecture mean to you in practice?',
    a: 'Concretely: domain logic that has zero framework dependencies, application layer that orchestrates use cases without knowing HTTP or databases, and infrastructure that can be swapped without touching business rules. It means tests run in milliseconds and new features don\'t require archaeological digs through the codebase.',
  },
  {
    q: 'How quickly can you get up to speed on a new project?',
    a: 'Fast — because I focus on the domain first, not the syntax. Give me a week with the codebase, existing team members to ask questions, and access to the issue tracker. I\'ll be shipping meaningful PRs in under two weeks.',
  },
  {
    q: 'What\'s your take on AI-assisted development?',
    a: 'I use AI as a force multiplier, not a replacement for thinking. It\'s excellent for boilerplate, rubber-ducking, and first drafts. But architectural decisions, system design, and code review still require human judgment — which is why I\'m investing in understanding both sides deeply.',
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b transition-colors duration-200"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span
          className="text-base font-medium leading-snug transition-colors"
          style={{ color: open ? 'var(--accent-cyan)' : 'var(--text-primary)' }}
        >
          {q}
        </span>
        <span
          className="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            border: '1px solid rgba(0,212,255,0.3)',
            color: 'var(--accent-cyan)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const headingRef = useScrollReveal()
  const bodyRef    = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-max">

        {/* Section label */}
        <div ref={headingRef} className="reveal flex items-center gap-4 mb-12">
          <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>05.</span>
          <h2 className="font-serif-display text-3xl italic" style={{ color: 'var(--text-primary)' }}>
            Common questions
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div ref={bodyRef} className="reveal max-w-2xl">
          {faqs.map(({ q, a }) => (
            <Item key={q} q={q} a={a} />
          ))}
        </div>

      </div>
    </section>
  )
}
