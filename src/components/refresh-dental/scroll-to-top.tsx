'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsVisible(y > 600)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0
      setScrollPercent(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle params
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-1.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* "Top" label on hover */}
          <motion.span
            className="font-jost text-[10px] font-semibold uppercase tracking-widest text-champagne-gold"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
          >
            Top
          </motion.span>

          {/* Button with progress ring */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            className="relative flex h-14 w-14 items-center justify-center"
            aria-label="Scroll to top"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isHovered
                  ? '0 0 20px rgba(201, 169, 110, 0.3), 0 4px 16px rgba(201, 169, 110, 0.15)'
                  : '0 0 8px rgba(201, 169, 110, 0.15)',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Glass-morphism background */}
            <div className="absolute inset-0 rounded-full bg-white/80 border border-ivory/30 backdrop-blur-md" />

            {/* SVG progress ring */}
            <svg
              className="absolute inset-0 h-14 w-14 -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Background track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="rgba(201, 169, 110, 0.15)"
                strokeWidth="2"
              />
              {/* Progress arc */}
              <motion.circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#C9A96E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </svg>

            {/* Arrow icon with rotation based on scroll */}
            <motion.div
              animate={{ rotate: scrollPercent * 1.8 }}
              transition={{ duration: 0.15, ease: 'linear' }}
              className="text-espresso"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
