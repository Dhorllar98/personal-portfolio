import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null)

  /* Staggered reveal on mount */
  useEffect(() => {
    const els = lineRef.current?.querySelectorAll('.hero-line')
    if (!els) return
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('hero-line-visible'), 120 + i * 140)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Dhorllar98 — Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer building with React, TypeScript, and ASP.NET Core. Open to opportunities." />
      </Helmet>

      <section
        id="hero"
        className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden"
        style={{ background: '#080808' }}
        aria-label="Introduction"
      >
        {/* Background blobs */}
        <div className="hero-blob hero-blob-cyan"   aria-hidden />
        <div className="hero-blob hero-blob-violet"  aria-hidden />
        <div className="hero-noise"                  aria-hidden />

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent-cyan) 40%, var(--accent-violet) 70%, transparent 100%)' }}
          aria-hidden
        />

        <div ref={lineRef} className="container-max w-full relative z-10">

          {/* Status badge */}
          <div className="hero-line inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--accent-cyan)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: 'var(--accent-cyan)' }} />
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
              Available for opportunities
            </span>
          </div>

          {/* Greeting */}
          <p className="hero-line font-mono text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Hello, I'm Dolapo —
          </p>

          {/* Name — serif display */}
          <h1 className="hero-line font-serif-display leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: '#f0f0f0' }}>
            The engineer who <br />
            <em style={{ color: 'var(--accent-cyan)', fontStyle: 'italic' }}>thinks</em>{' '}
            before he builds.
          </h1>

          {/* Sub-statement */}
          <p className="hero-line mt-7 max-w-lg text-base leading-relaxed"
            style={{ color: 'rgba(180,180,200,0.75)' }}>
            Full-stack developer specialising in{' '}
            <span style={{ color: '#f0f0f0' }}>ASP.NET Core</span>,{' '}
            <span style={{ color: '#f0f0f0' }}>React</span>, and{' '}
            <span style={{ color: '#f0f0f0' }}>clean architecture</span>.
            I care about software that's easy to change — not just easy to ship.
          </p>

          {/* CTAs */}
          <div className="hero-line mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View my work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Get in touch</a>
          </div>

          {/* Stats */}
          <div className="hero-line mt-16 flex flex-wrap gap-10 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { value: '4+',     label: 'Projects shipped' },
              { value: '3+',     label: 'Years building' },
              { value: '.NET',   label: 'Core specialist' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif-display text-2xl" style={{ color: '#f0f0f0' }}>{value}</p>
                <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(180,180,200,0.5)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(180,180,200,0.4)' }}>
          <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        </div>
      </section>
    </>
  )
}
