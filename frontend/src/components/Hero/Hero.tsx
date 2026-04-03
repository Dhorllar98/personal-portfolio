import { Helmet } from 'react-helmet-async'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Hero() {
  const ref = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Oluwadamilola Dolapo — Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer building with React, TypeScript, and ASP.NET Core. Open to opportunities." />
        <meta property="og:title" content="Oluwadamilola Dolapo — Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer building with React, TypeScript, and ASP.NET Core." />
      </Helmet>

      <section
        id="hero"
        className="hero-gradient min-h-screen flex items-center section-padding pt-32"
        aria-label="Introduction"
      >
        <div ref={ref} className="reveal container-max w-full">
          <p className="font-mono text-sm mb-4" style={{ color: 'var(--accent-cyan)' }}>
            Hi, my name is
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            Oluwadamilola Dolapo.
          </h1>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 leading-tight" style={{ color: 'var(--text-secondary)' }}>
            I build things for the web.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Full-stack developer specialising in React, TypeScript, and ASP.NET Core.
            I care about clean architecture, developer experience, and shipping things that work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              See my work
            </a>
            <a href="#contact" className="btn-outline">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
