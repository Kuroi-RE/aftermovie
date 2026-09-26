import { useEffect, useRef, useState } from 'react'

export function Opening({ src, village, year, onComplete }) {
  const videoRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [needsPlay, setNeedsPlay] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) onComplete()
  }, [onComplete])

  const beginExit = () => setIsLeaving(true)

  // Cadangan bila event transitionend tidak terpanggil (tab di latar belakang, dsb).
  useEffect(() => {
    if (!isLeaving) return undefined
    const timer = window.setTimeout(onComplete, 1600)
    return () => window.clearTimeout(timer)
  }, [isLeaving, onComplete])

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
      className={`opening ${isReady ? 'is-ready' : ''} ${isLeaving ? 'is-leaving' : ''}`}
      aria-label="Pembukaan arsip digital"
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === 'clip-path') onComplete()
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
      <div className="letterbox letterbox-top" aria-hidden="true" />
      <div className="letterbox letterbox-bottom" aria-hidden="true" />
      <div className="opening-content">
        <p className="opening-meta">Arsip {year}</p>
        <p className="opening-title">
          <span className="line"><span className="line-inner">{village.toLowerCase()}</span></span>
          <span className="line"><span className="line-inner"><em>sebuah aftermovie.</em></span></span>
        </p>
      </div>
      <div className="opening-actions">
        {!isReady && <p className="opening-status" role="status"><i aria-hidden="true" />Memuat pembukaan</p>}
        {needsPlay && <button className="opening-button" type="button" onClick={playVideo}>Putar video</button>}
        <button className="opening-button" type="button" onClick={beginExit}>Lewati pembukaan</button>
      </div>
    </section>
  )
}
