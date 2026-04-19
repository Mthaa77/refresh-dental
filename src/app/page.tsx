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
import EmergencyDental from '@/components/refresh-dental/emergency-dental'
import PaymentSection from '@/components/refresh-dental/payment-section'
import InsurancePartners from '@/components/refresh-dental/insurance-partners'
import SeasonalPromo from '@/components/refresh-dental/seasonal-promo'
import FAQSection from '@/components/refresh-dental/faq-section'
import CorporateWellnessSection from '@/components/refresh-dental/corporate-wellness-section'
import DentalTipsSection from '@/components/refresh-dental/dental-tips-section'
import InstagramFeed from '@/components/refresh-dental/instagram-feed'
import ContactSection from '@/components/refresh-dental/contact-section'
import NewsletterCta from '@/components/refresh-dental/newsletter-cta'
import Footer from '@/components/refresh-dental/footer'
import VideoTestimonial from '@/components/refresh-dental/video-testimonial'
import WhatsAppButton from '@/components/refresh-dental/whatsapp-button'
import CookieConsent from '@/components/refresh-dental/cookie-consent'
import ScrollToTop from '@/components/refresh-dental/scroll-to-top'
import AppointmentQuickBook from '@/components/refresh-dental/appointment-quick-book'
import AccessibilityPanel from '@/components/refresh-dental/theme-toggle'
import PageSectionsNav from '@/components/refresh-dental/page-sections-nav'
import SmileAssessment from '@/components/refresh-dental/smile-assessment'
import ReferFriend from '@/components/refresh-dental/refer-friend'
import PatientStories from '@/components/refresh-dental/patient-stories'
import AwardsCertifications from '@/components/refresh-dental/awards-certifications'
import LoyaltyRewards from '@/components/refresh-dental/loyalty-rewards'
import ReviewsSummary from '@/components/refresh-dental/reviews-summary'
import PatientJourneyMap from '@/components/refresh-dental/patient-journey-map'
import VirtualTourCta from '@/components/refresh-dental/virtual-tour-cta'
import OnlineBookingWidget from '@/components/refresh-dental/online-booking-widget'
import LocationMapEnhanced from '@/components/refresh-dental/location-map-enhanced'
import PageSurvey from '@/components/refresh-dental/page-survey'
import AnimatedCounterSection from '@/components/refresh-dental/animated-counter-section'
import GuaranteeSection from '@/components/refresh-dental/guarantee-section'
import VideoCtaSection from '@/components/refresh-dental/video-cta-section'
import MarqueeBanner from '@/components/refresh-dental/marquee-banner'
import QuickActionsFab from '@/components/refresh-dental/quick-actions-fab'

const LoadingScreen = dynamic(
  () => import('@/components/refresh-dental/loading-screen'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <PageSectionsNav />
      <ScrollProgress />
      <Navigation />
      <PromoBanner />
      <MarqueeBanner />
      <main className="min-h-screen">
        <Hero />
        <StatsBar />
        <AnimatedCounterSection />
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
        <VideoTestimonial />
        <PatientStories />
        <BeforeAfterSection />
        <EmergencyDental />
        <PaymentSection />
        <InsurancePartners />
        <SeasonalPromo />
        <FAQSection />
        <ReferFriend />
        <CorporateWellnessSection />
        <GuaranteeSection />
        <DentalTipsSection />
        <SmileAssessment />
        <InstagramFeed />
        <AwardsCertifications />
        <LoyaltyRewards />
        <OnlineBookingWidget />
        <ReviewsSummary />
        <PatientJourneyMap />
        <LocationMapEnhanced />
        <ContactSection />
        <VirtualTourCta />
        <PageSurvey />
        <NewsletterCta />
        <VideoCtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <QuickActionsFab />
      <AppointmentQuickBook />
      <AccessibilityPanel />
      <CookieConsent />
    </>
  )
}
