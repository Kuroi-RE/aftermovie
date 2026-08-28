import { useEffect, useRef, useState } from 'react'

const callbacks = new Map()
let observer

function getObserver() {
  if (!observer && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.()
          callbacks.delete(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -24px' })
  }
  return observer
}

export function useInView() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    const sharedObserver = getObserver()

    if (!element || !sharedObserver) {
      setIsVisible(true)
      return undefined
    }

    callbacks.set(element, () => setIsVisible(true))
    sharedObserver.observe(element)

    return () => {
      callbacks.delete(element)
      sharedObserver.unobserve(element)
    }
  }, [])

  return [ref, isVisible]
}
