'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/refresh-dental/navigation'
import Hero from '@/components/refresh-dental/hero'
import StatsBar from '@/components/refresh-dental/stats-bar'
import AboutSection from '@/components/refresh-dental/about-section'
import ServicesGrid from '@/components/refresh-dental/services-grid'
import ParallaxStatement from '@/components/refresh-dental/parallax-statement'
import Testimonials from '@/components/refresh-dental/testimonials'
import PaymentSection from '@/components/refresh-dental/payment-section'
import LocationSection from '@/components/refresh-dental/location-section'
import NewsletterCta from '@/components/refresh-dental/newsletter-cta'
import Footer from '@/components/refresh-dental/footer'
import WhatsAppButton from '@/components/refresh-dental/whatsapp-button'

const LoadingScreen = dynamic(
  () => import('@/components/refresh-dental/loading-screen'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <StatsBar />
        <AboutSection />
        <ServicesGrid />
        <ParallaxStatement />
        <Testimonials />
        <PaymentSection />
        <LocationSection />
        <NewsletterCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
