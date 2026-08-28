import { unseenContributions } from '../data/content'
import { MediaFrame } from './MediaFrame'
import { useInView } from '../hooks/useInView'

export function UnseenContributions() {
  const [ref, visible] = useInView()

  return (
    <section className="section unseen-section" id="jejak" aria-labelledby="unseen-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        <p className="eyebrow">07 / DI BALIK CERITA</p>
        <h2 id="unseen-title">YANG TIDAK<br />TERLIHAT</h2>
        <p className="section-kicker">Karena sebuah acara tidak pernah terjadi dengan sendirinya.</p>
        <p className="unseen-intro">Ada yang membawa kursi. Ada yang memasang lampu. Ada yang membersihkan setelah semua pulang.</p>
        <div className="unseen-list">
          {unseenContributions.map((contribution) => (
            <article className="unseen-item" key={contribution.id}>
              <MediaFrame image={contribution.image} label={contribution.label} />
              <div className="unseen-copy">
                <span>{contribution.index}</span>
                <h3>{contribution.title}</h3>
                <p>{contribution.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="unseen-signoff">Yang tidak selalu ada di depan kamera, tapi selalu ada di dalam cerita.</p>
      </div>
    </section>
  )
}
