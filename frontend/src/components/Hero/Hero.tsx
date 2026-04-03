import { Helmet } from 'react-helmet-async'

export default function Hero() {
  return (
    <>
      <Helmet>
        <title>Oluwadamilola Dolapo — Full-Stack Developer</title>
        <meta
          name="description"
          content="Full-stack developer building with React, TypeScript, and ASP.NET Core. Open to opportunities."
        />
        <meta property="og:title" content="Oluwadamilola Dolapo — Full-Stack Developer" />
        <meta
          property="og:description"
          content="Full-stack developer building with React, TypeScript, and ASP.NET Core."
        />
      </Helmet>

      <section
        id="hero"
        className="min-h-screen flex items-center section-padding pt-32"
        aria-label="Introduction"
      >
        <div className="container-max w-full animate-slide-up">
          <p className="font-mono text-brand-600 dark:text-brand-400 text-sm mb-4">
            Hi, my name is
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Oluwadamilola Dolapo.
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-500 dark:text-gray-400 mt-2 leading-tight">
            I build things for the web.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Full-stack developer specialising in React, TypeScript, and ASP.NET Core.
            I care about clean architecture, developer experience, and shipping things that work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400 font-medium hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
