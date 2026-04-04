'use client'
import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'section-hero', label: 'Intro' },
  { id: 'section-tagline', label: 'Tagline' },
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
      className="fixed right-7 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-[10px]"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="text-right text-[10px] uppercase tracking-[0.1em] transition-all duration-200"
          aria-label={`Go to ${section.label}`}
          style={{
            color: activeIndex === i ? '#000000' : 'rgba(0,0,0,0.25)',
            fontFamily: 'var(--font-body)',
            fontWeight: activeIndex === i ? 700 : 400,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
