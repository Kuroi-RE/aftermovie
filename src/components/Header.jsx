import { useEffect } from 'react'

export function Header({ village, menuOpen, onMenuToggle, onNavigate }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) onMenuToggle()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('menu-is-open')
    }
  }, [menuOpen, onMenuToggle])

  const links = [
    ['01', 'Cerita', '#cerita'],
    ['02', 'Perjalanan', '#perjalanan'],
    ['03', 'Potongan', '#potongan'],
    ['04', 'Jejak', '#jejak'],
    ['05', 'Arsip', '#arsip'],
  ]

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={onNavigate}>{village}</a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={onMenuToggle}>
        <span>{menuOpen ? 'TUTUP' : 'MENU'}</span><span className="menu-mark" aria-hidden="true">{menuOpen ? '×' : '+'}</span>
      </button>
      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} id="site-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Navigasi utama">
          {links.map(([number, label, href]) => (
            <a href={href} key={href} onClick={onNavigate}><span>{number}</span>{label}<b aria-hidden="true">↘</b></a>
          ))}
        </nav>
        <p>ARSIP / 2026<br />Kita pernah di sini.</p>
      </div>
    </header>
  )
}
