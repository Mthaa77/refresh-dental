'use client'

import { motion } from 'framer-motion'
import { Monitor, Box, Zap, Camera, ShieldCheck, Settings } from 'lucide-react'

const technologies = [
  {
    icon: Monitor,
    title: 'Digital X-Rays',
    description: 'Low-radiation digital imaging for accurate diagnostics',
  },
  {
    icon: Box,
    title: '3D Imaging',
    description: 'Advanced cone beam CT for detailed treatment planning',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    description: 'Minimally invasive procedures with faster healing',
  },
  {
    icon: Camera,
    title: 'Intraoral Scanner',
    description: 'Digital impressions for a comfortable experience',
  },
  {
    icon: ShieldCheck,
    title: 'Sterilization Center',
    description: 'Hospital-grade sterilization for your safety',
  },
  {
    icon: Settings,
    title: 'Modern Equipment',
    description: 'State-of-the-art chairs and delivery systems',
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

export default function TechnologySection() {
  return (
    <section id="technology" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Advanced Technology, Gentle Care
          </h2>
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
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative rounded-2xl border border-champagne-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-champagne-gold/30 hover:shadow-lg hover:shadow-champagne-gold/5"
              >
                {/* Gold accent line on hover */}
                <div className="absolute left-0 top-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-champagne-gold to-champagne-gold-light transition-all duration-500 group-hover:w-full" />

                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-champagne-gold/8">
                  <Icon
                    className="h-6 w-6 text-champagne-gold transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-dm-serif text-lg text-espresso">
                  {tech.title}
                </h3>
                <p className="font-jost text-sm leading-relaxed text-brown-warm/60">
                  {tech.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
