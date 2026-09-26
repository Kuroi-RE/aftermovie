import { useEffect, useRef, useState } from 'react'
import { credits, site } from '../data/content'
import { useInView } from '../hooks/useInView'

function CreditContent({ hidden = false }) {
  return (
    <div className="credits-roll" aria-hidden={hidden || undefined}>
      {!hidden && <h2 id="credits-title" className="sr-only">Kredit</h2>}
      <p className="credits-end">The End.</p>
      {credits.map((credit) => {
        const rows = credit.value.split('\n').filter(Boolean)
        const isMemberGrid = rows.some((row) => row.includes('|'))

        return (
          <section className="credit-block" key={credit.label}>
            <h3>{credit.label.trim()}</h3>
            {isMemberGrid ? (
              <ul className="credit-members">
                {rows.map((row, index) => {
                  const [first = '', second = ''] = row.split('|').map((name) => name.trim())
                  return <li key={`${credit.label}-${index}`}><span>{first}</span><span>{second}</span></li>
                })}
              </ul>
            ) : <p>{credit.value}</p>}
          </section>
        )
      })}
      <div className="credit-signoff">
        <p>Dusun {site.village.toLowerCase()}, {site.year}</p>
        <strong>Sebuah cerita yang pernah kita jalani <em>bersama.</em></strong>
      </div>
      <div className="credit-signoff credit-farewell"><strong>Sampai jumpa! <em>Kami pamit.</em></strong></div>
    </div>
  )
}

export function PostCredits() {
  const [stageRef, visible] = useInView()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  useEffect(() => {
    setIsFullscreenSupported(Boolean(sectionRef.current?.requestFullscreen && document.exitFullscreen))
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === sectionRef.current)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreenSupported) return
      if (document.fullscreenElement) await document.exitFullscreen()
      else await sectionRef.current.requestFullscreen()
    } catch {
      setIsFullscreen(false)
    }
  }

  const startCredit = async () => {
    const video = videoRef.current
    if (!video) return

    setIsStarting(true)
    try {
      video.currentTime = 0
      await video.play()
      setHasStarted(true)
    } catch {
      setHasVideoError(true)
    } finally {
      setIsStarting(false)
    }
  }

  const startLabel = hasVideoError ? 'Video tidak tersedia' : hasStarted ? 'Kredit berjalan' : isStarting ? 'Memuat video' : 'Putar kredit'

  return (
    <section ref={sectionRef} className={`post-credits ${hasStarted ? 'is-playing' : ''}`} id="kredit" aria-labelledby="credits-title">
      <div className="credit-controls" aria-label="Kontrol kredit">
        {isFullscreenSupported && (
          <button type="button" onClick={toggleFullscreen} aria-pressed={isFullscreen}>
            {isFullscreen ? 'Keluar layar penuh' : 'Layar penuh'}
          </button>
        )}
        <button className="credit-start" type="button" onClick={startCredit} aria-pressed={hasStarted} disabled={hasStarted || hasVideoError || isStarting} aria-live="polite">
          <span className="credit-start-dot" aria-hidden="true" />{startLabel}
        </button>
      </div>
      <div className="credit-layout">
        <figure className="credit-film">
          {visible && <video ref={videoRef} src={site.creditVideoUrl} playsInline preload="metadata" onEnded={() => setHasStarted(false)} onError={() => setHasVideoError(true)} aria-describedby="credit-film-caption" />}
          <figcaption id="credit-film-caption"><span>Semangat panitia</span><p>Terima kasih untuk setiap peran yang telah dilakukan.</p></figcaption>
        </figure>
        <div ref={stageRef} className="credit-stage">
          <div className={`credits-track ${hasStarted ? 'is-playing' : ''}`}>
            <CreditContent />
            <CreditContent hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
