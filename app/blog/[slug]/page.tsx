import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ArticleProps {
  params: {
    slug: string
  }
}

const articlesDirectory = path.join(process.cwd(), 'articles')

function getArticleBySlug(slug: string) {
  const slugToFile: Record<string, string> = {
    'isochrone-map-complete-guide': '01-isochrone-map-complete-guide.md',
    'isodistance-map-guide': '02-isodistance-map-guide.md',
    'isoline-map-guide': '03-isoline-map-guide.md',
  }

  const fileName = slugToFile[slug]
  if (!fileName) return null

  const fullPath = path.join(articlesDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data,
    content,
    slug,
  }
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    keywords: article.frontmatter.keywords,
    authors: [{ name: article.frontmatter.author || 'IsoMap Team' }],
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export async function generateStaticParams() {
  return [
    { slug: 'isochrone-map-complete-guide' },
    { slug: 'isodistance-map-guide' },
    { slug: 'isoline-map-guide' },
  ]
}

export default function BlogPost({ params }: ArticleProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-primary hover:text-blue-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-block mb-8 text-primary hover:text-blue-700 font-medium"
        >
          ← Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <time
            dateTime={article.frontmatter.date}
            className="text-sm text-gray-600 font-medium"
          >
            {new Date(article.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-4">
            {article.frontmatter.title}
          </h1>
          <p className="text-xl text-gray-600">
            {article.frontmatter.description}
          </p>
        </header>

        {/* Article content */}
        <div className="prose prose-lg prose-blue max-w-none bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary hover:text-blue-700 underline font-medium"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700">
                  {children}
                </li>
              ),
              code: ({ className, children }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={`${className} block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}>
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => (
                <pre className="mb-4 rounded-lg overflow-hidden">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary bg-blue-50 pl-4 py-2 my-4 italic text-gray-700">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="bg-white divide-y divide-gray-200">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr>
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 text-sm text-gray-700">
                  {children}
                </td>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build with Isochrones?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Try IsoMap's isochrone API - 50% cheaper than Mapbox with the same quality.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/#demo"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Live Demo
            </Link>
            <Link
              href="/#pricing"
              className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* More articles */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="text-primary hover:text-blue-700 font-medium"
          >
            ← See all articles
          </Link>
        </div>
      </article>
    </div>
  )
}
