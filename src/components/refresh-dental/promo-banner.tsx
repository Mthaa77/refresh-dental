'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Gift, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'refresh-dental-promo-dismissed'
const AUTO_DISMISS_MS = 8000

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(bannerRef, { once: false })
  const startTimeRef = useRef<number>(0)
  const pausedRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleDismiss = useCallback(() => {
    clearTimer()
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setIsVisible(false)
  }, [clearTimer])

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Small delay to let navigation render first
      const timer = setTimeout(() => setIsVisible(true), 300)
      return () => clearTimeout(timer)
    }
  }, [])

  // Auto-dismiss progress bar timer
  useEffect(() => {
    if (!isVisible) {
      clearTimer()
      return
    }

    startTimeRef.current = Date.now()
    pausedRef.current = false

    timerRef.current = setInterval(() => {
      if (pausedRef.current) return
      const elapsed = Date.now() - startTimeRef.current
      const remaining = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100)
      setProgress(remaining)

      if (remaining <= 0) {
        handleDismiss()
      }
    }, 50)

    return () => clearTimer()
  }, [isVisible, handleDismiss, clearTimer])

  // Pause timer on hover
  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Adjust start time to account for paused duration
    const remaining = (progress / 100) * AUTO_DISMISS_MS
    startTimeRef.current = Date.now() - (AUTO_DISMISS_MS - remaining)
    pausedRef.current = false
  }, [progress])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={bannerRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="overflow-hidden relative z-40"
        >
          {/* Dynamic gradient background that shifts on scroll */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isInView
                ? 'linear-gradient(135deg, #3D7D6E 0%, #2d6b5c 50%, #3D7D6E 100%)'
                : 'linear-gradient(to right, #3D7D6E, #2d6b5c, #3D7D6E)',
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Full-width shimmer sweep animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2,
            }}
          >
            <div
              className="h-full w-1/2"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.1), transparent)',
              }}
            />
          </motion.div>

          {/* Subtle gold shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/5 via-transparent to-champagne-gold/5 pointer-events-none" />

          <div className="relative px-4 py-2.5 sm:py-3">
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-4">
              {/* Content - compact on mobile, centered on desktop */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-center">
                {/* Gift icon with wiggle animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{
                    scale: 1,
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    scale: { delay: 0.3, type: 'spring', stiffness: 200, damping: 15 },
                    rotate: { delay: 0.8, duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="hidden sm:flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-champagne-gold/20"
                >
                  <Gift className="h-4 w-4 text-champagne-gold" />
                </motion.div>

                {/* Text */}
                {/* Sparkle icon for visual flair */}
                <motion.span
                  className="hidden sm:flex shrink-0"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-champagne-gold" />
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-jost text-xs sm:text-sm text-white/90 truncate sm:whitespace-nowrap flex items-center gap-2"
                >
                  {/* "NEW" badge with pulsing dot */}
                  <span className="inline-flex items-center gap-1 rounded-sm bg-champagne-gold/20 px-1.5 py-0.5">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-champagne-gold"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span className="font-jost text-[10px] font-bold uppercase tracking-wider text-champagne-gold">
                      New
                    </span>
                  </span>
                  <span className="hidden sm:inline">New patients get </span>
                  <span className="sm:hidden">New patients </span>
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
                className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-champagne-gold px-4 py-1.5 font-jost text-xs font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:bg-champagne-gold-light hover:shadow-lg hover:shadow-champagne-gold/20 active:scale-95 hover-lift"
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
                className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white hover:shadow-lg hover:shadow-white/10"
                aria-label="Dismiss promotional banner"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Dismiss progress bar at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne-gold/10 overflow-hidden">
            <motion.div
              className="h-full bg-champagne-gold/40"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* Animated gradient border at bottom */}
          <motion.div
            className="h-[1px] relative z-10"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.2) 30%, rgba(201, 169, 110, 0.6) 50%, rgba(201, 169, 110, 0.2) 70%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.4) 40%, rgba(232, 213, 176, 0.8) 50%, rgba(201, 169, 110, 0.4) 60%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.2) 30%, rgba(201, 169, 110, 0.6) 50%, rgba(201, 169, 110, 0.2) 70%, transparent 100%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
