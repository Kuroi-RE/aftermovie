import { photoFragments } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines, delay } from './Motion'

function Fragment({ photo }) {
  const [ref, visible] = useInView()
  return (
    <figure ref={ref} className={`fragment ${photo.layout} ${visible ? 'is-visible' : ''}`}>
      <MediaFrame image={photo.image} label={photo.label} reveal parallax />
      <figcaption className="fade-in" style={delay(500)}>
        <span>{photo.index}</span>
        <p>{photo.caption}</p>
      </figcaption>
    </figure>
  )
}

export function PhotoFragments() {
  const [ref, visible] = useInView()
  return (
    <section className="section fragments-section" id="potongan" aria-labelledby="fragments-title">
      <div ref={ref} className={`fragments-head ${visible ? 'is-visible' : ''}`}>
        <ChapterMark number={5} label="Arsip visual" />
        <h2 id="fragments-title" className="display"><RevealLines lines={['Potongan']} /></h2>
        <p className="kicker fade-in" style={delay(250)}>Tidak semua cerita membutuhkan kata-kata.</p>
      </div>
      <div className="fragments-grid">
        {photoFragments.map((photo) => <Fragment key={photo.id} photo={photo} />)}
      </div>
    </section>
  )
}
