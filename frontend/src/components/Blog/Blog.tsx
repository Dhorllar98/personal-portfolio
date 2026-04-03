import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types'

// In a real build pipeline you'd import these via ?raw + front-matter parsing.
// For now, posts are registered here manually.
import { blogPosts } from './posts'

export default function Blog() {
  const recent = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          <span className="font-mono text-brand-600 dark:text-brand-400 text-lg mr-2">03.</span>
          Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Things I&apos;ve written about software, architecture, and things I&apos;ve learned.
        </p>

        {recent.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No posts yet — check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {recent.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        to={`/blog/${post.slug}`}
        className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
      >
        <time className="font-mono text-xs text-gray-400 dark:text-gray-500">{post.date}</time>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="font-mono text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
              {t}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  )
}
