import { site } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Place() {
  const [ref, visible] = useInView()
  return (
    <section className="section place-section" aria-labelledby="place-title">
      <div ref={ref} className={`place-layout reveal ${visible ? 'is-visible' : ''}`}>
        <div><p className="eyebrow">02 / LOKASI</p><h2 id="place-title">TEMPAT</h2></div>
        <div className="place-copy"><p className="section-kicker">Sebelum cerita dimulai, ada sebuah tempat yang menjadi saksi.</p><p>Di sinilah kita tumbuh. Di sinilah kita bertemu. Dan di sinilah begitu banyak cerita perlahan menjadi kenangan.</p></div>
        <dl className="place-data">
          <div><dt>DESA</dt><dd>{site.village}</dd></div><div><dt>KECAMATAN</dt><dd>{site.district}</dd></div><div><dt>KABUPATEN</dt><dd>{site.regency}</dd></div><div><dt>DOKUMENTASI</dt><dd>{site.year}</dd></div>
        </dl>
      </div>
    </section>
  )
}
