'use client'

import dynamic from 'next/dynamic'

// ── Eager imports: critical above-the-fold ──
import ScrollProgress from '@/components/refresh-dental/scroll-progress'
import Navigation from '@/components/refresh-dental/navigation'
import Hero from '@/components/refresh-dental/hero'

// ── Already dynamic ──
const LoadingScreen = dynamic(
  () => import('@/components/refresh-dental/loading-screen'),
  { ssr: false }
)

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

// ── Dynamic imports: all homepage sections ──

const TrustTicker = dynamic(
  () => import('@/components/refresh-dental/trust-ticker'),
  { ssr: false, loading: () => <div className="h-10 animate-pulse bg-espresso/80" /> }
)

const StatsBar = dynamic(
  () => import('@/components/refresh-dental/stats-bar'),
  { ssr: false, loading: () => <SectionSkeleton height="h-20" /> }
)
const StatsMarquee = dynamic(
  () => import('@/components/refresh-dental/stats-marquee'),
  { ssr: false, loading: () => <div className="h-12 animate-pulse bg-ivory/50" /> }
)
const AnimatedCounterSection = dynamic(
  () => import('@/components/refresh-dental/animated-counter-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-40" /> }
)
const TrustIndicators = dynamic(
  () => import('@/components/refresh-dental/trust-indicators'),
  { ssr: true, loading: () => <SectionSkeleton height="h-32" /> }
)

const TreatmentProcess = dynamic(
  () => import('@/components/refresh-dental/treatment-process'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)

const AboutSection = dynamic(
  () => import('@/components/refresh-dental/about-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-96" /> }
)
const TeamSection = dynamic(
  () => import('@/components/refresh-dental/team-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)
const ValuesSection = dynamic(
  () => import('@/components/refresh-dental/values-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-64" /> }
)

const GallerySection = dynamic(
  () => import('@/components/refresh-dental/gallery-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)
const TechnologySection = dynamic(
  () => import('@/components/refresh-dental/technology-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

const ServicesGrid = dynamic(
  () => import('@/components/refresh-dental/services-grid'),
  { ssr: false, loading: () => <SectionSkeleton height="h-[600px]" /> }
)
const SmileCta = dynamic(
  () => import('@/components/refresh-dental/smile-cta'),
  { ssr: false, loading: () => <SectionSkeleton height="h-48" /> }
)
const ImplantsSpotlight = dynamic(
  () => import('@/components/refresh-dental/implants-spotlight'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

const ParallaxStatement = dynamic(
  () => import('@/components/refresh-dental/parallax-statement'),
  { ssr: false, loading: () => <SectionSkeleton height="h-48" /> }
)
const Testimonials = dynamic(
  () => import('@/components/refresh-dental/testimonials'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)

const BeforeAfterSection = dynamic(
  () => import('@/components/refresh-dental/before-after-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)
const EmergencyDental = dynamic(
  () => import('@/components/refresh-dental/emergency-dental'),
  { ssr: true, loading: () => <SectionSkeleton height="h-64" /> }
)

const PaymentSection = dynamic(
  () => import('@/components/refresh-dental/payment-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-64" /> }
)
const InsurancePartners = dynamic(
  () => import('@/components/refresh-dental/insurance-partners'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)
const DentalCostEstimator = dynamic(
  () => import('@/components/refresh-dental/dental-cost-estimator'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

const SeasonalPromo = dynamic(
  () => import('@/components/refresh-dental/seasonal-promo'),
  { ssr: false, loading: () => <SectionSkeleton height="h-48" /> }
)
const FAQSection = dynamic(
  () => import('@/components/refresh-dental/faq-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)
const ReferFriend = dynamic(
  () => import('@/components/refresh-dental/refer-friend'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)

const CorporateWellnessSection = dynamic(
  () => import('@/components/refresh-dental/corporate-wellness-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-64" /> }
)
const GuaranteeSection = dynamic(
  () => import('@/components/refresh-dental/guarantee-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)

const DentalTipsSection = dynamic(
  () => import('@/components/refresh-dental/dental-tips-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-80" /> }
)
const SmileAssessment = dynamic(
  () => import('@/components/refresh-dental/smile-assessment'),
  { ssr: false, loading: () => <SectionSkeleton height="h-96" /> }
)
const SmileScoreCalculator = dynamic(
  () => import('@/components/refresh-dental/smile-score-calculator'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)

const InstagramFeed = dynamic(
  () => import('@/components/refresh-dental/instagram-feed'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)
const AwardsCertifications = dynamic(
  () => import('@/components/refresh-dental/awards-certifications'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)
const LoyaltyRewards = dynamic(
  () => import('@/components/refresh-dental/loyalty-rewards'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)

const OnlineBookingWidget = dynamic(
  () => import('@/components/refresh-dental/online-booking-widget'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)
const ReviewsSummary = dynamic(
  () => import('@/components/refresh-dental/reviews-summary'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)
const PatientJourneyMap = dynamic(
  () => import('@/components/refresh-dental/patient-journey-map'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)

const LocationMapEnhanced = dynamic(
  () => import('@/components/refresh-dental/location-map-enhanced'),
  { ssr: false, loading: () => <SectionSkeleton height="h-80" /> }
)
const ContactSection = dynamic(
  () => import('@/components/refresh-dental/contact-section'),
  { ssr: true, loading: () => <SectionSkeleton height="h-96" /> }
)
const VirtualTourCta = dynamic(
  () => import('@/components/refresh-dental/virtual-tour-cta'),
  { ssr: false, loading: () => <SectionSkeleton height="h-48" /> }
)
const PageSurvey = dynamic(
  () => import('@/components/refresh-dental/page-survey'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)
const NewsletterCta = dynamic(
  () => import('@/components/refresh-dental/newsletter-cta'),
  { ssr: true, loading: () => <SectionSkeleton height="h-48" /> }
)
const VideoCtaSection = dynamic(
  () => import('@/components/refresh-dental/video-cta-section'),
  { ssr: false, loading: () => <SectionSkeleton height="h-64" /> }
)
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
        {/* ═══════════════════════════════════════════════
            ACT 1 — FIRST IMPRESSION & CREDENTIALS
            Hook the visitor, build immediate trust
        ═══════════════════════════════════════════════ */}
        <Hero />
        <TrustTicker />
        <SeasonalPromo />
        <StatsBar />
        <TrustIndicators />

        {/* ═══════════════════════════════════════════════
            ACT 2 — WHO WE ARE
            The people and story behind the practice
        ═══════════════════════════════════════════════ */}
        <AboutSection />
        <TeamSection />
        <ValuesSection />
        <AwardsCertifications />

        {/* ═══════════════════════════════════════════════
            ACT 3 — WHAT WE OFFER
            Services, technology, flagship treatments
        ═══════════════════════════════════════════════ */}
        <ServicesGrid />
        <TechnologySection />
        <ImplantsSpotlight />
        <SmileCta />

        {/* ═══════════════════════════════════════════════
            ACT 4 — THE EXPERIENCE
            How it works, journey, clinic tour
        ═══════════════════════════════════════════════ */}
        <TreatmentProcess />
        <PatientJourneyMap />
        <VirtualTourCta />
        <GallerySection />

        {/* ═══════════════════════════════════════════════
            ACT 5 — PROOF & SOCIAL PROOF
            Real results, reviews, impact numbers
        ═══════════════════════════════════════════════ */}
        <ParallaxStatement />
        <DentalTipsSection />
        <BeforeAfterSection />
        <Testimonials />
        <ReviewsSummary />
        <AnimatedCounterSection />
        <StatsMarquee />

        {/* ═══════════════════════════════════════════════
            ACT 6 — ENGAGEMENT & INTERACTIVES
            Quizzes, calculators, assessment tools
        ═══════════════════════════════════════════════ */}
        <SmileAssessment />
        <SmileScoreCalculator />
        <DentalCostEstimator />

        {/* ═══════════════════════════════════════════════
            ACT 7 — AFFORDABILITY & ACCESSIBILITY
            Payment, insurance, promos, emergency
        ═══════════════════════════════════════════════ */}
        <PaymentSection />
        <InsurancePartners />
        <EmergencyDental />
        <GuaranteeSection />

        {/* ═══════════════════════════════════════════════
            ACT 8 — COMMUNITY & CONTENT
            Tips, social, referral, wellness
        ═══════════════════════════════════════════════ */}
        <InstagramFeed />
        <ReferFriend />
        <CorporateWellnessSection />
        <LoyaltyRewards />

        {/* ═══════════════════════════════════════════════
            ACT 9 — FAQ & SUPPORT
            Common questions, find us, get in touch
        ═══════════════════════════════════════════════ */}
        <FAQSection />
        <LocationMapEnhanced />
        <ContactSection />
        <OnlineBookingWidget />

        {/* ═══════════════════════════════════════════════
            FINAL PUSH — CTA & FEEDBACK
            Last chance to convert + feedback loop
        ═══════════════════════════════════════════════ */}
        <VideoCtaSection />
        <NewsletterCta />
        <PageSurvey />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <AccessibilityPanel />
      <CookieConsent />
    </>
  )
}
