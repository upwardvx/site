'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

const BOOKING_URL = 'https://calendar.google.com/calendar/appointments'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(245,244,240,0)', 'rgba(245,244,240,0.92)'])
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(12px)'])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <motion.nav
      style={{ background: bg, backdropFilter: blur }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
    >
      {/* Left — label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs uppercase tracking-[0.12em] hidden md:block"
        style={{ color: 'var(--color-muted-light)', fontFamily: 'var(--font-body)' }}
      >
        Results as a Service
      </motion.span>

      {/* Center — wordmark */}
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 text-sm font-bold tracking-widest uppercase"
        style={{
          fontFamily: 'var(--font-barlow)',
          color: 'var(--color-text)',
          letterSpacing: '0.18em',
        }}
      >
        Upward Ventures
      </motion.span>

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
          border: '1px solid var(--color-text)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = '#000000'
          el.style.color = '#FFFFFF'
          el.style.borderColor = '#000000'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'transparent'
          el.style.color = 'var(--color-text)'
          el.style.borderColor = 'var(--color-text)'
        }}
      >
        Book a call
      </motion.a>
    </motion.nav>
  )
}
