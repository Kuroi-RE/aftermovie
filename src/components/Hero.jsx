import { site } from '../data/content'
import { progress } from '../lib/scroll'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { MediaFrame } from './MediaFrame'
import { RevealLines } from './Motion'

export function Hero({ ready }) {
  const scrollRef = useScrollProgress(progress.leaving)
  const pointerRef = usePointerParallax(14)
  const cap = (value) => value.charAt(0) + value.slice(1).toLowerCase()

  return (
    <section ref={scrollRef} className={`hero ${ready ? 'is-visible' : ''}`} id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <div ref={pointerRef} className="hero-media-inner">
          <MediaFrame image={site.heroImage} label={site.heroImage.alt} priority />
        </div>
      </div>

      <div className="hero-meta">
        <p className="fade-in" style={{ transitionDelay: '900ms' }}>Dusun {cap(site.village)}, {cap(site.district)}, {cap(site.regency)}</p>
        <p className="fade-in" style={{ transitionDelay: '1000ms' }}>HUT RI ke-81, {site.year}</p>
      </div>

      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          <RevealLines lines={['Sebuah cerita', <>dari <em>Domas.</em></>]} base={250} step={160} />
        </h1>
        <p className="hero-subtitle fade-in" style={{ transitionDelay: '800ms' }}>Kita pernah di sini.</p>
      </div>

      <a className="scroll-cue fade-in" style={{ transitionDelay: '1150ms' }} href="#cerita">
        <span>Gulir untuk mengingat</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  )
}
