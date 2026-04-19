'use client'

import { motion } from 'framer-motion'
import { Star, Users, Award, Shield } from 'lucide-react'

const indicators = [
  {
    icon: Star,
    number: '5.0',
    numberSuffix: '★',
    title: '5.0 Star Rating',
    description: 'Rated 5.0/5 on Google Reviews',
    accentBg: 'bg-champagne-gold/10',
    accentText: 'text-champagne-gold',
    borderColor: 'border-champagne-gold/20 hover:border-champagne-gold/40',
    iconBg: 'bg-champagne-gold/15',
    iconColor: 'text-champagne-gold',
    stars: true,
  },
  {
    icon: Users,
    number: '500',
    numberSuffix: '+',
    title: 'Happy Patients',
    description: 'And counting — join our growing family',
    accentBg: 'bg-sage-teal/10',
    accentText: 'text-sage-teal',
    borderColor: 'border-sage-teal/15 hover:border-sage-teal/30',
    iconBg: 'bg-sage-teal/10',
    iconColor: 'text-sage-teal',
    stars: false,
  },
  {
    icon: Award,
    number: '10',
    numberSuffix: '+',
    title: 'Years Experience',
    description: 'A decade of excellence in dental care',
    accentBg: 'bg-champagne-gold/10',
    accentText: 'text-champagne-gold',
    borderColor: 'border-champagne-gold/20 hover:border-champagne-gold/40',
    iconBg: 'bg-champagne-gold/15',
    iconColor: 'text-champagne-gold',
    stars: false,
  },
  {
    icon: Shield,
    number: 'HPCSA',
    numberSuffix: '',
    title: 'Registered',
    description: 'Fully registered and compliant',
    accentBg: 'bg-sage-teal/10',
    accentText: 'text-sage-teal',
    borderColor: 'border-sage-teal/15 hover:border-sage-teal/30',
    iconBg: 'bg-sage-teal/10',
    iconColor: 'text-sage-teal',
    stars: false,
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

export default function TrustIndicators() {
  return (
    <section className="bg-white border-t border-b border-soft-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Trust & Credibility
          </span>
          <h2 className="font-cormorant text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-tight text-espresso">
            Trusted by Centurion Families
          </h2>
        </motion.div>

        {/* Indicators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {indicators.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow: '0 12px 40px -8px rgba(201, 169, 110, 0.1)',
                  transition: { duration: 0.3 },
                }}
                className={`group rounded-2xl border ${item.borderColor} bg-white p-5 md:p-6 text-center transition-colors duration-300`}
              >
                {/* Icon */}
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Stars (only for rating) */}
                {item.stars && (
                  <div className="flex items-center justify-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 text-champagne-gold fill-champagne-gold"
                      />
                    ))}
                  </div>
                )}

                {/* Number */}
                <div
                  className={`font-cormorant text-3xl md:text-4xl font-medium ${item.accentText} mb-1`}
                >
                  {item.number}
                  <span className="text-2xl md:text-3xl">{item.numberSuffix}</span>
                </div>

                {/* Title */}
                <h3 className="font-dm-serif text-sm md:text-base text-espresso mb-1.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-jost text-xs font-light leading-relaxed text-brown-warm/60">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
