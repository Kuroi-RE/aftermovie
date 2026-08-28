import { useEffect, useRef, useState } from 'react'

export function Opening({ src, onComplete }) {
  const videoRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [needsPlay, setNeedsPlay] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) onComplete()
  }, [onComplete])

  const beginExit = () => setIsLeaving(true)

  const playVideo = async () => {
    try {
      await videoRef.current?.play()
      setNeedsPlay(false)
    } catch {
      setNeedsPlay(true)
    }
  }

  return (
    <section
      className={`opening ${isLeaving ? 'is-leaving' : ''}`}
      aria-label="Pembukaan arsip digital"
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === 'opacity') onComplete()
      }}
    >
      <video
        ref={videoRef}
        className="opening-video"
        src={src}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => { setIsReady(true); playVideo() }}
        onEnded={beginExit}
        onError={beginExit}
        aria-hidden="true"
      />
      <div className="opening-shade" aria-hidden="true" />
      <div className="opening-content">
        <p className="eyebrow">ARSIP / 2026</p>
        <p className="opening-title">DOMAS<br /><span className='text-[#b8ff3d] tracking-normal'>AFTER A MOVIE.</span></p>
      </div>
      <div className="opening-actions">
        {!isReady && <p className="opening-status" role="status">MEMUAT PEMBUKAAN</p>}
        {needsPlay && <button className="opening-button" type="button" onClick={playVideo}>PUTAR VIDEO <span aria-hidden="true">▶</span></button>}
        <button className="opening-button" type="button" onClick={beginExit}>LEWATI <span aria-hidden="true">→</span></button>
      </div>
    </section>
  )
}
