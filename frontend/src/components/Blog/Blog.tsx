import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types'
import { blogPosts } from './posts'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Blog() {
  const headingRef = useScrollReveal()
  const listRef    = useScrollReveal<HTMLUListElement>()
  const recent     = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <h2 ref={headingRef} className="reveal font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          <span className="font-mono text-base mr-2" style={{ color: 'var(--accent-cyan)' }}>03.</span>
          Blog
        </h2>
        <p className="mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Things I&apos;ve written about software, architecture, and things I&apos;ve learned.
        </p>

        {recent.length === 0 ? (
          <p className="italic text-sm" style={{ color: 'var(--text-secondary)' }}>No posts yet — check back soon.</p>
        ) : (
          <ul ref={listRef} className="reveal-children space-y-4">
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
      <Link to={`/blog/${post.slug}`} className="card-glow group block p-6">
        <time className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{post.date}</time>
        <h3 className="mt-1 font-display text-base font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {post.excerpt}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      </Link>
    </li>
  )
}
