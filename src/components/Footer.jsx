import { site } from '../data/content'

export function Footer() {
  return <footer className="site-footer"><p>SAMPAI JUMPA<br />DI CERITA BERIKUTNYA.</p><div><span>{site.village}</span><span>ARSIP / {site.year}</span></div><em>Beberapa hal berlalu.<br />Beberapa hal tinggal.</em></footer>
}
