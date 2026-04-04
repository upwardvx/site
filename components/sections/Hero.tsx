'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { hero } from '@/lib/copy'
import { spring } from '@/lib/motion'

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
})

const BOOKING_URL = 'https://calendar.google.com/calendar/appointments'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll<HTMLElement>('.word')
    gsap.fromTo(
      words,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.065, ease: 'power3.out', delay: 0.35 }
    )
  }, [])

  const words = hero.headline.split(' ')

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Particle field — decorative, right-side atmosphere */}
      <div className="absolute inset-0" aria-hidden="true">
        <ParticleField />
      </div>

      {/* Radial warm glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 30% 60%, rgba(201,169,110,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto w-full px-6 md:px-20 pt-36 pb-24"
        style={{ maxWidth: '1280px' }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-xs font-semibold uppercase tracking-[0.14em] mb-10"
          style={{ color: '#C9A96E', fontFamily: 'var(--font-geist-sans)' }}
        >
          Results as a Service
        </motion.p>

        {/* Headline — GSAP word-by-word */}
        <h1
          ref={headlineRef}
          className="font-bold leading-[0.93] mb-8 max-w-4xl"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: '#F5F5F0',
            letterSpacing: '-0.02em',
          }}
          aria-label={hero.headline}
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.22em] opacity-0">
              {word}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.9 }}
          className="mb-12 leading-relaxed max-w-lg"
          style={{
            color: '#888880',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
          }}
        >
          {hero.sub}
        </motion.p>

        {/* CTA */}
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.1 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97, y: 1 }}
          className="inline-block text-sm font-semibold px-7 py-4 rounded-md"
          style={{
            background: '#C9A96E',
            color: '#080808',
            fontFamily: 'var(--font-geist-sans)',
            transition: 'box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 36px rgba(201,169,110,0.28)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          {hero.cta}
        </motion.a>
      </div>
    </section>
  )
}
