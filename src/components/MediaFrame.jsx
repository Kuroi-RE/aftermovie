import { useEffect, useRef, useState } from 'react'
import { progress } from '../lib/scroll'
import { useScrollProgress } from '../hooks/useScrollProgress'

// `reveal`: tirai terbuka dari bawah saat section terlihat.
// `parallax`: foto bergeser pelan berlawanan arah scroll di dalam bingkainya.
// `eager`: dimuat tanpa lazy-load, untuk foto yang digeser masuk secara horizontal.
export function MediaFrame({ image, label, className = '', priority = false, eager = false, reveal = false, parallax = false, style }) {
  const source = image?.src
  const [status, setStatus] = useState(source ? 'loading' : 'placeholder')
  const parallaxRef = useScrollProgress(parallax ? progress.through : null)
  const imgRef = useRef(null)
  const lastSource = useRef(source)

  // Reset hanya saat sumber berganti, lalu cek gambar yang sudah selesai dari cache
  // (event load bisa terjadi sebelum effect berjalan dan membuat skeleton macet).
  useEffect(() => {
    if (lastSource.current !== source) {
      lastSource.current = source
      setStatus(source ? 'loading' : 'placeholder')
    }
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth ? 'loaded' : 'error')
  }, [source])

  const variants = `${reveal ? 'reveal-clip' : ''} ${parallax ? 'has-parallax' : ''}`

  if (!source || status === 'error') {
    const message = status === 'error' ? 'Foto tidak dapat dimuat saat ini.' : 'Foto segera hadir.'
    return (
      <div ref={parallaxRef} className={`media-frame media-placeholder ${variants} ${className}`} style={style} role="img" aria-label={`${label}. ${message}`}>
        <span>{status === 'error' ? 'Foto tidak tersedia' : 'Foto segera hadir'}</span>
      </div>
    )
  }

  const isLoaded = status === 'loaded'

  return (
    <div ref={parallaxRef} className={`media-frame ${isLoaded ? 'is-loaded' : ''} ${variants} ${className}`} style={style} aria-busy={!isLoaded}>
      <div className="media-skeleton" aria-hidden="true"><span>Memuat foto</span></div>
      <img
        ref={imgRef}
        src={source}
        srcSet={image.srcSet}
        sizes={image.sizes}
        alt={image.alt || label}
        width={image.width}
        height={image.height}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}
