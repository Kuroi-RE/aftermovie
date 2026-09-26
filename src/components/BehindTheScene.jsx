import { MediaFrame } from './MediaFrame'
import { behindTheScene } from '../data/content'
import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines, delay } from './Motion'

// Satu-satunya section terang: "lampu studio dinyalakan" di balik layar.
export function BehindTheScene() {
  const [ref, visible] = useInView()
  return (
    <section className="section behind-section" aria-labelledby="behind-title">
      <div ref={ref} className={`behind-layout ${visible ? 'is-visible' : ''}`}>
        <div className="behind-head">
          <ChapterMark number={8} label="Yang tak terlihat" />
          <h2 id="behind-title" className="display"><RevealLines lines={['Di balik', <em key="l">layar</em>]} /></h2>
          <p className="kicker fade-in" style={delay(250)}>Karena cerita yang bagus tidak selalu berjalan sesuai rencana.</p>
        </div>
        <figure className="behind-photo">
          <MediaFrame image={behindTheScene.image} label={behindTheScene.label} reveal parallax />
          <figcaption className="fade-in" style={delay(500)}><strong>Tidak sempurna.</strong> Justru itu yang membuatnya nyata.</figcaption>
        </figure>
      </div>
    </section>
  )
}
