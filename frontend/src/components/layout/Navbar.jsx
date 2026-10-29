import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../common/Logo.jsx'
import Button from '../common/Button.jsx'
import SearchBar from './SearchBar.jsx'
import ServicesDropdown from './ServicesDropdown.jsx'
import ProductsDropdown from './ProductsDropdown.jsx'
import MobileMenu from './MobileMenu.jsx'
import { mainNav } from '../../config/navigation.js'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference.js'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const reducedMotion = useReducedMotionPreference()

  // Close menus on route change (render-time adjustment).
  const routeKey = `${location.pathname}${location.search}`
  const [prevRouteKey, setPrevRouteKey] = useState(routeKey)
  if (prevRouteKey !== routeKey) {
    setPrevRouteKey(routeKey)
    setOpenDropdown(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenDropdown(null)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const toggleDropdown = (name) =>
    setOpenDropdown((cur) => (cur === name ? null : name))

  const linkCls = ({ isActive }) =>
    `relative rounded-md px-3 py-2 text-base font-medium transition-colors ${
      isActive
        ? 'bg-white/10 text-white after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-cyan-400'
        : 'text-white/80 hover:bg-white/10 hover:text-cyan-400'
    }`

  return (
    <header ref={navRef} className="sticky top-0 z-40 border-b border-white/10 bg-navy-900 shadow-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 pl-2 pr-4 sm:pl-3 sm:pr-6 lg:h-[72px] lg:gap-5 lg:pl-4 lg:pr-6"
        aria-label="Main navigation"
      >
        <Logo to="/home" className="h-12 sm:h-16 lg:h-[72px]" />

        {/* Desktop search — sits just left of the nav tabs */}
        <div className="ml-auto mr-4 hidden min-w-0 w-[260px] md:block lg:mr-6">
          <SearchBar />
        </div>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-2 xl:flex">
          {mainNav.map((item) =>
            item.dropdown ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.dropdown)}
                onMouseLeave={() =>
                  setOpenDropdown((cur) => (cur === item.dropdown ? null : cur))
                }
              >
                <span
                  className={`inline-flex items-center rounded-md transition-colors ${
                    openDropdown === item.dropdown ? 'bg-white/10' : 'hover:bg-white/10'
                  }`}
                >
                  <NavLink to={item.to} className={(p) => `${linkCls(p)} pr-1`}>
                    {item.label}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.dropdown)}
                    aria-expanded={openDropdown === item.dropdown}
                    aria-haspopup="true"
                    aria-label={`Toggle ${item.label} menu`}
                    className={`-ml-0.5 inline-flex h-9 w-7 items-center justify-center rounded-r-md transition-colors ${
                      openDropdown === item.dropdown
                        ? 'text-cyan-400'
                        : 'text-white/80 hover:text-cyan-400'
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === item.dropdown ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </span>
                <AnimatePresence>
                  {openDropdown === item.dropdown && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    >
                      {item.dropdown === 'services' ? (
                        <ServicesDropdown onNavigate={() => setOpenDropdown(null)} />
                      ) : (
                        <ProductsDropdown onNavigate={() => setOpenDropdown(null)} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <NavLink to={item.to} className={linkCls} end={item.to === '/home'}>
                  {item.label}
                </NavLink>
              </li>
            )
          )}
          <li className="ml-2">
            <Button to="/request-quote" variant="accent" size="md">
              Get a Free Quote
            </Button>
          </li>
        </ul>

        {/* Mobile: search icon handled inside mobile menu; burger here */}
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 xl:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white xl:hidden"
          >
            <MobileMenu onNavigate={() => setMobileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
