'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/refresh-dental/navigation'
import Hero from '@/components/refresh-dental/hero'
import StatsBar from '@/components/refresh-dental/stats-bar'
import AboutSection from '@/components/refresh-dental/about-section'
import GallerySection from '@/components/refresh-dental/gallery-section'
import ValuesSection from '@/components/refresh-dental/values-section'
import ServicesGrid from '@/components/refresh-dental/services-grid'
import ParallaxStatement from '@/components/refresh-dental/parallax-statement'
import Testimonials from '@/components/refresh-dental/testimonials'
import PaymentSection from '@/components/refresh-dental/payment-section'
import FAQSection from '@/components/refresh-dental/faq-section'
import CorporateWellnessSection from '@/components/refresh-dental/corporate-wellness-section'
import ContactSection from '@/components/refresh-dental/contact-section'
import NewsletterCta from '@/components/refresh-dental/newsletter-cta'
import Footer from '@/components/refresh-dental/footer'
import WhatsAppButton from '@/components/refresh-dental/whatsapp-button'
import ScrollToTop from '@/components/refresh-dental/scroll-to-top'

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
        <GallerySection />
        <ValuesSection />
        <ServicesGrid />
        <ParallaxStatement />
        <Testimonials />
        <PaymentSection />
        <FAQSection />
        <CorporateWellnessSection />
        <ContactSection />
        <NewsletterCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
