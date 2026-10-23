import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight, CalendarDays, Check, CheckCircle2, ChevronRight, Clock, ListOrdered,
  ListTree, User,
} from 'lucide-react'
import Container from '../components/common/Container.jsx'
import Button from '../components/common/Button.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import BlogCard from '../components/cards/BlogCard.jsx'
import { findArticle, relatedArticles } from '../data/articles.js'
import { formatDate } from '../utils/formatters.js'
import { setPageMeta } from '../utils/seo.js'

const sectionId = (i) => `section-${i}`

export default function ArticleDetailsPage() {
  const { slug } = useParams()
  const article = findArticle(slug)
  const related = relatedArticles(article, 3)

  useEffect(() => {
    if (article) {
      setPageMeta(
        `${article.title} | AB Enterprises Private Limited`,
        article.meta_description || article.excerpt
      )
    }
  }, [article])

  if (!article) {
    return (
      <section className="bg-white py-24">
        <Container>
          <ErrorMessage message="This article could not be found." />
          <div className="mt-6 text-center">
            <Button to="/articles" variant="outlineBlue" size="md">Back to Articles</Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pb-12 pt-10 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link to="/home" className="hover:text-cyan-400">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <Link to="/articles" className="hover:text-cyan-400">Latest News &amp; IT Tips</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="text-white">{article.title}</span>
          </nav>
          <div className="mt-6 max-w-3xl">
            <span className="inline-block rounded-full bg-cyan-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 ring-1 ring-cyan-400/40">
              {article.category}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              {article.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                {formatDate(article.published_at)}
              </span>
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {article.author}
                </span>
              )}
              {article.read_minutes && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {article.read_minutes} min read
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Body: article + sticky TOC sidebar */}
      <section className="bg-surface py-10 lg:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
            <article className="min-w-0">
              <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <img
                  src={article.image_url}
                  alt={article.image_alt || article.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              </figure>

              <div className="mt-8 max-w-3xl space-y-10">
                <p className="border-l-4 border-accent-yellow pl-4 text-base font-medium leading-relaxed text-ink sm:text-lg">
                  {article.intro}
                </p>

                {article.sections.map((s, i) => (
                  <section key={s.heading} id={sectionId(i)} className="scroll-mt-24">
                    <h2 className="flex items-baseline gap-3 text-xl font-bold text-navy-900 sm:text-2xl">
                      <span className="text-sm font-extrabold text-blue-700/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.heading}
                    </h2>
                    <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-ink sm:text-base">
                      {s.paragraphs?.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
                    </div>
                    {s.bullets?.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink sm:text-[15px]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.image && (
                      <figure className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
                        <img
                          src={`${import.meta.env.BASE_URL}images/${s.image}`}
                          alt={s.image_alt || s.heading}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover"
                        />
                        {s.image_caption && (
                          <figcaption className="px-4 py-2.5 text-xs text-ink-soft">
                            {s.image_caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </section>
                ))}

                {/* Key takeaways */}
                {article.takeaways?.length > 0 && (
                  <div className="rounded-2xl border border-blue-700/15 bg-surface-blue p-6">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900">
                      <CheckCircle2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
                      Key Takeaways
                    </h2>
                    <ul className="mt-3 space-y-2.5">
                      {article.takeaways.map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-sm text-ink sm:text-[15px]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practical recommendations */}
                {article.recommendations?.length > 0 && (
                  <div className="rounded-2xl bg-navy-900 p-6 text-white">
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                      <ListOrdered className="h-5 w-5 text-accent-yellow" aria-hidden="true" />
                      Practical Recommendations
                    </h2>
                    <ol className="mt-3 space-y-2.5">
                      {article.recommendations.map((r, i) => (
                        <li key={r} className="flex items-start gap-3 text-sm text-white/85 sm:text-[15px]">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-yellow text-[11px] font-bold text-navy-900">
                            {i + 1}
                          </span>
                          {r}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar: TOC + mini CTA */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900">
                  <ListTree className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  In This Article
                </h2>
                <ol className="mt-3 space-y-1">
                  {article.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a
                        href={`#${sectionId(i)}`}
                        className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-surface-blue hover:text-blue-700"
                      >
                        <span className="mt-0.5 text-[11px] font-bold text-blue-700/60">{i + 1}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-navy-900 to-blue-900 p-5 text-white">
                <p className="text-sm font-bold">Need IT Support?</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                  Talk to our team about hardware, networking, security or software for your business.
                </p>
                <Link
                  to="/request-quote"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent-yellow px-4 py-2.5 text-sm font-bold text-navy-900 transition-transform hover:scale-[1.02]"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-bold text-navy-900">Related Articles</h2>
              <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-500">
                View all articles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => <BlogCard key={a.slug} article={a} />)}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-950 py-12 text-center text-white">
        <Container>
          <h2 className="text-2xl font-extrabold">Discuss Your Technology Requirements</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            From computers and CCTV to networking and AMC — tell us what you need and we will prepare a quotation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/request-quote" variant="accent" size="lg">Request a Quote</Button>
            <Button to="/services" variant="outline" size="lg">Explore Our Services</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
