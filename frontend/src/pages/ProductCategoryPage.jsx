import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, Boxes, ChevronRight, Cpu, Headphones, Layers, Lightbulb,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, Tag, Truck, X,
} from 'lucide-react'
import Container from '../components/common/Container.jsx'
import Button from '../components/common/Button.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ProductCard from '../components/cards/ProductCard.jsx'
import productService from '../services/productService.js'
import { FALLBACK_PRODUCTS } from '../data/content.js'
import { PRODUCT_CATEGORY_CONTENT } from '../data/productCategories.js'
import { CATALOGUE_TARGET, catalogueFor, categoryImages } from '../data/catalogue.js'

const SORTS = [
  { value: 'default', label: 'Featured' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const TYPE_STYLES = [
  { Icon: Layers, bar: 'from-blue-700 to-sky-400', chip: 'bg-blue-50 text-blue-700', icon: 'bg-blue-700' },
  { Icon: Cpu, bar: 'from-violet-600 to-fuchsia-400', chip: 'bg-violet-50 text-violet-700', icon: 'bg-violet-600' },
  { Icon: Boxes, bar: 'from-emerald-600 to-teal-400', chip: 'bg-emerald-50 text-emerald-700', icon: 'bg-emerald-600' },
  { Icon: Sparkles, bar: 'from-amber-500 to-orange-400', chip: 'bg-amber-50 text-amber-700', icon: 'bg-amber-500' },
  { Icon: ShieldCheck, bar: 'from-rose-600 to-pink-400', chip: 'bg-rose-50 text-rose-700', icon: 'bg-rose-600' },
]

const TRUST = [
  { Icon: BadgeCheck, label: 'Genuine products', sub: 'Sourced from authorised channels' },
  { Icon: Truck, label: 'Delivery & installation', sub: 'Across Amravati and nearby' },
  { Icon: Headphones, label: 'After-sales support', sub: 'AMC and on-site help' },
]

const BRANDS = ['dell', 'hp', 'lenovo', 'asus', 'acer', 'samsung']

const hay = (p) => [p.name, p.brand, p.short_description, p.description].join(' ').toLowerCase()
const wordRe = (k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
const matchesType = (p, t) => {
  const h = hay(p)
  return t.keywords.some((k) => wordRe(k).test(h))
}
const fieldCls =
  'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'

function OptionRow({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active ? 'bg-blue-700 font-semibold text-white' : 'text-ink hover:bg-surface-blue'
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className={`ml-2 rounded-full px-2 text-[11px] font-semibold ${active ? 'bg-white/20' : 'bg-surface text-ink-soft'}`}>{count}</span>
      )}
    </button>
  )
}

export default function ProductCategoryPage({ slug }) {
  const content = PRODUCT_CATEGORY_CONTENT[slug]
  const [apiItems, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [brand, setBrand] = useState('')
  const [type, setType] = useState(-1)
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('default')
  const [query, setQuery] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)

  const [prevSlug, setPrevSlug] = useState(slug)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    setLoading(true)
    setBrand('')
    setType(-1)
    setMaxPrice('')
    setSort('default')
    setQuery('')
    setPanelOpen(false)
  }

  useEffect(() => {
    document.title = `${content.name} | AB Enterprises Private Limited`
  }, [content.name])

  useEffect(() => {
    let cancelled = false
    productService
      .list({ category: slug, limit: 50 })
      .then((data) => !cancelled && setItems(data.items))
      .catch(() => !cancelled && setItems(FALLBACK_PRODUCTS.filter((p) => p.category_slug === slug)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [slug])

  const items = useMemo(() => {
    const have = new Set(apiItems.map((p) => p.slug))
    const fill = apiItems.length >= CATALOGUE_TARGET
      ? []
      : catalogueFor(slug).filter((p) => !have.has(p.slug)).slice(0, CATALOGUE_TARGET - apiItems.length)
    const pool = categoryImages(slug)
    // API products without a photo borrow a pool image so no card falls back to an icon.
    let k = fill.length
    const withImages = apiItems.map((p) => (p.image_url || !pool.length ? p : { ...p, image_url: pool[k++ % pool.length] }))
    return [...withImages, ...fill]
  }, [apiItems, slug])

  const brands = useMemo(() => {
    const m = new Map()
    items.forEach((p) => p.brand && m.set(p.brand, (m.get(p.brand) || 0) + 1))
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [items])
  const typeCounts = useMemo(() => content.types.map((t) => items.filter((p) => matchesType(p, t)).length), [items, content.types])
  const prices = useMemo(() => items.map((p) => Number(p.price)).filter((n) => n > 0), [items])
  const hasPrices = prices.length > 0
  const priceCeil = hasPrices ? Math.max(...prices) : 0

  const visible = useMemo(() => {
    const t = type >= 0 ? content.types[type] : null
    const q = query.trim().toLowerCase()
    const out = items.filter((p) => {
      if (brand && p.brand !== brand) return false
      if (maxPrice && !(Number(p.price) > 0 && Number(p.price) <= Number(maxPrice))) return false
      if (t && !matchesType(p, t)) return false
      if (q && !hay(p).includes(q)) return false
      return true
    })
    const price = (p) => (Number(p.price) > 0 ? Number(p.price) : Infinity)
    if (sort === 'name-asc') out.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name-desc') out.sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'price-asc') out.sort((a, b) => price(a) - price(b))
    if (sort === 'price-desc') out.sort((a, b) => (Number(b.price) || -1) - (Number(a.price) || -1))
    return out
  }, [items, brand, maxPrice, type, query, sort, content.types])

  const clear = () => {
    setBrand('')
    setType(-1)
    setMaxPrice('')
    setQuery('')
    setSort('default')
  }
  const chips = [
    type >= 0 && { label: content.types[type].name, off: () => setType(-1) },
    brand && { label: brand, off: () => setBrand('') },
    maxPrice && { label: `Up to ₹${Number(maxPrice).toLocaleString('en-IN')}`, off: () => setMaxPrice('') },
    query && { label: `"${query}"`, off: () => setQuery('') },
  ].filter(Boolean)

  const quoteTo = `/request-quote?service=${encodeURIComponent(content.name)}`
  const typeImages = categoryImages(slug)
  const o = content.overview
  const facts = [
    ['What it includes', o.contains],
    ['Who needs it', o.customers],
    ['Common applications', o.applications],
    ['Configurations', o.configurations],
    ['Before you buy', o.considerations],
  ]
  const goListing = () => document.getElementById('product-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const pickType = (i) => {
    setType(i)
    goListing()
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <img src={content.image} alt={content.name} className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />
        <div aria-hidden="true" className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <Container className="relative py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/65">
            <Link to="/home" className="hover:text-sky-300">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to="/products" className="hover:text-sky-300">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white">{content.name}</span>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Product Category</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl md:text-5xl">{content.name}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{content.intro}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {content.types.map((t) => (
              <li key={t.name} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">{t.name}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="accent" size="lg" onClick={goListing}>
              Browse Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to={quoteTo} variant="outline" size="lg">Request a Quote</Button>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-6">
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card-hover sm:grid-cols-3">
            {TRUST.map(({ Icon, label, sub }) => (
              <li key={label} className="flex items-center gap-3 bg-white px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-700/10 text-blue-700"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span>
                  <span className="block text-sm font-bold text-navy-900">{label}</span>
                  <span className="block text-xs text-ink-soft">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <h2 className="text-2xl font-bold text-navy-900">About {content.name}</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-accent-yellow" />
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(([k, v], i) => (
              <div key={k} className="relative overflow-hidden rounded-xl border border-line bg-surface p-5 pl-6">
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${TYPE_STYLES[i % TYPE_STYLES.length].bar}`} />
                <dt className="text-xs font-bold uppercase tracking-wider text-blue-700">{k}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl border border-line bg-white px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Brands we work with</p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
              {BRANDS.map((b) => (
                <li key={b}>
                  <img src={`${import.meta.env.BASE_URL}images/brands/${b}.svg`} alt={`${b} logo`} className="h-6 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-12">
        <Container>
          <h2 className="text-2xl font-bold text-navy-900">Product Types</h2>
          <p className="mt-1 text-sm text-ink-soft">Pick a type to filter the listing below. Availability depends on the current catalogue.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.types.map((t, i) => {
              const s = TYPE_STYLES[i % TYPE_STYLES.length]
              return (
                <article key={t.name} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="relative h-28">
                    <img src={typeImages[i % typeImages.length]} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className={`absolute -bottom-5 left-5 grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg ring-4 ring-white ${s.icon}`}>
                      <s.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-8">
                    <h3 className="font-bold text-navy-900">{t.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{t.desc}</p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-ink-soft">Key specs to compare</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {t.specs.map((sp) => <li key={sp} className={`rounded-md px-2 py-0.5 text-xs font-medium ${s.chip}`}>{sp}</li>)}
                    </ul>
                    <div className="flex-1" />
                    <button type="button" onClick={() => pickType(i)} className="mt-5 inline-flex items-center justify-between rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-blue-700 transition-colors group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                      View Products
                      <span className="flex items-center gap-1.5 text-xs">{loading ? '' : `${typeCounts[i]} listed`}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section id="product-listing" className="scroll-mt-24 bg-white py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">{content.name} Products</h2>
              <div className="mt-2 h-1 w-14 rounded-full bg-accent-yellow" />
            </div>
            <span className="rounded-full bg-surface-blue px-3 py-1 text-sm font-semibold text-blue-700" aria-live="polite">
              {loading ? 'Loading...' : `${visible.length} of ${items.length} products`}
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[17rem_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <button
                type="button"
                onClick={() => setPanelOpen((v) => !v)}
                aria-expanded={panelOpen}
                className="flex w-full items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-navy-900 shadow-card lg:hidden"
              >
                <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-blue-700" aria-hidden="true" />Filters{chips.length ? ` (${chips.length})` : ''}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${panelOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
              </button>
              <div className={`${panelOpen ? 'mt-3 block' : 'hidden'} space-y-5 rounded-2xl border border-line bg-white p-5 shadow-card lg:mt-0 lg:block`}>
                <div className="hidden items-center justify-between lg:flex">
                  <h3 className="flex items-center gap-2 font-bold text-navy-900"><SlidersHorizontal className="h-4 w-4 text-blue-700" aria-hidden="true" />Filters</h3>
                  {chips.length > 0 && <button type="button" onClick={clear} className="text-xs font-semibold text-blue-700 hover:underline">Reset</button>}
                </div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Search
                  <span className="relative mt-1.5 block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
                    <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${content.name.toLowerCase()}…`} className={`${fieldCls} rounded-full bg-surface pl-9 pr-9 font-normal normal-case tracking-normal hover:border-blue-400`} />
                    {query && (
                      <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-ink">
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </span>
                </label>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Product type</p>
                  <div className="mt-1.5 space-y-0.5">
                    <OptionRow active={type === -1} onClick={() => setType(-1)} label="All types" count={items.length} />
                    {content.types.map((t, i) => <OptionRow key={t.name} active={type === i} onClick={() => setType(type === i ? -1 : i)} label={t.name} count={typeCounts[i]} />)}
                  </div>
                </div>
                {brands.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Brand</p>
                    <div className="mt-1.5 space-y-0.5">
                      <OptionRow active={!brand} onClick={() => setBrand('')} label="All brands" />
                      {brands.map(([b, n]) => <OptionRow key={b} active={brand === b} onClick={() => setBrand(brand === b ? '' : b)} label={b} count={n} />)}
                    </div>
                  </div>
                )}
                {hasPrices && (
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Max price
                    <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={`${fieldCls} mt-1.5 font-normal normal-case tracking-normal`}>
                      <option value="">Any price</option>
                      {[0.25, 0.5, 0.75, 1].map((f) => {
                        const v = Math.ceil((priceCeil * f) / 100) * 100
                        return <option key={f} value={v}>Up to ₹{v.toLocaleString('en-IN')}</option>
                      })}
                    </select>
                  </label>
                )}
                <Link to={quoteTo} className="flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                  <Tag className="h-4 w-4" aria-hidden="true" />Can't find it? Ask us
                </Link>
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  {chips.length === 0 && <span className="text-sm text-ink-soft">Showing all {content.name.toLowerCase()}</span>}
                  {chips.map((c) => (
                    <button key={c.label} type="button" onClick={c.off} className="inline-flex items-center gap-1 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500">
                      {c.label}<X className="h-3 w-3" aria-hidden="true" /><span className="sr-only">Remove filter</span>
                    </button>
                  ))}
                  {chips.length > 0 && <button type="button" onClick={clear} className="text-xs font-semibold text-blue-700 hover:underline">Clear all</button>}
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-ink-soft">Sort
                  <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)} className={`${fieldCls} !w-auto py-1.5`}>
                    {SORTS.filter((s) => hasPrices || !s.value.startsWith('price')).map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </label>
              </div>

              {loading ? (
                <div className="flex justify-center py-20"><LoadingSpinner /></div>
              ) : visible.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
                  <Search className="mx-auto h-10 w-10 text-blue-700/40" aria-hidden="true" />
                  <p className="mt-3 font-semibold text-navy-900">{chips.length ? 'No products match these filters' : `No ${content.name.toLowerCase()} listed online yet`}</p>
                  <p className="mt-1 text-sm text-ink-soft">Tell us what you need and we will source it for you.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {chips.length > 0 && <Button variant="outlineBlue" size="sm" onClick={clear}>Clear filters</Button>}
                    <Button to={quoteTo} size="sm">Request a Quote</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((p) => <ProductCard key={p.slug} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-12">
        <Container>
          <div className="flex items-center gap-2 text-navy-900">
            <Lightbulb className="h-6 w-6 text-accent-yellow" aria-hidden="true" />
            <h2 className="text-2xl font-bold">{content.name} Buying Guide</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.guide.map((g, i) => (
              <div key={g.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-sky-400 text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-navy-900">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <h2 className="text-2xl font-bold text-navy-900">Related Categories</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-accent-yellow" />
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {content.related.map((r) => {
              const rc = PRODUCT_CATEGORY_CONTENT[r]
              return (
                <Link key={r} to={`/products?category=${r}`} className="group relative block h-48 overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-card-hover">
                  <img src={rc.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                    <div>
                      <h3 className="font-bold">{rc.name}</h3>
                      <p className="text-xs text-white/75">{rc.tagline}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-14 text-center text-white">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-60 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-3xl" />
        <Container className="relative">
          <h2 className="text-2xl font-extrabold md:text-3xl">Need Help Choosing the Right Product?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Share your requirements with our team to discuss suitable configurations and request a quotation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to={quoteTo} variant="accent" size="lg">Request a Quote</Button>
            <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
