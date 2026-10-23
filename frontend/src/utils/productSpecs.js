const SPEC_LINE = /^\s*[-•*]?\s*([A-Za-z][A-Za-z0-9 /&().+-]{1,38}?)\s*:\s*(\S.{0,200})$/

/**
 * Admin-entered product descriptions may include "Label: value" lines
 * (e.g. "RAM: 16 GB DDR4"). Those become the specification table; any other
 * text stays as the description. Nothing is invented when none are present.
 */
export function parseProductDescription(description = '') {
  const specs = []
  const rest = []
  String(description || '')
    .split(/\r?\n/)
    .forEach((line) => {
      const m = line.match(SPEC_LINE)
      if (m && m[2].length <= 120) specs.push([m[1].trim(), m[2].trim()])
      else rest.push(line)
    })
  return { specs, text: rest.join('\n').trim() }
}
