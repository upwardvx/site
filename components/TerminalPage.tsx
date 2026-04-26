'use client'

import React, { useState, useEffect, useRef, Fragment } from 'react'
import { services, credibility, raas, cta, footer } from '@/lib/copy'

// ── Types ──────────────────────────────────────────────────────
type PageId = 'home' | 'about' | 'services' | 'approach' | 'contact'

interface BootLine {
  text: string
  type: 'default' | 'accent' | 'dim'
  delay: number
}

// ── Constants ──────────────────────────────────────────────────
const BOOT_LINES: BootLine[] = [
  { text: 'UVX_OS v2.0.0',                                       type: 'accent',  delay: 0 },
  { text: '',                                                     type: 'default', delay: 150 },
  { text: 'BOOTING RESULTS_ENGINE....................... OK',      type: 'default', delay: 400 },
  { text: 'LOADING OPERATOR_CONTEXT..................... OK',      type: 'default', delay: 700 },
  { text: 'CALIBRATING OUTCOME_METRICS................. OK',      type: 'default', delay: 1000 },
  { text: `VERIFYING CREDENTIALS: ${footer.email.toUpperCase()}`, type: 'default', delay: 1300 },
  { text: 'CREDENTIALS ACCEPTED........................ OK',      type: 'default', delay: 1550 },
  { text: 'DISABLING ADVISORY_MODE.................... DONE',     type: 'default', delay: 1800 },
  { text: 'MOUNTING /services /clients /contact........ OK',     type: 'default', delay: 2100 },
  { text: '',                                                     type: 'default', delay: 2400 },
  { text: 'SYSTEM READY. RESULTS AS A SERVICE ONLINE.',          type: 'accent',  delay: 2700 },
]

const BOOKING_URL = 'https://calendar.app.google/aUBpNXrjnjj6jeUE9'

