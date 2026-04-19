'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Derive the left position (0-100%) for glow and dot placement
  const progressPercent = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
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
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.8), rgba(232, 213, 176, 1))',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      {/* Pulsing dot at the end of the progress bar */}
      <motion.div
        className="fixed top-0 z-[9999] pointer-events-none"
        style={{
          left: progressPercent,
          transform: 'translate(-50%, -2px)',
        }}
        aria-hidden="true"
      >
        <motion.div
          className="h-[7px] w-[7px] rounded-full bg-champagne-gold"
          style={{
            boxShadow: '0 0 8px rgba(201, 169, 110, 0.6), 0 0 16px rgba(201, 169, 110, 0.3)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Outer glow ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full"
          style={{
            border: '1.5px solid rgba(201, 169, 110, 0.3)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </>
  )
}
