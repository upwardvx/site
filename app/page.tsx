import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import Tagline from '@/components/sections/Tagline'
import TheShift from '@/components/sections/TheShift'
import RaaS from '@/components/sections/RaaS'
import Services from '@/components/sections/Services'
import Credibility from '@/components/sections/Credibility'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import SectionProgress from '@/components/SectionProgress'

export default function Home() {
  return (
    <main>
      <Nav />
      <SectionProgress />
      <div id="section-hero"><Hero /></div>
      <div id="section-tagline"><Tagline /></div>
      <div id="section-shift"><TheShift /></div>
      <div id="section-raas"><RaaS /></div>
      <div id="section-services"><Services /></div>
      <div id="section-credibility"><Credibility /></div>
      <div id="section-cta"><CTA /></div>
      <Footer />
    </main>
  )
}
