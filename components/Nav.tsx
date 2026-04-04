'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const BOOKING_URL = 'https://calendar.app.google/aUBpNXrjnjj6jeUE9'

// Sections 0 = hero (light). Everything after the hero height is dark territory.
export default function Nav() {
  const { scrollY } = useScroll()
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Switch to dark nav after scrolling ~80% of first viewport (hero section)
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 700
    setIsDark(y > threshold)
    setScrolled(y > 40)
  })

  const fg = isDark ? '#FFFFFF' : '#000000'
  const bg = scrolled
    ? isDark
      ? 'rgba(0,0,0,0.9)'
      : 'rgba(245,244,240,0.92)'
    : isDark
      ? 'rgba(0,0,0,0)'
      : 'rgba(245,244,240,0)'
  const borderColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'

  return (
    <motion.nav
      animate={{ background: bg, backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
    >
      {/* Left — label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
        transition={{ duration: 0.3 }}
        className="text-xs uppercase tracking-[0.12em] hidden md:block"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Results as a Service
      </motion.span>

      {/* Center — wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <img
          src={isDark ? '/brand/logos/white.svg' : '/brand/logos/black.svg'}
          alt="Upward Ventures"
          style={{ height: 32, width: 'auto', display: 'block' }}
        />
      </motion.div>

      {/* Right — CTA */}
      <motion.a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs px-4 py-2 rounded-none transition-colors duration-200 ml-auto"
        style={{
          border: `1px solid ${borderColor}`,
          color: fg,
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = isDark ? '#FFFFFF' : '#000000'
          el.style.color = isDark ? '#000000' : '#FFFFFF'
          el.style.borderColor = isDark ? '#FFFFFF' : '#000000'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'transparent'
          el.style.color = fg
          el.style.borderColor = borderColor
        }}
      >
        Book a call
      </motion.a>
    </motion.nav>
  )
}
