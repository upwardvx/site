'use client'
import { motion } from 'framer-motion'
import { credibility } from '@/lib/copy'
import { spring, staggerContainer, staggerChild } from '@/lib/motion'

// Paragraphs with accent phrases highlighted on scroll entry
const storyParagraphs = [
  {
    text: credibility.story[0],
    highlight: 'good enough for everyone, great for no one',
  },
  {
    text: credibility.story[1],
    highlight: 'Win rates, retention, and NPS all improved within two quarters',
  },
  {
    text: credibility.story[2],
    highlight: 'ICP confusion disguised as a sales efficiency problem',
  },
]

function HighlightParagraph({
  text,
  highlight,
  delay,
}: {
  text: string
  highlight: string
  delay: number
}) {
  const idx = text.indexOf(highlight)
  if (idx === -1) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ ...spring, delay }}
        className="leading-[1.8]"
        style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '1rem',
          color: '#888880',
        }}
      >
        {text}
      </motion.p>
    )
  }

  const before = text.slice(0, idx)
  const after = text.slice(idx + highlight.length)

  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...spring, delay }}
      className="leading-[1.8]"
      style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '1rem',
        color: '#888880',
      }}
    >
      {before}
      <motion.span
        initial={{ color: '#888880' }}
        whileInView={{ color: '#C9A96E' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        {highlight}
      </motion.span>
      {after}
    </motion.p>
  )
}

export default function Credibility() {
  return (
    <section
      className="w-full flex flex-col justify-center"
      style={{
        background: '#080808',
        minHeight: '100dvh',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        scrollSnapAlign: 'start',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1280px' }}
      >
        <div style={{ maxWidth: '56rem' }}>
          {/* Label */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em] mb-8"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
          >
            Why it works
          </p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={spring}
            className="mb-12"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 700,
              color: '#F5F5F0',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            {credibility.heading}
          </motion.h2>

          {/* Story paragraphs */}
          <div className="space-y-6 mb-14">
            {storyParagraphs.map((p, i) => (
              <HighlightParagraph
                key={i}
                text={p.text}
                highlight={p.highlight}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Proof points */}
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4"
          >
            {credibility.proofPoints.map((point, i) => (
              <motion.li
                key={i}
                variants={staggerChild}
                className="pl-4 text-sm font-medium leading-relaxed"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  color: '#888880',
                  borderLeft: '2px solid #C9A96E',
                }}
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
