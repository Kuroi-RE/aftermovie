import { site } from '../data/content'
import { MediaFrame } from './MediaFrame'
import {finalmoment} from '../data/content'
import { useInView } from '../hooks/useInView'

export function FinalMoment() {
  const [ref, visible] = useInView()
  return (
    <section className="final-moment" id="arsip" aria-labelledby="moment-title"><MediaFrame image={finalmoment.image} label={finalmoment.label} className="final-image" priority /><div ref={ref} className={`final-moment-content reveal ${visible ? 'is-visible' : ''}`}><h2 id="moment-title">KITA PERNAH<br />DI SINI.</h2><p>{site.village}<br />{site.year}</p></div></section>
  )
}
