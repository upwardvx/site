import { footer } from '@/lib/copy'

// Hover handled via CSS — no JS needed for footer links

export default function Footer() {
  return (
    <footer
      className="section-dark w-full"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '2rem clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ maxWidth: '1280px' }}
      >
        <span
          className="text-xs"
          style={{ color: 'var(--color-muted-dark)', fontFamily: 'var(--font-body)' }}
        >
          {footer.copyright}
        </span>
        <a
          href={`mailto:${footer.email}`}
          className="text-xs footer-link"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {footer.email}
        </a>
        <a
          href={footer.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs footer-link"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
