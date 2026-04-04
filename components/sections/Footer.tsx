import { footer } from '@/lib/copy'

// Hover handled via CSS — no JS needed for footer links

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        borderTop: '1px solid #1E1E1E',
        padding: '2rem clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ maxWidth: '1280px' }}
      >
        <span
          className="text-xs"
          style={{ color: '#888880', fontFamily: 'var(--font-geist-sans)' }}
        >
          {footer.copyright}
        </span>
        <a
          href={`mailto:${footer.email}`}
          className="text-xs footer-link"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {footer.email}
        </a>
        <a
          href={footer.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs footer-link"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
