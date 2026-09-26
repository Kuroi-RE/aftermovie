import { useEffect, useRef } from 'react'

// Parallax hanya aktif pada pointer presisi agar scrolling mobile tetap ringan.
export function usePointerParallax(strength = 18) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const target = element?.closest('section') ?? element

    if (!element || !canHover.matches || reduceMotion.matches) return undefined

    let frameId
    let x = 0
    let y = 0

    const render = () => {
      element.style.setProperty('--px', `${(x * -strength).toFixed(2)}px`)
      element.style.setProperty('--py', `${(y * -strength).toFixed(2)}px`)
      frameId = undefined
    }

    const requestRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render)
    }

    const handleMove = (event) => {
      const bounds = target.getBoundingClientRect()
      x = (event.clientX - bounds.left) / bounds.width - 0.5
      y = (event.clientY - bounds.top) / bounds.height - 0.5
      requestRender()
    }

    const reset = () => {
      x = 0
      y = 0
      requestRender()
    }

    target.addEventListener('pointermove', handleMove, { passive: true })
    target.addEventListener('pointerleave', reset, { passive: true })

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      target.removeEventListener('pointermove', handleMove)
      target.removeEventListener('pointerleave', reset)
    }
  }, [strength])

  return ref
}
