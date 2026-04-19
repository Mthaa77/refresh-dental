'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift } from 'lucide-react'

const STORAGE_KEY = 'refresh-dental-promo-dismissed'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Small delay to let navigation render first
      const timer = setTimeout(() => setIsVisible(true), 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden bg-gradient-to-r from-sage-teal via-sage-teal to-[#2d6b5c] relative z-40"
        >
          {/* Subtle gold shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/5 via-transparent to-champagne-gold/5 pointer-events-none" />

          <div className="relative px-4 py-2.5 sm:py-3">
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-4">
              {/* Content - compact on mobile, centered on desktop */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-center">
                {/* Gift icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                  className="hidden sm:flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-champagne-gold/20"
                >
                  <Gift className="h-4 w-4 text-champagne-gold" />
                </motion.div>

                {/* Text */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-jost text-xs sm:text-sm text-white/90 truncate sm:whitespace-nowrap"
                >
                  <span className="hidden sm:inline">🎉 New patients get </span>
                  <span className="sm:hidden">🎉 </span>
                  <span className="font-semibold text-champagne-gold">20% off</span>
                  <span className="hidden sm:inline"> their first consultation!</span>
                  <span className="sm:hidden"> first visit!</span>
                </motion.p>
              </div>

              {/* CTA Button - hidden on smallest screens */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-champagne-gold px-4 py-1.5 font-jost text-xs font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:bg-champagne-gold-light hover:shadow-lg hover:shadow-champagne-gold/20 active:scale-95"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Claim Offer
              </motion.a>

              {/* Mobile CTA - just text link */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="sm:hidden shrink-0 font-jost text-xs font-semibold text-champagne-gold underline underline-offset-2"
              >
                Book
              </motion.a>

              {/* Dismiss button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onClick={handleDismiss}
                className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white/90"
                aria-label="Dismiss promotional banner"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Bottom gold accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
