import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const NAME    = 'Oluwadamilola Dolapo.'
const BADGES  = ['CS Graduate', 'Claude API Developer', 'Anthropic AI Courses Graduate', 'Clean Architecture']
const TYPE_MS = 55   // ms per character
const START_DELAY = 400 // ms before typing begins

export default function Hero() {
  const [displayed,   setDisplayed]   = useState('')
  const [showCursor,  setShowCursor]  = useState(false)
  const [typingDone,  setTypingDone]  = useState(false)

  useEffect(() => {
    // Brief pause before typing starts so the "Hi, I'm" label fades in first
    const startTimer = setTimeout(() => {
      setShowCursor(true)
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(NAME.slice(0, i))
        if (i >= NAME.length) {
          clearInterval(interval)
          setTypingDone(true)
          setTimeout(() => setShowCursor(false), 1400)
        }
      }, TYPE_MS)
      return () => clearInterval(interval)
    }, START_DELAY)

    return () => clearTimeout(startTimer)
  }, [])

  // Delays in ms — sequential after typing finishes (~1.6s total)
  const afterType = START_DELAY + NAME.length * TYPE_MS

  return (
    <>
      <Helmet>
        <title>Oluwadamilola Dolapo — Backend Developer &amp; Generative AI Engineer</title>
        <meta
          name="description"
          content="I build production-grade systems with ASP.NET Core 9 and the Anthropic API — clean architecture, real deployments, no shortcuts."
        />
        <meta property="og:title"       content="Oluwadamilola Dolapo — Backend Developer & Generative AI Engineer" />
        <meta property="og:description" content="I build production-grade systems with ASP.NET Core 9 and the Anthropic API — clean architecture, real deployments, no shortcuts." />
      </Helmet>

      {/* Scoped keyframes — self-contained so this component owns its animations */}
      <style>{`
        @keyframes heroBlob1 {
          0%, 100% { transform: translate(0, 0)    scale(1);    opacity: 0.7; }
          33%       { transform: translate(60px, -40px) scale(1.08); opacity: 0.9; }
          66%       { transform: translate(-30px, 50px)  scale(0.95); opacity: 0.6; }
        }
        @keyframes heroBlob2 {
          0%, 100% { transform: translate(0, 0)     scale(1);    opacity: 0.6; }
          33%       { transform: translate(-50px, 40px) scale(0.92); opacity: 0.8; }
          66%       { transform: translate(40px, -50px) scale(1.06); opacity: 0.7; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden"
        aria-label="Introduction"
      >
        {/* Background blobs */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            width: 'clamp(400px, 55vw, 700px)',
            height: 'clamp(400px, 55vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)',
            filter: 'blur(48px)',
            top: '-12%', left: '-10%',
            animation: 'heroBlob1 14s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: 'clamp(350px, 45vw, 600px)',
            height: 'clamp(350px, 45vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(121,40,202,0.11) 0%, transparent 70%)',
            filter: 'blur(56px)',
            bottom: '-8%', right: '-8%',
            animation: 'heroBlob2 17s ease-in-out infinite',
          }} />
        </div>

        {/* Content */}
        <div className="container-max w-full relative" style={{ zIndex: 1 }}>

          {/* Label */}
          <p
            className="font-mono text-sm mb-4 opacity-0"
            style={{
              color: 'var(--accent-cyan)',
              animation: 'heroFadeUp 0.45s ease-out forwards',
              animationDelay: '100ms',
            }}
          >
            Hi, I&apos;m
          </p>

          {/* Name — typewriter */}
          <h1
            className="font-display font-bold leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              color: 'var(--text-primary)',
              minHeight: '1.2em',
            }}
          >
            {displayed}
            {showCursor && (
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.82em',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  background: 'var(--accent-cyan)',
                  borderRadius: '1px',
                  animation: 'blink 0.75s step-end infinite',
                }}
              />
            )}
          </h1>

          {/* Tagline */}
          <h2
            className="font-display font-semibold mt-3 opacity-0"
            style={{
              fontSize: 'clamp(1.1rem, 2.8vw, 1.65rem)',
              color: 'var(--accent-cyan)',
              animation: typingDone ? 'heroFadeUp 0.5s ease-out forwards' : 'none',
            }}
          >
            Backend Developer &amp; Generative AI Engineer
          </h2>

          {/* Sub-description */}
          <p
            className="mt-5 leading-relaxed opacity-0"
            style={{
              maxWidth: '540px',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              color: 'var(--text-secondary)',
              animation: typingDone ? 'heroFadeUp 0.5s ease-out 0.15s forwards' : 'none',
            }}
          >
            I build production-grade systems with ASP.NET Core 9 and the Anthropic API — clean architecture, real deployments, no shortcuts.
          </p>

          {/* Credential badges */}
          <ul
            className="mt-6 flex flex-wrap gap-2 opacity-0"
            style={{
              animation: typingDone ? 'heroFadeUp 0.5s ease-out 0.28s forwards' : 'none',
            }}
          >
            {BADGES.map((badge) => (
              <li key={badge} className="tag">{badge}</li>
            ))}
          </ul>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap gap-4 opacity-0"
            style={{
              animation: typingDone ? 'heroFadeUp 0.5s ease-out 0.42s forwards' : 'none',
            }}
          >
            <a href="#projects" className="btn-primary">
              See My Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
