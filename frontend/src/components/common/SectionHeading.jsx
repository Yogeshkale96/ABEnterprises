export default function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  dark = false,
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`mb-10 max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <span
          className={`mb-2 inline-block text-xs font-bold uppercase tracking-[0.18em] ${
            dark ? 'text-cyan-400' : 'text-blue-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={`text-3xl font-bold md:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}>
        {title} {highlight && <span className="text-accent-yellow">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
