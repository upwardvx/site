import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Upward Ventures — Results as a Service',
  description: 'You pay for the outcome, not the hours. Consulting for founders who need momentum.',
  openGraph: {
    title: 'Upward Ventures — Results as a Service',
    description: 'You pay for the outcome, not the hours.',
    url: 'https://upwardvx.com',
    siteName: 'Upward Ventures',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  )
}
