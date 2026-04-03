import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Helmet } from 'react-helmet-async'
import { blogPosts } from './posts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="section-padding pt-32 container-max">
        <p className="text-gray-500">Post not found.</p>
        <Link to="/" className="mt-4 inline-block text-brand-600 dark:text-brand-400 hover:underline">
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Dhorllar Portfolio</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <main className="section-padding pt-32 container-max">
        <Link to="/#blog" className="font-mono text-sm text-brand-600 dark:text-brand-400 hover:underline">
          ← Back to blog
        </Link>

        <article className="mt-8 prose prose-gray dark:prose-invert max-w-none">
          <header className="not-prose mb-8">
            <time className="font-mono text-xs text-gray-400">{post.date}</time>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t} className="font-mono text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
                  {t}
                </li>
              ))}
            </ul>
          </header>

          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
      </main>
    </>
  )
}
