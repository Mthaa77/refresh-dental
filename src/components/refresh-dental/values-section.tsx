'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Users, Award, Sparkles, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Patient Comfort',
    category: 'Experience',
    description: 'From the moment you step through our doors, every detail is crafted to dissolve anxiety and make you feel truly cared for — because your comfort is the foundation of exceptional dentistry.',
    accent: 'bg-warm-blush/15 text-warm-blush',
  },
  {
    icon: Sparkles,
    title: 'Holistic Care',
    category: 'Philosophy',
    description: 'We treat the whole person, not just the tooth. Your oral health is intimately connected to your overall well-being — and our approach honours that powerful connection.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Users,
    title: 'Community Wellness',
    category: 'Outreach',
    description: 'Beyond our clinic walls, we are on a mission to uplift Centurion through corporate wellness programmes, outreach initiatives, and genuine partnerships that create lasting impact.',
    accent: 'bg-sage-teal/10 text-sage-teal',
  },
  {
    icon: Award,
    title: 'Clinical Excellence',
    category: 'Expertise',
    description: 'Dr. Malunga relentlessly pursues the latest advancements in dental science, blending state-of-the-art technology with meticulous, evidence-based expertise you can trust.',
    accent: 'bg-accent-blue/15 text-accent-blue',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    category: 'Integrity',
    description: 'No hidden costs, no surprise treatments, no pressure. We empower you with clear information and honest guidance so you can make confident decisions about your care.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Clock,
    title: 'Emergency Available',
    category: 'Support',
    description: 'Dental emergencies don\'t wait — and neither do we. One call is all it takes, and we\'ll prioritise getting you out of pain and back to smiling the very same day.',
    accent: 'bg-accent-red/15 text-accent-red',
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
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-luxury gold-gradient-text">
            The Refresh Dental Difference
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Six pillars that define the Refresh Dental experience — and why thousands of families trust us with their smiles.
          </motion.p>
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
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl border border-soft-border bg-white p-6 overflow-hidden transition-all duration-300 hover:border-champagne-gold/30 shadow-premium hover-lift shadow-inner-gold hover:shadow-gold"
            >
              {/* Animated gold accent line at top — expands 0→100% on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-rich via-champagne-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]" />
              </div>

              {/* Glass highlight shine at top of card */}
              <div
                className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 40%, transparent 100%)',
                  borderRadius: '1rem 1rem 0 0',
                }}
              />

              {/* Subtle gradient overlay on card background (champagne-gold tones) */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(184,152,48,0.03) 0%, transparent 35%, rgba(240,235,225,0.25) 100%)',
                }}
              />

              {/* Floating shine/glare sweep effect on hover */}
              <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none z-10 rounded-2xl">
                <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
                  <div className="w-[60%] h-full" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.05), transparent)',
                    transform: 'skewX(-15deg)',
                  }} />
                </div>
              </div>

              {/* Watermark number — larger + more visible on hover */}
              <motion.span
                className="absolute top-3 right-4 font-cormorant text-[4.5rem] font-bold leading-none select-none pointer-events-none"
                style={{ color: 'rgba(184, 152, 48, 0.06)' }}
                whileHover={{ opacity: 0.15 }}
                transition={{ duration: 0.3 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>

              {/* Content */}
              <div className="relative z-[15]">
                {/* Category label sub-badge */}
                <span
                  className="mb-2 inline-flex items-center rounded-full bg-gold-pale/30 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-gold-rich uppercase"
                  style={{ borderLeft: '2px solid var(--color-champagne-gold)' }}
                >
                  {value.category}
                </span>

                {/* Icon with spring scale animation on hover */}
                <motion.div
                  className="mb-4 mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
                  style={{
                    background: value.accent.includes('warm-blush') ? 'rgba(196, 144, 124, 0.15)' :
                      value.accent.includes('sage-teal') ? 'rgba(45, 107, 92, 0.10)' :
                      value.accent.includes('accent-blue') ? 'rgba(59, 111, 160, 0.15)' :
                      value.accent.includes('accent-red') ? 'rgba(166, 61, 64, 0.15)' :
                      'rgba(184, 152, 48, 0.10)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -8, 8, -4, 0],
                  }}
                  transition={{ scale: { type: 'spring', stiffness: 400, damping: 15 }, rotate: { duration: 0.6 } }}
                >
                  <value.icon className={`h-6 w-6 ${value.accent.includes('warm-blush') ? 'text-warm-blush' :
                    value.accent.includes('sage-teal') ? 'text-sage-teal' :
                    value.accent.includes('accent-blue') ? 'text-accent-blue' :
                    value.accent.includes('accent-red') ? 'text-accent-red' :
                    'text-champagne-gold'
                  }`} />
                </motion.div>

                <h3 className="font-dm-serif text-lg text-espresso text-shadow-espresso mb-2">
                  {value.title}
                </h3>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
                  {value.description}
                </p>
              </div>

              {/* Bottom gold accent line */}
              <div className="mt-5 h-[1px] w-8 bg-champagne-gold/30 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-champagne-gold/60 group-hover:to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
