import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ChevronRight, Package } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import Button from '../components/common/Button.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import productService from '../services/productService.js'
import { formatPrice } from '../utils/formatters.js'
import ProductCard from '../components/cards/ProductCard.jsx'
import { FALLBACK_PRODUCTS } from '../data/content.js'
import { CATALOGUE_TARGET, catalogueFor, categoryImages, findCatalogueItem } from '../data/catalogue.js'
import { PRODUCT_CATEGORY_CONTENT } from '../data/productCategories.js'
import { parseProductDescription } from '../utils/productSpecs.js'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [related, setRelated] = useState([])

  // Render-time adjustment when the slug param changes.
  const [prevSlug, setPrevSlug] = useState(slug)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    setStatus('loading')
  }

  useEffect(() => {
    let cancelled = false
    productService
      .getBySlug(slug)
      .then((data) => {
        if (!cancelled) {
          setProduct(data)
          setStatus('ok')
        }
      })
      .catch(() => {
        const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug) || findCatalogueItem(slug)
        if (cancelled) return
        setProduct(fallback || null)
        setStatus(fallback ? 'ok' : 'error')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (!product?.category_slug) return undefined
    let cancelled = false
    const topUp = (items) => {
      const rest = items.filter((p) => p.slug !== product.slug)
      const have = new Set(rest.map((p) => p.slug))
      const fill = catalogueFor(product.category_slug).filter((p) => p.slug !== product.slug && !have.has(p.slug))
      return [...rest, ...fill].slice(0, Math.min(4, CATALOGUE_TARGET))
    }
    productService
      .list({ category: product.category_slug, limit: 8 })
      .then((data) => !cancelled && setRelated(topUp(data.items)))
      .catch(() => !cancelled && setRelated(topUp([])))
    return () => {
      cancelled = true
    }
  }, [product])

  const { specs, text } = parseProductDescription(product?.description)
  const catContent = product ? PRODUCT_CATEGORY_CONTENT[product.category_slug] : null
  const catTo = product?.category_slug ? `/products?category=${product.category_slug}` : '/products'
  // Fallback photo for products stored without an image.
  const pool = product ? categoryImages(product.category_slug) : []
  const hash = [...(product?.slug || '')].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
  const displayImage = product?.image_url || (pool.length ? pool[hash % pool.length] : null)
  const rows = [
    ['Brand', product?.brand],
    ['Category', product?.category_name],
    ...specs,
    ['Price', product?.price ? formatPrice(product.price) : 'Request a Quote'],
  ].filter(([, v]) => v)

  useEffect(() => {
    if (product) document.title = `${product.name} | AB Enterprises Private Limited`
  }, [product])

  return (
    <>
      <section className="bg-navy-900 py-12 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link to="/home" className="hover:text-cyan-400">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to="/products" className="hover:text-cyan-400">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {product?.category_name && (
              <>
                <Link to={catTo} className="hover:text-cyan-400">{product.category_name}</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
            <span className="text-white">{product?.name || '…'}</span>
          </nav>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">{product?.name || 'Product'}</h1>
          {product?.category_name && (
            <p className="mt-2 text-sm font-medium text-cyan-400">{product.category_name}</p>
          )}
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          {status === 'loading' && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
          {status === 'error' && <ErrorMessage message="This product could not be found." />}
          {status === 'ok' && product && (
            <div className="grid gap-10 lg:grid-cols-5">
              <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface-blue to-surface shadow-card lg:sticky lg:top-24 lg:col-span-3 lg:h-[32rem] lg:self-start">
                {displayImage ? (
                  <img src={displayImage} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
                ) : (
                  <Package className="h-24 w-24 text-blue-700/30" aria-hidden="true" />
                )}
              </div>
              <div className="lg:col-span-2">
                {product.brand && (
                  <span className="inline-block rounded-full bg-blue-700/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">{product.brand}</span>
                )}
                <p className="mt-3 text-lg leading-relaxed text-ink">{product.short_description}</p>
                <div className="mt-5 rounded-xl border border-line bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Price</p>
                  <p className="mt-1 text-2xl font-bold text-navy-900">{product.price ? formatPrice(product.price) : 'Request a Quote'}</p>
                  <p className="mt-1 text-xs text-ink-soft">Final pricing, configuration and availability are confirmed in your quotation.</p>
                </div>
                <h2 className="mt-7 text-lg font-bold text-navy-900">Overview</h2>
                <div className="mt-2 whitespace-pre-line text-ink-soft leading-relaxed">
                  {text || 'Contact us for detailed specifications and availability.'}
                </div>
                {product.features?.length > 0 && (
                  <>
                    <h2 className="mt-7 text-lg font-bold text-navy-900">Key Features</h2>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 rounded-lg border border-line bg-white p-3 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <h2 className="mt-7 text-lg font-bold text-navy-900">Specifications</h2>
                <div className="mt-3 overflow-x-auto rounded-xl border border-line shadow-card">
                <table className="w-full min-w-[30rem] text-sm">
                  <caption className="sr-only">Product specifications</caption>
                  <thead className="bg-navy-900 text-left text-white">
                    <tr><th scope="col" className="px-4 py-2 font-semibold">Specification</th><th scope="col" className="px-4 py-2 font-semibold">Value</th></tr>
                  </thead>
                  <tbody>
                    {rows.map(([k, v], i) => (
                      <tr key={k} className={i % 2 ? 'bg-surface' : 'bg-white'}>
                        <th scope="row" className="w-2/5 px-4 py-2 text-left font-semibold text-navy-900">{k}</th>
                        <td className="px-4 py-2 text-ink">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                {product.indicative && (
                  <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Indicative product line. Brand, model, exact specifications, price and availability are confirmed in your quotation.
                  </p>
                )}
                {specs.length === 0 && (
                  <p className="mt-2 text-xs text-ink-soft">Contact us for detailed specifications, available configurations and warranty.</p>
                )}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    to={`/request-quote?service=${encodeURIComponent(product.name)}`}
                    variant="accent"
                    size="lg"
                  >
                    Request a Quote
                  </Button>
                  <Button to="/contact" variant="outlineBlue" size="lg">
                    Ask a Question
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {status === 'ok' && product && (
        <>
          {related.length > 0 && (
            <section className="bg-surface py-12">
              <Container>
                <h2 className="text-2xl font-bold text-navy-900">Related Products</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((p) => <ProductCard key={p.slug} product={p} />)}
                </div>
              </Container>
            </section>
          )}
          {catContent && (
            <section className="bg-white py-12">
              <Container>
                <h2 className="text-2xl font-bold text-navy-900">Related Categories</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[product.category_slug, ...catContent.related.slice(0, 2)].map((r) => {
                    const rc = PRODUCT_CATEGORY_CONTENT[r]
                    return (
                      <Link key={r} to={`/products?category=${r}`} className="group relative block h-36 overflow-hidden rounded-2xl">
                        <img src={rc.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                        <h3 className="absolute bottom-3 left-4 font-bold text-white">{rc.name}</h3>
                      </Link>
                    )
                  })}
                </div>
              </Container>
            </section>
          )}
          <section className="bg-navy-950 py-12 text-center text-white">
            <Container>
              <h2 className="text-2xl font-extrabold">Need Help Choosing the Right Product?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/75">
                Share your requirements with our team to discuss suitable configurations and request a quotation.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button to={`/request-quote?service=${encodeURIComponent(product.name)}`} variant="accent" size="lg">Request a Quote</Button>
                <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  )
}
