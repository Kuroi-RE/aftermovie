import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/content'
import { prefersReducedMotion } from '../lib/scroll'
import { useInView } from '../hooks/useInView'
import { ChapterMark, delay } from './Motion'

// Angka berhitung naik sekali saat terlihat; nilai non-numerik (∞) tampil apa adanya.
function CountUp({ value, start }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const [current, setCurrent] = useState(match && !prefersReducedMotion() ? 0 : target)
  const frame = useRef(0)
  const isNumeric = Boolean(match)

  useEffect(() => {
    if (!isNumeric || !start || prefersReducedMotion()) return undefined
    const began = performance.now()
    const duration = 1800
    const step = (now) => {
      const t = Math.min(1, (now - began) / duration)
      setCurrent(Math.round(target * (1 - Math.pow(1 - t, 4))))
      if (t < 1) frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [start, target, isNumeric])

  if (!match) return value
  return <>{current}{suffix}</>
}

export function Numbers() {
  const [ref, visible] = useInView()
  return (
    <section className="section numbers" aria-labelledby="numbers-title">
      <div ref={ref} className={visible ? 'is-visible' : ''}>
        <ChapterMark number={3} label="Dalam angka" />
        <h2 id="numbers-title" className="sr-only">Dalam angka</h2>
        <dl className="stats">
          {stats.map((stat, index) => (
            <div className="stat fade-in" key={stat.label} style={delay(index * 120)}>
              <dt>{stat.label}</dt>
              <dd aria-label={stat.value}><CountUp value={stat.value} start={visible} /></dd>
            </div>
          ))}
        </dl>
        <p className="numbers-caption fade-in" style={delay(520)}>Angka hanya bisa menghitung apa yang terlihat. <em>Tidak dengan apa yang kita rasakan.</em></p>
      </div>
    </section>
  )
}
