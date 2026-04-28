'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Stethoscope, ClipboardList, Heart, PartyPopper } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Calendar,
    title: 'Book Your Visit',
    description:
      "Book your appointment effortlessly — online, by phone, or via WhatsApp. We'll find a time that suits your schedule, because your convenience matters to us.",
    duration: '~15 min',
  },
  {
    number: 2,
    icon: Stethoscope,
    title: 'Meet Dr. Malunga',
    description:
      'Experience a thorough, unhurried consultation where we listen to your concerns, understand your goals, and assess your oral health with state-of-the-art precision.',
    duration: '~30 min',
  },
  {
    number: 3,
    icon: ClipboardList,
    title: 'Custom Treatment Plan',
    description:
      "Receive a clear, bespoke treatment roadmap with full transparency on every option, cost, and timeline — empowering you to make the best decision for your oral health.",
    duration: '~20 min',
  },
  {
    number: 4,
    icon: Heart,
    title: 'Expert Care',
    description:
      'Relax in the care of a trusted professional as Dr. Malunga delivers gentle, precise treatment using advanced technology — comfortable, meticulous, and designed to exceed your expectations.',
    duration: '~60 min',
  },
  {
    number: 5,
    icon: PartyPopper,
    title: 'Enjoy Your Smile',
    description:
      'Walk out with a renewed sense of confidence and a smile you&rsquo;ll be proud to share — results crafted to last and designed with your unique beauty in mind.',
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
    <div className="relative flex flex-col items-center text-center shadow-premium rounded-2xl p-5 hover-lift bg-card">
      {/* Step content */}
      <motion.div
        variants={stepVariants}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Numbered circle with icon */}
        <div className="relative mb-5">
          {/* Static ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-champagne-gold/20"
            style={{ margin: '-4px' }}
          />
          {/* Outer gold ring */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-gold/40 bg-ivory blue-tint">
            {/* Inner circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-sm">
              <Icon className="h-7 w-7 text-sage-teal" strokeWidth={1.5} />
            </div>
          </div>
          {/* Number badge with bounce */}
          <motion.button
            onClick={handleBounce}
            className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full chrome-gold-bg text-sm font-bold text-white font-jost shadow-md cursor-pointer border-0 outline-none shadow-gold"
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
        <p className="font-jost text-sm font-light leading-relaxed text-brown-muted max-w-[220px]">
          {step.description}
        </p>

        {/* Estimated time label */}
        <motion.span
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-champagne-gold/20 bg-champagne-gold/12 px-3 py-1"
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
          <div className="h-px bg-gradient-to-r from-accent-blue/60 via-champagne-gold/30 to-accent-blue/60" />
        </motion.div>
      )}
    </div>
  )
}

function MobileTimeline() {
  return (
    <div className="lg:hidden relative pl-10">
      {/* Static vertical connecting line */}
      <div className="absolute left-[18px] top-5 bottom-5 w-px">
        <div className="h-full w-full bg-gradient-to-b from-accent-blue/60 via-champagne-gold/30 to-accent-blue/60" />
      </div>

      {/* Static glowing dot */}
      <div className="absolute left-[14px] top-5 z-20">
        <div className="h-[9px] w-[9px] rounded-full bg-champagne-gold shadow-[0_0_4px_rgba(184,152,48,0.4)]" />
      </div>

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
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-card">
                  <Icon className="h-3.5 w-3.5 text-sage-teal" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full chrome-gold-bg text-[10px] font-bold text-white font-jost shadow-gold">
                    {step.number}
                  </span>
                  <h3 className="font-dm-serif text-base text-espresso">
                    {step.title}
                  </h3>
                </div>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
                  {step.description}
                </p>
                {/* Mobile estimated time label */}
                <span className="mt-2 inline-flex items-center rounded-full border border-champagne-gold/20 bg-champagne-gold/12 px-2.5 py-0.5">
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
  return (
    <div className="relative">
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
              <line x1="0" y1="0" x2="0" y2="12" stroke="#B89830" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Your Experience
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Your Path to a Healthier Smile
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            From your first consultation to the moment you walk out feeling confident — every step has been thoughtfully designed to deliver a seamless, comfortable, and truly personalised experience.
          </p>
        </div>

        {/* Mobile Timeline */}
        <MobileTimeline />

        {/* Desktop Timeline (horizontal) */}
        <DesktopTimeline />
      </div>
    </section>
  )
}
