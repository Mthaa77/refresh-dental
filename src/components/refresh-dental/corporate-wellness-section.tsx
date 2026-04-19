'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Heart, CheckCircle, ArrowRight, Diamond } from 'lucide-react'

const corporateBenefits = [
  { text: 'On-site dental screenings at your workplace' },
  { text: 'Custom wellness plans tailored to your team' },
  { text: 'Employee oral health education workshops' },
  { text: 'Reduced absenteeism through preventive care' },
]

const communityItems = [
  { text: 'School dental health programmes' },
  { text: 'Community health education talks' },
  { text: 'Free dental screening days' },
  { text: 'Partnerships with local organisations' },
]

const corporateBack = {
  title: 'Why Corporate Wellness?',
  description: 'Invest in your team\'s health and productivity. Our corporate programmes are designed to fit your company\'s unique needs with flexible scheduling and customised care plans.',
  stat: '40%',
  statLabel: 'Reduction in dental-related absenteeism',
}

const communityBack = {
  title: 'Our Impact',
  description: 'We\'re committed to making quality dental care accessible to all communities across Gauteng. Our outreach programmes have touched thousands of lives.',
  stat: '2,000+',
  statLabel: 'Community members served annually',
}

const stats = [
  { value: 50, suffix: '+', label: 'Corporate Partners' },
  { value: 5000, suffix: '+', label: 'Screenings' },
  { value: 25, suffix: '+', label: 'Workshops' },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const listFadeUp = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let current = 0
    const increment = target / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {target >= 1000
        ? `${(count / 1000).toFixed(count >= target ? 0 : 0)}${count >= target ? ',' : ''}${count >= 1000 && count < target ? '' : ''}${count >= target ? '000' : count % 1000 > 0 ? count % 1000 : ''}${suffix}`
        : `${count}${suffix}`}
    </span>
  )
}

