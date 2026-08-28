import { photoFragments } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'

export function PhotoFragments() {
  const [ref, visible] = useInView()
  return (
    <section className="section fragments-section" id="potongan" aria-labelledby="fragments-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}><p className="eyebrow">05 / ARSIP VISUAL</p><h2 id="fragments-title">POTONGAN</h2><p className="section-kicker">Tidak semua cerita membutuhkan kata-kata.</p>
      <div className="fragments-grid">{photoFragments.map((photo) => <figure className={`fragment ${photo.layout}`} key={photo.id}><MediaFrame image={photo.image} label={photo.label} /><figcaption><span>{photo.index}</span><p>{photo.caption}</p></figcaption></figure>)}</div></div>
    </section>
  )
}
