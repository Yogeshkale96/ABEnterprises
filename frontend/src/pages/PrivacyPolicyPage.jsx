import { useEffect } from 'react'
import Container from '../components/common/Container.jsx'
import siteConfig from '../config/siteConfig.js'

const sections = [
  {
    title: 'Information We Collect',
    body: 'When you submit a contact, quote or AMC form we collect your name, email address, phone number, company name (optional) and the details of your enquiry. We also record technical metadata such as your IP address for spam prevention and security auditing.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use submitted information solely to respond to your enquiry, prepare quotes, deliver services and maintain our business relationship. We do not sell or rent your personal information to third parties.',
  },
  {
    title: 'Data Storage & Security',
    body: 'Enquiry data is stored in a secured MySQL database. Access is restricted to authorised staff. We apply industry-standard security practices including encrypted transport (HTTPS in production), parameterized queries and access controls.',
  },
  {
    title: 'Cookies',
    body: 'This website uses cookies only where required for administrative sessions. Public browsing does not require cookies. Admin authentication uses secure, HTTP-only cookies.',
  },
  {
    title: 'Your Rights',
    body: 'You may request access, correction or deletion of your personal data by contacting us at the email address listed on our Contact page.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this policy from time to time. The latest version will always be available on this page.',
  },
]

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | AB Enterprises Private Limited'
  }, [])

  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <Container className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-white/75">{siteConfig.company.legalName}</p>
        </Container>
      </section>
      <section className="bg-white py-14">
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-navy-900">{s.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
            <p className="border-t border-line pt-6 text-xs text-ink-soft">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