function FlipCard({
  frontContent,
  backContent,
  delay,
}: {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  delay: number
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-60px' })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => setProgress(100), delay * 1000 + 300)
    return () => clearTimeout(timer)
  }, [isInView, delay])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped((prev) => !prev)}
    >
      {/* Gold progress bar at top — fills on scroll reveal */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[3px] overflow-hidden rounded-t-2xl">
        <motion.div
          className="h-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <div className="relative w-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full rounded-2xl border border-soft-border bg-white p-8 shadow-sm overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </motion.div>
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 rounded-2xl border border-champagne-gold/30 bg-gradient-to-br from-champagne-gold/5 to-gold-light/5 p-8 shadow-sm overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {backContent}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function CorporateWellnessSection() {
  return (
    <section className="relative bg-sand py-20 md:py-28 overflow-hidden">
      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[0]"
        aria-hidden="true"
        style={{ opacity: 0.035 }}
      >
        <defs>
          <pattern id="corporate-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#corporate-grid)" />
      </svg>

      {/* Floating Building SVG watermark in background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[0]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Building2 className="w-[280px] h-[280px] text-champagne-gold opacity-[0.04]" strokeWidth={0.8} />
      </motion.div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Community Impact
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Corporate Wellness &amp; Outreach
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-jost text-sm leading-relaxed text-brown-warm/70">
            At Refresh Dental, we believe oral health extends beyond the clinic.
            Through our corporate wellness programmes and community outreach
            initiatives, we bring quality dental care to workplaces and
            underserved communities across Gauteng.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center px-6 py-4"
            >
              {/* Gold line divider on desktop — between stats, hidden on mobile */}
              {i > 0 && (
                <div className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent sm:block" />
              )}
              <span className="font-cormorant text-3xl font-semibold text-champagne-gold md:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 font-jost text-xs font-medium uppercase tracking-wider text-brown-warm/60">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Two-Column Cards with Flip Effect */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Corporate Wellness — Flip Card */}
          <FlipCard
            delay={0.1}
            frontContent={
              <>
                {/* Building watermark */}
                <Building2 className="absolute top-6 right-6 h-24 w-24 text-champagne-gold" style={{ opacity: 0.08 }} />

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-gold/10">
                    <Building2 className="h-6 w-6 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-dm-serif text-xl text-espresso">
                      Corporate Dental Wellness
                    </h3>
                    <span className="text-[10px] font-jost text-champagne-gold/60 uppercase tracking-wider">Hover to learn more</span>
                  </div>
                </div>

                <p className="mb-6 font-jost text-sm font-light leading-relaxed text-brown-warm/80">
                  We partner with businesses of all sizes to deliver on-site dental
                  screenings, customised employee wellness plans, and engaging oral
                  health education sessions. A healthier team is a more productive
                  team — and it starts with a healthy smile.
                </p>

                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="space-y-3"
                >
                  {corporateBenefits.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={listFadeUp}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        whileHover={{
                          scale: [1, 1.2, 1],
                          transition: { duration: 0.4, ease: "easeInOut" },
                        }}
                        className="mt-0.5 flex-shrink-0"
                      >
                        <CheckCircle className="h-4 w-4 text-sage-teal" />
                      </motion.span>
                      <span className="font-jost text-sm text-brown-warm/80">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            }
            backContent={
              <>
                <div className="flex flex-col items-center justify-center h-full text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-champagne-gold/10"
                  >
                    <Building2 className="h-8 w-8 text-champagne-gold" />
                  </motion.div>
                  <h3 className="font-dm-serif text-xl text-espresso mb-3">
                    {corporateBack.title}
                  </h3>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/80 mb-6">
                    {corporateBack.description}
                  </p>
                  <div className="bg-white/60 rounded-xl px-6 py-4 border border-champagne-gold/10">
                    <span className="block font-cormorant text-3xl font-semibold text-champagne-gold">
                      {corporateBack.stat}
                    </span>
                    <span className="block font-jost text-xs text-brown-warm/60 mt-1">
                      {corporateBack.statLabel}
                    </span>
                  </div>
                </div>
              </>
            }
          />

          {/* Decorative gold diamond ornament — desktop only */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:h-10 md:w-10 md:items-center md:justify-center">
            <div className="flex h-10 w-10 rotate-45 items-center justify-center rounded-md border border-champagne-gold/30 bg-sand">
              <Diamond className="h-4 w-4 -rotate-45 text-champagne-gold/60" />
            </div>
          </div>

          {/* Community Outreach — Flip Card */}
          <FlipCard
            delay={0.25}
            frontContent={
              <>
                {/* Heart watermark */}
                <Heart className="absolute top-6 right-6 h-24 w-24 text-warm-blush" style={{ opacity: 0.08 }} />

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warm-blush/30">
                    <Heart className="h-6 w-6 text-warm-blush" />
                  </div>
                  <div>
                    <h3 className="font-dm-serif text-xl text-espresso">
                      Community Outreach
                    </h3>
                    <span className="text-[10px] font-jost text-champagne-gold/60 uppercase tracking-wider">Hover to learn more</span>
                  </div>
                </div>

                <p className="mb-6 font-jost text-sm font-light leading-relaxed text-brown-warm/80">
                  Giving back is at the heart of what we do. Through school dental
                  health programmes, free screening days, and partnerships with local
                  organisations, we extend quality dental care to communities that
                  need it most across Gauteng.
                </p>

                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="space-y-3"
                >
                  {communityItems.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={listFadeUp}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        whileHover={{
                          scale: [1, 1.2, 1],
                          transition: { duration: 0.4, ease: "easeInOut" },
                        }}
                        className="mt-0.5 flex-shrink-0"
                      >
                        <CheckCircle className="h-4 w-4 text-sage-teal" />
                      </motion.span>
                      <span className="font-jost text-sm text-brown-warm/80">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            }
            backContent={
              <>
                <div className="flex flex-col items-center justify-center h-full text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-warm-blush/20"
                  >
                    <Heart className="h-8 w-8 text-warm-blush" />
                  </motion.div>
                  <h3 className="font-dm-serif text-xl text-espresso mb-3">
                    {communityBack.title}
                  </h3>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/80 mb-6">
                    {communityBack.description}
                  </p>
                  <div className="bg-white/60 rounded-xl px-6 py-4 border border-warm-blush/10">
                    <span className="block font-cormorant text-3xl font-semibold text-warm-blush">
                      {communityBack.stat}
                    </span>
                    <span className="block font-jost text-xs text-brown-warm/60 mt-1">
                      {communityBack.statLabel}
                    </span>
                  </div>
                </div>
              </>
            }
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="mb-6 font-jost text-base text-espresso/80">
            Interested in Corporate Wellness?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold bg-champagne-gold px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-champagne-gold/90 hover:shadow-lg"
          >
            Contact Dr. Malunga
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
