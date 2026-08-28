import { useInView } from '../hooks/useInView'

export function Intro() {
  const [ref, visible] = useInView()
  return (
    <section className="section intro" id="cerita" aria-labelledby="intro-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        <p className="eyebrow">01 / CERITA</p>
        <h2 id="intro-title">Ada momen yang terasa biasa ketika kita menjalaninya.<br /><span>Namun menjadi begitu berarti ketika semuanya telah berlalu.</span></h2>
        <p className="body-copy">Ini bukan sekadar kumpulan foto. Ini adalah potongan kecil dari cerita yang pernah kita jalani bersama.</p>
      </div>
    </section>
  )
}
