import { useState } from 'react'

/**
 * Photo backdrop for dark sections: the photo sits under a per-service colour
 * tint plus a left-to-right navy fade, so overlaid text stays readable on any
 * image. If the photo fails to load the tinted gradient alone remains.
 */
export default function ServiceBackdrop({ src, theme, tint = 'opacity-75' }) {
  const [failed, setFailed] = useState(false)
  return (
    <>
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${theme.dark}`} />
      {src && !failed && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${theme.dark} ${tint}`} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/45 to-transparent" />
      <span aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl ${theme.orb}`} />
    </>
  )
}
