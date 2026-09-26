import { useEffect, useRef, useState } from 'react'
import { subscribeScroll } from '../lib/scroll'

const links = [
  ['Cerita', '#cerita'],
  ['Perjalanan', '#perjalanan'],
  ['Potongan', '#potongan'],
  ['Jejak', '#jejak'],
  ['Arsip', '#arsip'],
  ['Kredit', '#kredit'],
]

export function Header({ village, year, menuOpen, onMenuToggle, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const firstLinkRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)

  // Header menyingkir saat menggulir ke bawah dan kembali saat menggulir ke atas,
  // supaya foto mendapat layar penuh tanpa kehilangan akses navigasi.
  useEffect(() => {
    let lastY = window.scrollY
    return subscribeScroll(() => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320)
        lastY = y
      }
    })
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) onMenuToggle()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.toggle('menu-is-open', menuOpen)

    if (menuOpen) window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 120)
    else if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true })
    wasOpen.current = menuOpen

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('menu-is-open')
    }
  }, [menuOpen, onMenuToggle])

  const stateClass = `${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-menu-open' : ''}`

  return (
    <header className={`site-header ${stateClass}`}>
      <a className="wordmark" href="#top" onClick={onNavigate}>
        <span className="wordmark-name">{village.toLowerCase()}</span>
        <span className="wordmark-year">{year}</span>
      </a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={onMenuToggle}>
        <span className="menu-toggle-label">{menuOpen ? 'Tutup' : 'Menu'}</span>
        <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
      </button>
      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} id="site-menu" aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Navigasi utama">
          <ol>
            {links.map(([label, href], index) => (
              <li key={href} style={{ '--i': index }}>
                <a ref={index === 0 ? firstLinkRef : undefined} href={href} onClick={onNavigate}>
                  <span className="menu-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="menu-label">{label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="menu-foot">Arsip Dusun Domas, {year}. <em>Kita pernah di sini.</em></p>
      </div>
    </header>
  )
}
