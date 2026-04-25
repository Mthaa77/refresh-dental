'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Derive the left position (0-100%) for dot placement
  const progressPercent = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
        }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      {/* Gold glow effect at leading edge */}
      <motion.div
        className="fixed top-0 z-[9999] pointer-events-none"
        style={{
          left: progressPercent,
          width: '40px',
          height: '3px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.8), rgba(232, 213, 176, 1))',
        }}
        aria-hidden="true"
      />

      {/* Static dot at the end of the progress bar */}
      <motion.div
        className="fixed top-0 z-[9999] pointer-events-none"
        style={{
          left: progressPercent,
          transform: 'translate(-50%, -2px)',
        }}
        aria-hidden="true"
      >
        <div
          className="h-[7px] w-[7px] rounded-full bg-champagne-gold"
          style={{
            boxShadow: '0 0 8px rgba(184, 152, 48, 0.6), 0 0 16px rgba(184, 152, 48, 0.3)',
          }}
        />
      </motion.div>
    </>
  )
}