// ── Helpers ────────────────────────────────────────────────────
function formatUptime(secs: number) {
  const h = Math.floor(secs / 3600).toString().padStart(2, '0')
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

// ── Page Content ───────────────────────────────────────────────

function HomeContent() {
  return (
    <div className="content-box">
      <span className="content-box-label">OPERATOR PROFILE</span>

      <p className="home-name">SIDDHARTH SHAH</p>
      <p className="home-role">Founder, Upward Ventures</p>

      <p className="home-headline">
        10 years inside adtech platforms. Built products at Kiip, InMarket,
        and MomentScience with real revenue consequences — not advisory distance.
      </p>
      <p className="home-tagline">You pay for the outcome, not the hours.</p>

      <div className="home-cta-row">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Book a 30-min call →
        </a>
      </div>
    </div>
  )
}

function AboutContent() {
  return (
    <>
      <p className="page-cmd">cat about.md</p>

      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{
          color: 'var(--accent)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.05em',
          marginBottom: '1.5rem',
        }}>
          # OPERATOR BACKGROUND
        </p>
        <div className="page-body" style={{ maxWidth: 620 }}>
          {credibility.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <hr className="page-divider" />

      <p className="page-cmd">cat creds.txt</p>

      <ul className="proof-list">
        {credibility.proofPoints.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>

      <hr className="page-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p className="prompt">10+ years inside adtech platforms at Kiip, InMarket, MomentScience.</p>
        <p className="prompt">I operate. I don&apos;t advise from the outside.</p>
      </div>

      <div style={{ marginTop: '1.75rem' }}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          {cta.button}
        </a>
      </div>
    </>
  )
}

const LOG_TAGS = ['STRATEGY', 'AUDIT', 'GTM', 'PM'] as const

function ServicesContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const date = todayStr()

  return (
    <>
      <p className="page-cmd">ls -la /services/</p>

      <div className="log-stream">
        {services.items.map((svc, i) => {
          const slug = svc.label.toLowerCase().replace(/\s+/g, '-')
          const isOpen = selected === slug
          return (
            <Fragment key={i}>
              <div
                className={`log-stream-row${isOpen ? ' open' : ''}`}
                onClick={() => setSelected(isOpen ? null : slug)}
              >
                <span className="log-ts">{date} 09:14</span>
                <span className="log-tag">[{LOG_TAGS[i]}]</span>
                <span className="log-name">{svc.label}</span>
                <span className="log-duration">{svc.size}</span>
              </div>
              {isOpen && (
                <div className="log-expand">
                  <p className="log-expand-problem">{svc.problem}</p>
                  <p className="log-expand-outcome">{svc.outcome}</p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    Book a scoping call
                  </a>
                </div>
              )}
            </Fragment>
          )
        })}
      </div>

      <p style={{ color: 'var(--dim)', fontSize: 11 }}>
        Click a row to view outcome details.
      </p>
    </>
  )
}

function ApproachContent() {
  return (
    <>
      <p className="page-cmd">man results-as-a-service</p>

      <div className="man-page">
        <div className="man-header">
          <span>RESULTS-AS-A-SERVICE(1)</span>
          <span>UVX OPERATOR MANUAL</span>
          <span>RESULTS-AS-A-SERVICE(1)</span>
        </div>

        <div className="man-section">
          <p className="man-section-header">NAME</p>
          <p className="man-body">results-as-a-service — outcome-based consulting model</p>
        </div>

        <div className="man-section">
          <p className="man-section-header">SYNOPSIS</p>
          <p className="man-body">engage [--scope PROBLEM] [--outcome RESULT] [--model RAAS]</p>
        </div>

        <div className="man-section">
          <p className="man-section-header">DESCRIPTION</p>
          <p className="man-body">
            You don&apos;t pay for hours. You pay for results. Every engagement is scoped to a
            specific outcome agreed before work begins. That outcome is the contract.
            No invoice for effort.
          </p>
        </div>

        <div className="man-section">
          <p className="man-section-header">SECTIONS</p>
          {raas.cards.map((card, i) => (
            <div key={i}>
              <p className="man-section-sub">
                {String(i + 1).padStart(2, '0')}.&nbsp;&nbsp;{card.title.toUpperCase()}
              </p>
              <p className="man-body">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="man-section">
          <p className="man-section-header">EXIT CONDITION</p>
          <p className="man-body">
            Engagement closes when the agreed outcome is verifiable. Not when the calendar runs
            out. Not when the deck is done. When the result is real.
          </p>
        </div>

        <div className="man-section">
          <p className="man-section-header">SEE ALSO</p>
          <p className="man-body">services(1), contact(1)</p>
        </div>
      </div>

      <hr className="page-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p className="prompt">No hours billed. No effort invoiced.</p>
        <p className="prompt">We agreed on the result. That&apos;s the contract.</p>
      </div>
    </>
  )
}

function ContactContent() {
  return (
    <>
      <p className="page-cmd">mail ss@upwardvx.com</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{
          color: 'var(--accent)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.04em',
          marginBottom: '0.75rem',
        }}>
          # {cta.heading}
        </p>
        <p className="page-body" style={{ fontSize: 13, maxWidth: 520 }}>{cta.sub}</p>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <div className="contact-row">
          <span className="contact-label">Email</span>
          <span className="contact-value">
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
          </span>
        </div>
        <div className="contact-row">
          <span className="contact-label">Calendar</span>
          <span className="contact-value">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              calendar.app.google — 30 min
            </a>
          </span>
        </div>
        <div className="contact-row">
          <span className="contact-label">LinkedIn</span>
          <span className="contact-value">
            <a href={footer.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/siddharthshah
            </a>
          </span>
        </div>
      </div>

      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
        {cta.button}
      </a>

      <div style={{ marginTop: '2.5rem', color: 'var(--dim)', fontSize: 11 }}>
        <p>{footer.copyright}</p>
      </div>
    </>
  )
}

// ── Pages Array ────────────────────────────────────────────────
// Defined outside the component body — no page component closes over parent state.
// HomeContent's onNavigate prop was removed; all other pages were already self-contained.
const PAGES: { id: PageId; label: string; component: React.ComponentType }[] = [
  { id: 'home',     label: 'HOME',     component: HomeContent },
  { id: 'about',    label: 'ABOUT',    component: AboutContent },
  { id: 'services', label: 'SERVICES', component: ServicesContent },
  { id: 'approach', label: 'APPROACH', component: ApproachContent },
  { id: 'contact',  label: 'CONTACT',  component: ContactContent },
]

// ── Main Component ─────────────────────────────────────────────
export default function TerminalPage() {
  const [bootPhase, setBootPhase]     = useState<'booting' | 'fading' | 'done'>('booting')
  const [shownLines, setShownLines]   = useState<BootLine[]>([])
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [uptime, setUptime]           = useState(0)
  const mainRef                       = useRef<HTMLDivElement>(null)

  // Boot sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setShownLines(prev => [...prev, line])
        if (i === BOOT_LINES.length - 1) {
          timers.push(setTimeout(() => setBootPhase('fading'), 800))
          timers.push(setTimeout(() => setBootPhase('done'), 1500))
        }
      }, line.delay)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  // Uptime counter starts after boot
  useEffect(() => {
    if (bootPhase !== 'done') return
    const id = setInterval(() => setUptime(u => u + 1), 1000)
    return () => clearInterval(id)
  }, [bootPhase])

  // Keyboard navigation — functional setState avoids stale closures, no currentPage dep
  useEffect(() => {
    if (bootPhase !== 'done') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentPage(prev => {
          const idx = PAGES.findIndex(p => p.id === prev)
          return PAGES[(idx - 1 + PAGES.length) % PAGES.length].id
        })
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setCurrentPage(prev => {
          const idx = PAGES.findIndex(p => p.id === prev)
          return PAGES[(idx + 1) % PAGES.length].id
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bootPhase])

  // Scroll to top of main output on page change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [currentPage])

  return (
    <div id="app">
      {/* Boot overlay */}
      {bootPhase !== 'done' && (
        <div className={`boot-overlay${bootPhase === 'fading' ? ' fading' : ''}`}>
          {shownLines.map((line, i) => (
            <p
              key={i}
              className={`boot-line${
                line.type === 'accent' ? ' accent' : line.type === 'dim' ? ' dim' : ''
              }`}
            >
              {line.text}
            </p>
          ))}
          {bootPhase === 'booting' && <span className="boot-cursor" />}
        </div>
      )}

      {/* Sys header */}
      <header className="sys-header">
        <div className="sys-left">
          <div className="sys-field"><span className="brand-mark">UVX</span></div>
          <div className="sys-field">SYS.AUTH &nbsp;: <span className="sys-green">ACCEPTING_ENGAGEMENTS</span></div>
          <div className="sys-field">SYS.NODE &nbsp;: <span>UPWARDVX.COM</span></div>
        </div>
        <div className="sys-right">
          <div className="sys-field">UPTIME &nbsp;&nbsp;&nbsp;: <span className="sys-green">{formatUptime(uptime)}</span></div>
          <div className="sys-field">TERMINAL &nbsp;: <span>TTY0</span></div>
          <div className="sys-field">STATUS &nbsp;&nbsp;&nbsp;: <span className="sys-warn">200</span></div>
        </div>
      </header>

      {/* Main content */}
      <div id="main-output" ref={mainRef}>
        <div className="content-well">
          {PAGES.map(p => {
            const PageComponent = p.component
            return (
              <div
                key={p.id}
                className={`page${currentPage === p.id ? ' active' : ''}`}
                aria-hidden={currentPage !== p.id}
              >
                <PageComponent />
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="nav-bar" aria-label="Page navigation">
        <div className="nav-prompt"><span className="sys-green">$</span> cd ~/</div>
        <div className="nav-list">
          {PAGES.map((p, i) => (
            <button
              key={p.id}
              className={`nav-item${currentPage === p.id ? ' active' : ''}`}
              onClick={() => setCurrentPage(p.id)}
              aria-current={currentPage === p.id ? 'page' : undefined}
            >
              {String(i + 1).padStart(2, '0')}. {p.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
