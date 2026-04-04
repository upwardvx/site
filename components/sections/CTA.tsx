'use client'
import { motion } from 'framer-motion'
import { cta } from '@/lib/copy'
import { spring } from '@/lib/motion'
import { BRAND } from '@/lib/brand'

export default function CTA() {
  return (
    <section
      className="section-type-white relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        scrollSnapAlign: 'start',
      }}
    >
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
            color: '#000000',
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
            color: 'rgba(0,0,0,0.5)',
          }}
        >
          {cta.sub}
        </motion.p>

        {/* Button — black on white bg, full contrast */}
        <motion.a
          href={BRAND.booking}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...spring, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block font-semibold"
          style={{
            background: '#000000',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            padding: '1rem 2.5rem',
            borderRadius: 0,
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          {cta.button}
        </motion.a>
      </div>
    </section>
  )
}
