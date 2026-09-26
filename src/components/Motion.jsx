const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

// Penanda bab ala title card film: angka Romawi miring + garis yang tergambar saat terlihat.
export function ChapterMark({ number, label }) {
  return (
    <p className="chapter">
      <span className="chapter-no" aria-hidden="true">{ROMAN[number] ?? number}</span>
      <span className="chapter-rule" aria-hidden="true" />
      <span className="chapter-label"><span className="sr-only">Bab {number}: </span>{label}</span>
    </p>
  )
}

// Setiap baris naik dari balik masker, berurutan seperti kredit film.
export function RevealLines({ lines, base = 0, step = 110 }) {
  return lines.map((line, index) => (
    <span className="line" key={index}>
      <span className="line-inner" style={{ transitionDelay: `${base + index * step}ms` }}>{line}</span>
    </span>
  ))
}

export const delay = (ms) => ({ transitionDelay: `${ms}ms` })
