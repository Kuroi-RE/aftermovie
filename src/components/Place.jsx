import { site } from '../data/content'
import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines, delay } from './Motion'

const title = (value) => value.charAt(0) + value.slice(1).toLowerCase()

export function Place() {
  const [ref, visible] = useInView()
  const facts = [
    ['Dusun', title(site.village)],
    ['Kecamatan', title(site.district)],
    ['Kabupaten', title(site.regency)],
    ['Dokumentasi', site.year],
  ]

  return (
    <section className="section place-section" aria-labelledby="place-title">
      <div ref={ref} className={`place-layout ${visible ? 'is-visible' : ''}`}>
        <div className="place-head">
          <ChapterMark number={2} label="Lokasi" />
          <h2 id="place-title" className="display"><RevealLines lines={['Tempat']} /></h2>
        </div>
        <div className="place-copy">
          <p className="kicker fade-in" style={delay(200)}>Sebelum cerita dimulai, ada sebuah tempat yang menjadi saksi.</p>
          <p className="body fade-in" style={delay(320)}>Di sinilah kita tumbuh. Di sinilah kita bertemu. Dan di sinilah begitu banyak cerita perlahan menjadi kenangan.</p>
        </div>
        <dl className="place-data">
          {facts.map(([term, value], index) => (
            <div key={term} className="fade-in" style={delay(400 + index * 90)}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
