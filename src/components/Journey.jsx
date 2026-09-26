import { useState } from 'react'
import { journey } from '../data/content'
import { progress } from '../lib/scroll'
import { useInView } from '../hooks/useInView'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ChapterMark, RevealLines, delay } from './Motion'

export function Journey() {
  const [ref, visible] = useInView()
  const [active, setActive] = useState(-1)
  // Garis waktu tergambar mengikuti scroll; setiap bab menyala saat garis mencapainya.
  const lineRef = useScrollProgress(progress.follow, (value) => {
    const next = Math.min(journey.length - 1, Math.floor(value * journey.length + 0.15))
    setActive((current) => (current === next ? current : next))
  })

  return (
    <section className="section journey-section" id="perjalanan" aria-labelledby="journey-title">
      <div ref={ref} className={`journey-layout ${visible ? 'is-visible' : ''}`}>
        <div className="journey-head">
          <ChapterMark number={4} label="Lintas waktu" />
          <h2 id="journey-title" className="display"><RevealLines lines={['Perjalanan']} /></h2>
          <p className="kicker fade-in" style={delay(250)}>Setiap cerita memiliki waktunya sendiri.</p>
        </div>
        <ol ref={lineRef} className="timeline">
          {journey.map((item, index) => (
            <li key={item.number} className={index <= active ? 'is-active' : ''}>
              <span className="timeline-number" aria-hidden="true" />
              <div>
                <span className="timeline-step">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
