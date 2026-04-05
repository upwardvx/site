'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BRAND } from '@/lib/brand'
import SceneStatement from './scenes/SceneStatement'
import SceneProof from './scenes/SceneProof'
import SceneCall from './scenes/SceneCall'

const SCENES = [SceneStatement, SceneProof, SceneCall]

// Mixed-direction transitions: vertical for 0↔1, horizontal for 1↔2
// This creates spatial depth — the user feels like they're moving through a space
function buildVariants(fromScene: number, toScene: number) {
  const goingForward = toScene > fromScene
  const useVertical = (fromScene === 0 && toScene === 1) || (fromScene === 1 && toScene === 0)

  return {
    enter: {
      x: useVertical ? 0 : goingForward ? '100%' : '-100%',
      y: useVertical ? (goingForward ? '6%' : '-6%') : 0,
      opacity: 0,
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: {
      x: useVertical ? 0 : goingForward ? '-100%' : '100%',
      y: useVertical ? (goingForward ? '-6%' : '6%') : 0,
      opacity: 0,
    },
  }
}

const TRANSITION = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

export default function ImmersivePage() {
  const [scene, setScene] = useState(0)
  const [prevScene, setPrevScene] = useState(0)
  const transitioning = useRef(false)
  const variants = buildVariants(prevScene, scene)

  const goTo = useCallback(
    (next: number) => {
      if (transitioning.current) return
      if (next < 0 || next >= SCENES.length) return
      transitioning.current = true
      setPrevScene(scene)
      setScene(next)
      setTimeout(() => {
        transitioning.current = false
      }, 800)
    },
    [scene],
  )

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Wheel events
  useEffect(() => {
    let lastWheel = 0
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel < 900) return
      if (Math.abs(e.deltaY) < 8) return
      lastWheel = now
      goTo(scene + (e.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [scene, goTo])

  // Touch events
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0
    const onStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }
    const onEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY
      const dx = touchStartX - e.changedTouches[0].clientX
      if (Math.abs(dy) < 40 && Math.abs(dx) < 40) return
      const primary = Math.abs(dy) > Math.abs(dx) ? dy : dx
      goTo(scene + (primary > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [scene, goTo])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault()
        goTo(scene + 1)
      }
      if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault()
        goTo(scene - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene, goTo])

  const CurrentScene = SCENES[scene]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      {/* Persistent nav */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(1.25rem, 2.5vw, 2rem) clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        <motion.img
          src={scene === 2 ? BRAND.logos.black : BRAND.logos.white}
          alt="Upward Ventures"
          animate={{ opacity: 1 }}
          style={{ height: 22, width: 'auto' }}
        />

        <motion.a
          href={BRAND.booking}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: scene === 2 ? '#F5F4F0' : '#080808',
            background: scene === 2 ? '#080808' : '#C9A96E',
            padding: '0.6rem 1.4rem',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          Book a call →
        </motion.a>
      </nav>

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          style={{ position: 'absolute', inset: 0 }}
        >
          <CurrentScene
            onNext={() => goTo(scene + 1)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Scene progress dots — right edge */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(1.25rem, 2.5vw, 2rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 200,
        }}
      >
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Scene ${i + 1}`}
            style={{
              width: i === scene ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background:
                i === scene
                  ? scene === 2
                    ? '#080808'
                    : '#C9A96E'
                  : scene === 2
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* Scene counter — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 2.5vw, 2rem)',
          left: 'clamp(1.5rem, 4vw, 3.5rem)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: scene === 2 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.3s',
          }}
        >
          {String(scene + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
