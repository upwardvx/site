'use client'
import { motion } from 'framer-motion'

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

      {/* Floating geometric decorations */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <span style={{ position: 'absolute', top: '18%', left: '12%', fontSize: '1.5rem', color: 'rgba(0,0,0,0.12)', fontWeight: 300, fontFamily: 'var(--font-body)' }}>+</span>
        <div style={{ position: 'absolute', top: '14%', right: '28%', width: 8, height: 8, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)' }} />
        <span style={{ position: 'absolute', bottom: '30%', left: '8%', fontSize: '1.1rem', color: 'rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)' }}>Σ</span>
        <span style={{ position: 'absolute', top: '25%', right: '8%', fontSize: '1rem', color: 'rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)' }}>Ω</span>
        <div style={{ position: 'absolute', bottom: '22%', right: '24%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'absolute', top: '55%', left: '6%', width: '4vw', height: '1px', background: 'rgba(0,0,0,0.12)' }} />
      </div>

      {/* UPWARD — massive text, bottom-left, BEHIND image (z-index 1) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', bottom: '10%', left: '3vw', zIndex: 1 }}
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
      </motion.div>

      {/* Center image — OVER text (z-index 2) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '8%',
          left: '28%',
          width: '42%',
          height: '82%',
          zIndex: 2,
          overflow: 'visible',
          borderRadius: '2px',
        }}
      >
        {/* Image placeholder — split half/half */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '2px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#B8B5AE' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: '#3A3835' }} />
          <div style={{ position: 'absolute', top: '15%', left: '44%', width: '12%', height: '70%', background: 'rgba(197,201,0,0.55)', mixBlendMode: 'multiply' }} />
        </div>

        {/* SVG orbit rings */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '130%',
            height: '130%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
          viewBox="0 0 400 400"
          fill="none"
        >
          <ellipse
            cx="200" cy="200" rx="185" ry="80"
            stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="4 6"
            style={{ transformOrigin: '200px 200px', animation: 'orbitSpin 18s linear infinite' }}
          />
          <ellipse
            cx="200" cy="200" rx="160" ry="55"
            stroke="rgba(197,201,0,0.2)" strokeWidth="1" strokeDasharray="3 8"
            style={{ transformOrigin: '200px 200px', animation: 'orbitSpin 24s linear infinite reverse' }}
          />
        </svg>

        {/* Yellow-green orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '-5%',
            right: '-8%',
            width: 'clamp(2rem, 4vw, 3.5rem)',
            height: 'clamp(2rem, 4vw, 3.5rem)',
            borderRadius: '50%',
            background: '#C5C900',
            boxShadow: '0 0 40px rgba(197,201,0,0.4)',
          }}
        />
      </motion.div>

      {/* Right column — definition + nav (z-index 3, in front of image) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        className="hidden md:flex flex-col justify-center"
        style={{ position: 'absolute', top: '22%', right: '4vw', width: '18%', zIndex: 3 }}
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
