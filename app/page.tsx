import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import TheShift from '@/components/sections/TheShift'
import RaaS from '@/components/sections/RaaS'
import Services from '@/components/sections/Services'
import Credibility from '@/components/sections/Credibility'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main style={{ background: '#080808' }}>
      <Nav />
      <Hero />
      <TheShift />
      <RaaS />
      <Services />
      <Credibility />
      <CTA />
      <Footer />
    </main>
  )
}
