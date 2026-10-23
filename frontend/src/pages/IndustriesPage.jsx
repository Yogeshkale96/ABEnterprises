import { useEffect, useState } from 'react'
import apiClient from '../services/apiClient.js'
import Container from '../components/common/Container.jsx'
import IndustryCard from '../components/cards/IndustryCard.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import { FALLBACK_INDUSTRIES } from '../data/content.js'

export default function IndustriesPage() {
  const [items, setItems] = useState(FALLBACK_INDUSTRIES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Industries We Serve | AB Enterprises Private Limited'
    let cancelled = false
    apiClient
      .get('/industries')
      .then((r) => !cancelled && setItems(r.data))
      .catch(() => !cancelled && setItems(FALLBACK_INDUSTRIES))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <Container className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Industries</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Industries We Serve</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Sector-specific IT solutions built around how your organisation actually works.
          </p>
        </Container>
      </section>
      <section className="bg-surface py-14">
        <Container>
          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner /></div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((ind) => (
                <IndustryCard key={ind.slug} industry={ind} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
