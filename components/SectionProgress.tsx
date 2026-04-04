'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'section-hero', label: 'Intro' },
  { id: 'section-shift', label: 'The Shift' },
  { id: 'section-raas', label: 'How It Works' },
  { id: 'section-services', label: 'Services' },
  { id: 'section-credibility', label: 'Why It Works' },
  { id: 'section-cta', label: 'Book a Call' },
]

export default function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed right-7 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-[14px]"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center justify-end gap-3"
          aria-label={`Go to ${section.label}`}
        >
          {/* Hover label */}
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-right text-xs whitespace-nowrap pointer-events-none"
            style={{
              color: '#888880',
              fontFamily: 'var(--font-geist-sans)',
              letterSpacing: '0.05em',
            }}
          >
            {section.label}
          </span>

          {/* Dash indicator */}
          <motion.div
            animate={{
              width: activeIndex === i ? 22 : 5,
              opacity: activeIndex === i ? 1 : 0.25,
              backgroundColor: activeIndex === i ? '#C9A96E' : '#ffffff',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ height: 2, borderRadius: 1, flexShrink: 0 }}
          />
        </button>
      ))}
    </nav>
  )
}
