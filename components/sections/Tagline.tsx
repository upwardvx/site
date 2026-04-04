'use client'
import { motion } from 'framer-motion'
import { hero } from '@/lib/copy'

export default function Tagline() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(to bottom, #F5F4F0 45%, #000000 45%)',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Large wordmark centered at the split */}
      <div className="relative z-10 text-center px-6">
        {/* Small logo mark above the fold line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.35)',
            }}
          >
            Upward Ventures
          </span>
        </motion.div>

        {/* Giant tagline that bleeds across the light/dark boundary */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: 'clamp(2.25rem, 6.5vw, 6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            maxWidth: '14ch',
            margin: '0 auto',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}
        >
          {hero.headline}
        </motion.h2>
      </div>
    </section>
  )
}
