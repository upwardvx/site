'use client'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { services } from '@/lib/copy'

// Unique orbital SVG graphic per service
function ServiceGraphic({ index }: { index: number }) {
  const shared = { width: '100%', height: '100%' } as const

  if (index === 0) {
    // Product Strategy — crosshair / target
    return (
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={shared}>
        <ellipse cx="150" cy="150" rx="120" ry="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6"
          style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 20s linear infinite' }} />
        <ellipse cx="150" cy="150" rx="80" ry="33" stroke="rgba(197,201,0,0.18)" strokeWidth="1" strokeDasharray="3 8"
          style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 15s linear infinite reverse' }} />
        <circle cx="150" cy="150" r="6" fill="#C5C900" opacity="0.9" />
        <line x1="150" y1="60" x2="150" y2="106" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="150" y1="194" x2="150" y2="240" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="60" y1="150" x2="106" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="194" y1="150" x2="240" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      </svg>
    )
  }

  if (index === 1) {
    // Technology Audit — intersecting ellipses
    return (
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={shared}>
        <ellipse cx="150" cy="150" rx="130" ry="55" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 8" />
        <ellipse cx="120" cy="150" rx="90" ry="38" stroke="rgba(255,255,255,0.09)" strokeWidth="1"
          style={{ transformOrigin: '120px 150px', animation: 'orbitSpin 22s linear infinite' }} />
        <ellipse cx="180" cy="150" rx="90" ry="38" stroke="rgba(197,201,0,0.16)" strokeWidth="1"
          style={{ transformOrigin: '180px 150px', animation: 'orbitSpin 18s linear infinite reverse' }} />
        <circle cx="150" cy="150" r="5" fill="#C5C900" opacity="0.85" />
      </svg>
    )
  }

  if (index === 2) {
    // GTM Plan — concentric converging orbits
    return (
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={shared}>
        <ellipse cx="150" cy="150" rx="130" ry="55" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 8"
          style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 26s linear infinite' }} />
        <ellipse cx="150" cy="150" rx="90" ry="38" stroke="rgba(197,201,0,0.14)" strokeWidth="1"
          style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 18s linear infinite reverse' }} />
        <ellipse cx="150" cy="150" rx="52" ry="22" stroke="rgba(197,201,0,0.28)" strokeWidth="1"
          style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 11s linear infinite' }} />
        <circle cx="150" cy="150" r="5" fill="#C5C900" opacity="0.95" />
      </svg>
    )
  }

  // index === 3 — Product Management: arc with nodes
  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={shared}>
      <ellipse cx="150" cy="150" rx="120" ry="50" stroke="rgba(197,201,0,0.1)" strokeWidth="1" strokeDasharray="4 6"
        style={{ transformOrigin: '150px 150px', animation: 'orbitSpin 20s linear infinite' }} />
      <path d="M 50 210 Q 150 60 250 210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
      <circle cx="50" cy="210" r="5" fill="rgba(255,255,255,0.25)" />
      <circle cx="150" cy="117" r="8" fill="#C5C900" opacity="0.9" />
      <circle cx="250" cy="210" r="5" fill="rgba(255,255,255,0.25)" />
      <line x1="50" y1="210" x2="150" y2="117" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <line x1="150" y1="117" x2="250" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    </svg>
  )
}

export default function Services() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const total = services.items.length

  return (
    <section
      className="section-dark w-full relative overflow-hidden"
      style={{ minHeight: '100dvh', scrollSnapAlign: 'start' }}
    >
      <div className="flex" style={{ minHeight: '100dvh' }}>

        {/* ── Left panel ── */}
        <div
          className="hidden md:flex flex-col justify-between"
          style={{
            width: '28%',
            flexShrink: 0,
            padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 3vw, 3.5rem)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Top: label + large ghost counter */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.14em] mb-8"
              style={{ color: '#C5C900', fontFamily: 'var(--font-body)' }}
            >
              Services
            </p>
            <div
              style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.05)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Middle: two text blocks */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5rem', padding: '2rem 0' }}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-body)' }}>
                The problem
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                Most engagements produce deliverables. Ours produce decisions. Here&apos;s where founders usually get stuck.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-body)' }}>
                The outcome
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                Defined before we start. If it&apos;s not achievable, we say so. No surprises, no scope creep.
              </p>
            </div>
          </div>

          {/* Bottom: prev/next + counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous service"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next service"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Right panel: Swiper ── */}
        <div className="flex-1 relative" style={{ overflow: 'hidden' }}>
          <Swiper
            onSwiper={(s) => { swiperRef.current = s }}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            slidesPerView={1}
            style={{ height: '100%', minHeight: '100dvh' }}
          >
            {services.items.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    height: '100dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Orbital SVG graphic centered in slide */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -58%)',
                      width: 'min(55vw, 480px)',
                      height: 'min(55vw, 480px)',
                      opacity: 0.75,
                      pointerEvents: 'none',
                    }}
                  >
                    <ServiceGraphic index={i} />
                  </div>

                  {/* Content block — bottom of slide */}
                  <div style={{ position: 'relative', zIndex: 1, maxWidth: '30rem' }}>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                      style={{ color: '#C5C900', fontFamily: 'var(--font-body)' }}
                    >
                      {item.label}
                    </p>
                    <h3
                      className="mb-4 leading-tight"
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.08,
                      }}
                    >
                      {item.problem}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: 'var(--color-muted-dark)',
                        lineHeight: 1.7,
                      }}
                    >
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile nav overlay */}
          <div
            className="md:hidden"
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 10,
            }}
          >
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          {/* Subtle curved bottom line */}
          <svg
            aria-hidden="true"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0 }}
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 80 Q500 0 1000 80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>
        </div>

      </div>
    </section>
  )
}
