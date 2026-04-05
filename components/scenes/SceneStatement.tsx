'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => null,
})

interface SceneProps {
  onNext: () => void
}

export default function SceneStatement({ onNext }: SceneProps) {
  return (
    <section
      style={{
        position: 'absolute',
        inset: 0,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
        paddingTop: 'calc(clamp(1.5rem, 5vw, 4rem) + 72px)',
      }}
    >
      {/* Particles */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <ParticleField />
      </div>

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content — sits above particles */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBottom: 'clamp(3rem, 6vh, 5rem)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '2rem',
            }}
          >
            Upward Ventures — 2024
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.025em',
              color: '#F5F5F0',
              textTransform: 'uppercase',
              maxWidth: '14ch',
            }}
          >
            You don&apos;t need more strategy.
          </h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
              maxWidth: '14ch',
              marginTop: '0.06em',
            }}
          >
            You need momentum.
          </motion.h2>
        </motion.div>

        {/* Continue hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={onNext}
          style={{
            marginTop: '3rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)')}
        >
          <span>The proof</span>
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
            <path d="M0 7h26M20 1l6 6-6 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </section>
  )
}
