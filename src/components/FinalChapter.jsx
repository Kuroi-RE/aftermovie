import { useInView } from '../hooks/useInView'
import { ChapterMark, RevealLines } from './Motion'

export function FinalChapter() {
  const [ref, visible] = useInView()
  return (
    <section className="section final-chapter" aria-labelledby="chapter-title">
      <div ref={ref} className={`final-chapter-copy ${visible ? 'is-visible' : ''}`}>
        <ChapterMark number={9} label="Bab terakhir" />
        <h2 id="chapter-title" className="display"><RevealLines lines={['Dan kemudian,', <em key="s">semua selesai.</em>]} step={200} /></h2>
        <div className="closing-lines">
          <RevealLines lines={['Lampu mulai dipadamkan.', 'Kursi mulai dikembalikan.', 'Orang-orang mulai pulang.']} base={700} step={450} />
        </div>
        <p className="final-chapter-turn"><RevealLines lines={['Tapi ceritanya tidak', 'benar-benar selesai.']} base={2200} step={180} /></p>
      </div>
    </section>
  )
}
