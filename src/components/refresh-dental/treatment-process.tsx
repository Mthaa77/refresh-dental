'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Stethoscope, ClipboardList, Heart, PartyPopper } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Calendar,
    title: 'Book Your Visit',
    description:
      "Schedule your appointment in seconds — online, by phone, or WhatsApp. We'll find the perfect time that fits your life, not the other way around.",
    duration: '~15 min',
  },
  {
    number: 2,
    icon: Stethoscope,
    title: 'Meet Dr. Malunga',
    description:
      'Experience a thorough, unhurried consultation where we truly listen to your concerns and assess your oral health with cutting-edge precision.',
    duration: '~30 min',
  },
  {
    number: 3,
    icon: ClipboardList,
    title: 'Custom Treatment Plan',
    description:
      "Receive a clear, personalised roadmap with full transparency on options, costs, and timelines — empowered to make the best decision for your smile.",
    duration: '~20 min',
  },
  {
    number: 4,
    icon: Heart,
    title: 'Expert Care',
    description:
      'Relax in our capable hands as Dr. Malunga delivers gentle, meticulous treatment using the latest technology — comfortable, precise, and transformative.',
    duration: '~60 min',
  },
  {
    number: 5,
    icon: PartyPopper,
    title: 'Enjoy Your Smile',
    description:
      'Walk out with a renewed sense of confidence and a smile that lights up every room — results designed to last a lifetime.',
    duration: 'Lifetime',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function StepCard({
  step,
  isLast,
}: {
  step: (typeof steps)[number]
  isLast: boolean
}) {
  const Icon = step.icon
  const [bouncing, setBouncing] = useState(false)

  const handleBounce = () => {
    setBouncing(true)
    setTimeout(() => setBouncing(false), 600)
  }

  return (
    <div className="relative flex flex-col items-center text-center shadow-premium rounded-2xl p-5 hover-lift">
      {/* Step content */}
      <motion.div
        variants={stepVariants}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Numbered circle with icon */}
        <div className="relative mb-5">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-champagne-gold/20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: step.number * 0.3,
            }}
            style={{ margin: '-4px' }}
          />
          {/* Outer gold ring */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-gold/40 bg-ivory">
            {/* Inner circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Icon className="h-7 w-7 text-sage-teal" strokeWidth={1.5} />
            </div>
          </div>
          {/* Number badge with bounce */}
          <motion.button
            onClick={handleBounce}
            className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-champagne-gold text-sm font-bold text-espresso font-jost shadow-md cursor-pointer border-0 outline-none shadow-gold gold-gradient-text"
            animate={bouncing ? {
              y: [0, -12, -4, -8, 0],
              scale: [1, 1.15, 0.95, 1.05, 1],
            } : {}}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 400,
              damping: 8,
            }}
            aria-label={`Step ${step.number}: ${step.title}`}
          >
            {step.number}
          </motion.button>
        </div>

        {/* Title */}
        <h3 className="font-dm-serif text-lg text-espresso mb-2">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70 max-w-[220px]">
          {step.description}
        </p>

        {/* Estimated time label */}
        <motion.span
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 px-3 py-1"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + step.number * 0.1, duration: 0.4 }}
        >
          <span className="font-jost text-[11px] font-medium text-champagne-gold/70">
            {step.duration}
          </span>
        </motion.span>
      </motion.div>

      {/* Desktop connecting line (horizontal) with gradient animation */}
      {!isLast && (
        <motion.div
          variants={lineVariants}
          className="hidden lg:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] origin-left"
        >
          <div className="h-px bg-gradient-to-r from-champagne-gold/60 via-champagne-gold/30 to-champagne-gold/60" />
        </motion.div>
      )}
    </div>
  )
}

function MobileTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [timelineHeight, setTimelineHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })

  const lineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])
  const dotY = useTransform(scrollYProgress, [0.1, 0.8], [0, timelineHeight * 0.8])

  useEffect(() => {
    const el = timelineRef.current
    if (el) {
      setTimelineHeight(el.scrollHeight)
      const observer = new ResizeObserver(() => {
        setTimelineHeight(el.scrollHeight)
      })
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [])

  return (
    <div className="lg:hidden relative pl-10" ref={timelineRef}>
      {/* Vertical connecting line with scroll-driven animation */}
      <div className="absolute left-[18px] top-5 bottom-5 w-px origin-top">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-champagne-gold/60 via-champagne-gold/30 to-champagne-gold/60"
          style={{ scaleY: lineScale }}
        />
      </div>

      {/* Glowing dot that travels along the mobile timeline */}
      <motion.div
        className="absolute left-[14px] top-5 z-20"
        style={{ y: dotY }}
      >
        <motion.div
          className="h-[9px] w-[9px] rounded-full bg-champagne-gold"
          animate={{
            boxShadow: [
              '0 0 4px rgba(201, 169, 110, 0.4)',
              '0 0 12px rgba(201, 169, 110, 0.8), 0 0 24px rgba(201, 169, 110, 0.3)',
              '0 0 4px rgba(201, 169, 110, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-10"
      >
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <motion.div key={step.number} variants={stepVariants} className="relative flex gap-5">
              {/* Icon circle on the line */}
              <div className="absolute -left-10 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-champagne-gold/40 bg-ivory z-10">
                {/* Pulsing ring for mobile */}
                <motion.div
                  className="absolute inset-[-3px] rounded-full border-2 border-champagne-gold/15"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: step.number * 0.3,
                  }}
                />
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <Icon className="h-3.5 w-3.5 text-sage-teal" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-gold text-[10px] font-bold text-espresso font-jost gold-gradient-text shadow-gold">
                    {step.number}
                  </span>
                  <h3 className="font-dm-serif text-base text-espresso">
                    {step.title}
                  </h3>
                </div>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70">
                  {step.description}
                </p>
                {/* Mobile estimated time label */}
                <span className="mt-2 inline-flex items-center rounded-full border border-champagne-gold/20 bg-champagne-gold/5 px-2.5 py-0.5">
                  <span className="font-jost text-[10px] font-medium text-champagne-gold/70">
                    {step.duration}
                  </span>
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

function DesktopTimeline() {
  const gridRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  })

  const dotX = useTransform(scrollYProgress, [0.1, 0.7], [0, 100])

  return (
    <div className="relative" ref={gridRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="hidden lg:grid lg:grid-cols-5 lg:gap-4 xl:gap-6 relative z-10"
      >
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </motion.div>

      {/* Glowing dot that travels along the desktop timeline */}
      <motion.div
        className="hidden lg:block absolute top-10 z-30 pointer-events-none"
        style={{
          left: useTransform(dotX, [0, 100], ['8%', '92%']),
        }}
      >
        <motion.div
          className="h-[10px] w-[10px] rounded-full bg-champagne-gold -translate-x-1/2 -translate-y-1/2"
          animate={{
            boxShadow: [
              '0 0 4px rgba(201, 169, 110, 0.4)',
              '0 0 14px rgba(201, 169, 110, 0.8), 0 0 28px rgba(201, 169, 110, 0.3)',
              '0 0 4px rgba(201, 169, 110, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function TreatmentProcess() {
  return (
    <section id="process" className="bg-ivory py-20 md:py-28 relative overflow-hidden">
      {/* Subtle diagonal stripe pattern for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#C9A96E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            How It Works
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Your Journey to a Refreshed Smile
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            From your very first consultation to a confident, lasting smile — we&rsquo;re with you at every step of the way.
          </p>
        </motion.div>

        {/* Mobile Timeline */}
        <MobileTimeline />

        {/* Desktop Timeline (horizontal) */}
        <DesktopTimeline />
      </div>
    </section>
  )
}
