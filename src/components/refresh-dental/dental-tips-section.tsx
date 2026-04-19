'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, UtensilsCrossed, Calendar, Shield, Smile, ArrowRight, Clock } from 'lucide-react'

const tips = [
  {
    icon: Sparkles,
    title: 'The Art of Brushing',
    description:
      'Angle your soft-bristled brush at 45° to your gums and use gentle, circular motions. Spend a full two minutes — morning and night — and don\'t forget to brush your tongue for fresher breath.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
    readTime: '2 min read',
  },
  {
    icon: Heart,
    title: 'Flossing Matters',
    description:
      'Flossing reaches the 40% of your tooth surfaces that brushing simply cannot. Make it a daily habit — your gums will thank you, and your breath will stay noticeably fresher.',
    accent: 'bg-accent-blue/10 text-accent-blue',
    readTime: '2 min read',
  },
  {
    icon: UtensilsCrossed,
    title: 'Diet & Your Teeth',
    description:
      'Swap sugary snacks for calcium-rich cheese, crunchy apples, and leafy greens. These natural foods neutralise acids, strengthen enamel, and stimulate saliva production.',
    accent: 'bg-accent-red/10 text-accent-red',
    readTime: '3 min read',
  },
  {
    icon: Calendar,
    title: 'Regular Check-ups',
    description:
      'Six-month check-ups catch problems early — often before you feel any discomfort. Professional cleanings also remove tartar buildup that brushing alone cannot address.',
    accent: 'bg-champagne-gold/10 text-champagne-gold',
    readTime: '2 min read',
  },
  {
    icon: Shield,
    title: 'Teeth Whitening Safety',
    description:
      'Always consult Dr. Malunga before whitening. Professional treatments deliver stunning results safely, while over-the-counter kits risk enamel damage and uneven results.',
    accent: 'bg-accent-blue/10 text-accent-blue',
    readTime: '3 min read',
  },
  {
    icon: Smile,
    title: 'Kids Dental Care',
    description:
      'Start dental visits by age one and make brushing an adventure, not a chore. Use flavoured toothpaste, reward charts, and lead by example — your child will love their smile.',
    accent: 'bg-accent-red/10 text-accent-red',
    readTime: '2 min read',
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
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Dental Care Tips
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Small daily habits that make a big difference — expert tips from Dr. Malunga to keep your smile healthy and radiant between visits.
          </motion.p>
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
                boxShadow: '0 12px 36px -8px rgba(184, 152, 48, 0.14)',
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-soft-border bg-card p-6 shadow-premium hover-lift hover-glow transition-colors duration-300 hover:border-champagne-gold/40"
            >
              {/* Subtle ivory dots pattern overlay — 2% opacity */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(253, 250, 246, 1) 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                  opacity: 0.02,
                }}
                aria-hidden="true"
              />

              {/* Gradient hover sweep effect — left to right */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(184, 152, 48, 0.04) 50%, transparent 100%)',
                }}
              />

              {/* Numbered gold corner badge — animated reveal on scroll */}
              <motion.span
                className="absolute top-4 right-4 font-cormorant text-3xl font-semibold leading-none select-none md:text-4xl"
                style={{ color: 'rgba(184, 152, 48, 0.12)' }}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 + 0.3, ease: 'easeOut' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.span>

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
              <h3 className="font-dm-serif text-xl text-espresso text-shadow-espresso mb-1">
                {tip.title}
              </h3>

              {/* Pro Tip label badge */}
              <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-champagne-gold/8 px-2.5 py-0.5">
                <Sparkles className="h-3 w-3 text-champagne-gold" />
                <span className="font-jost text-[10px] font-semibold uppercase tracking-wider text-champagne-gold">
                  Pro Tip
                </span>
              </span>

              {/* Read Time indicator */}
              <span className="mb-3 inline-flex items-center gap-1 font-jost text-[10px] text-brown-muted/70">
                <Clock className="h-3 w-3" />
                {tip.readTime}
              </span>

              {/* Description */}
              <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
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
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-champagne-gold bg-transparent px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-champagne-gold shadow-gold transition-all duration-300 hover:bg-champagne-gold hover:text-white"
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
