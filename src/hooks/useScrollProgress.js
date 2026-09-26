import { useEffect, useRef } from 'react'
import { clamp01, prefersReducedMotion, progress, subscribeScroll } from '../lib/scroll'

// Menulis progres scroll (0..1) ke CSS variable `--progress` pada elemen,
// sehingga animasi dikerjakan CSS tanpa re-render React di setiap frame.
export function useScrollProgress(compute = progress.through, onChange) {
  const ref = useRef(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const element = ref.current
    if (!element || !compute) return undefined

    if (prefersReducedMotion()) {
      element.style.setProperty('--progress', '1')
      onChangeRef.current?.(1)
      return undefined
    }

    let last = -1
    return subscribeScroll((viewportHeight) => {
      const value = clamp01(compute(element.getBoundingClientRect(), viewportHeight))
      if (Math.abs(value - last) < 0.0005) return
      last = value
      element.style.setProperty('--progress', value.toFixed(4))
      onChangeRef.current?.(value)
    })
  }, [compute])

  return ref
}
