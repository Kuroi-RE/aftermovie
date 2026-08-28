import { useInView } from '../hooks/useInView'

const stats = [['800+', 'WARGA', 'DOMAS'], ['12', 'KEGIATAN', ''], ['1000+', 'MOMEN', 'TERDOKUMENTASI'], ['∞', 'KENANGAN', 'TERSIMPAN']]
export function Numbers() {
  const [ref, visible] = useInView()
  return (
    <section className="section numbers" aria-labelledby="numbers-title">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}><p className="eyebrow">03 / DALAM ANGKA</p><h2 id="numbers-title" className="sr-only">Dalam angka</h2>
        <div className="stats-grid">{stats.map(([value, label, extra]) => <div className="stat" key={label}><strong>{value}</strong><p>{label}<br />{extra}</p></div>)}</div>
        <p className="numbers-caption">Angka hanya bisa menghitung apa yang terlihat.<br />Tidak dengan apa yang kita rasakan.</p>
      </div>
    </section>
  )
}
