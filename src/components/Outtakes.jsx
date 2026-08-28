import { outtakes } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'

export function Outtakes() {
  const [ref, visible] = useInView()
  return (
    <section className="section outtakes" aria-labelledby="outtakes-title"><div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}><p className="surprise">TUNGGU.</p><h2>MASIH ADA<br />SATU LAGI.</h2><p className="eyebrow">10 / OUTTAKES</p><h3 id="outtakes-title">YANG TIDAK MASUK CERITA</h3><div className="outtakes-grid">{outtakes.map((outtake) => <MediaFrame key={outtake.id} image={outtake.image} label={outtake.label} />)}</div><p className="outtake-copy">Yang ini tidak masuk film.<br />Yang ini juga.<br /><br />Tapi sayang kalau dilupakan.</p></div></section>
  )
}
