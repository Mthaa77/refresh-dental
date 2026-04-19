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

const stats = [
  { value: 50, suffix: '+', label: 'Corporate Partners' },
  { value: 5000, suffix: '+', label: 'Screenings' },
  { value: 25, suffix: '+', label: 'Workshops' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num >= target ? 0 : 1)}${num >= target ? ',' : ''}${num >= 1000 && num < target ? Math.floor((num % 1000)).toString().padStart(3, '0') : ''}`
    }
    return num.toLocaleString()
  }

  return (
    <span ref={ref}>
      {target >= 1000
        ? `${(count / 1000).toFixed(count >= target ? 0 : (count % 1000 === 0 ? 0 : 1))}${count >= target ? ',' : ''}${count >= 1000 && count < target ? '' : ''}${count >= target ? '000' : count % 1000 > 0 ? count % 1000 : ''}${suffix}`
        : `${count}${suffix}`}
    </span>
  )
}

export default function CorporateWellnessSection() {
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

        {/* Two-Column Cards */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Corporate Wellness */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative overflow-hidden rounded-2xl border border-soft-border bg-white p-8 shadow-sm"
          >
            {/* Building watermark */}
            <Building2 className="absolute top-6 right-6 h-24 w-24 text-champagne-gold" style={{ opacity: 0.08 }} />

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-gold/10">
                <Building2 className="h-6 w-6 text-champagne-gold" />
              </div>
              <h3 className="font-dm-serif text-xl text-espresso">
                Corporate Dental Wellness
              </h3>
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
          </motion.div>

          {/* Decorative gold diamond ornament — desktop only */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:h-10 md:w-10 md:items-center md:justify-center">
            <div className="flex h-10 w-10 rotate-45 items-center justify-center rounded-md border border-champagne-gold/30 bg-sand">
              <Diamond className="h-4 w-4 -rotate-45 text-champagne-gold/60" />
            </div>
          </div>

          {/* Community Outreach */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.15 }}
            className="group relative overflow-hidden rounded-2xl border border-soft-border bg-white p-8 shadow-sm"
          >
            {/* Heart watermark */}
            <Heart className="absolute top-6 right-6 h-24 w-24 text-warm-blush" style={{ opacity: 0.08 }} />

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warm-blush/30">
                <Heart className="h-6 w-6 text-warm-blush" />
              </div>
              <h3 className="font-dm-serif text-xl text-espresso">
                Community Outreach
              </h3>
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
          </motion.div>
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
