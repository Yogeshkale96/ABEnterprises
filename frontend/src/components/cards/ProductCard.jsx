import { Link } from 'react-router-dom'
import {
  ArrowRight, BatteryCharging, Check, HardDrive, Keyboard, Laptop, Monitor, Network, Package,
  Printer, ShieldCheck, Video, Wifi,
} from 'lucide-react'
import { formatPrice } from '../../utils/formatters.js'
import { parseProductDescription } from '../../utils/productSpecs.js'

const CATEGORY_ICONS = {
  desktops: Monitor,
  laptops: Laptop,
  'printers-scanners': Printer,
  'cctv-cameras': Video,
  'networking-devices': Network,
  'routers-switches': Wifi,
  'ups-batteries': BatteryCharging,
  'computer-accessories': Keyboard,
  'storage-devices': HardDrive,
  'security-equipment': ShieldCheck,
}

const THEMES = [
  'from-blue-700 to-sky-400',
  'from-violet-600 to-fuchsia-400',
  'from-emerald-600 to-teal-400',
  'from-amber-500 to-orange-400',
  'from-rose-600 to-pink-400',
  'from-cyan-600 to-blue-400',
  'from-indigo-700 to-violet-400',
  'from-teal-600 to-lime-400',
  'from-fuchsia-600 to-rose-400',
  'from-slate-700 to-sky-500',
]

const hashOf = (s = '') => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

export default function ProductCard({ product }) {
  const highlights = parseProductDescription(product.description).specs.slice(0, 3)
  const features = (product.features || []).slice(0, 3)
  const Icon = CATEGORY_ICONS[product.category_slug] || Package
  const theme = THEMES[(product.accent ?? hashOf(product.slug)) % THEMES.length]
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-card-hover">
      <div className="relative flex h-44 items-center overflow-hidden justify-center bg-gradient-to-br from-surface-blue to-surface">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${theme}`}>
            <Icon className="absolute -right-4 -top-4 h-36 w-36 text-white/15" aria-hidden="true" />
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/40 backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </span>
          </div>
        )}
        {product.category_name && (
          <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 px-2.5 py-1 text-[11px] font-semibold text-white">
            {product.category_name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">{product.brand}</p>
        )}
        <h3 className="mt-0.5 text-base font-bold text-navy-900">{product.name}</h3>
        <p className="mt-1.5 text-sm text-ink-soft">{product.short_description}</p>
        {features.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-xs text-ink">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        {highlights.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-ink">
            {highlights.map(([k, v]) => (
              <li key={k} className="flex gap-1.5">
                <span className="font-semibold text-navy-900">{k}:</span>
                <span className="min-w-0 truncate">{v}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex-1" />
        <div className="mt-4 border-t border-line pt-3 text-sm">
          {product.price ? (
            <span className="font-bold text-blue-700">{formatPrice(product.price)}</span>
          ) : (
            <span className="text-xs font-medium text-ink-soft">Price on request{product.indicative ? ' · configurable' : ''}</span>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            to={`/request-quote?service=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center justify-center rounded-lg border border-blue-700 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
          >
            Add to Enquiry
          </Link>
        </div>
      </div>
    </article>
  )
}
