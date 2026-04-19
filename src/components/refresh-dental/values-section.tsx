'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Users, Award, Sparkles, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Patient Comfort',
    description: 'Every detail of our practice is designed to make you feel at ease — from our warm waiting area to our gentle techniques.',
    accent: 'bg-warm-blush/15 text-warm-blush',
  },
  {
    icon: Sparkles,
    title: 'Holistic Care',
    description: 'We believe in treating the whole person. Your oral health is connected to your overall well-being, and we care for both.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Users,
    title: 'Community Wellness',
    description: 'From corporate dental wellness programmes to outreach initiatives, we are committed to uplifting our Centurion community.',
    accent: 'bg-sage-teal/10 text-sage-teal',
  },
  {
    icon: Award,
    title: 'Clinical Excellence',
    description: 'Dr. Malunga stays at the forefront of dental science, combining advanced technology with meticulous, evidence-based techniques.',
    accent: 'bg-sage-teal/10 text-sage-teal',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'No hidden costs, no surprise treatments. We explain every option clearly and help you make informed decisions about your care.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Clock,
    title: 'Emergency Available',
    description: 'Dental emergencies don\'t wait — and neither do we. Call anytime for urgent cases and we\'ll prioritise seeing you the same day.',
    accent: 'bg-warm-blush/15 text-warm-blush',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function ValuesSection() {
  return (
    <section className="bg-sand py-20 md:py-28">
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
            Why Choose Us
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            The Refresh Dental Difference
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            More than a dental practice — a partner in your wellness journey.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{
                y: -4,
                boxShadow: '0 12px 40px -8px rgba(201, 169, 110, 0.12)',
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl border border-soft-border bg-white p-6 overflow-hidden transition-all duration-300 hover:border-champagne-gold/30"
            >
              {/* Watermark number */}
              <span className="absolute top-3 right-4 font-cormorant text-[4.5rem] font-bold leading-none text-champagne-gold/[0.06] select-none pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Gold accent line at top — animated width on hover */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-champagne-gold to-champagne-gold/0"
                initial={{ width: '0%' }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.08 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-champagne-gold to-champagne-gold/30"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />

              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              {/* Icon with hover animation */}
              <div className="relative">
                <motion.div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${value.accent}`}
                  whileHover={{
                    rotate: [0, -8, 8, -4, 0],
                    scale: [1, 1.15, 1.05, 1.1, 1],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="h-6 w-6" />
                </motion.div>
              </div>

              <h3 className="font-dm-serif text-lg text-espresso mb-2 relative">
                {value.title}
              </h3>
              <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70 relative">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
