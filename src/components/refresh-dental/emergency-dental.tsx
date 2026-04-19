'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, AlertTriangle, Heart, MessageCircle } from 'lucide-react'

interface EmergencyCard {
  icon: React.ReactNode
  title: string
  description: string
}

const emergencyServices: EmergencyCard[] = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Severe Toothache',
    description: 'Persistent or severe tooth pain that won\'t subside with over-the-counter medication.',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Broken Tooth',
    description: 'A cracked, chipped, or fractured tooth from trauma, biting, or decay.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Knocked Out Tooth',
    description: 'A tooth that has been completely dislodged — time is critical for re-implantation.',
  },
]

/* Deterministic sparkle particles — no Math.random() */
const sparkles = [
  { x: '8%', y: '12%', size: 4, delay: 0 },
  { x: '92%', y: '8%', size: 3, delay: 0.8 },
  { x: '5%', y: '75%', size: 5, delay: 1.6 },
  { x: '88%', y: '82%', size: 3, delay: 2.4 },
  { x: '50%', y: '5%', size: 4, delay: 0.4 },
  /* 3 new premium sparkles with larger sizes */
  { x: '15%', y: '45%', size: 4, delay: 1.2 },
  { x: '78%', y: '35%', size: 8, delay: 0.6 },
  { x: '42%', y: '88%', size: 12, delay: 2.0 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function EmergencyDental() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section id="emergency" className="relative overflow-hidden">
      {/* Animated red-to-gold gradient border at top (3px) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #dc2626 20%, #C9A96E 50%, #dc2626 80%, transparent 100%)',
          transformOrigin: 'left',
        }}
      />

      {/* Pulsing red glow border animation */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none rounded-none"
        animate={{
          boxShadow: [
            'inset 0 0 30px rgba(220, 38, 38, 0)',
            'inset 0 0 30px rgba(220, 38, 38, 0.15)',
            'inset 0 0 30px rgba(220, 38, 38, 0)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Vignette overlay — radial gradient, transparent center → dark-red/30 edges */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(127, 29, 29, 0.3) 100%)',
        }}
      />

      {/* Corner decorative cross/plus marks (gold, 10px) */}
      {/* Top-left */}
      <div className="absolute top-8 left-6 z-[6]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Top-right */}
      <div className="absolute top-8 right-6 z-[6]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-8 left-6 z-[6]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-8 right-6 z-[6]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Background gradient */}
      <div className="bg-gradient-to-br from-red-900/90 via-red-950/95 to-[#1A1510]" />

      {/* Heartbeat-like pulse animation on background */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        animate={{
          opacity: [0.03, 0.06, 0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.5, 1],
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.5) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating sparkle particles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: 'rgba(201, 169, 110, 0.5)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left side — Phone & CTA */}
          <motion.div variants={itemVariants} className="text-center lg:text-left space-y-8">
            {/* Section label — 24/7 badge with spinning border */}
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(201, 169, 110, 0.6) 25%, transparent 50%, rgba(220, 38, 38, 0.4) 75%, transparent 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                  borderRadius: '9999px',
                }}
              />
              <motion.span
                className="relative inline-block rounded-full bg-champagne-gold/15 px-4 py-1.5 font-jost text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                24/7 Emergency Care
              </motion.span>
            </div>

            {/* Header with gradient text */}
            <h2 className="font-cormorant text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-tight gold-gradient-text">
                Dental Emergency?
            </h2>

            {/* Subtitle */}
            <p className="font-jost text-base leading-relaxed text-ivory/70 max-w-md mx-auto lg:mx-0">
              We&apos;re here for you 24/7. Don&apos;t wait — call now.
            </p>

            {/* Phone icon with pulse rings + heartbeat */}
            <div className="relative flex items-center justify-center lg:justify-start">
              <motion.a
                href="tel:0123456789"
                className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-champagne-gold/30 sm:h-32 sm:w-32"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Pulse rings */}
                {[0, 1, 2].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-champagne-gold"
                    animate={{
                      scale: [1, 1.6 + ring * 0.3],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: ring * 0.8,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* Phone icon background with heartbeat pulse */}
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
                  style={{ backgroundColor: 'rgba(201, 169, 110, 0.15)' }}
                  animate={
                    isHovering
                      ? { scale: 1.08 }
                      : {
                          scale: [1, 1.08, 1],
                        }
                  }
                  transition={
                    isHovering
                      ? { type: 'spring', stiffness: 300, damping: 15 }
                      : {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          times: [0, 0.5, 1],
                        }
                  }
                >
                  <Phone className="h-10 w-10 text-champagne-gold sm:h-12 sm:w-12" />
                </motion.div>
              </motion.a>
            </div>

            {/* Phone number with pulsing red ring */}
            <div className="relative inline-block">
              {/* Pulsing red ring around phone number */}
              {[0, 1].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute -inset-2 rounded-full border"
                  animate={{
                    opacity: [0.4, 0.1, 0.4],
                    scale: [1, 1.04 + ring * 0.02, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: ring * 0.6,
                    ease: 'easeInOut',
                    times: [0, 0.5, 1],
                  }}
                  style={{
                    borderColor: ring === 0
                      ? 'rgba(220, 38, 38, 0.5)'
                      : 'rgba(220, 38, 38, 0.3)',
                  }}
                />
              ))}
              <a
                href="tel:0123456789"
                className="relative block font-cormorant text-[clamp(2.5rem,5vw,3.5rem)] font-semibold text-ivory transition-colors hover:text-champagne-gold"
              >
                012 345 6789
              </a>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/27123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366]/90 px-6 py-3 font-jost text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#25D366] hover:shadow-xl"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </motion.a>
          </motion.div>

          {/* Right side — Emergency service cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              {emergencyServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-5 backdrop-blur-sm transition-colors hover:border-champagne-gold/30 hover:bg-ivory/8"
                >
                  {/* Icon in gold circle */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-champagne-gold/15 text-champagne-gold">
                    {service.icon}
                  </div>
                  {/* Text */}
                  <div className="space-y-1">
                    <h3 className="font-dm-serif text-lg text-ivory">
                      {service.title}
                    </h3>
                    <p className="font-jost text-sm leading-relaxed text-ivory/60">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Centered Call Now CTA with shimmer sweep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="tel:0123456789"
            className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-champagne-gold px-10 py-4 font-jost text-base font-semibold text-espresso shadow-lg transition-all hover:bg-champagne-gold/90 hover:shadow-xl sm:px-12 sm:py-5 sm:text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer sweep overlay */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              }}
            />
            <Phone className="relative z-10 h-5 w-5 sm:h-6 sm:w-6" />
            <span className="relative z-10">Call Now</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
