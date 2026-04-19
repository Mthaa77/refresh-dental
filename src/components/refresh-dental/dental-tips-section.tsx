'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, UtensilsCrossed, Calendar, Shield, Smile, ArrowRight } from 'lucide-react'

const tips = [
  {
    icon: Sparkles,
    title: 'The Art of Brushing',
    description:
      'Proper brushing technique is the foundation of oral health. Use a soft-bristled brush at a 45-degree angle for two minutes, twice daily.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Heart,
    title: 'Flossing Matters',
    description:
      'Flossing removes plaque from areas your brush can\'t reach. Make it a daily habit for healthier gums and fresher breath.',
    accent: 'bg-warm-blush/20 text-warm-blush',
  },
  {
    icon: UtensilsCrossed,
    title: 'Diet & Your Teeth',
    description:
      'Limit sugary snacks and acidic drinks. Calcium-rich foods and crunchy vegetables naturally strengthen your enamel.',
    accent: 'bg-sage-teal/10 text-sage-teal',
  },
  {
    icon: Calendar,
    title: 'Regular Check-ups',
    description:
      'Visit your dentist every 6 months for professional cleaning and early detection of potential issues.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
  },
  {
    icon: Shield,
    title: 'Teeth Whitening Safety',
    description:
      'Always consult your dentist before whitening. Professional treatments are safer and more effective than over-the-counter options.',
    accent: 'bg-sage-teal/10 text-sage-teal',
  },
  {
    icon: Smile,
    title: 'Kids Dental Care',
    description:
      'Start dental visits by age 1. Make brushing fun with flavored toothpaste and positive reinforcement.',
    accent: 'bg-warm-blush/20 text-warm-blush',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function DentalTipsSection() {
  return (
    <section id="tips" className="bg-sand py-20 md:py-28">
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
            Expert Advice
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Dental Care Tips
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            Expert advice from Dr. Malunga for a healthier smile.
          </p>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tips.map((tip, idx) => (
            <motion.div
              key={tip.title}
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: '0 12px 36px -8px rgba(201, 169, 110, 0.14)',
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-soft-border bg-white p-6 transition-colors duration-300 hover:border-champagne-gold/40"
            >
              {/* Numbered badge — top right */}
              <span className="absolute top-4 right-4 font-cormorant text-3xl font-semibold leading-none select-none md:text-4xl" style={{ color: 'rgba(201, 169, 110, 0.1)' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Gold accent line — top */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold/0 to-transparent transition-all duration-500 group-hover:via-champagne-gold/60" />

              {/* Icon with floating animation */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.4,
                  ease: "easeInOut",
                }}
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${tip.accent}`}
              >
                <tip.icon className="h-5 w-5" />
              </motion.div>

              {/* Title */}
              <h3 className="font-dm-serif text-lg text-espresso mb-1">
                {tip.title}
              </h3>

              {/* Pro Tip label badge */}
              <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-champagne-gold/8 px-2.5 py-0.5">
                <Sparkles className="h-3 w-3 text-champagne-gold" />
                <span className="font-jost text-[10px] font-semibold uppercase tracking-wider text-champagne-gold">
                  Pro Tip
                </span>
              </span>

              {/* Description */}
              <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70">
                {tip.description}
              </p>

              {/* Hover: "Learn More" reveal */}
              <motion.div
                className="mt-4 overflow-hidden border-t border-soft-border/0 pt-0 transition-all duration-500 group-hover:border-soft-border group-hover:pt-3"
              >
                <motion.span
                  className="inline-flex items-center gap-1 font-jost text-xs font-medium text-champagne-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Learn More
                  <motion.span
                    className="inline-block"
                    animate={undefined}
                    whileHover={{ x: 3 }}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </motion.span>
                </motion.span>
              </motion.div>

              {/* Gold accent line — bottom */}
              <div className="mt-5 h-[1px] w-8 bg-champagne-gold/30 transition-all duration-500 group-hover:w-full group-hover:bg-champagne-gold/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA — with shimmer overlay animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-champagne-gold bg-transparent px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-champagne-gold transition-all duration-300 hover:bg-champagne-gold hover:text-white hover:shadow-lg"
          >
            {/* Shimmer overlay */}
            <motion.span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Read More on Our Blog
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
