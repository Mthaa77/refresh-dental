'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, Users, Check, ArrowRight } from 'lucide-react'

interface PromoOffer {
  id: string
  tabLabel: string
  icon: React.ReactNode
  title: string
  description: string
  price: string
  originalPrice: string
  badge: string
  badgeColor: string
  features: string[]
}

const offers: PromoOffer[] = [
  {
    id: 'new-patient',
    tabLabel: 'New Patient Special',
    icon: <Gift className="h-8 w-8" />,
    title: 'New Patient Special',
    description:
      'Comprehensive exam, professional cleaning & full X-rays — everything you need for a perfect start.',
    price: 'R899',
    originalPrice: 'R1,500',
    badge: 'SAVE 40%',
    badgeColor: 'bg-sage-teal text-white',
    features: [
      'Full dental examination',
      'Professional teeth cleaning & polish',
      'Complete set of dental X-rays',
      'Personalised treatment plan',
      'Oral health risk assessment',
    ],
  },
  {
    id: 'whitening',
    tabLabel: 'Teeth Whitening',
    icon: <Sparkles className="h-8 w-8" />,
    title: 'Professional Teeth Whitening',
    description:
      'Achieve a radiant, confident smile with our advanced in-office whitening treatment.',
    price: 'R2,499',
    originalPrice: '',
    badge: 'POPULAR',
    badgeColor: 'bg-champagne-gold text-espresso',
    features: [
      'In-office professional whitening',
      'Up to 8 shades brighter',
      'LED-accelerated treatment',
      'Desensitising gel included',
      'Take-home maintenance kit',
    ],
  },
  {
    id: 'family',
    tabLabel: 'Family Package',
    icon: <Users className="h-8 w-8" />,
    title: 'Family Dental Package',
    description:
      'Complete dental care for the whole family — 2 adults + 2 kids, all in one affordable package.',
    price: 'R2,999',
    originalPrice: '',
    badge: 'BEST VALUE',
    badgeColor: 'bg-espresso text-ivory',
    features: [
      '2 adult checkups & cleanings',
      '2 kids checkups & cleanings',
      'Family X-rays included',
      'Fluoride treatments for kids',
      'Oral hygiene guidance session',
    ],
  },
]

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

export default function SeasonalPromo() {
  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleTabChange = (index: number) => {
    setDirection(index > activeTab ? 1 : -1)
    setActiveTab(index)
  }

  const activeOffer = offers[activeTab]

  return (
    <section id="promotions" className="relative overflow-hidden bg-[#F0EBE1]">
      {/* Decorative gold gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />
      {/* Gold decorative background elements */}
      <motion.div
        className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-[0.04] sm:-top-16 sm:-right-16 sm:h-48 sm:w-48 md:-top-32 md:-right-32 md:h-64 md:w-64"
        style={{ backgroundColor: '#B89830' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full opacity-[0.03] sm:-bottom-12 sm:-left-12 sm:h-36 sm:w-36 md:-bottom-24 md:-left-24 md:h-48 md:w-48"
        style={{ backgroundColor: '#B89830' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Limited Time
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Special Offers
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-muted">
            Take advantage of our exclusive promotions and start your journey to a healthier smile.
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-px w-20"
            style={{ backgroundColor: '#B89830' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-col gap-2 sm:flex-row sm:justify-center"
        >
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              onClick={() => handleTabChange(index)}
              className="relative px-6 py-3 font-jost text-sm font-medium transition-colors sm:py-3 sm:px-8"
            >
              <span
                className={
                  activeTab === index
                    ? 'text-champagne-gold'
                    : 'text-brown-muted/80 hover:text-brown-muted'
                }
              >
                {offer.tabLabel}
              </span>
              {/* Decorative ribbon badge on active tab */}
              <AnimatePresence>
                {activeTab === index && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-champagne-gold px-2.5 py-0.5 font-jost text-[9px] font-bold uppercase tracking-wider text-espresso shadow-md z-20 whitespace-nowrap"
                  >
                    {offer.badge}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Active indicator with glow transition */}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    backgroundColor: '#B89830',
                    boxShadow: '0 0 8px rgba(184, 152, 48, 0.4)',
                  }}
                  layoutId="promo-tab-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeOffer.id}
              custom={direction}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative grid grid-cols-1 items-center gap-8 rounded-3xl border border-champagne-gold/15 bg-white p-6 shadow-elevated sm:p-8 md:grid-cols-2 md:gap-12 overflow-hidden gold-pulse"
            >
              {/* Diagonal stripe pattern background (ivory lines, 2% opacity) */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                aria-hidden="true"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 18px,
                    rgba(253, 250, 246, 0.02) 18px,
                    rgba(253, 250, 246, 0.02) 20px
                  )`,
                }}
              />

              {/* Left — Icon & Title */}
              <div className="relative z-10 space-y-5 text-center md:text-left">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-champagne-gold/10 text-champagne-gold md:mx-0">
                  {activeOffer.icon}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="font-dm-serif text-2xl text-espresso">
                    {activeOffer.title}
                  </h3>
                  {/* Limited Time urgency badge with pulsing dot */}
                  <motion.span
                    className="inline-flex items-center gap-1.5 rounded-full border border-champagne-gold/30 bg-champagne-gold/5 px-2.5 py-0.5 font-jost text-[10px] font-semibold uppercase tracking-wider text-champagne-gold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-champagne-gold"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    Limited Time
                  </motion.span>
                </div>
                <p className="font-jost text-sm leading-relaxed text-brown-muted">
                  {activeOffer.description}
                </p>
                {/* Price with animated gold sparkles */}
                <div className="flex items-baseline gap-3 justify-center md:justify-start">
                  {/* Sparkle left of price */}
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    className="text-champagne-gold flex-shrink-0"
                    aria-hidden="true"
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="currentColor" />
                  </motion.svg>
                  <span className="font-cormorant text-4xl font-semibold text-champagne-gold">
                    {activeOffer.price}
                  </span>
                  {/* Sparkle right of price */}
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 14 14"
                    className="text-champagne-gold flex-shrink-0"
                    aria-hidden="true"
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  >
                    <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="currentColor" />
                  </motion.svg>
                  {activeOffer.originalPrice && (
                    <span className="font-jost text-base text-brown-muted/70 line-through">
                      {activeOffer.originalPrice}
                    </span>
                  )}
                </div>
                {/* Badge */}
                <div className="flex justify-center md:justify-start">
                  <span
                    className={`inline-block rounded-full px-4 py-1.5 font-jost text-xs font-bold uppercase tracking-wider ${activeOffer.badgeColor}`}
                  >
                    {activeOffer.badge}
                  </span>
                </div>
              </div>

              {/* Right — Features with animated check marks */}
              <div className="relative z-10 space-y-3">
                {activeOffer.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    {/* Animated check mark with stroke-dashoffset */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-teal/10">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="text-sage-teal"
                        aria-hidden="true"
                      >
                        <motion.circle
                          cx="7"
                          cy="7"
                          r="6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="38"
                          initial={{ strokeDashoffset: 38 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.06 + 0.1, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M4 7L6.5 9.5L10 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="14"
                          initial={{ strokeDashoffset: 14 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 + 0.3, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>
                    <span className="font-jost text-sm text-brown-muted">
                      {feature}
                    </span>
                  </motion.div>
                ))}

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-7 py-3 font-jost text-sm font-semibold text-espresso transition-all hover:bg-champagne-gold/90 shadow-gold hover:shadow-gold-strong"
                  >
                    Claim This Offer
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
