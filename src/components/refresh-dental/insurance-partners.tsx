'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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

export default function InsurancePartners() {
  return (
    <section id="insurance" className="relative overflow-hidden bg-white">
      {/* Sand border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F5EFE6] to-transparent" />

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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Accepted Medical Aids
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-warm/70">
            We work with all major South African medical aids
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="mx-auto mb-14 h-px w-32"
          style={{ backgroundColor: '#C9A96E' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Medical Aid Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          {medicalAids.map((aid) => (
            <motion.div
              key={aid.name}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${aid.gradientFrom}dd, ${aid.gradientTo}dd)`,
              }}
            >
              {/* Subtle overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative font-jost text-base font-bold tracking-wider text-white sm:text-lg">
                {aid.display}
              </span>
            </motion.div>
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
          <p className="font-jost text-sm text-brown-warm/60">
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
      <div className="h-px bg-gradient-to-r from-transparent via-[#F5EFE6] to-transparent" />
    </section>
  )
}
