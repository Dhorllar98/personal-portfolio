const skills = [
  'TypeScript', 'React', 'ASP.NET Core', 'C#',
  'EF Core', 'PostgreSQL', 'Tailwind CSS', 'Docker',
  'Clean Architecture', 'REST APIs', 'Git',
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          <span className="font-mono text-brand-600 dark:text-brand-400 text-lg mr-2">01.</span>
          About Me
        </h2>
        <div className="mt-8 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I&apos;m a full-stack developer who enjoys building well-structured, maintainable software.
              My main tools are React + TypeScript on the frontend and ASP.NET Core + C# on the backend,
              usually organised with clean architecture principles.
            </p>
            <p>
              I&apos;m drawn to the intersection of good software design and real-world usability —
              the belief that the right architecture makes a codebase easier to change, not harder.
            </p>
            <p>
              When I&apos;m not coding I&apos;m usually reading about distributed systems, contributing
              to open source, or writing about things I&apos;ve learned.
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Technologies I work with:</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="text-brand-500 select-none" aria-hidden>▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
