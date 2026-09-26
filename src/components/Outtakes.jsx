import { outtakes } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines, delay } from './Motion'

export function Outtakes() {
  const [ref, visible] = useInView()
  return (
    <section className="section outtakes" aria-labelledby="outtakes-title">
      <div ref={ref} className={visible ? 'is-visible' : ''}>
        <p className="surprise fade-in">Tunggu.</p>
        <p className="display outtakes-lead"><RevealLines lines={['Masih ada', <em key="s">satu lagi.</em>]} base={300} step={180} /></p>
        <div className="outtakes-sub">
          <ChapterMark number={10} label="Outtakes" />
          <h2 id="outtakes-title" className="fade-in" style={delay(600)}>Yang tidak masuk cerita</h2>
        </div>
        <div className="outtakes-grid">
          {outtakes.map((outtake, index) => (
            <MediaFrame key={outtake.id} image={outtake.image} label={outtake.label} reveal style={{ '--reveal-delay': `${700 + index * 160}ms` }} />
          ))}
        </div>
        <p className="outtake-copy fade-in" style={delay(1100)}>Yang ini tidak masuk film. Yang ini juga. <em>Tapi sayang kalau dilupakan.</em></p>
      </div>
    </section>
  )
}
