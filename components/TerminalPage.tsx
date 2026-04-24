'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { services, credibility, raas, cta, footer } from '@/lib/copy'

// ── Types ──────────────────────────────────────────────────────
type PageId = 'home' | 'about' | 'services' | 'approach' | 'contact'

interface NavItem {
  id: PageId
  label: string
  cmd: string
}

// ── Constants ──────────────────────────────────────────────────
const NAV: NavItem[] = [
  { id: 'home',     label: 'HOME',     cmd: 'cd ~' },
  { id: 'about',    label: 'ABOUT',    cmd: 'cat about.txt' },
  { id: 'services', label: 'SERVICES', cmd: 'ls -la /services/' },
  { id: 'approach', label: 'APPROACH', cmd: 'man results-as-a-service' },
  { id: 'contact',  label: 'CONTACT',  cmd: 'mail ss@upwardvx.com' },
]

interface BootLine {
  text: string
  type: 'default' | 'accent' | 'dim'
  delay: number
}

const BOOT_LINES: BootLine[] = [
  { text: 'UVX_OS v2.0.0',                                      type: 'accent',  delay: 0 },
  { text: '',                                                    type: 'default', delay: 150 },
  { text: 'BOOTING RESULTS_ENGINE....................... OK',     type: 'default', delay: 400 },
  { text: 'LOADING OPERATOR_CONTEXT..................... OK',     type: 'default', delay: 700 },
  { text: 'CALIBRATING OUTCOME_METRICS................. OK',     type: 'default', delay: 1000 },
  { text: `VERIFYING CREDENTIALS: ${footer.email.toUpperCase()}`, type: 'default', delay: 1300 },
  { text: 'CREDENTIALS ACCEPTED........................ OK',     type: 'default', delay: 1550 },
  { text: 'DISABLING ADVISORY_MODE.................... DONE',    type: 'default', delay: 1800 },
  { text: 'MOUNTING /services /clients /contact........ OK',    type: 'default', delay: 2100 },
  { text: '',                                                    type: 'default', delay: 2400 },
  { text: 'SYSTEM READY. RESULTS AS A SERVICE ONLINE.',         type: 'accent',  delay: 2700 },
]

const BOOKING_URL = 'https://calendar.app.google/aUBpNXrjnjj6jeUE9'

