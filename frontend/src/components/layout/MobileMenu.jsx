import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import Button from '../common/Button.jsx'
import { mainNav, productsMenu, servicesMenu } from '../../config/navigation.js'

function MobileGroup({ label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-1 py-3 text-sm font-medium text-ink"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && <div className="max-h-64 overflow-y-auto pb-3 pl-3">{children}</div>}
    </div>
  )
}

export default function MobileMenu({ onNavigate }) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="mb-3">
        <SearchBar onNavigate={onNavigate} />
      </div>
      <nav aria-label="Mobile navigation">
        {mainNav.map((item) =>
          item.dropdown === 'services' ? (
            <MobileGroup key={item.label} label="Services">
              {servicesMenu.map((group) => (
                <div key={group.heading} className="py-1">
                  <p className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                    {group.heading}
                  </p>
                  {group.items.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={onNavigate}
                      className="block rounded-md px-2.5 py-1.5 text-sm text-ink hover:bg-surface-blue hover:text-blue-700"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/services"
                onClick={onNavigate}
                className="mt-1 block rounded-md px-2.5 py-1.5 text-sm font-semibold text-blue-700"
              >
                View All Services →
              </Link>
            </MobileGroup>
          ) : item.dropdown === 'products' ? (
            <MobileGroup key={item.label} label="Products">
              {productsMenu.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  onClick={onNavigate}
                  className="block rounded-md px-2.5 py-1.5 text-sm text-ink hover:bg-surface-blue hover:text-blue-700"
                >
                  {p.label}
                </Link>
              ))}
              <Link
                to="/products"
                onClick={onNavigate}
                className="mt-1 block rounded-md px-2.5 py-1.5 text-sm font-semibold text-blue-700"
              >
                View All Products →
              </Link>
            </MobileGroup>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              className="block border-b border-line px-1 py-3 text-sm font-medium text-ink hover:text-blue-700"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
      <div className="mt-4">
        <Button to="/request-quote" variant="accent" size="md" className="w-full" onClick={onNavigate}>
          Get a Free Quote
        </Button>
      </div>
    </div>
  )
}
