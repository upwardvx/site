import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Barlow } from 'next/font/google'
import LenisProvider from '@/components/LenisProvider'
import './globals.css'

const geist = Geist({
  variable: '--font-body',
  subsets: ['latin'],
})

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
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
    <html lang="en" className={`${geist.variable} ${barlow.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
