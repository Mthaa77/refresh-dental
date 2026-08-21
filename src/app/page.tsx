'use client'

import dynamic from 'next/dynamic'

import ScrollProgress from '@/components/refresh-dental/scroll-progress'
import Navigation from '@/components/refresh-dental/navigation'
import Hero from '@/components/refresh-dental/hero'
import CareJourneys from '@/components/refresh-dental/care-journeys'
import PatientConfidence from '@/components/refresh-dental/patient-confidence'
import PracticeShowcase from '@/components/refresh-dental/practice-showcase'
import FirstVisitFAQ from '@/components/refresh-dental/first-visit-faq'
import styles from './premium-typography.module.css'

function SectionSkeleton({ height = 'h-40' }: { height?: string }) {
  return <div className={`${height} bg-ivory/50 animate-pulse`} aria-hidden="true" />
}

const PageSectionsNav = dynamic(() => import('@/components/refresh-dental/page-sections-nav'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/refresh-dental/whatsapp-button'), { ssr: false })
const ScrollToTop = dynamic(() => import('@/components/refresh-dental/scroll-to-top'), { ssr: false })
const AccessibilityPanel = dynamic(() => import('@/components/refresh-dental/theme-toggle'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/refresh-dental/cookie-consent'), { ssr: false })

const TrustTicker = dynamic(() => import('@/components/refresh-dental/trust-ticker'), { ssr: false, loading: () => <div className="h-10 bg-espresso" /> })
const AboutSection = dynamic(() => import('@/components/refresh-dental/about-section'), { ssr: true, loading: () => <SectionSkeleton height="h-[720px]" /> })
const Testimonials = dynamic(() => import('@/components/refresh-dental/testimonials'), { ssr: false, loading: () => <SectionSkeleton height="h-[640px]" /> })
const InsurancePartners = dynamic(() => import('@/components/refresh-dental/insurance-partners'), { ssr: true, loading: () => <SectionSkeleton height="h-[700px]" /> })
const PaymentSection = dynamic(() => import('@/components/refresh-dental/payment-section'), { ssr: true, loading: () => <SectionSkeleton height="h-[560px]" /> })
const ContactSection = dynamic(() => import('@/components/refresh-dental/contact-section'), { ssr: true, loading: () => <SectionSkeleton height="h-[720px]" /> })
const Footer = dynamic(() => import('@/components/refresh-dental/footer'), { ssr: true, loading: () => <SectionSkeleton height="h-64" /> })

export default function Home() {
  return (
    <div className={styles.editorialPage}>
      <PageSectionsNav />
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen overflow-hidden" role="main" id="main-content">
        <Hero />
        <TrustTicker />
        <AboutSection />
        <CareJourneys />
        <PatientConfidence />
        <PracticeShowcase />
        <InsurancePartners />
        <Testimonials />
        <PaymentSection />
        <FirstVisitFAQ />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <AccessibilityPanel />
      <CookieConsent />
    </div>
  )
}
