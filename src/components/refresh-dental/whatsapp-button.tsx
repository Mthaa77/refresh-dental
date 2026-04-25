'use client'

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showNotification, setShowNotification] = useState(true)

  const { scrollY } = useScroll()

  /* Appear animation: show when scroll past 800px */
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 800 && !isVisible) {
      setIsVisible(true)
    }
  })

  /* Hide notification dot after 10 seconds */
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {/* "Chat with us" tooltip — slide-up with spring on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="hidden md:block whitespace-nowrap bg-espresso text-ivory text-sm font-jost px-4 py-2 rounded-full shadow-lg"
              >
                Chat with us on WhatsApp
                {/* Tooltip arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 rotate-45 bg-espresso rounded-sm" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button container */}
          <motion.a
            href="https://wa.me/27614164649"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-gold-strong cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            aria-label="Chat on WhatsApp"
          >
            {/* Green background with glass-morphism */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(37, 211, 102, 1) 50%, rgba(37, 211, 102, 1) 100%)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />
            {/* Solid green base layer to ensure full coverage */}
            <div className="absolute inset-0 rounded-full bg-[#25D366]" />

            {/* Glass overlay for glass-morphism effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Notification dot (small red circle, top-right) */}
            <AnimatePresence>
              {showNotification && (
                <motion.span
                  className="absolute -top-0.5 -right-0.5 z-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white" />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* WhatsApp icon */}
            <MessageCircle className="relative z-10 w-8 h-8 text-white" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
