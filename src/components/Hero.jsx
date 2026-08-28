import { site } from '../data/content'
import { usePointerParallax } from '../hooks/usePointerParallax'

export function Hero() {
  const parallaxRef = usePointerParallax()

  return (
    <section ref={parallaxRef} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <p className="eyebrow hero-meta">ARSIP / {site.year}</p>
      <div className="hero-copy">
        <h1 id="hero-title">SEBUAH<br />CERITA.<br /><em>{site.village}</em></h1>
        <p className="hero-subtitle">Kita pernah di sini.</p>
      </div>
      <a className="scroll-cue" href="#cerita"><span>GULIR UNTUK MENGINGAT</span><b aria-hidden="true">↓</b></a>
    </section>
  )
}
