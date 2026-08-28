import { MediaFrame } from './MediaFrame'
import { behindTheScene } from '../data/content'
import { useInView } from '../hooks/useInView'

export function BehindTheScene() {
  const [ref, visible] = useInView()
  return (
    <section className="section behind-section" aria-labelledby="behind-title">
      <div ref={ref} className={`behind-layout reveal ${visible ? 'is-visible' : ''}`}><div><p className="eyebrow">08 / YANG TAK TERLIHAT</p><h2 id="behind-title">DI BALIK<br />LAYAR</h2><p className="section-kicker">Karena cerita yang bagus tidak selalu berjalan sesuai rencana.</p></div><div className="behind-photo"><MediaFrame image={behindTheScene.image} label={behindTheScene.label} /><p><strong>Tidak sempurna.</strong><br />Justru itu yang membuatnya nyata.</p></div></div>
    </section>
  )
}
