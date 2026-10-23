import { useEffect } from 'react'
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ContactEnquiryForm from '../components/forms/ContactEnquiryForm.jsx'
import ServiceFAQ from '../components/services/ServiceFAQ.jsx'
import {
  ClosingCta,
  ContactInfoCards,
  InfoPanel,
  PageHero,
} from '../components/contact/ContactShared.jsx'
import { directionsHref, mailHref, mapEmbedSrc, telHref } from '../components/contact/contactLinks.js'
import siteConfig from '../config/siteConfig.js'

const CONTACT_FAQS = [
  {
    q: 'What information should I include in my inquiry?',
    a: 'Tell us what you need, relevant specifications or quantities, and how to reach you. The more detail you share, the better our team can understand your requirement.',
  },
  {
    q: 'Can I ask about multiple products or services?',
    a: 'Yes. You can mention several products or services in a single enquiry, and our team will review each requirement.',
  },
  {
    q: 'How can I request a quotation?',
    a: 'Use our Request a Quote page to share the products or services you need, along with quantities and specifications.',
  },
  {
    q: 'Can I discuss institutional IT requirements?',
    a: 'Yes. We support institutional and business technology requirements. Share your needs through the form and our team will follow up.',
  },
  {
    q: 'How can I contact your team directly?',
    a: `You can call ${siteConfig.contact.phone}, message us on WhatsApp, or email ${siteConfig.contact.email}.`,
  },
]

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | AB Enterprises Private Limited'
  }, [])

  const { contact } = siteConfig

  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Get in Touch"
        title="Let's Talk About Your Technology Requirements"
        description="Have a question about our products, IT services, networking, security systems, or institutional technology requirements? Contact our team to discuss your needs and explore the appropriate solution."
        ctaLabel="Send an Inquiry"
        targetId="contact-form"
        image="contact-hero.jpg"
      />

      <ContactInfoCards />

      <section className="bg-surface pb-14">
        <Container>
          <div className="grid items-stretch gap-0 overflow-hidden rounded-2xl shadow-card-hover md:grid-cols-5">
            <div className="md:col-span-2">
              <InfoPanel
                image="contact-panel.jpg"
                heading="How Can We Help You?"
                description="Share your requirement with us. Whether you need IT support, a website, networking, security systems, or technology products, provide the details and our team can review your inquiry."
              />
            </div>
            <div
              id="contact-form"
              tabIndex={-1}
              className="scroll-mt-28 bg-white p-6 focus:outline-none sm:p-8 md:col-span-3"
            >
              <ContactEnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14" aria-labelledby="map-heading">
        <Container>
          <SectionHeading
            id="map-heading"
            eyebrow="Our Location"
            title="Find Our"
            highlight="Office"
            description="View our office location and plan your visit."
          />
          <div className="overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe
              title="AB Enterprises office location on Google Maps"
              src={mapEmbedSrc}
              className="aspect-[4/3] w-full border-0 sm:aspect-[16/7]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-col items-start justify-between gap-3 border-t border-line bg-white p-5 sm:flex-row sm:items-center">
              <p className="flex items-start gap-2.5 text-sm font-medium text-navy-900">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                {contact.address}
              </p>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
              >
                Get Directions <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14" aria-labelledby="office-heading">
        <Container>
          <SectionHeading id="office-heading" eyebrow="Visit or Call" title="Our" highlight="Office" />
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-7 shadow-card">
            <ul className="grid gap-5 sm:grid-cols-2">
              {[
                { Icon: MapPin, label: 'Address', value: contact.address },
                { Icon: Phone, label: 'Phone', value: contact.phone, href: telHref },
                { Icon: Mail, label: 'Email', value: contact.email, href: mailHref },
                { Icon: Clock, label: 'Working Hours', value: contact.hours },
              ].map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700/10 text-blue-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
                    {href ? (
                      <a href={href} className="break-words text-sm font-medium text-navy-900 hover:text-blue-700">{value}</a>
                    ) : (
                      <span className="text-sm font-medium text-navy-900">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
            >
              Get Directions <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14" aria-labelledby="faq-heading">
        <Container>
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Frequently Asked" highlight="Questions" />
          <ServiceFAQ faqs={CONTACT_FAQS} idPrefix="contact-faq" />
        </Container>
      </section>

      <ClosingCta
        heading="Have a Technology Requirement?"
        description="Tell us about your business needs and connect with our team to explore the right technology solution."
        primary={{ label: 'Request a Quote', to: '/request-quote' }}
        secondary={{ label: 'Back to Services', to: '/services' }}
      />
    </>
  )
}
