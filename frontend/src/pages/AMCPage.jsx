import { useEffect } from 'react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ServiceHero from '../components/services/ServiceHero.jsx'
import ServiceProcess from '../components/services/ServiceProcess.jsx'
import ServiceFAQ from '../components/services/ServiceFAQ.jsx'
import RelatedServices from '../components/services/RelatedServices.jsx'
import ServiceCTA from '../components/services/ServiceCTA.jsx'
import AMCPlanCard from '../components/services/AMCPlanCard.jsx'
import { DynamicIcon } from '../components/cards/ServiceCard.jsx'
import { setPageMeta } from '../utils/seo.js'
import { AMC_DATA, SVC_IMAGES } from '../data/servicesData.js'

const AMC_QUOTE_TO = '/request-quote?type=amc'

const DEF_ACCENTS = [
  'border-blue-600/30 bg-blue-700/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
  'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-navy-950',
  'border-accent-yellow/50 bg-accent-yellow/15 text-amber-600 group-hover:bg-accent-yellow group-hover:text-navy-950',
  'border-navy-700/30 bg-navy-900/10 text-navy-800 group-hover:bg-navy-900 group-hover:text-cyan-400',
]

export default function AMCPage() {
  useEffect(() => {
    setPageMeta(
      'AMC & Technical Support | AB Enterprises Private Limited',
      'Annual Maintenance Contracts for computers, laptops, networks and security systems — preventive care and ongoing support under a defined scope.'
    )
  }, [])

  const d = AMC_DATA
  const heroService = {
    name: 'AMC Support',
    eyebrow: d.eyebrow,
    heading: d.heading,
    headingHighlight: d.headingHighlight,
    description: d.description,
    image: d.image,
    imageAlt: d.imageAlt,
    highlights: d.highlights,
    primaryCta: d.primaryCta,
    secondaryCta: d.secondaryCta,
  }

  return (
    <>
      <ServiceHero service={heroService} quoteTo={AMC_QUOTE_TO} variant={2} />

      {/* What is an AMC */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="amc-intro-heading">
        <Container>
          <SectionHeading
            id="amc-intro-heading"
            eyebrow="Understanding AMC"
            title="What Is an"
            highlight="Annual Maintenance Contract?"
            description="An AMC defines an agreed period and scope of maintenance or support for specified equipment — clarity instead of ad-hoc breakdown calls."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.definitions.map(({ icon, title, text }, i) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-600/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
                />
                <span className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${DEF_ACCENTS[i % DEF_ACCENTS.length]}`}>
                  <DynamicIcon name={icon} className="h-5 w-5" />
                </span>
                <h3 className="relative mt-3 text-sm font-bold text-navy-900">{title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-line bg-surface-blue/50 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            Coverage depends entirely on the selected agreement — not every repair, component or
            emergency is automatically included. Scope and exclusions are confirmed in writing first.
          </p>
        </Container>
      </section>

      {/* Coverage categories */}
      <section className="relative overflow-hidden bg-surface py-16 lg:py-20" aria-labelledby="amc-coverage-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <Container className="relative">
          <SectionHeading
            id="amc-coverage-heading"
            eyebrow="Coverage"
            title="What an AMC"
            highlight="Can Cover"
            description="Coverage categories depend on the selected plan and the equipment assessed."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.coverage.map(({ icon, title, text }, i) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:shadow-card-hover"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl transition-transform duration-500 group-hover:scale-150"
                />
                <span className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${DEF_ACCENTS[i % DEF_ACCENTS.length]}`}>
                  <DynamicIcon name={icon} className="h-5 w-5" />
                </span>
                <h3 className="relative mt-3 text-sm font-bold text-navy-900">{title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Plans */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="amc-plans-heading">
        <Container>
          <SectionHeading
            id="amc-plans-heading"
            eyebrow="Plan Options"
            title="Choose a"
            highlight="Support Structure"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {d.plans.map((plan, i) => (
              <AMCPlanCard key={plan.name} plan={plan} quoteTo={AMC_QUOTE_TO} index={i} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-line bg-surface px-5 py-4 text-center text-sm leading-relaxed text-ink-soft">
            {d.plansNote}
          </p>
        </Container>
      </section>

      {/* Enrollment process */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="amc-process-heading">
        <Container>
          <SectionHeading
            id="amc-process-heading"
            eyebrow="Getting Started"
            title="How AMC"
            highlight="Enrollment Works"
          />
          <ServiceProcess steps={d.enrollment} />
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="amc-faq-heading">
        <Container className="max-w-2xl">
          <SectionHeading
            id="amc-faq-heading"
            eyebrow="Questions"
            title="AMC"
            highlight="FAQs"
          />
          <ServiceFAQ faqs={d.faqs} idPrefix="amc-faq" />
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="amc-related-heading">
        <Container>
          <SectionHeading
            id="amc-related-heading"
            eyebrow="Explore More"
            title="Related"
            highlight="Services"
          />
          <RelatedServices slugs={d.related} />
        </Container>
      </section>

      {/* CTA */}
      <ServiceCTA
        heading={d.ctaHeading}
        text={d.ctaText}
        image={SVC_IMAGES('amc-support.jpg')}
        primaryTo={AMC_QUOTE_TO}
        primaryLabel={d.primaryCta.label}
        secondaryTo="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  )
}
