import { useEffect, useState } from 'react'

export function MediaFrame({ image, label, className = '', priority = false }) {
  const source = image?.src
  const [status, setStatus] = useState(source ? 'loading' : 'placeholder')

  useEffect(() => {
    setStatus(source ? 'loading' : 'placeholder')
  }, [source])

  if (!source || status === 'error') {
    const message = status === 'error' ? 'Foto tidak dapat dimuat saat ini.' : 'Foto segera hadir.'
    return (
      <div className={`media-frame media-placeholder ${className}`} role="img" aria-label={`${label}. ${message}`}>
        <span>{status === 'error' ? 'FOTO<br />TIDAK TERSEDIA' : 'FOTO<br />SEGERA HADIR'}</span>
      </div>
    )
  }

  const isLoaded = status === 'loaded'

  return (
    <div className={`media-frame media-loading ${isLoaded ? 'is-loaded' : ''} ${className}`} aria-busy={!isLoaded}>
      <div className="media-skeleton" aria-hidden="true"><span>MEMUAT FOTO</span><i /></div>
      <img
        src={source}
        srcSet={image.srcSet}
        sizes={image.sizes}
        alt={image.alt || label}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}
