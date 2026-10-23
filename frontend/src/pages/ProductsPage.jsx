import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/common/Container.jsx'
import ProductCard from '../components/cards/ProductCard.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import productService from '../services/productService.js'
import { FALLBACK_PRODUCTS } from '../data/content.js'
import { productsMenu } from '../config/navigation.js'
import { PRODUCT_CATEGORY_CONTENT } from '../data/productCategories.js'
import ProductCategoryPage from './ProductCategoryPage.jsx'

export default function ProductsPage() {
  const [params] = useSearchParams()
  const category = params.get('category') || ''
  if (PRODUCT_CATEGORY_CONTENT[category]) return <ProductCategoryPage slug={category} />
  return <AllProducts category={category} />
}

function AllProducts({ category }) {
  const [, setParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Render-time adjustment when the category filter changes.
  const [prevCategory, setPrevCategory] = useState(category)
  if (prevCategory !== category) {
    setPrevCategory(category)
    setLoading(true)
  }

  useEffect(() => {
    document.title = 'IT Products | AB Enterprises Private Limited'
  }, [])

  useEffect(() => {
    let cancelled = false
    productService
      .list({ category: category || undefined, limit: 50 })
      .then((data) => !cancelled && setItems(data.items))
      .catch(() => {
        if (cancelled) return
        setItems(
          category
            ? FALLBACK_PRODUCTS.filter((p) => p.category_slug === category)
            : FALLBACK_PRODUCTS
        )
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [category])

  const setCategory = (slug) => {
    setParams(slug ? { category: slug } : {})
  }

  const chipCls = (active) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-blue-700 bg-blue-700 text-white'
        : 'border-line bg-white text-ink hover:border-blue-500 hover:text-blue-700'
    }`

  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <Container className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Our Products</p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">IT Products & Hardware</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Genuine computers, printers, CCTV and networking equipment — with installation and support.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-14">
        <Container>
          <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter by category">
            <button type="button" onClick={() => setCategory('')} className={chipCls(!category)}>
              All
            </button>
            {productsMenu.map((c) => {
              const slug = new URLSearchParams(c.to.split('?')[1] || '').get('category')
              return (
                <button
                  key={c.to}
                  type="button"
                  onClick={() => setCategory(slug)}
                  className={chipCls(category === slug)}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><LoadingSpinner /></div>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              No products found in this category yet. <a href="/request-quote" className="text-blue-700 underline">Request a quote</a> and we'll source it for you.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
