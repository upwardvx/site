'use client'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/brand'

export default function SceneCall() {
  return (
    <section
      style={{
        position: 'absolute',
        inset: 0,
        background: '#F5F4F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.28)',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      >
        No pitch. No deck. No hourly invoice.
      </motion.p>

      {/* Main statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            color: '#080808',
            textTransform: 'uppercase',
          }}
        >
          30 minutes.
        </h2>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6.5vw, 8rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            color: 'rgba(0,0,0,0.15)',
            textTransform: 'uppercase',
            marginTop: '0.08em',
          }}
        >
          Just what&apos;s actually going on.
        </h3>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: 'clamp(2.5rem, 5vh, 4rem)' }}
      >
        <motion.a
          href={BRAND.booking}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#F5F4F0',
            background: '#080808',
            padding: '1.15rem 3.5rem',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Book the call →
        </motion.a>
      </motion.div>

      {/* Email */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          marginTop: '1.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(0,0,0,0.25)',
          letterSpacing: '0.04em',
        }}
      >
        or{' '}
        <a
          href="mailto:siddharth@upwardventures.co"
          style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          siddharth@upwardventures.co
        </a>
      </motion.p>
    </section>
  )
}
