import { useEffect, useRef, useState } from 'react'

export function useCreditMusic(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(Boolean(src))

  const releaseAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    audioRef.current = null
  }

  const createAudio = () => {
    if (!src || typeof Audio === 'undefined') return null

    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'metadata'
    audio.volume = 0.55
    audio.onplay = () => setIsPlaying(true)
    audio.onpause = () => setIsPlaying(false)
    audio.onerror = () => {
      setIsPlaying(false)
      setIsSupported(false)
    }
    audioRef.current = audio
    return audio
  }

  useEffect(() => {
    releaseAudio()
    setIsPlaying(false)
    setIsSupported(Boolean(src) && typeof Audio !== 'undefined')
    return releaseAudio
  }, [src])

  const toggleMusic = async () => {
    if (!src || typeof Audio === 'undefined') {
      setIsSupported(false)
      return
    }

    const audio = audioRef.current || createAudio()
    if (!audio) {
      setIsSupported(false)
      return
    }

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setIsSupported(false)
    }
  }

  return { isPlaying, isSupported, toggleMusic }
}
