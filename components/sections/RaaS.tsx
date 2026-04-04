'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { raas } from '@/lib/copy'
import { spring, staggerContainer } from '@/lib/motion'

const verticalOffsets = [0, 24, 48]

function TiltCard({ children, offset }: { children: React.ReactNode; offset: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: '1000px', marginTop: offset }}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: '#111111',
          border: '1px solid #1E1E1E',
          borderRadius: '1rem',
          padding: '2rem',
          height: '100%',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          y: -4,
          borderColor: 'rgba(201,169,110,0.35)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        transition={spring}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function RaaS() {
  return (
    <section
      className="w-full"
      style={{
        background: '#080808',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section marker */}
        <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
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
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 600,
            color: '#F5F5F0',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          {raas.heading}
        </motion.h2>

        {/* Cards — staggered, with vertical offset cascade on desktop */}
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
              <TiltCard offset={typeof window !== 'undefined' && window.innerWidth >= 768 ? verticalOffsets[i] : 0}>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: '#F5F5F0',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '0.9375rem',
                    color: '#888880',
                    lineHeight: 1.7,
                  }}
                >
                  {card.body}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
