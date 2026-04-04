'use client'
import { motion } from 'framer-motion'
import { shift } from '@/lib/copy'
import { staggerContainer, staggerChild } from '@/lib/motion'

export default function TheShift() {
  return (
    <section
      className="w-full flex flex-col justify-center"
      style={{
        background: '#080808',
        minHeight: '100dvh',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
        scrollSnapAlign: 'start',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section marker */}
        <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
          >
            The shift
          </p>
        </div>

        {/* Section heading — the big statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 600,
            color: '#F5F5F0',
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
            style={{ background: '#1E1E1E' }}
            aria-hidden="true"
          />

          {/* Left — the pain */}
          <div className="md:pr-12 pb-12 md:pb-0">
            <p
              className="text-xs uppercase tracking-[0.1em] mb-6 font-medium"
              style={{ color: '#888880', fontFamily: 'var(--font-geist-sans)' }}
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
                  className="pl-4 text-sm leading-relaxed line-through decoration-[#333]"
                  style={{
                    color: '#555550',
                    fontFamily: 'var(--font-geist-sans)',
                    borderLeft: '1px solid #333',
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
              style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
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
                    color: '#F5F5F0',
                    fontFamily: 'var(--font-geist-sans)',
                    borderLeft: '2px solid rgba(201,169,110,0.45)',
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
