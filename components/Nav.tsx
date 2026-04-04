'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { nav } from '@/lib/copy'

const BOOKING_URL = 'https://calendar.google.com/calendar/appointments'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(8,8,8,0)', 'rgba(8,8,8,0.85)'])
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(12px)'])

  return (
    <motion.nav
      style={{ background: bg, backdropFilter: blur }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm font-semibold tracking-tight"
        style={{ color: '#F5F5F0', fontFamily: 'var(--font-geist-sans)' }}
      >
        {nav.logo}
      </motion.span>

      <motion.a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97, y: 1 }}
        className="text-sm font-semibold px-4 py-2 rounded-md"
        style={{
          background: '#C9A96E',
          color: '#080808',
          fontFamily: 'var(--font-geist-sans)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(201,169,110,0.25)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {nav.cta}
      </motion.a>
    </motion.nav>
  )
}
