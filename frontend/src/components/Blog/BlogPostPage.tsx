import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Helmet } from 'react-helmet-async'
import type { BlogPostDetail } from '../../types'
import api from '../../lib/api'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()

  const [post,    setPost]    = useState<BlogPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    api.get<BlogPostDetail>(`/api/blog/${slug}`)
      .then(res => {
        if (!cancelled) {
          setPost(res.data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [slug])

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="section-padding pt-32 container-max">
        <div className="animate-pulse space-y-4 max-w-2xl">
          <div className="h-3 w-20 rounded" style={{ background: 'var(--bg-secondary)' }} />
          <div className="h-8 w-3/4 rounded" style={{ background: 'var(--bg-secondary)' }} />
          <div className="h-3 w-full rounded" style={{ background: 'var(--bg-secondary)' }} />
          <div className="h-3 w-5/6 rounded" style={{ background: 'var(--bg-secondary)' }} />
        </div>
      </main>
    )
  }

  // ── Not found ────────────────────────────────────────────────────────────────
  if (notFound || !post) {
    return (
      <main className="section-padding pt-32 container-max">
        <Helmet>
          <title>Post Not Found — Dhorllar Portfolio</title>
        </Helmet>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          That post doesn&apos;t exist or may have moved.
        </p>
        <Link
          to="/#blog"
          className="mt-4 inline-block font-mono text-sm hover:underline"
          style={{ color: 'var(--accent-cyan)' }}
        >
          ← Back to blog
        </Link>
      </main>
    )
  }

  const isDraft = post.status === 'draft'

  // ── Post ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>{post.title} — Dhorllar Portfolio</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <main className="section-padding pt-32 container-max">
        <Link
          to="/#blog"
          className="font-mono text-sm hover:underline"
          style={{ color: 'var(--accent-cyan)' }}
        >
          ← Back to blog
        </Link>

        <article className="mt-8 max-w-3xl">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <time className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                {post.datePublished}
              </time>
              {isDraft && (
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
                  style={{
                    background: 'rgba(121,40,202,0.15)',
                    color: 'var(--accent-violet)',
                    border: '1px solid var(--accent-violet)',
                  }}
                >
                  Draft
                </span>
              )}
            </div>

            <h1
              className="font-display text-3xl font-bold leading-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map(t => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            )}
          </header>

          {/* Markdown body */}
          <div
            className="prose prose-sm max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-code:font-mono prose-code:text-xs
              prose-a:underline
              dark:prose-invert"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-6 flex items-center justify-between border-t" style={{ borderColor: 'var(--border-color, rgba(255,255,255,0.08))' }}>
            <Link
              to="/#blog"
              className="font-mono text-sm hover:underline"
              style={{ color: 'var(--accent-cyan)' }}
            >
              ← Back to blog
            </Link>
            <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              Last synced: {new Date(post.lastSyncedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </footer>
        </article>
      </main>
    </>
  )
}
