import { stories } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'

export function Stories() {
  const [ref, visible] = useInView()
  return (
    <section className="section stories-section" aria-labelledby="stories-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}><p className="eyebrow">06 / CERITA LAIN</p><h2 id="stories-title">CERITA</h2><p className="section-kicker">Karena di balik setiap foto, ada sesuatu yang pernah terjadi.</p>
      <div className="stories-list">{stories.map((story, index) => <article className="story" key={story.id}><MediaFrame image={story.image} label={`Ilustrasi cerita ${story.title}`} /><div><span className="story-index">0{index + 1}</span><h3>{story.title}</h3><p>{story.excerpt}</p><button type="button" className="text-link" disabled aria-label={`Cerita ${story.title} akan segera hadir`}>BACA CERITA <span>→</span></button></div></article>)}</div></div>
    </section>
  )
}
