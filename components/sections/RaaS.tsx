'use client'
import { motion } from 'framer-motion'
import { raas } from '@/lib/copy'
import { spring, staggerContainer } from '@/lib/motion'

function FlatCard({ children, offset }: { children: React.ReactNode; offset: number }) {
  return (
    <div style={{ marginTop: offset }}>
      <motion.div
        style={{
          background: '#0A0A0A',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '2rem',
          height: '100%',
        }}
        whileHover={{
          scale: 1.01,
          borderColor: 'rgba(255,255,255,0.25)',
        }}
        transition={spring}
      >
        {children}
      </motion.div>
    </div>
  )
}

const verticalOffsets = [0, 24, 48]

export default function RaaS() {
  return (
    <section
      className="section-type-black w-full flex flex-col justify-center"
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
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
          >
            How it works
          </p>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-16"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          {raas.heading}
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:items-start"
        >
          {raas.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
            >
              <FlatCard offset={verticalOffsets[i]}>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.7,
                  }}
                >
                  {card.body}
                </p>
              </FlatCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
