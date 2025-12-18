import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ExpertSection from '@/components/ExpertSection'
import CTA from '@/components/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <ExpertSection />
      <CTA />
    </div>
  )
} 