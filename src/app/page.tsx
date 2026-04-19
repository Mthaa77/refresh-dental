'use client'

import dynamic from 'next/dynamic'
import ScrollProgress from '@/components/refresh-dental/scroll-progress'
import Navigation from '@/components/refresh-dental/navigation'
import PromoBanner from '@/components/refresh-dental/promo-banner'
import Hero from '@/components/refresh-dental/hero'
import StatsBar from '@/components/refresh-dental/stats-bar'
import TreatmentProcess from '@/components/refresh-dental/treatment-process'
import TrustIndicators from '@/components/refresh-dental/trust-indicators'
import AboutSection from '@/components/refresh-dental/about-section'
import GallerySection from '@/components/refresh-dental/gallery-section'
import TechnologySection from '@/components/refresh-dental/technology-section'
import TeamSection from '@/components/refresh-dental/team-section'
import ValuesSection from '@/components/refresh-dental/values-section'
import ServicesGrid from '@/components/refresh-dental/services-grid'
import ParallaxStatement from '@/components/refresh-dental/parallax-statement'
import Testimonials from '@/components/refresh-dental/testimonials'
import BeforeAfterSection from '@/components/refresh-dental/before-after-section'
import PaymentSection from '@/components/refresh-dental/payment-section'
import FAQSection from '@/components/refresh-dental/faq-section'
import CorporateWellnessSection from '@/components/refresh-dental/corporate-wellness-section'
import DentalTipsSection from '@/components/refresh-dental/dental-tips-section'
import InstagramFeed from '@/components/refresh-dental/instagram-feed'
import ContactSection from '@/components/refresh-dental/contact-section'
import NewsletterCta from '@/components/refresh-dental/newsletter-cta'
import Footer from '@/components/refresh-dental/footer'
import WhatsAppButton from '@/components/refresh-dental/whatsapp-button'
import CookieConsent from '@/components/refresh-dental/cookie-consent'
import ScrollToTop from '@/components/refresh-dental/scroll-to-top'

const LoadingScreen = dynamic(
  () => import('@/components/refresh-dental/loading-screen'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />
      <PromoBanner />
      <main className="min-h-screen">
        <Hero />
        <StatsBar />
        <TreatmentProcess />
        <TrustIndicators />
        <AboutSection />
        <TeamSection />
        <GallerySection />
        <TechnologySection />
        <ValuesSection />
        <ServicesGrid />
        <ParallaxStatement />
        <Testimonials />
        <BeforeAfterSection />
        <PaymentSection />
        <FAQSection />
        <CorporateWellnessSection />
        <DentalTipsSection />
        <InstagramFeed />
        <ContactSection />
        <NewsletterCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </>
  )
}
