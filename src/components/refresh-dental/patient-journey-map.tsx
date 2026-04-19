'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Phone, CalendarCheck, ClipboardList, HeartPulse, Smile, RefreshCw } from 'lucide-react'

/* ──────────────────────────────────────────────
   Journey stages data
   ────────────────────────────────────────────── */
const stages = [
  {
    icon: Phone,
    title: 'First Contact',
    duration: '~5 min',
    description: 'Reach out via phone, WhatsApp, or our online booking form to schedule your initial visit.',
    milestone: 'Appointment confirmed & welcome email sent',
    details: [
      'Friendly team responds within 24 hours',
      'Flexible scheduling to suit your availability',
      'Pre-visit information pack provided digitally',
      'Insurance verification initiated if applicable',
    ],
  },
  {
    icon: CalendarCheck,
    title: 'First Visit',
    duration: '45–60 min',
    description: 'Comprehensive oral examination with digital X-rays and a thorough discussion of your dental history.',
    milestone: 'Complete oral health assessment completed',
    details: [
      'Digital panoramic & periapical X-rays taken',
      'Full mouth examination with intraoral camera',
      'Oral cancer screening performed',
      'Medical and dental history reviewed in detail',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Treatment Plan',
    duration: '~30 min',
    description: 'Receive a personalised treatment plan with transparent pricing, timeline, and all available options.',
    milestone: 'Personalised plan agreed upon',
    details: [
      'Detailed treatment options explained clearly',
      'Transparent cost breakdown provided upfront',
      'Multiple payment plans discussed',
      'Digital treatment plan shared via email',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Active Treatment',
    duration: '1–12 weeks',
    description: 'Expert care delivered using state-of-the-art technology in a comfortable, relaxing environment.',
    milestone: 'All scheduled procedures completed',
    details: [
      'Gentle, pain-managed procedures',
      'Progress updates at each appointment',
      'Latest dental technology utilised',
      'Sedation options available if needed',
    ],
  },
  {
    icon: Smile,
    title: 'Recovery',
    duration: '1–4 weeks',
    description: 'Post-treatment care with follow-up appointments to ensure optimal healing and results.',
    milestone: 'Healing confirmed & results evaluated',
    details: [
      'Detailed aftercare instructions provided',
      'Scheduled follow-up appointment booked',
      'Emergency contact available 24/7',
      'Progress photos taken for comparison',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Care',
    duration: 'Ongoing',
    description: 'Regular check-ups and preventive care to maintain your refreshed smile for years to come.',
    milestone: 'Preventive care plan established',
    details: [
      '6-monthly check-up and cleaning schedule',
      'Preventive treatments and fluoride application',
      'Loyalty rewards and referral benefits',
      'Priority booking for existing patients',
    ],
  },
]

/* ──────────────────────────────────────────────
   Animation variants
   ────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const stageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

/* ──────────────────────────────────────────────
   Desktop Journey Timeline (horizontal)
   ────────────────────────────────────────────── */
function DesktopJourney({
  activeStage,
  setActiveStage,
  isInView,
}: {
  activeStage: number | null
  setActiveStage: (i: number | null) => void
  isInView: boolean
}) {
  return (
    <div className="hidden lg:block">
      {/* Horizontal connecting line */}
      <div className="relative mx-auto max-w-6xl">
        {/* Background line */}
        <div className="absolute top-[40px] left-[8%] right-[8%] h-px bg-champagne-gold/20" />

        {/* Animated progress line */}
        <motion.div
          className="absolute top-[40px] left-[8%] h-px origin-left"
          style={{
            background: 'linear-gradient(90deg, #B89830, #D4C08A)',
          }}
          initial={{ width: 0 }}
          animate={
            activeStage !== null && isInView
              ? { width: `${((activeStage + 1) / stages.length) * 84}%` }
              : { width: 0 }
          }
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Stage nodes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-6 gap-2"
        >
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isActive = activeStage === index
            const isPast = activeStage !== null && index <= activeStage

            return (
              <motion.div
                key={stage.title}
                variants={stageVariants}
                className="flex flex-col items-center relative cursor-pointer group"
                onClick={() => setActiveStage(isActive ? null : index)}
              >
                {/* Stage node circle */}
                <div className="relative mb-4">
                  {/* Pulsing ring for active stage */}
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-champagne-gold/30"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: isActive
                        ? '#B89830'
                        : isPast
                          ? 'rgba(201,169,110,0.5)'
                          : 'rgba(201,169,110,0.2)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(232,213,176,0.2))'
                        : isPast
                          ? 'rgba(201,169,110,0.06)'
                          : '#F0EBE1',
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Icon
                      className="h-7 w-7 transition-colors duration-300"
                      style={{
                        color: isActive ? '#B89830' : isPast ? 'rgba(61,125,110,0.8)' : 'rgba(92,78,61,0.4)',
                        strokeWidth: 1.5,
                      }}
                    />
                  </motion.div>

                  {/* Stage number badge */}
                  <div
                    className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold font-jost shadow-sm"
                    style={{
                      background: isPast ? '#B89830' : 'rgba(201,169,110,0.2)',
                      color: isPast ? '#0F0D0A' : '#3D3026',
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-dm-serif text-sm text-center leading-tight mb-1 transition-colors duration-300"
                  style={{ color: isActive ? '#0F0D0A' : '#3D3026' }}
                >
                  {stage.title}
                </h3>

                {/* Duration pill */}
                <span
                  className="font-jost text-[10px] px-2 py-0.5 rounded-full border transition-colors duration-300"
                  style={{
                    borderColor: isActive ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.15)',
                    color: isActive ? '#B89830' : '#6B5D4E',
                    background: isActive ? 'rgba(201,169,110,0.06)' : 'transparent',
                  }}
                >
                  {stage.duration}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Mobile Journey Timeline (vertical)
   ────────────────────────────────────────────── */
function MobileJourney({
  activeStage,
  setActiveStage,
  isInView,
}: {
  activeStage: number | null
  setActiveStage: (i: number | null) => void
  isInView: boolean
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="lg:hidden relative pl-12"
    >
      {/* Vertical connecting line */}
      <div className="absolute left-[18px] top-4 bottom-4 w-px bg-champagne-gold/20" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-[18px] top-4 w-px origin-top bg-gradient-to-b from-champagne-gold to-gold-light"
        initial={{ height: 0 }}
        animate={
          activeStage !== null && isInView
            ? { height: `${((activeStage + 1) / stages.length) * 90}%` }
            : { height: 0 }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {stages.map((stage, index) => {
        const Icon = stage.icon
        const isActive = activeStage === index
        const isPast = activeStage !== null && index <= activeStage

        return (
          <motion.div
            key={stage.title}
            variants={stageVariants}
            className="relative mb-10 last:mb-0 cursor-pointer"
            onClick={() => setActiveStage(isActive ? null : index)}
          >
            {/* Node on timeline */}
            <div className="absolute -left-12 top-0 flex items-center justify-center">
              <div
                className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: isActive
                    ? '#B89830'
                    : isPast
                      ? 'rgba(201,169,110,0.5)'
                      : 'rgba(201,169,110,0.2)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(232,213,176,0.2))'
                    : isPast
                      ? 'rgba(201,169,110,0.06)'
                      : '#F0EBE1',
                }}
              >
                <Icon
                  className="h-4 w-4 transition-colors duration-300"
                  style={{
                    color: isActive ? '#B89830' : isPast ? '#2D6B5C' : '#6B5D4E',
                    strokeWidth: 1.5,
                  }}
                />
              </div>
            </div>

            {/* Content card */}
            <div
              className="rounded-xl border p-4 transition-all duration-300"
              style={{
                borderColor: isActive ? 'rgba(201,169,110,0.3)' : 'rgba(232,224,213,0.6)',
                background: isActive ? 'rgba(201,169,110,0.04)' : 'white',
                boxShadow: isActive ? '0 4px 20px rgba(201,169,110,0.1)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold font-jost"
                  style={{
                    background: isPast ? '#B89830' : 'rgba(201,169,110,0.2)',
                    color: isPast ? '#0F0D0A' : '#3D3026',
                  }}
                >
                  {index + 1}
                </span>
                <h3
                  className="font-dm-serif text-base"
                  style={{ color: isActive ? '#0F0D0A' : '#3D3026' }}
                >
                  {stage.title}
                </h3>
                <span
                  className="ml-auto font-jost text-[10px] px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: isActive ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.15)',
                    color: '#6B5D4E',
                  }}
                >
                  {stage.duration}
                </span>
              </div>

              <p className="font-jost text-sm font-light leading-relaxed text-brown-muted">
                {stage.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Detail Panel (shown when a stage is clicked)
   ────────────────────────────────────────────── */
function DetailPanel({
  stageIndex,
}: {
  stageIndex: number
}) {
  const stage = stages[stageIndex]
  const Icon = stage.icon

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stageIndex}
        initial={{ opacity: 0, y: 16, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -8, height: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div className="mx-auto max-w-4xl mt-12 rounded-2xl border border-champagne-gold/20 bg-white p-6 md:p-8 shadow-sm"
          style={{ boxShadow: '0 8px 32px rgba(201,169,110,0.08)' }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon + title area */}
            <div className="flex items-start gap-4 flex-shrink-0">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(232,213,176,0.18))',
                  border: '1px solid rgba(201,169,110,0.25)',
                }}
              >
                <Icon className="h-6 w-6 text-champagne-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-dm-serif text-lg text-espresso mb-1">
                  {stage.title}
                </h3>
                <span className="font-jost text-xs px-2.5 py-0.5 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 text-champagne-gold">
                  {stage.duration}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="font-jost text-sm leading-relaxed text-brown-muted mb-4">
                {stage.description}
              </p>

              {/* Milestone badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sage-teal/20 bg-sage-teal/5 px-3 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-sage-teal" />
                <span className="font-jost text-xs font-medium text-sage-teal">
                  Key Milestone: {stage.milestone}
                </span>
              </div>

              {/* Detail list */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {stage.details.map((detail, di) => (
                  <motion.li
                    key={di}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: di * 0.08, duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <svg
                      className="mt-1.5 h-3 w-3 flex-shrink-0 text-champagne-gold"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                    >
                      <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" />
                    </svg>
                    <span className="font-jost text-sm text-brown-muted">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function PatientJourneyMap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [activeStage, setActiveStage] = useState<number | null>(null)

  // Auto-advance stages as user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  })

  useEffect(() => {
    if (!isInView) return
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Map scroll progress to stage index
      const stageIndex = Math.min(
        Math.floor(v * stages.length),
        stages.length - 1
      )
      if (v > 0.05 && v < 0.95) {
        setActiveStage(stageIndex)
      }
    })
    return () => unsubscribe()
  }, [isInView, scrollYProgress])

  return (
    <section
      id="journey"
      ref={ref}
      className="relative bg-ivory overflow-hidden py-20 md:py-28"
    >
      {/* Subtle diagonal stripe texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <pattern id="journey-stripes" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#B89830" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#journey-stripes)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Your Path to a Better Smile
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-espresso">
            The Patient Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-muted">
            From your first call to lifelong care — every step is designed with your comfort and confidence in mind
          </p>
        </motion.div>

        {/* Overall progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-jost text-xs text-brown-muted/80">
              Journey Progress
            </span>
            <span className="font-jost text-xs font-medium text-champagne-gold">
              Stage {activeStage !== null ? activeStage + 1 : 0} of {stages.length}
            </span>
          </div>
          <div className="h-1 rounded-full bg-champagne-gold/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #B89830, #D4C08A)',
              }}
              animate={{
                width:
                  activeStage !== null
                    ? `${((activeStage + 1) / stages.length) * 100}%`
                    : '0%',
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </motion.div>

        {/* Desktop Timeline */}
        <DesktopJourney
          activeStage={activeStage}
          setActiveStage={setActiveStage}
          isInView={isInView}
        />

        {/* Mobile Timeline */}
        <MobileJourney
          activeStage={activeStage}
          setActiveStage={setActiveStage}
          isInView={isInView}
        />

        {/* Detail Panel */}
        <AnimatePresence>
          {activeStage !== null && (
            <DetailPanel stageIndex={activeStage} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