// ── Helpers ────────────────────────────────────────────────────
function formatUptime(secs: number) {
  const h = Math.floor(secs / 3600).toString().padStart(2, '0')
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

// ── Page Content (no .page wrapper — parent handles it) ────────

function HomeContent({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  return (
    <>
      <p className="page-cmd">cd ~</p>

      <p className="page-title">UPWARD VENTURES</p>
      <p className="page-subtitle">Results as a Service // RaaS Operating Model</p>

      <hr className="page-divider" />

      <div className="page-body" style={{ maxWidth: 580 }}>
        <p style={{ color: 'var(--fg)', fontSize: 15, lineHeight: 1.6, marginBottom: '1rem' }}>
          You don&apos;t need more strategy. You need momentum.
        </p>
        <p style={{ color: 'var(--dim-light)', fontSize: 12, lineHeight: 1.8 }}>
          Upward Ventures is built on one idea: you pay for the outcome, not the hours.
          If we don&apos;t hit it, we talk.
        </p>
      </div>

      <hr className="page-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p className="prompt">We define the result before we start.</p>
        <p className="prompt">You pay for the outcome, not the hours.</p>
        <p className="prompt">Operator execution, not advisory distance.</p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
          Book a 30-min call
        </a>
        <button
          className="cta-btn-ghost"
          onClick={() => onNavigate('services')}
        >
          View services
        </button>
      </div>
    </>
  )
}

function AboutContent() {
  return (
    <>
      <p className="page-cmd">cat about.txt</p>
      <p className="page-title">ABOUT</p>
      <p className="page-subtitle">Operator Background // Not an Advisor</p>

      <hr className="page-divider" />

      <div className="page-body" style={{ maxWidth: 620 }}>
        {credibility.story.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <hr className="page-divider" />

      <p style={{ color: 'var(--dim)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Proof Points
      </p>
      <ul className="proof-list">
        {credibility.proofPoints.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>
    </>
  )
}

function ServicesContent() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <p className="page-cmd">ls -la /services/</p>
      <p className="page-title">SERVICES</p>
      <p className="page-subtitle">Where founders usually get stuck</p>

      <hr className="page-divider" />

      <table className="file-table">
        <thead>
          <tr>
            <th>PERM</th>
            <th>SERVICE</th>
            <th>TYPE</th>
            <th>PROBLEM</th>
          </tr>
        </thead>
        <tbody>
          {services.items.map((svc, i) => {
            const slug = svc.label.toLowerCase().replace(/\s+/g, '-')
            return (
              <tr
                key={i}
                onClick={() => setSelected(selected === slug ? null : slug)}
                style={{ cursor: 'pointer' }}
              >
                <td className="file-perm">drwxr-xr-x</td>
                <td className="file-name">{slug}</td>
                <td className="file-label">{svc.label}</td>
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
        Click a service row to view outcome details.
      </p>
    </>
  )
}

function ApproachContent() {
  return (
    <>
      <p className="page-cmd">man results-as-a-service</p>
      <p className="page-title">APPROACH</p>
      <p className="page-subtitle">Results as a Service // What you actually buy</p>

      <hr className="page-divider" />

      {raas.cards.map((card, i) => (
        <div key={i} className="block-card">
          <p className="block-card-num">SECTION {String(i + 1).padStart(2, '0')}</p>
          <p className="block-card-title">{card.title}</p>
          <p className="block-card-body">{card.body}</p>
        </div>
      ))}

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
      <p className="page-title">CONTACT</p>
      <p className="page-subtitle">Start here // 30 minutes, no pitch</p>

      <hr className="page-divider" />

      <div className="page-body" style={{ maxWidth: 520, marginBottom: '1.5rem' }}>
        <p>{cta.sub}</p>
      </div>

      <div>
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

  // Uptime
  useEffect(() => {
    if (bootPhase !== 'done') return
    const id = setInterval(() => setUptime(u => u + 1), 1000)
    return () => clearInterval(id)
  }, [bootPhase])

  // Navigate
  const navigateTo = useCallback((id: PageId) => {
    const idx = NAV.findIndex(n => n.id === id)
    setCurrentPage(id)
    setNavIdx(idx)
    setCmdText(NAV[idx].cmd)
    setTimeout(() => setCmdText(''), 800)
  }, [])

  const navigateToIdx = useCallback((idx: number) => {
    const item = NAV[idx]
    setCurrentPage(item.id)
    setNavIdx(idx)
    setCmdText(item.cmd)
    setTimeout(() => setCmdText(''), 800)
  }, [])

  // Keyboard nav
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

  // Pages manifest
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

      {/* Sys Header */}
      <header className="sys-header">
        <div className="sys-header-left">
          <span>
            <span className="sys-label">SYS.NAME</span>{' '}
            <span className="sys-value">UVX_OS</span>
          </span>
          <span className="sys-sep">|</span>
          <span>
            <span className="sys-label">AUTH</span>{' '}
            <span className="sys-value">GUEST</span>
          </span>
        </div>
        <div className="sys-header-right">
          <span>
            <span className="sys-label">UPTIME</span>{' '}
            <span className="sys-value">{formatUptime(uptime)}</span>
          </span>
          <span className="sys-sep">|</span>
          <span>
            <span className="sys-label">MODE</span>{' '}
            <span className="sys-value" style={{ color: 'var(--warn)' }}>RAAS</span>
          </span>
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

      {/* Nav Bar */}
      <nav className="nav-bar">
        {NAV.map((item, i) => (
          <button
            key={item.id}
            className={`nav-item${navIdx === i ? ' active' : ''}`}
            onClick={() => navigateToIdx(i)}
            aria-label={`Navigate to ${item.label}`}
          >
            <span className="nav-item-bracket">[</span>
            {item.label}
            <span className="nav-item-bracket">]</span>
          </button>
        ))}
      </nav>

      {/* Cmd Bar */}
      <div className="cmd-bar">
        <span className="cmd-prompt">$</span>
        <input
          ref={cmdInputRef}
          type="text"
          className="cmd-input"
          value={cmdText}
          onChange={e => setCmdText(e.target.value)}
          placeholder="type a command or use ← → to navigate"
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
