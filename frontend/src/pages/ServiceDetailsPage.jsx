import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import Button from '../components/common/Button.jsx'
import ServiceHero from '../components/services/ServiceHero.jsx'
import ServiceFeatureGrid from '../components/services/ServiceFeatureGrid.jsx'
import ServiceProcess from '../components/services/ServiceProcess.jsx'
import ServiceFAQ from '../components/services/ServiceFAQ.jsx'
import RelatedServices from '../components/services/RelatedServices.jsx'
import ServiceCTA from '../components/services/ServiceCTA.jsx'
import ServiceBackdrop from '../components/services/ServiceBackdrop.jsx'
import { DynamicIcon } from '../components/cards/ServiceCard.jsx'
import { svcGallery } from '../data/serviceGallery.js'
import { svcTheme } from '../data/serviceThemes.js'
import { svcExtras } from '../data/serviceExtras.js'
import { setPageMeta } from '../utils/seo.js'
import serviceService from '../services/serviceService.js'
import { SERVICE_DETAILS, quoteUrl, svcVariant } from '../data/servicesData.js'

export default function ServiceDetailsPage() {
  const { slug } = useParams()
  const local = SERVICE_DETAILS[slug]
  const [apiService, setApiService] = useState(null)
  const [status, setStatus] = useState(local ? 'local' : 'loading')

  // Render-time reset when the slug param changes (React-recommended
  // alternative to setState inside effects).
  const [prevSlug, setPrevSlug] = useState(slug)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    setApiService(null)
    setStatus(local ? 'local' : 'loading')
  }

  useEffect(() => {
    let cancelled = false
    serviceService
      .getBySlug(slug)
      .then((data) => {
        if (!cancelled) {
          setApiService(data)
          setStatus('ok')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus(local ? 'local' : 'error')
      })
    return () => {
      cancelled = true
    }
  }, [slug, local])

  const name = apiService?.name || local?.name
  useEffect(() => {
    if (name) {
      setPageMeta(
        `${name} | AB Enterprises Private Limited`,
        apiService?.short_description || local?.description
      )
    }
  }, [name, apiService, local])

  /* ---- Not found ---- */
  if (status === 'error') {
    return (
      <>
        <section className="bg-navy-900 py-14 text-white">
          <Container>
            <h1 className="text-3xl font-bold md:text-4xl">Service Not Found</h1>
          </Container>
        </section>
        <section className="bg-white py-16">
          <Container>
            <ErrorMessage message="This service could not be found. Browse all services or contact us with your requirement." />
            <Button to="/services" variant="primary" size="md" className="mt-6">
              Browse All Services
            </Button>
          </Container>
        </section>
      </>
    )
  }

  /* ---- Slim fallback for API-only services without local detail content ---- */
  if (!local) {
    return (
      <>
        <section className="bg-navy-900 py-12 text-white">
          <Container>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{name || 'Service'}</h1>
            {apiService?.category_name && (
              <p className="mt-2 text-sm font-medium text-cyan-400">{apiService.category_name}</p>
            )}
          </Container>
        </section>
        <section className="bg-white py-14">
          <Container>
            {status === 'loading' && (
              <div className="flex justify-center py-16">
                <LoadingSpinner />
              </div>
            )}
            {status === 'ok' && apiService && (
              <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <p className="text-lg leading-relaxed text-ink">{apiService.short_description}</p>
                  <div className="mt-6 whitespace-pre-line leading-relaxed text-ink-soft">
                    {apiService.description ||
                      'Contact us for a detailed scope, pricing and delivery timeline for this service.'}
                  </div>
                </div>
                <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
                  <h2 className="font-bold text-navy-900">Interested in this service?</h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    Get a free, no-obligation quote tailored to your requirement.
                  </p>
                  <Button
                    to={`/request-quote?service=${encodeURIComponent(apiService.name)}`}
                    variant="accent"
                    size="md"
                    className="mt-5 w-full"
                  >
                    Get a Free Quote
                  </Button>
                </aside>
              </div>
            )}
          </Container>
        </section>
      </>
    )
  }

  /* ---- Full rich detail page ---- */
  const d = local
  const quoteTo = quoteUrl(d.requirement)
  const variant = svcVariant(slug)
  const theme = svcTheme(slug)
  const gallery = svcGallery(slug)
  const extras = svcExtras(slug)

  return (
    <>
      <ServiceHero service={d} quoteTo={quoteTo} variant={variant} />

      {/* Introduction — editorial image split (About-page technique) */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="service-intro-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div
              className={`relative pb-8 sm:pr-6 lg:pr-0 ${
                variant === 1 ? 'lg:order-2 lg:pl-6' : 'pr-4'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute -top-4 h-24 w-24 rounded-2xl border-2 ${
                  variant === 1 ? '-right-4 border-accent-yellow/60' : '-left-4 border-cyan-400/50'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute top-4 z-10 h-3 w-3 rounded-full shadow ${
                  variant === 1 ? 'left-10 bg-cyan-400' : 'right-10 bg-accent-yellow'
                }`}
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card-hover">
                <img
                  src={gallery.overview}
                  alt={`${d.name} — supporting visual`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: variant === 2 ? 'center 30%' : 'center' }}
                  className="h-full w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/85 to-transparent" />
                <span className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.grad} text-white shadow-lg ring-4 ring-white/20`}>
                  <DynamicIcon name={d.offerings[0]?.icon} className="h-6 w-6" />
                </span>
              </div>
            </div>
            <div>
              <SectionHeading
                id="service-intro-heading"
                align="left"
                eyebrow="Overview"
                title={d.introHeading}
              />
              {d.intro.map((p) => (
                <p key={p.slice(0, 30)} className="mt-4 leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              {apiService?.description && (
                <p className="mt-4 leading-relaxed text-ink-soft">{apiService.description}</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Offerings */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="offerings-heading">
        <Container>
          <SectionHeading
            id="offerings-heading"
            eyebrow="What's Included"
            title={d.offeringsHeading}
            description="Deliverables depend on the agreed scope — here is what this service typically covers."
          />
          <ServiceFeatureGrid offerings={d.offerings} image={gallery.offerings} theme={theme} variant={variant} />
        </Container>
      </section>

      {/* Benefits + audiences — image-backed navy feature panel */}
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white lg:py-20" aria-labelledby="benefits-heading">
        <ServiceBackdrop src={gallery.benefits} theme={theme} tint="opacity-80" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(50% 55% at 80% 50%, rgba(56,189,248,0.12) 0%, transparent 70%)' }}
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                id="benefits-heading"
                align="left"
                dark
                eyebrow="Benefits"
                title={d.benefitsHeading}
              />
              <ul className="space-y-3.5">
                {d.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-card backdrop-blur-sm sm:p-7">
              <h3 className="font-extrabold text-white">Who This Service Is For</h3>
              <p className="mt-2 text-sm text-white/70">
                This service is commonly requested by:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.audiences.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Solutions for different requirements */}
      {extras && (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="requirements-heading">
          <Container>
            <SectionHeading
              id="requirements-heading"
              eyebrow="Solutions"
              title={extras.requirementsHeading}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {extras.requirements.map((r) => (
                <article
                  key={r.title}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${theme.bar}`} />
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${theme.soft}`}>
                    <DynamicIcon name={r.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-navy-900">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Process */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="service-process-heading">
        <Container>
          <SectionHeading
            id="service-process-heading"
            eyebrow="Process"
            title="How This"
            highlight="Service Works"
          />
          <ServiceProcess steps={d.process} />
        </Container>
      </section>

      {/* Why choose us */}
      {extras && (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="why-us-heading">
          <Container>
            <SectionHeading
              id="why-us-heading"
              eyebrow="Why Choose Us"
              title="What You Can"
              highlight="Expect From Us"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {extras.why.map((w) => (
                <article key={w.title} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-blue-500/50">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${theme.grad} text-white shadow-md`}>
                    <DynamicIcon name={w.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3.5 text-[15px] font-bold text-navy-900">{w.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{w.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="service-faq-heading">
        <Container className="max-w-2xl">
          <SectionHeading
            id="service-faq-heading"
            eyebrow="Questions"
            title="Frequently Asked"
            highlight="Questions"
          />
          <ServiceFAQ faqs={d.faqs} idPrefix={`faq-${slug}`} />
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="related-heading">
        <Container>
          <SectionHeading
            id="related-heading"
            eyebrow="Explore More"
            title="Related"
            highlight="Services"
          />
          <RelatedServices slugs={d.related} />
        </Container>
      </section>

      {/* Inquiry CTA */}
      <ServiceCTA
        heading={d.ctaHeading}
        text={d.ctaText}
        image={gallery.cta}
        theme={theme}
        primaryTo={quoteTo}
        primaryLabel={d.primaryCta.label}
        secondaryTo="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  )
}
