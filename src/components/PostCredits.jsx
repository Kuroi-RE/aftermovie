import { useEffect, useRef, useState } from 'react'
import { credits, site } from '../data/content'
import { useInView } from '../hooks/useInView'
import { useCreditMusic } from '../hooks/useCreditMusic'

function CreditContent({ hidden = false }) {
  return (
    <div className="credits-roll" aria-hidden={hidden || undefined}>
      {!hidden && <h2 id="credits-title" className="sr-only">Post credit</h2>}
      <p className="eyebrow">POST CREDIT</p>
      {credits.map((credit) => {
        const rows = credit.value.split('\n').filter(Boolean)
        const isMemberGrid = rows.some((row) => row.includes('|'))

        return (
          <section className="credit-block" key={credit.label}>
            <h3>{credit.label}</h3>
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
      <div className="credit-signoff"><p>{site.village}<br />{site.year}</p><strong>SEBUAH CERITA<br />YANG PERNAH KITA JALANI<br />BERSAMA.</strong></div>
      <div className="credit-signoff credit-farewell"><strong>SAMPAI JUMPA!<br />KAMI PAMIT.</strong></div>
    </div>
  )
}

export function PostCredits() {
  const [stageRef, visible] = useInView()
  const sectionRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(true)
  const { isPlaying, isSupported, toggleMusic } = useCreditMusic(site.creditAudioUrl)

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

  const seekRandomMoment = (video) => {
    const availableDuration = Math.max(0, video.duration - 1)
    video.currentTime = Math.random() * availableDuration
  }

  const playRandomMoment = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const video = event.currentTarget
    seekRandomMoment(video)
    video.play().catch(() => {})
  }

  return (
    <section ref={sectionRef} className="post-credits" aria-labelledby="credits-title">
      <div className="credit-controls" aria-label="Kontrol post-credit">
        <button type="button" onClick={toggleFullscreen} aria-pressed={isFullscreen} disabled={!isFullscreenSupported}>{isFullscreenSupported ? (isFullscreen ? 'KELUAR LAYAR PENUH' : 'LAYAR PENUH') : 'LAYAR PENUH TIDAK DIDUKUNG'} <span aria-hidden="true">⛶</span></button>
        <button type="button" onClick={toggleMusic} aria-pressed={isPlaying} disabled={!isSupported}>{isSupported ? (isPlaying ? 'HENTIKAN MUSIK' : 'NYALAKAN MUSIK') : 'MUSIK TIDAK DIDUKUNG'} <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '♪'}</span></button>
      </div>
      <div className="credit-layout">
        <figure className="credit-film">
          {visible && <video src={site.creditVideoUrl} muted playsInline preload="metadata" onLoadedMetadata={playRandomMoment} onEnded={playRandomMoment} aria-describedby="credit-film-caption" />}
          <figcaption id="credit-film-caption"><span>SEMANGAT PANITIA</span><p>Terima kasih untuk setiap peran yang telah dilakukan.</p></figcaption>
        </figure>
        <div ref={stageRef} className="credit-stage">
          <div className={`credits-track ${visible ? 'is-visible' : ''}`}>
            <CreditContent />
            <CreditContent hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
