import { useScrollReveal } from '../../hooks/useScrollReveal'

const reasons = [
  {
    num: '01',
    title: 'I read the problem first',
    body: 'Before any code is written, I understand the domain. Requirements get questioned, edge cases get surfaced, and the architecture decision gets made deliberately — not accidentally.',
  },
  {
    num: '02',
    title: 'Clean Architecture by default',
    body: 'Every project I touch is structured so you can swap a database, add a new API endpoint, or write a unit test without fighting the framework. Maintainability is not an afterthought.',
  },
  {
    num: '03',
    title: 'Full-stack, but opinionated',
    body: 'I\'m comfortable across the React/TypeScript frontend and ASP.NET Core backend. That means fewer handoff gaps — I can own a feature from DB schema to UI interaction.',
  },
  {
    num: '04',
    title: 'I ship, then improve',
    body: 'Perfectionism is a bottleneck. I get working software into production, gather real feedback, then iterate — with the confidence that clean internals make iteration cheap.',
  },
]

export default function WhyMe() {
  const headingRef = useScrollReveal()
  const introRef   = useScrollReveal<HTMLParagraphElement>()
  const cardsRef   = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="why-me"
      className="section-padding"
      style={{ background: '#f8f9fc', color: '#0a0a0f' }}
    >
      <div className="container-max">

        {/* Section label */}
        <div ref={headingRef} className="reveal flex items-center gap-4 mb-10">
          <span className="font-mono text-sm" style={{ color: '#00b8d9' }}>02.</span>
          <h2
            className="font-serif-display text-3xl"
            style={{ color: '#0a0a0f', fontStyle: 'italic' }}
          >
            Why work with me?
          </h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* Intro paragraph */}
        <p
          ref={introRef}
          className="reveal max-w-2xl text-base leading-relaxed mb-14"
          style={{ color: '#52526e' }}
        >
          Most developers can write code that works. Fewer can write code that{' '}
          <span style={{ color: '#0a0a0f', fontWeight: 600 }}>survives contact with reality</span>{' '}
          — changing requirements, new teammates, growing data volumes. That's the gap I obsess over.
        </p>

        {/* Reason cards */}
        <div
          ref={cardsRef}
          className="reveal-children reveal grid sm:grid-cols-2 gap-6"
        >
          {reasons.map(({ num, title, body }) => (
            <div
              key={num}
              className="rounded-xl p-6 transition-all duration-250"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 24px rgba(0,184,217,0.12), 0 2px 12px rgba(0,0,0,0.08)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,184,217,0.35)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.07)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              <span
                className="font-mono text-xs font-semibold mb-3 block"
                style={{ color: '#00b8d9' }}
              >
                {num}
              </span>
              <h3
                className="font-serif-display text-xl mb-3"
                style={{ color: '#0a0a0f' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#52526e' }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom pull-quote */}
        <blockquote
          className="mt-14 pl-5 font-serif-display text-xl leading-snug italic"
          style={{
            color: '#0a0a0f',
            borderLeft: '3px solid #00b8d9',
          }}
        >
          "Software that's easy to change is the only software worth building."
        </blockquote>

      </div>
    </section>
  )
}
