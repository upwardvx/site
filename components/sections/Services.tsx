'use client'
import { motion } from 'framer-motion'
import { services } from '@/lib/copy'
import { staggerContainer } from '@/lib/motion'

export default function Services() {
  return (
    <section
      className="w-full"
      style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section marker */}
        <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
          >
            Services
          </p>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 600,
            color: '#F5F5F0',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          {services.heading}
        </motion.h2>

        {/* Grid — gap-px creates hairline dividers between cells */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 mt-12"
          style={{ background: '#1E1E1E', gap: '1px' }}
        >
          {services.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ backgroundColor: '#111111' }}
              style={{
                background: '#080808',
                padding: 'clamp(2rem, 3vw, 2.5rem)',
                transition: 'background 0.2s ease',
              }}
            >
              {/* Service label */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
              >
                {item.label}
              </p>

              {/* Problem */}
              <h3
                className="mb-4 leading-snug"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  fontWeight: 600,
                  color: '#F5F5F0',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.problem}
              </h3>

              {/* Outcome */}
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '0.9375rem',
                  color: '#888880',
                  lineHeight: 1.7,
                }}
              >
                {item.outcome}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
