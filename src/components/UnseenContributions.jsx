import { useEffect, useRef } from 'react'
import { unseenContributions } from '../data/content'
import { progress } from '../lib/scroll'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ChapterMark, RevealLines, delay } from './Motion'

// Di desktop, section ini "menahan" layar dan kartu bergeser ke samping:
// urutan sebelum, selama, dan sesudah acara dibaca seperti gulungan film.
export function UnseenContributions() {
  const [ref, visible] = useInView()
  const pinRef = useScrollProgress(progress.pinned)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = pinRef.current
    const track = trackRef.current
    if (!section || !track || typeof ResizeObserver === 'undefined') return undefined
    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - track.clientWidth)
      section.style.setProperty('--distance', `${distance}px`)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    measure()
    return () => observer.disconnect()
  }, [pinRef])

  return (
    <section ref={pinRef} className="unseen-section" id="jejak" aria-labelledby="unseen-title">
      <div className="unseen-sticky">
        <div ref={ref} className={`unseen-head ${visible ? 'is-visible' : ''}`}>
          <ChapterMark number={7} label="Di balik cerita" />
          <h2 id="unseen-title" className="display"><RevealLines lines={['Yang tidak', <em key="t">terlihat</em>]} /></h2>
          <p className="kicker fade-in" style={delay(250)}>Karena sebuah acara tidak pernah terjadi dengan sendirinya.</p>
          <p className="unseen-intro fade-in" style={delay(380)}>Ada yang membawa kursi. Ada yang memasang lampu. Ada yang membersihkan setelah semua pulang.</p>
        </div>
        <div ref={trackRef} className="unseen-track">
          <div className="unseen-rail">
            {unseenContributions.map((item) => (
              <article className="unseen-item" key={item.id}>
                <MediaFrame image={item.image} label={item.label} eager />
                <div className="unseen-copy">
                  <span>{item.index.split('/')[1]?.trim().toLowerCase()}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
            <p className="unseen-signoff">Yang tidak selalu ada di depan kamera, <em>tapi selalu ada di dalam cerita.</em></p>
          </div>
        </div>
        <div className="unseen-progress" aria-hidden="true"><i /></div>
      </div>
    </section>
  )
}
