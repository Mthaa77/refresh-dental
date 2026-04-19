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
      {/* Animated gold border at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, #C9A96E, #E8D5B0, #C9A96E, transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Background gradient */}
      <div className="bg-gradient-to-br from-red-900/90 via-red-950/95 to-[#1A1510]" />

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
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left side — Phone & CTA */}
          <motion.div variants={itemVariants} className="text-center lg:text-left space-y-8">
            {/* Section label */}
            <motion.span
              className="inline-block rounded-full bg-champagne-gold/15 px-4 py-1.5 font-jost text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              24/7 Emergency Care
            </motion.span>

            {/* Header with gradient text */}
            <h2 className="font-cormorant text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f87171, #C9A96E, #E8D5B0)',
                }}
              >
                Dental Emergency?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="font-jost text-base leading-relaxed text-ivory/70 max-w-md mx-auto lg:mx-0">
              We&apos;re here for you 24/7. Don&apos;t wait — call now.
            </p>

            {/* Phone icon with pulse rings */}
            <div className="relative flex items-center justify-center lg:justify-start">
              <motion.a
                href="tel:0123456789"
                className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-champagne-gold/30 sm:h-32 sm:w-32"
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

                {/* Phone icon background */}
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
                  style={{ backgroundColor: 'rgba(201, 169, 110, 0.15)' }}
                  animate={isHovering ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Phone className="h-10 w-10 text-champagne-gold sm:h-12 sm:w-12" />
                </motion.div>
              </motion.a>
            </div>

            {/* Phone number */}
            <div>
              <a
                href="tel:0123456789"
                className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-semibold text-ivory transition-colors hover:text-champagne-gold"
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

        {/* Centered Call Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="tel:0123456789"
            className="inline-flex items-center gap-3 rounded-full bg-champagne-gold px-10 py-4 font-jost text-base font-semibold text-espresso shadow-lg transition-all hover:bg-champagne-gold/90 hover:shadow-xl sm:px-12 sm:py-5 sm:text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            Call Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
