import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { BlogPost, BlogTab } from '../../types'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fetchBlogPosts } from '../../lib/supabase-blog'

// ── Tab configuration ─────────────────────────────────────────────────────────
// The public API only returns published posts, so the Drafts tab is omitted.

const TABS: { key: BlogTab; label: string }[] = [
  { key: 'all',       label: 'All Posts' },
  { key: 'published', label: 'Published' },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function Blog() {
  const headingRef = useScrollReveal()
  const listRef    = useScrollReveal<HTMLUListElement>()

  const [posts,     setPosts]     = useState<BlogPost[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<BlogTab>('all')

  useEffect(() => {
    let cancelled = false

    fetchBlogPosts()
      .then(data => {
        if (!cancelled) {
          setPosts(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load posts. Please try refreshing.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  const visible = posts.filter(p =>
    activeTab === 'all' ? true : p.status === activeTab
  )

  const counts = {
    all:       posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft:     posts.filter(p => p.status === 'draft').length,
  }

  return (
    <section id="blog" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">

        {/* Section heading */}
        <div ref={headingRef} className="reveal flex items-center gap-4 mb-12">
          <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>04.</span>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Blog
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg w-fit" style={{ background: 'var(--bg-primary)' }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                'relative px-4 py-1.5 rounded-md font-mono text-xs transition-all duration-200 flex items-center gap-2',
                activeTab === tab.key
                  ? 'font-semibold'
                  : 'hover:opacity-80',
              ].join(' ')}
              style={
                activeTab === tab.key
                  ? { background: 'var(--accent-cyan)', color: '#0a0a0f' }
                  : { color: 'var(--text-secondary)' }
              }
            >
              {tab.label}
              {!loading && (
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px]"
                  style={
                    activeTab === tab.key
                      ? { background: 'rgba(0,0,0,0.25)', color: '#0a0a0f' }
                      : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
                  }
                >
                  {counts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Post list */}
        {loading ? (
          <BlogSkeleton />
        ) : error ? (
          <p className="italic text-sm" style={{ color: 'var(--text-secondary)' }}>{error}</p>
        ) : visible.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <ul ref={listRef} className="reveal-children space-y-4">
            {visible.map(post => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// ── Blog card ─────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  const isDraft = post.status === 'draft'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card-glow group block p-6 relative"
      aria-label={`Read: ${post.title}${isDraft ? ' (Draft)' : ''}`}
    >
      {/* Draft badge */}
      {isDraft && (
        <span
          className="absolute top-4 right-4 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
          style={{ background: 'rgba(121,40,202,0.2)', color: 'var(--accent-violet)', border: '1px solid var(--accent-violet)' }}
        >
          Draft
        </span>
      )}

      <time className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
        {post.datePublished}
      </time>

      <h3
        className="mt-1 font-display text-base font-semibold transition-colors"
        style={{ color: 'var(--text-primary)' }}
      >
        {post.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {post.excerpt}
      </p>

      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map(t => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: BlogTab }) {
  const messages: Record<BlogTab, string> = {
    all:       'No posts yet — check back soon.',
    published: 'No published posts yet.',
    draft:     'No drafts in progress.',
  }
  return (
    <p className="italic text-sm" style={{ color: 'var(--text-secondary)' }}>
      {messages[tab]}
    </p>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function BlogSkeleton() {
  return (
    <ul className="space-y-4">
      {[1, 2, 3].map(i => (
        <li key={i} className="card-glow p-6 animate-pulse">
          <div className="h-3 w-24 rounded mb-3" style={{ background: 'var(--bg-primary)' }} />
          <div className="h-4 w-3/4 rounded mb-2" style={{ background: 'var(--bg-primary)' }} />
          <div className="h-3 w-full rounded mb-1" style={{ background: 'var(--bg-primary)' }} />
          <div className="h-3 w-5/6 rounded" style={{ background: 'var(--bg-primary)' }} />
        </li>
      ))}
    </ul>
  )
}
