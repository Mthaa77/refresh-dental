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
    <section id="promotions" className="relative overflow-hidden bg-[#FDFAF6]">
      {/* Gold decorative background elements */}
      <motion.div
        className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-[0.04]"
        style={{ backgroundColor: '#C9A96E' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full opacity-[0.03]"
        style={{ backgroundColor: '#C9A96E' }}
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
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-warm/70">
            Take advantage of our exclusive promotions and start your journey to a healthier smile.
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-px w-20"
            style={{ backgroundColor: '#C9A96E' }}
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
                    : 'text-brown-warm/50 hover:text-brown-warm/80'
                }
              >
                {offer.tabLabel}
              </span>
              {/* Active indicator */}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#C9A96E' }}
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
              className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-champagne-gold/15 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2 md:gap-12"
            >
              {/* Left — Icon & Title */}
              <div className="space-y-5 text-center md:text-left">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-champagne-gold/10 text-champagne-gold md:mx-0">
                  {activeOffer.icon}
                </div>
                <h3 className="font-dm-serif text-2xl text-espresso">
                  {activeOffer.title}
                </h3>
                <p className="font-jost text-sm leading-relaxed text-brown-warm/70">
                  {activeOffer.description}
                </p>
                {/* Price */}
                <div className="flex items-baseline gap-3 justify-center md:justify-start">
                  <span className="font-cormorant text-4xl font-semibold text-champagne-gold">
                    {activeOffer.price}
                  </span>
                  {activeOffer.originalPrice && (
                    <span className="font-jost text-base text-brown-warm/40 line-through">
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

              {/* Right — Features */}
              <div className="space-y-3">
                {activeOffer.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-teal/10">
                      <Check className="h-3.5 w-3.5 text-sage-teal" />
                    </div>
                    <span className="font-jost text-sm text-brown-warm/80">
                      {feature}
                    </span>
                  </motion.div>
                ))}

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-7 py-3 font-jost text-sm font-semibold text-espresso transition-all hover:bg-champagne-gold/90 hover:shadow-lg"
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
