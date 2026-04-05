'use client'
import { motion } from 'framer-motion'

interface SceneProps {
  onNext: () => void
}

const PROOF_POINTS = [
  { label: 'Built', value: 'Moments SDK from the ground up — publisher integrations at scale' },
  { label: 'Operated', value: 'at the intersection of product, revenue, and engineering simultaneously' },
  { label: 'Shipped', value: 'design-forward deliverables — every output crafted, not generated' },
]

export default function SceneProof({ onNext }: SceneProps) {
  return (
    <section
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0A0905',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
        paddingTop: 'calc(clamp(1.5rem, 5vw, 4rem) + 80px)',
        gap: '4vw',
      }}
    >
      {/* Left — ghost number */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: 'clamp(10rem, 22vw, 26rem)',
            lineHeight: 1,
            color: 'rgba(201,169,110,0.06)',
            userSelect: 'none',
            display: 'block',
            letterSpacing: '-0.04em',
          }}
        >
          01
        </span>

        {/* Proof points — sits over ghost number */}
        <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
          {PROOF_POINTS.map((pt, i) => (
            <motion.div
              key={pt.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                  minWidth: '5rem',
                  paddingTop: '0.15rem',
                }}
              >
                {pt.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,0.4)',
                  maxWidth: '28ch',
                }}
              >
                {pt.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right — the story */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '2rem',
          }}
        >
          Operator proof — not advisor theory
        </p>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '42ch',
          }}
        >
          At MomentScience, we ran a two-sided platform for two years trying to serve everyone equally.
          Good enough for everyone. Great for no one.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '42ch',
            marginTop: '1.25rem',
          }}
        >
          When we focused on{' '}
          <span style={{ color: '#C9A96E' }}>mid-size premium publishers</span>
          , win rates, retention, and NPS all improved within two quarters.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: '42ch',
            marginTop: '1.25rem',
          }}
        >
          ICP confusion disguised as a sales problem. It&apos;s the most common thing I see at Series A.
          It&apos;s fixable.
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={onNext}
          style={{
            marginTop: '2.5rem',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(201,169,110,0.5)'
            el.style.color = '#C9A96E'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(255,255,255,0.12)'
            el.style.color = 'rgba(255,255,255,0.45)'
          }}
        >
          <span>Let&apos;s talk</span>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}
