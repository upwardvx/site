'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { services, credibility, raas, cta, footer } from '@/lib/copy'

// ── Types ──────────────────────────────────────────────────────
type PageId = 'home' | 'about' | 'services' | 'approach' | 'contact'

interface NavItem {
  id: PageId
  num: string
  label: string
  cmd: string
}

// ── Constants ──────────────────────────────────────────────────
const NAV: NavItem[] = [
  { id: 'home',     num: '01', label: '_HOME',     cmd: 'cd ~' },
  { id: 'about',    num: '02', label: '_ABOUT',    cmd: 'cat about.md' },
  { id: 'services', num: '03', label: '_SERVICES', cmd: 'ls -la /services/' },
  { id: 'approach', num: '04', label: '_APPROACH', cmd: 'man results-as-a-service' },
  { id: 'contact',  num: '05', label: '_CONTACT',  cmd: 'mail ss@upwardvx.com' },
]

const ASCII_ART = ` _   _  __   __  __  __
| | | | \\ \\ / /  \\ \\/ /
| | | |  \\ V /    >  <
| |_| |   \\_/    / /\\ \\
 \\___/           /_/  \\_\\`

interface BootLine {
  text: string
  type: 'default' | 'accent' | 'dim'
  delay: number
}

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

// ── Page Content ───────────────────────────────────────────────

