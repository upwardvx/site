'use client'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/brand'

export default function Hero() {
  return (
    <section
      style={{
        height: '100dvh',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 5vw, 4rem)',
      }}
    >
      {/* Top row — brand label + year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <img
          src={BRAND.logos.white}
          alt="Upward Ventures"
          style={{ height: 28, width: 'auto' }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Est. 2024
        </span>
      </motion.div>

      {/* Center — the statement */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              maxWidth: '14ch',
            }}
          >
            You don&apos;t need more strategy.
          </h1>
          <h2
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)',
              maxWidth: '14ch',
              marginTop: '0.1em',
            }}
          >
            You need momentum.
          </h2>
        </motion.div>
      </div>

      {/* Bottom row — CTA + scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '36ch',
            lineHeight: 1.6,
          }}
        >
          Outcome-based consulting for founders who&apos;ve outgrown advice.
        </p>
        <a
          href={BRAND.booking}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#000000',
            background: '#FFFFFF',
            padding: '0.75rem 1.75rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Book a call →
        </a>
      </motion.div>
    </section>
  )
}
