import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import BlogCard from '../cards/BlogCard.jsx'
import { ARTICLES } from '../../data/articles.js'

export default function BlogSection({ articles }) {
  const items = articles?.length ? articles : ARTICLES

  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="blog-heading">
      <Container>
        <SectionHeading
          eyebrow="Resources"
          title="Latest News &"
          highlight="IT Tips"
          description="Practical guides and updates to help you make better technology decisions."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((a) => (
            <BlogCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue-700 px-6 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
