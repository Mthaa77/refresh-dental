'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, ShieldCheck, Heart } from 'lucide-react'

/* ========================================
   ANIMATION VARIANTS
   ======================================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
}

const featureCardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.4 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

/* ========================================
   FEATURES DATA
   ======================================== */

const features = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Permanent Solution',
    description: 'Designed to last a lifetime with proper care',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Natural Appearance',
    description: 'Custom-crafted to match your natural teeth perfectly',
  },
  {
    number: '03',
    icon: Heart,
    title: 'Bone Preservation',
    description: 'Prevents jaw bone deterioration after tooth loss',
  },
  {
    number: '04',
    icon: Clock,
    title: 'Quick Recovery',
    description: 'Most patients return to normal activities within days',
  },
]

/* ========================================
   IMPLANTS SPOTLIGHT COMPONENT
   ======================================== */

export default function ImplantsSpotlight() {
  return (
    <section className="relative overflow-hidden bg-espresso">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso-light/80 to-espresso" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-champagne-gold/[0.03] via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-sage-teal/[0.04] via-transparent to-transparent" />
      </div>

      {/* Gold divider line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ======= LEFT SIDE — DESCRIPTIVE TEXT ======= */}
          <div className="space-y-8">
            {/* Featured Treatment Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="h-px w-8 bg-champagne-gold" />
              <span className="font-jost text-xs font-semibold uppercase tracking-[0.25em] text-champagne-gold">
                Featured Treatment
              </span>
            </motion.div>

            {/* Heading — Chrome Gold Gradient */}
            <motion.h2
              variants={itemVariants}
              className="font-cormorant font-light text-5xl lg:text-6xl leading-[1.05] gold-gradient-text"
            >
              Dental Implants
            </motion.h2>

            {/* Decorative gold line */}
            <motion.div
              variants={itemVariants}
              className="h-[1.5px] w-20 bg-gradient-to-r from-champagne-gold via-gold-light to-transparent"
            />

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="font-jost text-ivory/70 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Dental implants are the gold standard for permanent tooth replacement,
              offering a natural-looking and long-lasting solution that restores both
              function and confidence. Our titanium posts integrate seamlessly with your
              jawbone, providing a foundation that looks, feels, and performs just like
              your natural teeth.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-jost text-ivory/60 text-sm md:text-base leading-relaxed max-w-lg"
            >
              Whether you&apos;re missing a single tooth or need a full arch restoration,
              Dr. Malunga combines advanced digital planning with meticulous surgical
              precision to deliver results that exceed expectations.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 12px 24px rgba(184, 152, 48, 0.2)',
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold/70 text-champagne-gold px-8 py-4 font-jost text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-champagne-gold hover:text-espresso"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* ======= RIGHT SIDE — FEATURES LIST ======= */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.number}
                custom={i}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ x: 8, transition: { duration: 0.25 } }}
                className="group flex items-start gap-5 rounded-xl p-5 transition-all duration-300 hover:bg-ivory/[0.04] border border-transparent hover:border-champagne-gold/10"
              >
                {/* Numbered Circle */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-champagne-gold/30 bg-champagne-gold/5 group-hover:border-champagne-gold/60 group-hover:bg-champagne-gold/10 transition-all duration-300">
                  <span className="font-cormorant text-lg font-semibold text-champagne-gold">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2.5">
                    <feature.icon className="w-4 h-4 text-champagne-gold" />
                    <h3 className="font-dm-serif text-ivory text-base md:text-lg">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="font-jost text-ivory/60 text-sm leading-relaxed pl-6.5">
                    {feature.description}
                  </p>
                </div>

                {/* Gold accent line on hover */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-champagne-gold to-gold-light rounded-full group-hover:h-8 transition-all duration-500 hidden" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gold divider line at bottom */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />
    </section>
  )
}
