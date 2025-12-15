import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IsoMap Blog - Guides on Isochrone Mapping & GIS APIs',
  description: 'Learn about isochrone maps, travel time analysis, and geospatial APIs with comprehensive guides, code examples, and real-world use cases.',
}

const articles = [
  {
    slug: 'isochrone-map-complete-guide',
    title: 'What is an Isochrone Map? Complete Guide for Developers [2025]',
    description: 'Learn how isochrone maps visualize travel time, with code examples, APIs, and real-world use cases for logistics, retail, and real estate applications.',
    date: '2025-12-15',
    readTime: '15 min read',
  },
  {
    slug: 'isodistance-map-guide',
    title: 'What is an Isodistance Map? Complete Guide for Developers [2025]',
    description: 'Master isodistance maps for network distance analysis. Includes algorithms, code examples, and real-world applications for logistics and GIS.',
    date: '2025-12-15',
    readTime: '12 min read',
  },
  {
    slug: 'isoline-map-guide',
    title: 'What is an Isoline Map? Complete Guide for Developers [2025]',
    description: 'Comprehensive guide to isoline maps (contour lines). Learn the fundamentals, types, algorithms, and implementations for geospatial analysis.',
    date: '2025-12-15',
    readTime: '10 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-block mb-8 text-primary hover:text-blue-700">
            ← Back to IsoMap
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            IsoMap Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about isochrone mapping, geospatial analysis, and GIS APIs with comprehensive guides written for developers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>

                <span className="inline-flex items-center text-primary font-semibold">
                  Read article
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
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
      </div>
    </div>
  )
}