function HomeContent({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  return (
    <>
      {/* ASCII Logo */}
      <pre className="ascii-art">{ASCII_ART}</pre>

      {/* whoami */}
      <div className="term-block">
        <p className="term-cmd">whoami</p>
        <div className="term-output">
          <div className="status-table">
            <span className="sk">name</span>
            <span className="sv">siddharth-shah</span>
            <span className="sk">role</span>
            <span className="sv">operator // fractional-exec // results-as-a-service</span>
            <span className="sk">base</span>
            <span className="sv">upwardvx.com</span>
          </div>
        </div>
      </div>

      <hr className="page-divider" />

      {/* cat status.txt */}
      <div className="term-block">
        <p className="term-cmd">cat status.txt</p>
        <div className="term-output">
          <div className="status-table">
            <span className="sk">status</span>
            <span className="sv" style={{ color: 'var(--accent)' }}>ACCEPTING_ENGAGEMENTS</span>
            <span className="sk">focus</span>
            <span className="sv">SERIES_A_FOUNDERS</span>
            <span className="sk">model</span>
            <span className="sv">RAAS — OUTCOME_BASED, NOT HOURLY</span>
            <span className="sk">icp</span>
            <span className="sv">TECHNICAL + NON-TECHNICAL FOUNDERS</span>
            <span className="sk"></span>
            <span className="sv" style={{ color: 'var(--dim-light)', fontStyle: 'normal' }}>
              who are stuck and need someone who&apos;s been inside the machine
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Book a 30-min call
        </a>
        <button className="cta-btn-ghost" onClick={() => onNavigate('services')}>
          View services
        </button>
      </div>

      <p style={{
        marginTop: '2.5rem',
        color: 'var(--dim)',
        fontSize: 11,
        letterSpacing: '0.05em',
        display: 'none',
      }} className="mobile-nav-hint">
        TAP NAV BELOW TO EXPLORE — OR USE ← →
      </p>
    </>
  )
}

function AboutContent() {
  return (
    <>
      <p className="page-cmd">cat about.md</p>

      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
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
        <p className="prompt">I operate, I don&apos;t advise from the outside.</p>
      </div>

      <div style={{ marginTop: '1.75rem' }}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          {cta.button}
        </a>
      </div>
    </>
  )
}

function ServicesContent() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <p className="page-cmd">ls -la /services/</p>

      <table className="file-table">
        <thead>
          <tr>
            <th>SERVICE</th>
            <th>TYPE</th>
            <th>SIZE</th>
            <th>MODIFIED</th>
            <th>PROBLEM</th>
          </tr>
        </thead>
        <tbody>
          {services.items.map((svc, i) => {
            const slug = svc.label.toLowerCase().replace(/\s+/g, '-')
            const isOpen = selected === slug
            return (
              <tr
                key={i}
                onClick={() => setSelected(isOpen ? null : slug)}
                style={{ cursor: 'pointer' }}
              >
                <td className="file-name">{slug}/</td>
                <td className="file-label">{svc.label}</td>
                <td className="file-size">{svc.size}</td>
                <td className="file-mod">{svc.modified}</td>
                <td className="file-desc">{svc.problem}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {selected && (() => {
        const svc = services.items.find(
          s => s.label.toLowerCase().replace(/\s+/g, '-') === selected
        )
        if (!svc) return null
        return (
          <div className="service-detail">
            <p className="service-detail-cmd">{selected}/outcome.txt</p>
            <div className="service-meta">
              <span className="service-meta-key">name</span>
              <span className="service-meta-val">{selected}/</span>
              <span className="service-meta-key">scope</span>
              <span className="service-meta-val">{svc.size}</span>
              <span className="service-meta-key">status</span>
              <span className="service-meta-val" style={{ color: 'var(--accent)' }}>AVAILABLE</span>
            </div>
            <p className="service-outcome-label">Outcome</p>
            <p className="service-outcome">{svc.outcome}</p>
          </div>
        )
      })()}

      <div style={{ marginTop: '2rem' }}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Book a scoping call
        </a>
      </div>
      <p style={{ marginTop: '0.75rem', color: 'var(--dim)', fontSize: 11 }}>
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
              <p className="man-section-sub">{String(i + 1).padStart(2, '0')}.&nbsp;&nbsp;{card.title.toUpperCase()}</p>
              <p className="man-body">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="man-section">
          <p className="man-section-header">EXIT CONDITION</p>
          <p className="man-body">
            Engagement closes when the agreed outcome is verifiable. Not when the calendar runs out.
            Not when the deck is done. When the result is real.
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
        <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
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

// ── Main Component ─────────────────────────────────────────────
export default function TerminalPage() {
  const [bootPhase, setBootPhase]     = useState<'booting' | 'fading' | 'done'>('booting')
  const [shownLines, setShownLines]   = useState<BootLine[]>([])
  const [navIdx, setNavIdx]           = useState(0)
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [uptime, setUptime]           = useState(0)
  const [cmdText, setCmdText]         = useState('')
  const cmdInputRef = useRef<HTMLInputElement>(null)

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

  // Navigate to a page by id
  const navigateTo = useCallback((id: PageId) => {
    const idx = NAV.findIndex(n => n.id === id)
    setCurrentPage(id)
    setNavIdx(idx)
    setCmdText(NAV[idx].cmd)
    setTimeout(() => setCmdText(''), 800)
  }, [])

  // Navigate to a page by index
  const navigateToIdx = useCallback((idx: number) => {
    const item = NAV[idx]
    setCurrentPage(item.id)
    setNavIdx(idx)
    setCmdText(item.cmd)
    setTimeout(() => setCmdText(''), 800)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (bootPhase !== 'done') return
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement === cmdInputRef.current) return
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setNavIdx(prev => {
          const next = (prev - 1 + NAV.length) % NAV.length
          navigateToIdx(next)
          return next
        })
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setNavIdx(prev => {
          const next = (prev + 1) % NAV.length
          navigateToIdx(next)
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bootPhase, navigateToIdx])

  // Scroll to top on page change
  useEffect(() => {
    document.querySelector('.terminal-main')?.scrollTo({ top: 0 })
  }, [currentPage])

  const PAGES: { id: PageId; content: React.ReactNode }[] = [
    { id: 'home',     content: <HomeContent onNavigate={navigateTo} /> },
    { id: 'about',    content: <AboutContent /> },
    { id: 'services', content: <ServicesContent /> },
    { id: 'approach', content: <ApproachContent /> },
    { id: 'contact',  content: <ContactContent /> },
  ]

  return (
    <>
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

      {/* Sys Header — 2 rows */}
      <header className="sys-header">
        <div className="sys-row">
          <div className="sys-row-left">
            <span>
              <span className="sys-label">SYS.NAME</span>{' '}
              <span className="sys-value">UVX_OS</span>
            </span>
            <span className="sys-sep">|</span>
            <span>
              <span className="sys-label">AUTH</span>{' '}
              <span className="sys-value">GUEST</span>
            </span>
            <span className="sys-sep">|</span>
            <span>
              <span className="sys-label">NODE</span>{' '}
              <span className="sys-value">UPWARDVX.COM</span>
            </span>
          </div>
          <div className="sys-row-right">
            <span>
              <span className="sys-label">UPTIME</span>{' '}
              <span className="sys-value">{formatUptime(uptime)}</span>
            </span>
            <span className="sys-sep">|</span>
            <span>
              <span className="sys-label">MODE</span>{' '}
              <span className="sys-value sys-warn">RAAS</span>
            </span>
          </div>
        </div>
        <div className="sys-row">
          <div className="sys-row-left">
            <span>
              <span className="sys-label">STATUS</span>{' '}
              <span className="sys-value" style={{ color: 'var(--fg)', opacity: 0.85 }}>ACCEPTING_ENGAGEMENTS</span>
            </span>
          </div>
          <div className="sys-row-right">
            <span>
              <span className="sys-label">FOCUS</span>{' '}
              <span className="sys-value" style={{ color: 'var(--fg)', opacity: 0.85 }}>SERIES_A_FOUNDERS</span>
            </span>
            <span className="sys-sep">|</span>
            <span>
              <span className="sys-label">TERMINAL</span>{' '}
              <span className="sys-value" style={{ color: 'var(--dim-light)' }}>v2.0.0</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="terminal-main">
        {PAGES.map(({ id, content }) => (
          <div key={id} className={`page${currentPage === id ? ' active' : ''}`}>
            {content}
          </div>
        ))}
      </main>

      {/* Nav Hint Bar */}
      <div className="nav-hint-bar">
        <span className="nav-hint-prompt">root@uvx:~/nav$</span>
        <span>SELECT MODULE</span>
        <span className="nav-hint-keys">← → OR CLICK</span>
      </div>

      {/* Nav Bar */}
      <nav className="nav-bar">
        {NAV.map((item, i) => (
          <button
            key={item.id}
            className={`nav-item${navIdx === i ? ' active' : ''}`}
            onClick={() => navigateToIdx(i)}
            aria-label={`Navigate to ${item.label}`}
          >
            <span className="nav-num">{item.num}.</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Cmd Bar */}
      <div className="cmd-bar">
        <span className="cmd-prompt">uvx@upwardvx:~$</span>
        <input
          ref={cmdInputRef}
          type="text"
          className="cmd-input"
          value={cmdText}
          onChange={e => setCmdText(e.target.value)}
          placeholder="type a command..."
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const val = cmdText.trim().toLowerCase()
              const match = NAV.find(n =>
                val.includes(n.id) || n.cmd.toLowerCase().includes(val)
              )
              if (match) navigateTo(match.id)
              setCmdText('')
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <span className="cmd-hint">← → NAV</span>
      </div>
    </>
  )
}
