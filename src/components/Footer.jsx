import { site } from '../data/content'
import { useInView } from '../hooks/useInView'
import { RevealLines } from './Motion'

export function Footer() {
  const [ref, visible] = useInView()
  return (
    <footer ref={ref} className={`site-footer ${visible ? 'is-visible' : ''}`}>
      <p className="footer-title"><RevealLines lines={['Sampai jumpa', <em key="c">di cerita berikutnya.</em>]} step={160} /></p>
      <div className="footer-meta">
        <span>Arsip Dusun {site.village.toLowerCase()}, {site.year}</span>
        <em>Beberapa hal berlalu. Beberapa hal tinggal.</em>
        <a className="back-top" href="#top">Kembali ke awal</a>
      </div>
    </footer>
  )
}
