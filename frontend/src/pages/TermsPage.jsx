import { useEffect } from 'react'
import {
  Copyright, FileCheck, FileText, Package, Scale, ShieldCheck,
} from 'lucide-react'
import Container from '../components/common/Container.jsx'
import PolicyAccordion from '../components/common/PolicyAccordion.jsx'
import siteConfig from '../config/siteConfig.js'

const sections = [
  {
    icon: FileCheck,
    title: 'Acceptance of Terms',
    body: 'By using this website you agree to these terms. If you do not agree, please discontinue use of the site.',
  },
  {
    icon: Package,
    title: 'Products & Services',
    body: 'Product listings, specifications and prices shown on this website are indicative and subject to change. Final pricing, availability and delivery timelines are confirmed in the quotation issued after your enquiry.',
  },
  {
    icon: FileText,
    title: 'Quotes & Orders',
    body: 'Submitting a quote request does not constitute a binding order. An order is confirmed only when both parties agree in writing and any applicable advance payment terms are met.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranties & Support',
    body: 'Hardware products carry the respective manufacturer warranty. Service-level terms for AMC and support engagements are defined in the relevant agreement or quotation.',
  },
  {
    icon: Scale,
    title: 'Limitation of Liability',
    body: 'AB Enterprises Private Limited is not liable for indirect, incidental or consequential damages arising from the use of this website or delays outside our reasonable control.',
  },
  {
    icon: Copyright,
    title: 'Intellectual Property',
    body: 'All website content, including the AB Enterprises logo and branding, is the property of AB Enterprises Private Limited unless otherwise noted. Manufacturer names and marks belong to their respective owners.',
  },
]

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | AB Enterprises Private Limited'
  }, [])

  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <Container className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Terms & Conditions</h1>
          <p className="mt-3 text-white/75">{siteConfig.company.legalName}</p>
        </Container>
      </section>
      <section className="bg-white py-12">
        <Container className="w-[92%] sm:w-3/4">
          <PolicyAccordion sections={sections} />
          <p className="mt-8 border-t border-line pt-6 text-xs text-ink-soft">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </Container>
      </section>
    </>
  )
}
