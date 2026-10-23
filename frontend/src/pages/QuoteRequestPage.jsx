import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ClipboardList, Eye, FileCheck2, MessagesSquare, ShieldCheck, Layers, Cpu, Building2, Handshake } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import QuoteEnquiryForm from '../components/forms/QuoteEnquiryForm.jsx'
import ServiceFAQ from '../components/services/ServiceFAQ.jsx'
import { ClosingCta, InfoPanel, PageHero } from '../components/contact/ContactShared.jsx'
import { QUOTE_SERVICES } from '../utils/quoteValidation.js'

const STEPS = [
  { Icon: ClipboardList, title: 'Share your requirements', text: 'Tell us which product or service you need, with quantities and specifications.' },
  { Icon: Eye, title: 'We review your request', text: 'Our team reviews the requested products or services.' },
  { Icon: MessagesSquare, title: 'We clarify the details', text: 'We clarify specifications and availability where necessary.' },
  { Icon: FileCheck2, title: 'Quotation is prepared', text: 'A quotation is prepared according to the confirmed scope and commercial terms.' },
]

const REASONS = [
  { Icon: ClipboardList, title: 'Clear requirement gathering', text: 'A structured form helps us understand what you need from the start.' },
  { Icon: Layers, title: 'Relevant product and service options', text: 'Options are discussed in line with your request.' },
  { Icon: Cpu, title: 'Technical specification discussions', text: 'We talk through specifications before a quotation is prepared.' },
  { Icon: Building2, title: 'Business and institutional support', text: 'Requirements from businesses and institutions are welcome.' },
  { Icon: Handshake, title: 'Transparent communication', text: 'We keep communication clear about scope and commercial terms.' },
]

const QUOTE_FAQS = [
  { q: 'What details should I include in a quotation request?', a: 'Describe the product or service, quantities, key specifications, and any timeline. Add your contact details so our team can follow up.' },
  { q: 'Can I request multiple products?', a: 'Yes. List every product or service you need in the Requirement Details field.' },
  { q: 'Can I include product quantities and specifications?', a: 'Yes. Quantities, models and specifications help our team review your request accurately.' },
  { q: 'Can I request a quotation for IT services?', a: 'Yes. Select the relevant service, such as Website Development, Networking Solutions or AMC Support, and describe your scope.' },
  { q: 'Does submitting a request confirm an order?', a: 'No. Submitting the form is an enquiry only. It is not a confirmed order, purchase agreement, or final price commitment.' },
  { q: 'How will I receive a response?', a: 'Our team will contact you using the phone number or email you provide.' },
]

function resolveService(params) {
  if (params.get('type') === 'amc') return 'amc-support'
  const raw = (params.get('service') || '').trim().toLowerCase()
  if (!raw) return ''
  const hit = QUOTE_SERVICES.find((s) => s.value === raw || s.label.toLowerCase() === raw)
  return hit ? hit.value : ''
}

export default function QuoteRequestPage() {
  const [params] = useSearchParams()
  const defaultService = resolveService(params)

  useEffect(() => {
    document.title = 'Request a Quote | AB Enterprises Private Limited'
  }, [])

  return (
    <>
      <PageHero
        crumb="Request a Quote"
        eyebrow="Request a Quote"
        title="Tell Us What Your Business Needs"
        description="Share the product or service you require, relevant specifications, and quantities so our team can review your request and determine the appropriate next steps."
        ctaLabel="Start Your Quote Request"
        targetId="quote-form"
        image="quote-hero.jpg"
      />

      <section className="bg-surface py-12">
        <Container>
          <div className="grid items-stretch gap-0 overflow-hidden rounded-2xl shadow-card-hover md:grid-cols-5">
            <div className="md:col-span-2">
              <InfoPanel
                image="quote-panel.jpg"
                heading="Let's Discuss Your Requirement"
                description="Describe the products, services, quantities, specifications and timeline you have in mind, and our team will review your request."
              />
            </div>
            <div
              id="quote-form"
              tabIndex={-1}
              className="scroll-mt-28 bg-white p-6 focus:outline-none sm:p-8 md:col-span-3"
            >
              <QuoteEnquiryForm key={defaultService} defaultService={defaultService} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14" aria-labelledby="how-heading">
        <Container>
          <SectionHeading id="how-heading" eyebrow="Process" title="How It" highlight="Works" />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title} className="relative rounded-2xl border border-line bg-white p-6 text-center shadow-card">
                <span className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-accent-yellow text-xs font-extrabold text-navy-950">
                  {i + 1}
                </span>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-14" aria-labelledby="why-heading">
        <Container>
          <SectionHeading id="why-heading" eyebrow="Why Us" title="Why Request a Quote" highlight="From Us?" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700/10 text-blue-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <h3 className="text-sm font-bold text-navy-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{text}</p>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-2xl border border-dashed border-blue-600/30 bg-blue-700/5 p-5 text-sm text-ink-soft">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              Submitting a request is an enquiry and does not confirm an order.
            </li>
          </ul>
        </Container>
      </section>

      <section className="bg-white py-14" aria-labelledby="qfaq-heading">
        <Container>
          <SectionHeading id="qfaq-heading" eyebrow="FAQ" title="Quote" highlight="FAQs" />
          <ServiceFAQ faqs={QUOTE_FAQS} idPrefix="quote-faq" />
        </Container>
      </section>

      <ClosingCta
        heading="Need Help Defining Your Requirement?"
        description="Contact our team to discuss your products, services, or technology needs."
        primary={{ label: 'Contact Us', to: '/contact' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  )
}
