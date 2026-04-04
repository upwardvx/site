'use client'
import { motion } from 'framer-motion'
import { cta } from '@/lib/copy'
import { spring } from '@/lib/motion'

const BOOKING_URL = 'https://calendar.app.google/aUBpNXrjnjj6jeUE9'

export default function CTA() {
  return (
    <section
      className="section-dark relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(197,201,0,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center" style={{ maxWidth: '42rem' }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={spring}
          className="mb-6"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            textTransform: 'uppercase',
          }}
        >
          {cta.heading}
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...spring, delay: 0.1 }}
          className="mb-10 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted-dark)',
          }}
        >
          {cta.sub}
        </motion.p>

        {/* Button */}
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...spring, delay: 0.2 }}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96, y: 1 }}
          className="inline-block font-semibold"
          style={{
            background: '#C5C900',
            color: '#000000',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            padding: '1rem 2.5rem',
            borderRadius: 0,
            transition: 'box-shadow 0.25s ease',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(197,201,0,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          {cta.button}
        </motion.a>
      </div>
    </section>
  )
}
