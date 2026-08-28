import { useEffect, useRef } from 'react'

// Parallax hanya aktif pada pointer presisi agar scrolling mobile tetap ringan.
export function usePointerParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!element || !canHover.matches || reduceMotion.matches) return undefined

    let frameId
    let bounds
    let x = 0
    let y = 0

    const render = () => {
      element.style.setProperty('--parallax-grid-x', `${(x * -22).toFixed(2)}px`)
      element.style.setProperty('--parallax-grid-y', `${(y * -22).toFixed(2)}px`)
      element.style.setProperty('--parallax-copy-x', `${(x * 9).toFixed(2)}px`)
      element.style.setProperty('--parallax-copy-y', `${(y * 9).toFixed(2)}px`)
      frameId = undefined
    }

    const requestRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render)
    }

    const updateBounds = () => {
      bounds = element.getBoundingClientRect()
    }

    const handleMove = (event) => {
      if (!bounds) updateBounds()
      x = (event.clientX - bounds.left) / bounds.width - 0.5
      y = (event.clientY - bounds.top) / bounds.height - 0.5
      requestRender()
    }

    const reset = () => {
      x = 0
      y = 0
      requestRender()
    }

    element.addEventListener('pointerenter', updateBounds, { passive: true })
    element.addEventListener('pointermove', handleMove, { passive: true })
    element.addEventListener('pointerleave', reset, { passive: true })

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      element.removeEventListener('pointerenter', updateBounds)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', reset)
    }
  }, [])

  return ref
}
