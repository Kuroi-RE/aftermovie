import { stories } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines, delay } from './Motion'

function Story({ story, index }) {
  const [ref, visible] = useInView()
  return (
    <article ref={ref} className={`story ${index % 2 ? 'is-flipped' : ''} ${visible ? 'is-visible' : ''}`}>
      <MediaFrame image={story.image} label={`Ilustrasi cerita ${story.title}`} reveal parallax />
      <div className="story-copy">
        <span className="story-index fade-in">{String(index + 1).padStart(2, '0')}</span>
        <h3><RevealLines lines={[story.title]} base={150} /></h3>
        <p className="fade-in" style={delay(300)}>{story.excerpt}</p>
        {/* TODO: ganti dengan tautan ke halaman cerita saat tulisannya sudah tersedia. */}
        <p className="story-soon fade-in" style={delay(420)}>Cerita lengkap segera hadir</p>
      </div>
    </article>
  )
}

export function Stories() {
  const [ref, visible] = useInView()
  return (
    <section className="section stories-section" aria-labelledby="stories-title">
      <div ref={ref} className={`section-head ${visible ? 'is-visible' : ''}`}>
        <ChapterMark number={6} label="Cerita lain" />
        <h2 id="stories-title" className="display"><RevealLines lines={['Cerita']} /></h2>
        <p className="kicker fade-in" style={delay(250)}>Karena di balik setiap foto, ada sesuatu yang pernah terjadi.</p>
      </div>
      <div className="stories-list">
        {stories.map((story, index) => <Story key={story.id} story={story} index={index} />)}
      </div>
    </section>
  )
}
