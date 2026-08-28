import { journey } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Journey() {
  const [ref, visible] = useInView()
  return (
    <section className="section journey-section" id="perjalanan" aria-labelledby="journey-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}><p className="eyebrow">04 / LINTAS WAKTU</p><h2 id="journey-title">PERJALANAN</h2><p className="section-kicker">Setiap cerita memiliki waktunya sendiri.</p>
      <ol className="timeline">{journey.map((item) => <li key={item.number}><span className="timeline-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div>
    </section>
  )
}
