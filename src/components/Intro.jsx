import { progress } from '../lib/scroll'
import { useInView } from '../hooks/useInView'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ChapterMark } from './Motion'

const lead = 'Ada momen yang terasa biasa ketika kita menjalaninya.'
const turn = 'Namun menjadi begitu berarti ketika semuanya telah berlalu.'

// Kalimat "menyala" kata demi kata mengikuti kecepatan baca pengguna.
function ScrubText({ text, offset, total }) {
  return text.split(' ').map((word, index) => (
    <span className="scrub-word" key={index} style={{ '--i': offset + index, '--n': total }}>{word} </span>
  ))
}

export function Intro() {
  const [ref, visible] = useInView()
  const scrubRef = useScrollProgress(progress.reading)
  const leadCount = lead.split(' ').length
  const total = leadCount + turn.split(' ').length

  return (
    <section className="section intro" id="cerita" aria-labelledby="intro-title">
      <div ref={ref} className={visible ? 'is-visible' : ''}>
        <ChapterMark number={1} label="Cerita" />
        <h2 id="intro-title" ref={scrubRef} className="intro-title">
          <ScrubText text={lead} offset={0} total={total} />
          <em><ScrubText text={turn} offset={leadCount} total={total} /></em>
        </h2>
        <p className="intro-body fade-in">Ini bukan sekadar kumpulan foto. Ini adalah potongan kecil dari cerita yang pernah kita jalani bersama.</p>
      </div>
    </section>
  )
}
