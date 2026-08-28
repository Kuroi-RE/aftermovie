import { useInView } from '../hooks/useInView'

export function FinalChapter() {
  const [ref, visible] = useInView()
  return (
    <section className="section final-chapter" aria-labelledby="chapter-title"><div ref={ref} className={`final-chapter-copy reveal ${visible ? 'is-visible' : ''}`}><p className="eyebrow">09 / BAB TERAKHIR</p><h2 id="chapter-title">DAN KEMUDIAN,<br /><span>SEMUA SELESAI.</span></h2><div className="closing-lines"><p>Lampu mulai dipadamkan.</p><p>Kursi mulai dikembalikan.</p><p>Orang-orang mulai pulang.</p></div><h3>Tapi ceritanya tidak benar-benar selesai.</h3></div></section>
  )
}
