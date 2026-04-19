'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface MedicalAid {
  name: string
  display: string
  gradientFrom: string
  gradientTo: string
}

const medicalAids: MedicalAid[] = [
  {
    name: 'discovery',
    display: 'DISCOVERY',
    gradientFrom: '#0A3D7C',
    gradientTo: '#1A6DD4',
  },
  {
    name: 'bonitas',
    display: 'BONITAS',
    gradientFrom: '#1B7A3D',
    gradientTo: '#28A05B',
  },
  {
    name: 'momentum',
    display: 'MOMENTUM',
    gradientFrom: '#B22234',
    gradientTo: '#E8384F',
  },
  {
    name: 'medihelp',
    display: 'MEDIHELP',
    gradientFrom: '#D4681A',
    gradientTo: '#F5922A',
  },
  {
    name: 'gems',
    display: 'GEMS',
    gradientFrom: '#1A6B5C',
    gradientTo: '#2A9D8F',
  },
  {
    name: 'bankmed',
    display: 'BANKMED',
    gradientFrom: '#1B2A4A',
    gradientTo: '#2C4270',
  },
  {
    name: 'netcare',
    display: 'NETCARE',
    gradientFrom: '#0D2B5E',
    gradientTo: '#1E4090',
  },
  {
    name: 'profmed',
    display: 'PROFMED',
    gradientFrom: '#5B2D8E',
    gradientTo: '#7B4FBA',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* Diamond ornament positions between rows (grid-cols-4 → row break after 4 items) */
const diamondOrnaments = [
  { left: '12%', top: 'calc(50% - 6px)' },
  { left: '50%', top: 'calc(50% - 6px)' },
  { left: '88%', top: 'calc(50% - 6px)' },
]

export default function InsurancePartners() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

  return (
    <section id="insurance" className="relative overflow-hidden bg-white">
      {/* Subtle gold gradient divider line above section */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Peace of Mind
          </span>
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight gold-gradient-text">
              Accepted Medical Aids
            </h2>
            {/* Verified Provider badge */}
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border border-champagne-gold/30 bg-champagne-gold/5 px-3 py-1 font-jost text-[10px] font-semibold uppercase tracking-wider text-champagne-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Provider
            </motion.span>
          </div>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-muted">
            We work with all major South African medical aids
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="mx-auto mb-14 h-px w-32"
          style={{ backgroundColor: '#B89830' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Subtle pulsing glow behind the grid */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[300px] rounded-full pointer-events-none sm:h-[400px] sm:w-[500px] md:h-[500px] md:w-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(184, 152, 48, 0.03) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {/* Medical Aid Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          {medicalAids.map((aid, index) => (
            <motion.div
              key={aid.name}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl p-6 text-center shadow-premium transition-shadow hover:shadow-lg cursor-default hover-lift"
              style={{
                background: `linear-gradient(135deg, ${aid.gradientFrom}dd, ${aid.gradientTo}dd)`,
              }}
              onMouseEnter={() => setHoveredBadge(aid.name)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              {/* Gradient shine sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-[2]"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
                }}
              />

              {/* "Most Popular" ribbon on Discovery (first badge) */}
              {index === 0 && (
                <div className="absolute -top-0 -right-0 z-[3]">
                  <div className="relative">
                    {/* Ribbon triangle tail */}
                    <svg
                      width="70"
                      height="24"
                      viewBox="0 0 70 24"
                      className="absolute -right-0 top-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 0H70V24L35 18L0 24Z"
                        fill="#B89830"
                      />
                    </svg>
                    <span className="absolute right-1 top-1 font-jost text-[7px] font-bold uppercase tracking-wider text-espresso leading-none whitespace-nowrap z-10">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              {/* Subtle overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative font-jost text-base font-bold tracking-wider text-white sm:text-lg">
                {aid.display}
              </span>

              {/* Tooltip on hover — "In-network provider" */}
              {hoveredBadge === aid.name && (
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 rounded-md bg-espresso/90 px-3 py-1 font-jost text-[11px] text-ivory whitespace-nowrap pointer-events-none shadow-lg"
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  In-network provider
                  {/* Tooltip arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-espresso/90" />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Decorative diamond ornaments between rows */}
          {diamondOrnaments.map((pos, i) => (
            <div
              key={`diamond-${i}`}
              className="absolute z-10 hidden md:block"
              style={{ left: pos.left, top: pos.top }}
              aria-hidden="true"
            >
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className="text-champagne-gold"
                animate={{ opacity: [0.3, 0.7, 0.3], rotate: [0, 90, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
              >
                <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
              </motion.svg>
            </div>
          ))}
        </motion.div>

        {/* Bottom text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center space-y-5"
        >
          <p className="font-jost text-sm text-brown-muted/90">
            Don&apos;t see your medical aid? Contact us — we work with most providers.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold bg-champagne-gold px-8 py-3 font-jost text-sm font-semibold text-espresso transition-all hover:bg-transparent hover:text-champagne-gold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Check Your Cover
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Sand border bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E3DACA] to-transparent" />
    </section>
  )
}
