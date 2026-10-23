import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import apiClient from '../services/apiClient.js'
import Container from '../components/common/Container.jsx'
import Button from '../components/common/Button.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import { DynamicIcon } from '../components/cards/ServiceCard.jsx'
import { FALLBACK_INDUSTRIES } from '../data/content.js'

export default function IndustryDetailsPage() {
  const { slug } = useParams()
  const [industry, setIndustry] = useState(null)
  const [status, setStatus] = useState('loading')

  // Render-time adjustment when the slug param changes.
  const [prevSlug, setPrevSlug] = useState(slug)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    setStatus('loading')
  }

  useEffect(() => {
    let cancelled = false
    apiClient
      .get(`/industries/${slug}`)
      .then((r) => {
        if (!cancelled) {
          setIndustry(r.data)
          setStatus('ok')
        }
      })
      .catch(() => {
        const fallback = FALLBACK_INDUSTRIES.find((i) => i.slug === slug)
        if (cancelled) return
        setIndustry(fallback || null)
        setStatus(fallback ? 'ok' : 'error')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (industry) document.title = `${industry.name} Solutions | AB Enterprises Private Limited`
  }, [industry])

  return (
    <>
      <section className="bg-navy-900 py-12 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/60">
            <Link to="/home" className="hover:text-cyan-400">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to="/industries" className="hover:text-cyan-400">Industries</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white">{industry?.name || '…'}</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            IT Solutions for {industry?.name || 'Your Industry'}
          </h1>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          {status === 'loading' && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
          {status === 'error' && <ErrorMessage message="This industry page could not be found." />}
          {status === 'ok' && industry && (
            <div className="mx-auto max-w-3xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-blue text-blue-700">
                <DynamicIcon name={industry.icon} className="h-8 w-8" />
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink">{industry.description}</p>
              <p className="mt-4 text-ink-soft leading-relaxed">
                We supply, install and maintain the IT equipment your operation depends on —
                computers, printers, CCTV, networking and more — backed by AMC support options.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/request-quote" variant="accent" size="lg">Discuss Your Requirement</Button>
                <Button to="/services" variant="outlineBlue" size="lg">Browse Services</Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
