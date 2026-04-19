'use client'

import { motion } from 'framer-motion'
import { Calendar, Stethoscope, ClipboardList, Heart, PartyPopper } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Calendar,
    title: 'Book Your Visit',
    description:
      "Schedule your appointment online, by phone, or WhatsApp. We'll find a time that works for you.",
  },
  {
    number: 2,
    icon: Stethoscope,
    title: 'Meet Dr. Malunga',
    description:
      'Your first consultation includes a thorough examination and personalised treatment plan.',
  },
  {
    number: 3,
    icon: ClipboardList,
    title: 'Custom Treatment Plan',
    description:
      "We'll discuss your options, costs, and timeline — no surprises, no pressure.",
  },
  {
    number: 4,
    icon: Heart,
    title: 'Expert Care',
    description:
      'Experience gentle, precise dental care using the latest technology and techniques.',
  },
  {
    number: 5,
    icon: PartyPopper,
    title: 'Enjoy Your Smile',
    description:
      'Walk out with the confidence of a refreshed, revitalised smile.',
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

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Step content */}
      <motion.div
        variants={stepVariants}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Numbered circle with icon */}
        <div className="relative mb-5">
          {/* Outer gold ring */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-gold/40 bg-ivory">
            {/* Inner circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Icon className="h-7 w-7 text-sage-teal" strokeWidth={1.5} />
            </div>
          </div>
          {/* Number badge */}
          <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-champagne-gold text-xs font-bold text-espresso font-jost shadow-md">
            {step.number}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-dm-serif text-lg text-espresso mb-2">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70 max-w-[220px]">
          {step.description}
        </p>
      </motion.div>

      {/* Desktop connecting line (horizontal) */}
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
  return (
    <div className="lg:hidden relative pl-10">
      {/* Vertical connecting line */}
      <motion.div
        variants={lineVariants}
        className="absolute left-[18px] top-5 bottom-5 w-px origin-top bg-gradient-to-b from-champagne-gold/60 via-champagne-gold/30 to-champagne-gold/60"
      />

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
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                  <Icon className="h-3.5 w-3.5 text-sage-teal" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-gold text-[10px] font-bold text-espresso font-jost">
                    {step.number}
                  </span>
                  <h3 className="font-dm-serif text-base text-espresso">
                    {step.title}
                  </h3>
                </div>
                <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70">
                  {step.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function TreatmentProcess() {
  return (
    <section id="process" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Your Journey to a Refreshed Smile
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            From consultation to confident smile — we&rsquo;re with you every step
          </p>
        </motion.div>

        {/* Mobile Timeline */}
        <MobileTimeline />

        {/* Desktop Timeline (horizontal) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden lg:grid lg:grid-cols-5 lg:gap-4 xl:gap-6"
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
    </section>
  )
}
