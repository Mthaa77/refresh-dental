'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Heart, Sparkles, Shield, Star } from 'lucide-react'

type OnboardingStep = 'intro' | 'categories' | 'booking' | 'complete'

const steps: Record<OnboardingStep, { title: string; desc: string; cta: string }> = {
  intro: {
    title: 'Welcome to Refresh Dental Services',
    desc: 'Discover our full range of premium dental treatments, from routine care to advanced cosmetic solutions.',
    cta: 'Explore Services',
  },
  categories: {
    title: 'Browse by Category',
    desc: 'We offer General care, Cosmetic enhancements, Specialized treatments, and Aesthetic procedures.',
    cta: 'Learn More',
  },
  booking: {
    title: 'Book Your Appointment',
    desc: 'Choose your preferred service and book directly. Our team will confirm within 2 hours.',
    cta: 'Ready to Book',
  },
  complete: {
    title: 'You&apos;re All Set!',
    desc: 'Browse our services below and start your smile journey with Refresh Dental.',
    cta: 'Close',
  },
}

const categoryHighlights = [
  { icon: Heart, label: 'General Care', color: 'from-rose-200 to-red-100' },
  { icon: Sparkles, label: 'Cosmetic', color: 'from-yellow-200 to-amber-100' },
  { icon: Shield, label: 'Specialized', color: 'from-blue-200 to-cyan-100' },
  { icon: Star, label: 'Aesthetic', color: 'from-purple-200 to-pink-100' },
]

export default function ServicesOnboarding() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro')
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const seen = localStorage.getItem('refresh_services_onboarded')
    if (!seen) {
      setHasSeenOnboarding(false)
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('refresh_services_onboarded', 'true')
  }

  const handleNext = () => {
    const stepSequence: OnboardingStep[] = ['intro', 'categories', 'booking', 'complete']
    const currentIndex = stepSequence.indexOf(currentStep)
    if (currentIndex < stepSequence.length - 1) {
      setCurrentStep(stepSequence[currentIndex + 1])
    } else {
      handleClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
          >
            <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-champagne-gold/20 via-gold-pale/10 to-warm-blush/15 overflow-hidden">
                {/* Decorative animated orbs */}
                <motion.div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-champagne-gold/10"
                  animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gold-pale/8"
                  animate={{ y: [0, -8, 0], scale: [1, 0.9, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  aria-label="Close onboarding"
                >
                  <X className="h-5 w-5 text-espresso/60 hover:text-espresso" />
                </button>

                {/* Step indicator */}
                <div className="absolute bottom-4 left-6 flex gap-1.5">
                  {(['intro', 'categories', 'booking', 'complete'] as const).map((step, i) => (
                    <motion.div
                      key={step}
                      className="h-1.5 bg-champagne-gold/20 rounded-full"
                      animate={{
                        width: currentStep === step || ['intro', 'categories', 'booking', 'complete'].indexOf(currentStep) >= i ? 24 : 8,
                        backgroundColor:
                          currentStep === step
                            ? 'rgb(184, 152, 48)'
                            : ['intro', 'categories', 'booking', 'complete'].indexOf(currentStep) >= i
                              ? 'rgba(184, 152, 48, 0.4)'
                              : 'rgba(184, 152, 48, 0.15)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Intro */}
                    {currentStep === 'intro' && (
                      <div className="text-center space-y-6">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-champagne-gold/10">
                          <Sparkles className="h-8 w-8 text-champagne-gold" />
                        </div>
                        <div>
                          <h2 id="onboarding-title" className="font-dm-serif text-2xl text-espresso mb-3">
                            {steps.intro.title}
                          </h2>
                          <p className="font-jost text-sm leading-relaxed text-brown-muted">
                            {steps.intro.desc}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Categories Spotlight */}
                    {currentStep === 'categories' && (
                      <div className="text-center space-y-6">
                        <h2 className="font-dm-serif text-2xl text-espresso">{steps.categories.title}</h2>
                        <p className="font-jost text-sm leading-relaxed text-brown-muted mb-8">
                          {steps.categories.desc}
                        </p>

                        {/* Category grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {categoryHighlights.map((cat, i) => {
                            const Icon = cat.icon
                            return (
                              <motion.div
                                key={cat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-xl bg-gradient-to-br ${cat.color} p-4 text-center`}
                              >
                                <Icon className="h-6 w-6 text-espresso/70 mx-auto mb-2" />
                                <p className="font-jost text-xs font-semibold text-espresso">{cat.label}</p>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Booking CTA */}
                    {currentStep === 'booking' && (
                      <div className="text-center space-y-6">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-champagne-gold/10">
                          <Heart className="h-8 w-8 text-champagne-gold" />
                        </div>
                        <div>
                          <h2 className="font-dm-serif text-2xl text-espresso mb-3">
                            {steps.booking.title}
                          </h2>
                          <p className="font-jost text-sm leading-relaxed text-brown-muted">
                            {steps.booking.desc}
                          </p>
                        </div>

                        {/* Quick stats */}
                        <div className="flex gap-4 pt-4">
                          <div className="flex-1 rounded-lg bg-sand/40 p-3">
                            <p className="font-dm-serif text-lg text-champagne-gold font-semibold">2 hrs</p>
                            <p className="font-jost text-xs text-brown-muted">Confirmation</p>
                          </div>
                          <div className="flex-1 rounded-lg bg-sand/40 p-3">
                            <p className="font-dm-serif text-lg text-champagne-gold font-semibold">12+</p>
                            <p className="font-jost text-xs text-brown-muted">Services</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Complete */}
                    {currentStep === 'complete' && (
                      <div className="text-center space-y-6">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.6 }}
                          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-champagne-gold/10"
                        >
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}>
                            <Sparkles className="h-8 w-8 text-champagne-gold" />
                          </motion.div>
                        </motion.div>
                        <div>
                          <h2 className="font-dm-serif text-2xl text-espresso mb-3">
                            {steps.complete.title}
                          </h2>
                          <p className="font-jost text-sm leading-relaxed text-brown-muted">
                            {steps.complete.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer / CTA */}
              <div className="border-t border-soft-border px-8 sm:px-10 py-6 flex items-center justify-between gap-3">
                {currentStep !== 'complete' && (
                  <button
                    onClick={handleClose}
                    className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brown-warm hover:text-espresso transition-colors duration-200 font-jost"
                  >
                    Skip
                  </button>
                )}
                <div className="flex-1" />
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 rounded-full bg-champagne-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-gold-strong hover:shadow-gold-strong transition-all duration-300 font-jost"
                >
                  <span>{steps[currentStep].cta}</span>
                  {currentStep !== 'complete' && <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
