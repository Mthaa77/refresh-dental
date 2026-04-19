'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('refresh-dental-cookie-consent')
    if (!consent) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setIsVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('refresh-dental-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleManage = () => {
    // Could open a preferences modal in the future
    // For now, just accept
    localStorage.setItem('refresh-dental-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-x-0 bottom-0 z-40"
        >
          <div className="mx-auto max-w-4xl px-4 pb-4">
            <div className="rounded-t-2xl rounded-b-lg bg-espresso px-5 py-4 shadow-lg shadow-espresso/20 sm:px-8 sm:py-5">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                {/* Content */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne-gold/10">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-champagne-gold"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <p className="font-jost text-sm leading-relaxed text-ivory/85">
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
                  <button
                    onClick={handleManage}
                    className="rounded-full border border-ivory/20 px-4 py-2 font-jost text-xs font-medium uppercase tracking-wider text-ivory/70 transition-all duration-300 hover:border-champagne-gold/40 hover:text-ivory"
                  >
                    Manage Preferences
                  </button>
                  <button
                    onClick={handleAccept}
                    className="rounded-full bg-champagne-gold px-5 py-2 font-jost text-xs font-semibold uppercase tracking-wider text-espresso transition-all duration-300 hover:bg-champagne-gold-light hover:shadow-lg hover:shadow-champagne-gold/20"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
