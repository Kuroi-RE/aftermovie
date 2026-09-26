import { finalmoment, site } from '../data/content'
import { progress } from '../lib/scroll'
import { MediaFrame } from './MediaFrame'
import { useScrollProgress } from '../hooks/useScrollProgress'

// Foto dibuka dari bingkai kecil menjadi layar penuh saat digulir,
// seperti layar bioskop yang melebar sebelum kalimat penutup muncul.
export function FinalMoment() {
  const ref = useScrollProgress(progress.pinned)
  return (
    <section ref={ref} className="final-moment" id="arsip" aria-labelledby="moment-title">
      <div className="final-moment-sticky">
        <MediaFrame image={finalmoment.image} label={finalmoment.label} className="final-image" />
        <div className="final-moment-content">
          <h2 id="moment-title">Kita pernah<br /><em>di sini.</em></h2>
          <p>Dusun {site.village.toLowerCase()}, {site.year}</p>
        </div>
      </div>
    </section>
  )
}
