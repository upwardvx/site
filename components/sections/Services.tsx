'use client'
import { motion } from 'framer-motion'
import { services } from '@/lib/copy'
import { staggerContainer } from '@/lib/motion'

export default function Services() {
  return (
    <section
      className="section-dark w-full flex flex-col justify-center"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        scrollSnapAlign: 'start',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section marker */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#C5C900', fontFamily: 'var(--font-body)' }}
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
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          {services.heading}
        </motion.h2>

        {/* Grid — hairline dividers */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 mt-12"
          style={{ background: 'rgba(255,255,255,0.08)', gap: '1px' }}
        >
          {services.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ backgroundColor: '#0A0A0A' }}
              style={{
                background: '#000000',
                padding: 'clamp(2rem, 3vw, 2.5rem)',
                transition: 'background 0.2s ease',
              }}
            >
              {/* Service label */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: '#C5C900', fontFamily: 'var(--font-body)' }}
              >
                {item.label}
              </p>

              {/* Problem */}
              <h3
                className="mb-4 leading-snug"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.problem}
              </h3>

              {/* Outcome */}
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-muted-dark)',
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
