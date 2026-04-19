'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Box, Zap, Camera, ShieldCheck, Settings } from 'lucide-react'

const technologies = [
  {
    icon: Monitor,
    title: 'Digital X-Rays',
    description: 'Low-radiation digital imaging for accurate diagnostics',
    fact: '90% less radiation than traditional film X-rays',
  },
  {
    icon: Box,
    title: '3D Imaging',
    description: 'Advanced cone beam CT for detailed treatment planning',
    fact: 'Creates a complete 3D model of your jaw in under a minute',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    description: 'Minimally invasive procedures with faster healing',
    fact: 'Often eliminates the need for anaesthesia and stitches',
  },
  {
    icon: Camera,
    title: 'Intraoral Scanner',
    description: 'Digital impressions for a comfortable experience',
    fact: 'Replaces uncomfortable traditional dental impressions',
  },
  {
    icon: ShieldCheck,
    title: 'Sterilization Center',
    description: 'Hospital-grade sterilization for your safety',
    fact: 'Hospital-grade sterilization for maximum patient safety',
  },
  {
    icon: Settings,
    title: 'Modern Equipment',
    description: 'State-of-the-art chairs and delivery systems',
    fact: 'Investing in the latest technology for superior results',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
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

function TechnologyCard({ tech, idx }: { tech: (typeof technologies)[number]; idx: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tech.icon

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl border border-champagne-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{
          boxShadow: isHovered
            ? '0 0 0 1px rgba(201, 169, 110, 0.3), 0 12px 40px -8px rgba(201, 169, 110, 0.12)'
            : undefined,
          borderColor: isHovered ? 'rgba(201, 169, 110, 0.3)' : undefined,
        }}
      >
        {/* Gold accent line on hover */}
        <div className="absolute left-0 top-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-champagne-gold to-champagne-gold-light transition-all duration-500 group-hover:w-full" />

        {/* Icon with glow ring */}
        <div className="mb-4 relative">
          {/* Animated glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isHovered
                ? '0 0 20px rgba(201, 169, 110, 0.2), 0 0 40px rgba(201, 169, 110, 0.1)'
                : '0 0 0px rgba(201, 169, 110, 0)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-champagne-gold/8 transition-transform duration-300 group-hover:scale-110"
            animate={{
              boxShadow: isHovered
                ? '0 0 0 4px rgba(201, 169, 110, 0.08), 0 0 0 8px rgba(201, 169, 110, 0.04)'
                : '0 0 0 0px rgba(201, 169, 110, 0)',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Icon
              className="h-6 w-6 text-champagne-gold"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="mb-2 font-dm-serif text-lg text-espresso">
          {tech.title}
        </h3>
        <p className="font-jost text-sm leading-relaxed text-brown-warm/60">
          {tech.description}
        </p>

        {/* Did You Know? tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex items-start gap-2 border-t border-champagne-gold/10 pt-3">
                <span className="mt-0.5 text-xs">💡</span>
                <p className="font-jost text-xs leading-relaxed text-sage-teal/80">
                  <span className="font-semibold text-sage-teal">Did You Know? </span>
                  {tech.fact}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function TechnologySection() {
  return (
    <section id="technology" className="bg-ivory py-20 md:py-28 relative overflow-hidden">
      {/* Decorative circuit-board pattern background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 600"
        >
          {/* Horizontal lines */}
          <line x1="0" y1="60" x2="800" y2="60" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="0" y1="280" x2="800" y2="280" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="0" y1="520" x2="800" y2="520" stroke="#C9A96E" strokeWidth="0.5" />
          {/* Vertical lines */}
          <line x1="100" y1="0" x2="100" y2="600" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="250" y1="0" x2="250" y2="600" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="400" y1="0" x2="400" y2="600" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="550" y1="0" x2="550" y2="600" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="#C9A96E" strokeWidth="0.5" />
          {/* Circuit nodes (small circles at intersections) */}
          <circle cx="100" cy="60" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="250" cy="150" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="400" cy="280" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="550" cy="400" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="700" cy="520" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="250" cy="280" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="550" cy="150" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="100" cy="400" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="700" cy="60" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          <circle cx="400" cy="520" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          {/* Diagonal connectors */}
          <line x1="100" y1="60" x2="250" y2="150" stroke="#C9A96E" strokeWidth="0.3" />
          <line x1="250" y1="150" x2="400" y2="280" stroke="#C9A96E" strokeWidth="0.3" />
          <line x1="400" y1="280" x2="550" y2="400" stroke="#C9A96E" strokeWidth="0.3" />
          <line x1="550" y1="400" x2="700" y2="520" stroke="#C9A96E" strokeWidth="0.3" />
          <line x1="250" y1="280" x2="550" y2="150" stroke="#C9A96E" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Our Technology
          </span>
          <div className="flex items-center justify-center gap-3">
            {/* Animated settings gear icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-champagne-gold/40"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </motion.div>
            <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
              Advanced Technology, Gentle Care
            </h2>
            {/* Animated chip icon on right */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="text-champagne-gold/40"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
              </svg>
            </motion.div>
          </div>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            We invest in the latest dental technology to ensure precise, comfortable,
            and efficient treatments.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech, idx) => (
            <TechnologyCard key={idx} tech={tech} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
