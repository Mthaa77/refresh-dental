'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, CalendarCheck, Eye, Shield, Sparkles } from 'lucide-react'

/* ──────────────────────────────────────────────
   Clinic environment bullet points
   ────────────────────────────────────────────── */
const features = [
  {
    icon: Sparkles,
    text: 'Modern, sterilised treatment rooms',
  },
  {
    icon: Eye,
    text: 'State-of-the-art dental technology',
  },
  {
    icon: Shield,
    text: 'Relaxing, patient-first atmosphere',
  },
  {
    icon: CalendarCheck,
    text: 'Convenient booking & ample parking',
  },
]

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function VirtualTourCta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="virtual-tour"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#1A1510' }}
    >
      {/* Subtle grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <pattern id="tour-grid" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tour-grid)" />
        </svg>
      </div>

      {/* Gold corner accents */}
      <div className="pointer-events-none absolute top-6 left-6 w-16 h-16">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L24 0L24 2L2 2L2 24L0 24Z" fill="#C9A96E" opacity="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-6 right-6 w-16 h-16">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 0L40 0L40 2L62 2L62 24L64 24Z" fill="#C9A96E" opacity="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 w-16 h-16">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 64L24 64L24 62L2 62L2 40L0 40Z" fill="#C9A96E" opacity="0.4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 w-16 h-16">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 64L40 64L40 62L62 62L62 40L64 40Z" fill="#C9A96E" opacity="0.4" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #C9A96E, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Section label */}
            <motion.span
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Virtual Tour
            </motion.span>

            <h2
              className="font-cormorant text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight mb-6"
              style={{ color: '#FDFAF6' }}
            >
              Step Inside Our{' '}
              <span className="gold-gradient-text">Practice</span>
            </h2>

            <p className="font-jost text-sm font-light leading-relaxed mb-8" style={{ color: 'rgba(253,250,246,0.65)' }}>
              Take a virtual tour of our state-of-the-art facility and discover why patients
              choose Refresh Dental for their care. From the moment you walk in, you&rsquo;ll
              feel the difference.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        background: 'rgba(201,169,110,0.1)',
                        border: '1px solid rgba(201,169,110,0.2)',
                      }}
                    >
                      <Icon className="h-4 w-4 text-champagne-gold" strokeWidth={1.5} />
                    </div>
                    <span className="font-jost text-sm" style={{ color: 'rgba(253,250,246,0.8)' }}>
                      {feature.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-jost text-sm font-medium transition-shadow duration-200"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #E8D5B0)',
                  color: '#1A1510',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(201,169,110,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <CalendarCheck className="h-4 w-4" />
                Schedule a Visit
              </motion.a>

              <motion.button
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-jost text-sm font-medium transition-colors duration-200"
                style={{
                  border: '1px solid rgba(201,169,110,0.35)',
                  color: '#FDFAF6',
                  background: 'transparent',
                }}
                whileHover={{
                  scale: 1.03,
                  background: 'rgba(201,169,110,0.08)',
                  borderColor: 'rgba(201,169,110,0.6)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Play className="h-4 w-4" />
                Watch Virtual Tour
              </motion.button>
            </div>
          </motion.div>

          {/* ── Right: Image with Play Button ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Clinic interior image */}
              <img
                src="/images/dental-clinic-interior.png"
                alt="Refresh Dental clinic interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Dark overlay for depth */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(26,21,16,0.3), rgba(26,21,16,0.1))' }}
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer pulsing ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full"
                    style={{ border: '2px solid rgba(201,169,110,0.3)' }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Second ring */}
                  <motion.div
                    className="absolute -inset-2 rounded-full"
                    style={{ border: '1px solid rgba(201,169,110,0.2)' }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  />
                  {/* Main play button */}
                  <div
                    className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #C9A96E, #E8D5B0)',
                      boxShadow: '0 8px 32px rgba(201,169,110,0.4)',
                    }}
                  >
                    <Play className="h-6 w-6 md:h-8 md:w-8 text-espresso ml-1" fill="currentColor" />
                  </div>
                </motion.div>
              </div>

              {/* Bottom overlay gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: 'linear-gradient(to top, rgba(26,21,16,0.6), transparent)',
                }}
              />

              {/* Image caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-jost text-xs" style={{ color: 'rgba(253,250,246,0.7)' }}>
                  Refresh Dental — Sandton, Johannesburg
                </span>
                <span
                  className="font-jost text-[10px] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: 'rgba(201,169,110,0.15)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    color: '#C9A96E',
                  }}
                >
                  360° View
                </span>
              </div>
            </div>

            {/* Decorative accent below image */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne-gold/20" />
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z"
                  fill="#C9A96E"
                  opacity="0.3"
                />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne-gold/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
