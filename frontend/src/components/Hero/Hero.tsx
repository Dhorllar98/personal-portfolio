import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'

const ROLES = ['Full-Stack Developer', 'Backend Engineer', '.NET & React Specialist']

export default function Hero() {
  const roleRef   = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  /* Typewriter cycling through roles */
  useEffect(() => {
    let roleIdx   = 0
    let charIdx   = 0
    let deleting  = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = ROLES[roleIdx]
      if (!roleRef.current) return

      if (!deleting) {
        roleRef.current.textContent = current.slice(0, charIdx + 1)
        charIdx++
        if (charIdx === current.length) {
          deleting = true
          timer = setTimeout(tick, 1800)
          return
        }
      } else {
        roleRef.current.textContent = current.slice(0, charIdx - 1)
        charIdx--
        if (charIdx === 0) {
          deleting  = false
          roleIdx   = (roleIdx + 1) % ROLES.length
          timer = setTimeout(tick, 400)
          return
        }
      }
      timer = setTimeout(tick, deleting ? 45 : 80)
    }

    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>Dhorllar98 — Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer building with React, TypeScript, and ASP.NET Core. Open to opportunities." />
        <meta property="og:title" content="Dhorllar98 — Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer building with React, TypeScript, and ASP.NET Core." />
      </Helmet>

      <section
        id="hero"
        className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden"
        aria-label="Introduction"
      >
        {/* Background blobs */}
        <div className="hero-blob hero-blob-cyan"  aria-hidden />
        <div className="hero-blob hero-blob-violet" aria-hidden />
        <div className="hero-noise" aria-hidden />

        <div className="container-max w-full relative z-10">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.20)',
            }}
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
          <p className="font-mono text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', color: 'var(--text-primary)' }}>
            Oluwadamilola
            <br />
            <span className="gradient-text">Dolapo.</span>
          </h1>

          {/* Typewriter role */}
          <h2 className="font-display font-bold mt-3 leading-snug"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', color: 'var(--text-secondary)' }}>
            <span ref={roleRef} />
            <span ref={cursorRef} className="typewriter-cursor">|</span>
          </h2>

          {/* Bio */}
          <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I build production-grade software with{' '}
            <span style={{ color: 'var(--text-primary)' }}>clean architecture</span>,
            solid APIs, and interfaces that don't get in the way. Currently
            sharpening my edge with AI-assisted development.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View my work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Get in touch</a>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { value: '4+',    label: 'Projects shipped' },
              { value: '3+',    label: 'Years building' },
              { value: 'ASP.NET', label: 'Core specialist' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </p>
                <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ color: 'var(--text-secondary)' }}>
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>
    </>
  )
}
