'use client'
import { motion } from 'framer-motion'
import { shift } from '@/lib/copy'
import { staggerContainer, staggerChild } from '@/lib/motion'

export default function TheShift() {
  return (
    <section
      className="section-dark w-full flex flex-col justify-center"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
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
            The shift
          </p>
        </div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          {shift.heading}
        </motion.h2>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />

          {/* Left — the pain */}
          <div className="md:pr-12 pb-12 md:pb-0">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-6 font-medium"
              style={{ color: 'var(--color-muted-dark)', fontFamily: 'var(--font-body)' }}
            >
              {shift.left.label}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-5"
            >
              {shift.left.items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={staggerChild}
                  className="pl-4 text-sm leading-relaxed line-through"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-body)',
                    borderLeft: '1px solid rgba(255,255,255,0.15)',
                    textDecorationColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right — the alternative */}
          <div className="md:pl-12">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-6 font-medium"
              style={{ color: '#C5C900', fontFamily: 'var(--font-body)' }}
            >
              {shift.right.label}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-5"
            >
              {shift.right.items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={staggerChild}
                  className="pl-4 text-sm leading-relaxed"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    borderLeft: '2px solid rgba(197,201,0,0.6)',
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
