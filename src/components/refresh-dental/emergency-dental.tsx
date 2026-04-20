'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, AlertTriangle, Heart, MessageCircle } from 'lucide-react'

interface EmergencyCard {
  icon: React.ReactNode
  title: string
  description: string
  advice: string
}

const emergencyServices: EmergencyCard[] = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Severe Toothache',
    description: 'Persistent or severe tooth pain that won\'t subside with over-the-counter medication.',
    advice: 'Apply a cold compress and call us immediately',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Broken Tooth',
    description: 'A cracked, chipped, or fractured tooth from trauma, biting, or decay.',
    advice: 'Save any fragments and rinse your mouth gently',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Knocked Out Tooth',
    description: 'A tooth completely dislodged — time is critical for re-implantation.',
    advice: 'Keep the tooth moist in milk and get here fast',
  },
]

/* Deterministic sparkle particles — no Math.random() */
const sparkles = [
  { x: '8%', y: '12%', size: 4, delay: 0, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '92%', y: '8%', size: 3, delay: 0.8, color: 'rgba(166, 61, 64, 0.5)' },
  { x: '5%', y: '75%', size: 5, delay: 1.6, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '88%', y: '82%', size: 3, delay: 2.4, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '50%', y: '5%', size: 4, delay: 0.4, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '15%', y: '45%', size: 4, delay: 1.2, color: 'rgba(166, 61, 64, 0.4)' },
  { x: '78%', y: '35%', size: 8, delay: 0.6, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '42%', y: '88%', size: 12, delay: 2.0, color: 'rgba(184, 152, 48, 0.5)' },
  { x: '65%', y: '20%', size: 3, delay: 1.8, color: 'rgba(196, 96, 96, 0.4)' },
  { x: '30%', y: '65%', size: 5, delay: 0.2, color: 'rgba(184, 152, 48, 0.4)' },
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

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function EmergencyDental() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section id="emergency" className="relative overflow-hidden">
      {/* ===== BACKGROUND LAYERS ===== */}

      {/* FIX: Main background gradient — MUST be absolute inset-0 to cover section */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-burgundy via-espresso to-accent-red/80" />

      {/* Subtle texture noise overlay for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Heartbeat-like radial pulse animation */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        animate={{
          opacity: [0.03, 0.08, 0.03, 0.1, 0.03],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.5, 1],
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(166, 61, 64, 0.6) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary heartbeat pulse — offset timing for organic feel */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        animate={{
          opacity: [0, 0.04, 0, 0.06, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.15, 0.3, 0.5, 1],
          delay: 1.2,
        }}
        style={{
          background: 'radial-gradient(circle at 30% 60%, rgba(184, 152, 48, 0.4) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Vignette overlay — radial gradient, transparent center → dark edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15, 13, 10, 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Pulsing red glow border animation */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        animate={{
          boxShadow: [
            'inset 0 0 40px rgba(166, 61, 64, 0)',
            'inset 0 0 40px rgba(166, 61, 64, 0.25)',
            'inset 0 0 40px rgba(166, 61, 64, 0)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Thin gold-red gradient line at top of section */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] z-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #A63D40 20%, #B89830 50%, #A63D40 80%, transparent 100%)',
          transformOrigin: 'left',
        }}
      />

      {/* Thin gold-red gradient line at bottom of section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #B89830 30%, #A63D40 70%, transparent 100%)',
          transformOrigin: 'right',
        }}
      />

      {/* Floating sparkle particles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-[2]"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
          }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Corner decorative cross marks (gold SVG) */}
      {/* Top-left */}
      <div className="absolute top-8 left-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Top-right */}
      <div className="absolute top-8 right-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-8 left-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-8 right-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ===== CONTENT — relative z-10 to sit above all overlays ===== */}
      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* ===== LEFT COLUMN — Emergency Contact ===== */}
          <motion.div variants={itemVariants} className="text-center lg:text-left space-y-8">
            {/* 24/7 Emergency Care badge with spinning border effect */}
            <div className="relative inline-block">
              {/* Spinning conic gradient border ring */}
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(184, 152, 48, 0.7) 25%, transparent 50%, rgba(166, 61, 64, 0.6) 75%, transparent 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                  borderRadius: '9999px',
                }}
              />
              <motion.span
                className="relative inline-block rounded-full bg-champagne-gold/15 px-5 py-2 font-jost text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                24/7 Emergency Care
              </motion.span>
            </div>

            {/* Main heading — dramatic gold gradient text */}
            <h2 className="font-cormorant text-[clamp(2.5rem,5.5vw,4.2rem)] font-medium leading-tight gold-gradient-text text-shadow-gold">
              Dental Emergency?
            </h2>

            {/* Subtitle — reassuring text */}
            <p className="font-jost text-base leading-relaxed text-ivory/75 max-w-lg mx-auto lg:mx-0">
              Don&apos;t suffer in silence. Our emergency team is standing by around the clock to provide
              immediate relief and expert care when you need it most.
            </p>

            {/* Phone icon with pulse ring animations */}
            <div className="relative flex items-center justify-center lg:justify-start pt-2">
              <motion.a
                href="tel:0123456789"
                className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent-red/40 sm:h-32 sm:w-32"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Three pulse rings — staggered red accent */}
                {[0, 1, 2].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-accent-red"
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
                  style={{ backgroundColor: 'rgba(166, 61, 64, 0.2)' }}
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
                  <Phone className="h-10 w-10 text-accent-red sm:h-12 sm:w-12" />
                </motion.div>
              </motion.a>
            </div>

            {/* Phone number — large, prominent, hover-to-gold */}
            <div className="relative inline-block">
              {/* Pulsing red rings around phone number */}
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
                      ? 'rgba(166, 61, 64, 0.6)'
                      : 'rgba(166, 61, 64, 0.4)',
                  }}
                />
              ))}
              <a
                href="tel:0123456789"
                className="relative block font-cormorant text-[clamp(2.5rem,5vw,3.5rem)] font-semibold text-ivory transition-colors duration-300 hover:text-champagne-gold"
              >
                012 345 6789
              </a>
            </div>

            {/* CTA buttons row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/27123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366]/90 px-6 py-3 font-jost text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#25D366] hover:shadow-xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </motion.a>

              {/* Call Now CTA — chrome gold bg with shimmer sweep */}
              <motion.a
                href="tel:0123456789"
                className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-champagne-gold px-8 py-3.5 font-jost text-sm font-semibold text-espresso shadow-lg transition-colors duration-300 hover:bg-champagne-gold/90 hover:shadow-xl sm:px-10 sm:py-4 sm:text-base"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer sweep overlay */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  }}
                />
                <Phone className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Call Now</span>
              </motion.a>
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN — Emergency Service Cards ===== */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Column header */}
            <motion.h3
              className="font-dm-serif text-xl text-ivory/90 mb-6 text-center lg:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Common Dental Emergencies
            </motion.h3>

            <div className="grid grid-cols-1 gap-4">
              {emergencyServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent-red/40 hover:bg-ivory/8"
                >
                  {/* Icon in red-accented circle */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-red/15 text-accent-red transition-colors duration-300 group-hover:bg-accent-red/25">
                    {service.icon}
                  </div>
                  {/* Text content */}
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-dm-serif text-lg text-ivory">
                      {service.title}
                    </h3>
                    <p className="font-jost text-sm leading-relaxed text-ivory/75">
                      {service.description}
                    </p>
                    <p className="font-jost text-xs leading-relaxed text-champagne-gold/70 italic">
                      💡 {service.advice}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom reassurance text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center font-jost text-sm text-ivory/50"
        >
          Same-day emergency appointments available · Walk-ins welcome · No referral needed
        </motion.p>
      </div>
    </section>
  )
}
