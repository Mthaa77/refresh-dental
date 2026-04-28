'use client'

import dynamic from 'next/dynamic'

// ── Eager imports: critical above-the-fold ──
import ScrollProgress from '@/components/refresh-dental/scroll-progress'
import Navigation from '@/components/refresh-dental/navigation'
import Hero from '@/components/refresh-dental/hero'

// ── Loading skeleton component ──
function SectionSkeleton({ height = 'h-32' }: { height?: string }) {
  return (
    <div className={`${height} bg-ivory/60 animate-pulse rounded-lg`} aria-hidden="true">
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-champagne-gold/30 border-t-champagne-gold animate-spin" />
      </div>
    </div>
  )
}

// ── Already dynamic ──
const LoadingScreen = dynamic(
  () => import('@/components/refresh-dental/loading-screen'),
  { ssr: false }
)

// ── Floating utilities (no loading placeholder) ──
const PageSectionsNav = dynamic(
  () => import('@/components/refresh-dental/page-sections-nav'),
  { ssr: false }
)
const WhatsAppButton = dynamic(
  () => import('@/components/refresh-dental/whatsapp-button'),
  { ssr: false }
)
const ScrollToTop = dynamic(
  () => import('@/components/refresh-dental/scroll-to-top'),
  { ssr: false }
)
const AccessibilityPanel = dynamic(
  () => import('@/components/refresh-dental/theme-toggle'),
  { ssr: false }
)
const CookieConsent = dynamic(
  () => import('@/components/refresh-dental/cookie-consent'),
  { ssr: false }
)

// ── Homepage sections ──

// 1. Trust strip under hero
const TrustTicker = dynamic(
  () => import('@/components/refresh-dental/trust-ticker'),
  { ssr: false, loading: () => <div className="h-10 animate-pulse bg-espresso/80" /> }
)

// 2. About Dr. Malunga
const AboutSection = dynamic(
  () => import('@/components/refresh-dental/about-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-96" /> }
)

// 3. Services
const ServicesGrid = dynamic(
  () => import('@/components/refresh-dental/services-grid'),
  { ssr: false, loading: () => <SectionSkeleton height="h-[600px]" /> }
)

// 4. Key stats
const AnimatedCounterSection = dynamic(
  () => import('@/components/refresh-dental/animated-counter-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-40" /> }
)

// 5. Flagship treatment spotlight
const ImplantsSpotlight = dynamic(
  () => import('@/components/refresh-dental/implants-spotlight'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

// 6. How it works
const TreatmentProcess = dynamic(
  () => import('@/components/refresh-dental/treatment-process'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)

// 7. Patient testimonials
const Testimonials = dynamic(
  () => import('@/components/refresh-dental/testimonials'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)

// 8. Before & after results
const BeforeAfterSection = dynamic(
  () => import('@/components/refresh-dental/before-after-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

// 9. Expert dental tips
const DentalTipsSection = dynamic(
  () => import('@/components/refresh-dental/dental-tips-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-80" /> }
)

// 10. Medical aids accepted
const InsurancePartners = dynamic(
  () => import('@/components/refresh-dental/insurance-partners'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)

// 11. FAQ
const FAQSection = dynamic(
  () => import('@/components/refresh-dental/faq-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)

// 12. Location map
const LocationMapEnhanced = dynamic(
  () => import('@/components/refresh-dental/location-map-enhanced'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

// 13. Contact / booking CTA
const ContactSection = dynamic(
  () => import('@/components/refresh-dental/contact-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-96" /> }
)

// 14. Footer
const Footer = dynamic(
  () => import('@/components/refresh-dental/footer'),
  { ssr: true, loading: () => <SectionSkeleton height="h-64" /> }
)

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <PageSectionsNav />
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen">
        {/* ── 1. HERO: First impression, dentist name, CTA ── */}
        <Hero />

        {/* ── 2. TRUST TICKER: Credential strip under hero ── */}
        <TrustTicker />

        {/* ── 3. ABOUT: Who is Dr. Malunga ── */}
        <AboutSection />

        {/* ── 4. SERVICES: What we offer ── */}
        <ServicesGrid />

        {/* ── 5. STATS: Numbers that build trust ── */}
        <AnimatedCounterSection />

        {/* ── 6. IMPLANTS SPOTLIGHT: Flagship treatment ── */}
        <ImplantsSpotlight />

        {/* ── 7. TREATMENT PROCESS: How it works ── */}
        <TreatmentProcess />

        {/* ── 8. TESTIMONIALS: What patients say ── */}
        <Testimonials />

        {/* ── 9. BEFORE & AFTER: Visual proof ── */}
        <BeforeAfterSection />

        {/* ── 10. DENTAL TIPS: Expert advice / SEO content ── */}
        <DentalTipsSection />

        {/* ── 11. INSURANCE: Medical aids accepted ── */}
        <InsurancePartners />

        {/* ── 12. FAQ: Address common questions ── */}
        <FAQSection />

        {/* ── 13. LOCATION: Where to find us ── */}
        <LocationMapEnhanced />

        {/* ── 14. CONTACT: Final booking CTA ── */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <AccessibilityPanel />
      <CookieConsent />
    </>
  )
}
