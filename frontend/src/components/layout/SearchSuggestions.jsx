import { ArrowRight, Monitor, Package, TrendingUp, Wrench } from 'lucide-react'

function Group({ title, icon: Icon, children }) {
  return (
    <div className="px-2 py-1.5">
      <p className="flex items-center gap-1.5 px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
        <Icon className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
        {title}
      </p>
      {children}
    </div>
  )
}

export default function SearchSuggestions({
  id,
  query,
  loading,
  suggestions,
  flatItems,
  highlight,
  onPick,
  onSubmit,
  onHover,
}) {
  const trimmed = query.trim()
  let idx = -1
  const nextIdx = () => ++idx

  const renderItem = (item, IconEl) => {
    const i = nextIdx()
    const active = i === highlight
    return (
      <button
        key={`${item._type}-${item.slug || item.name}`}
        id={`search-opt-${i}`}
        role="option"
        aria-selected={active}
        type="button"
        onMouseEnter={() => onHover(i)}
        onClick={() => onPick(item)}
        className={`flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm transition-colors ${
          active ? 'bg-surface-blue text-blue-700' : 'text-ink hover:bg-surface-blue'
        }`}
      >
        <IconEl className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate">{item.name}</span>
        {item.category_name && (
          <span className="shrink-0 text-xs text-ink-soft">{item.category_name}</span>
        )}
      </button>
    )
  }

  return (
    <div
      id={id}
      role="listbox"
      aria-label="Search suggestions"
      className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-card-hover"
    >
      {loading && <p className="px-3 py-2 text-sm text-ink-soft">Searching…</p>}

      {!loading && trimmed.length < 2 && (
        <Group title="Popular Searches" icon={TrendingUp}>
          {(suggestions?.popular?.length ? suggestions.popular : flatItems.filter((f) => f._type === 'popular').map((f) => f.name)).length === 0 ? (
            ['laptops', 'cctv camera', 'printer', 'amc', 'networking'].map((p) => {
              const i = nextIdx()
              return (
                <button
                  key={p}
                  id={`search-opt-${i}`}
                  role="option"
                  aria-selected={i === highlight}
                  type="button"
                  onMouseEnter={() => onHover(i)}
                  onClick={() => onSubmit(p)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm capitalize ${
                    i === highlight ? 'bg-surface-blue text-blue-700' : 'text-ink hover:bg-surface-blue'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 text-blue-500" aria-hidden="true" />
                  {p}
                </button>
              )
            })
          ) : null}
        </Group>
      )}

      {!loading && trimmed.length >= 2 && suggestions && (
        <>
          {suggestions.products?.length > 0 && (
            <Group title="Products" icon={Package}>
              {suggestions.products.map((p) => renderItem({ ...p, _type: 'product' }, Monitor))}
            </Group>
          )}
          {suggestions.services?.length > 0 && (
            <Group title="Services" icon={Wrench}>
              {suggestions.services.map((s) => renderItem({ ...s, _type: 'service' }, Wrench))}
            </Group>
          )}
          {suggestions.products?.length === 0 && suggestions.services?.length === 0 && (
            <p className="px-3 py-3 text-sm text-ink-soft">
              No matches found. Press Enter to search for “{trimmed}”.
            </p>
          )}
          <button
            type="button"
            onClick={() => onSubmit(trimmed)}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border-t border-line px-3 py-2.5 text-sm font-medium text-blue-700 hover:bg-surface-blue"
          >
            See all results for “{trimmed}”
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
