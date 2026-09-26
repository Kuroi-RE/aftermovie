// Satu loop rAF bersama untuk semua efek berbasis scroll, agar setiap frame
// hanya membaca layout sekali per elemen dan tidak menumpuk listener.
const subscribers = new Set()
let frameId = 0
let listening = false

function tick() {
  frameId = 0
  const viewportHeight = window.innerHeight
  subscribers.forEach((callback) => callback(viewportHeight))
}

function requestTick() {
  if (!frameId) frameId = window.requestAnimationFrame(tick)
}

export function subscribeScroll(callback) {
  subscribers.add(callback)
  if (!listening) {
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick, { passive: true })
    listening = true
  }
  requestTick()

  return () => {
    subscribers.delete(callback)
    if (!subscribers.size && listening) {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      if (frameId) window.cancelAnimationFrame(frameId)
      frameId = 0
      listening = false
    }
  }
}

export const clamp01 = (value) => Math.min(1, Math.max(0, value))

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Rumus progres: 0 = awal, 1 = akhir. `rect` adalah getBoundingClientRect elemen.
export const progress = {
  // Elemen masuk dari bawah layar sampai keluar dari atas layar.
  through: (rect, vh) => (vh - rect.top) / (vh + rect.height),
  // Elemen yang sudah menempel di atas layar lalu digulir keluar (hero).
  leaving: (rect) => -rect.top / Math.max(1, rect.height),
  // Teks dibaca: mulai saat puncak di 85% layar, selesai saat dasar di 55% layar.
  reading: (rect, vh) => (vh * 0.85 - rect.top) / (vh * 0.3 + rect.height),
  // Garis waktu: mengikuti titik baca di 60% tinggi layar.
  follow: (rect, vh) => (vh * 0.6 - rect.top) / Math.max(1, rect.height),
  // Section tinggi dengan isi sticky: 0 saat mulai menempel, 1 saat lepas.
  pinned: (rect, vh) => -rect.top / Math.max(1, rect.height - vh),
}
