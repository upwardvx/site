'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => null,
})

const SECTION_NAV = [
  { label: 'Our Story',    href: '#section-shift'    },
  { label: 'How It Works', href: '#section-raas'     },
  { label: 'Services',     href: '#section-services' },
  { label: 'Contact',      href: '#section-cta'      },
]

export default function Hero() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden section-light"
      style={{ height: '100dvh', scrollSnapAlign: 'start' }}
    >
      {/* Large filled circle arc — top-right, partially off-screen */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-28%',
          right: '-10%',
          width: '56vw',
          height: '56vw',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.034)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Subtle decorative marks */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <span style={{ position: 'absolute', top: '18%', left: '12%', fontSize: '1.5rem', color: 'rgba(0,0,0,0.12)', fontWeight: 300, fontFamily: 'var(--font-body)' }}>+</span>
        <div style={{ position: 'absolute', top: '14%', left: '48%', width: 8, height: 8, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)' }} />
        <span style={{ position: 'absolute', bottom: '30%', left: '8%', fontSize: '1.1rem', color: 'rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)' }}>Σ</span>
        <div style={{ position: 'absolute', bottom: '22%', right: '24%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'absolute', top: '55%', left: '6%', width: '4vw', height: '1px', background: 'rgba(0,0,0,0.12)' }} />
      </div>

      {/* ParticleField — mouse-responsive 3D particles, lazy loaded */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <ParticleField />
      </div>

      {/* Top-left label */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-[7%] left-[3vw] text-[10px] uppercase tracking-[0.16em]"
        style={{
          color: 'rgba(0,0,0,0.35)',
          fontFamily: 'var(--font-body)',
          zIndex: 4,
        }}
      >
        Results as a Service
      </motion.p>

      {/* UPWARD — massive, bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', bottom: '8%', left: '3vw', zIndex: 4 }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: 'clamp(5.5rem, 14vw, 17rem)',
            lineHeight: 0.82,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          UPWARD
        </h1>

        {/* Sub-line — tagline anchored under heading */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 hidden md:block"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
            color: 'rgba(0,0,0,0.45)',
            letterSpacing: '0.02em',
            maxWidth: '44ch',
          }}
        >
          You don&apos;t need more strategy. You need momentum.
        </motion.p>
      </motion.div>

      {/* VENTURES. — bottom-right, offset */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '3vw',
          zIndex: 4,
          textAlign: 'right',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 200,
            fontSize: 'clamp(1.8rem, 4vw, 5rem)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.18)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          VENTURES.
        </span>
      </motion.div>

      {/* Right column — definition + nav */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        className="hidden md:flex flex-col justify-center"
        style={{ position: 'absolute', top: '22%', right: '4vw', width: '18%', zIndex: 4 }}
      >
        <p
          className="text-xs leading-relaxed mb-6"
          style={{
            color: 'var(--color-muted-light)',
            fontFamily: 'var(--font-body)',
            maxWidth: '18ch',
          }}
        >
          Upward Ventures (/ˈʌpwərd/; 2024 —) The outcome-based firm for founders who&apos;ve outgrown advice.
        </p>

        <hr style={{ borderColor: 'rgba(0,0,0,0.12)', marginBottom: '1.5rem' }} />

        <nav className="flex flex-col gap-3">
          {SECTION_NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-left text-xs uppercase tracking-[0.1em] transition-colors duration-200"
              style={{
                color: 'var(--color-muted-light)',
                fontFamily: 'var(--font-body)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted-light)' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Scroll to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-body)' }}>
          scroll to explore
        </p>
      </motion.div>
    </section>
  )
}
