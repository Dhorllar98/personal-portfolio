export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
      <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Oluwadamilola Dolapo. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Dhorllar98"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
