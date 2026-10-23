import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

/**
 * Accessible custom dropdown (ARIA select-only combobox).
 * Emits synthetic `{ target: { name, value } }` events so it plugs into
 * the same onChange / onBlur handlers as native inputs.
 * Keys: Arrow Up/Down, Home/End, Enter/Space, Escape, Tab, type-ahead.
 */
export default function SelectField({
  id,
  name,
  value,
  options,
  placeholder = 'Select an option',
  onChange,
  onBlur,
  icon: LeadIcon,
  compact = false,
  disabled = false,
  ...aria
}) {
  const listId = useId()
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const typeRef = useRef({ text: '', timer: null })
  const [open, setOpen] = useState(false)
  const selectedIndex = options.findIndex((o) => o.value === value)
  const [active, setActive] = useState(Math.max(selectedIndex, 0))
  const selected = options[selectedIndex]
  const invalid = aria['aria-invalid'] === 'true'

  const emit = (handler, v) => handler?.({ target: { name, value: v, type: 'select' } })

  const openList = () => {
    setActive(Math.max(selectedIndex, 0))
    setOpen(true)
  }

  const choose = (i) => {
    emit(onChange, options[i].value)
    emit(onBlur, options[i].value)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false)
        emit(onBlur, value)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, value])

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const onKeyDown = (e) => {
    const last = options.length - 1
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.min(a + 1, last))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.max(a - 1, 0))
        break
      case 'Home':
        if (open) { e.preventDefault(); setActive(0) }
        break
      case 'End':
        if (open) { e.preventDefault(); setActive(last) }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open) choose(active)
        else openList()
        break
      case 'Escape':
        if (open) { e.preventDefault(); setOpen(false) }
        break
      case 'Tab':
        if (open) choose(active)
        break
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          const t = typeRef.current
          clearTimeout(t.timer)
          t.text += e.key.toLowerCase()
          t.timer = setTimeout(() => { t.text = '' }, 600)
          const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(t.text))
          if (hit >= 0) {
            if (!open) setOpen(true)
            setActive(hit)
          }
        }
    }
  }

  const SelIcon = selected?.icon || LeadIcon

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        {...aria}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (!open) emit(onBlur, value)
        }}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white pl-4 pr-4 text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-70 ${
          compact ? 'py-2.5 text-sm' : 'py-3.5 text-[15px]'
        } ${
          invalid
            ? 'border-error bg-error/[0.03] focus:ring-error/15'
            : open
              ? 'border-blue-700 ring-4 ring-blue-500/15'
              : 'border-line hover:border-blue-500/70 focus:border-blue-700 focus:ring-blue-500/15'
        }`}
      >
        {SelIcon && (
          <SelIcon
            className={`h-[18px] w-[18px] shrink-0 ${selected ? 'text-blue-700' : invalid ? 'text-error' : 'text-ink-soft/70'}`}
            aria-hidden="true"
          />
        )}
        <span className={`min-w-0 flex-1 truncate ${selected ? 'font-medium text-navy-900' : 'text-ink-soft/55'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 ${open ? 'rotate-180 text-blue-700' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={aria['aria-label'] || placeholder}
          className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-2xl shadow-navy-900/15"
        >
          {options.map((o, i) => {
            const isSel = o.value === value
            const OptIcon = o.icon
            return (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={isSel}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  i === active ? 'bg-surface-blue' : ''
                } ${isSel ? 'font-semibold text-blue-700' : 'text-navy-900'}`}
              >
                {OptIcon && (
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isSel ? 'bg-blue-700 text-white' : 'bg-surface text-blue-700'
                    }`}
                  >
                    <OptIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <span className="flex-1">{o.label}</span>
                {isSel && <Check className="h-4 w-4 text-blue-700" aria-hidden="true" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
