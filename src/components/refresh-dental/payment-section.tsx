'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Shield, CreditCard, ArrowRight, Diamond } from 'lucide-react'

const medicalAids = ['Discovery', 'Momentum', 'Bonitas', 'All Schemes']

/* ── Animated Number ── */
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30, mass: 1 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  // We need to subscribe to the motion value to re-render
  const [displayVal, setDisplayVal] = useState(value)
  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayVal(v))
    return unsubscribe
  }, [display])

  return <>{displayVal}</>
}

/* ── Gold Diamond Divider ── */
function GoldDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="hidden md:flex flex-col items-center justify-center mx-auto w-px self-stretch py-4"
    >
      <div className="h-full w-px bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent" />
      <motion.div
        className="absolute my-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <Diamond className="h-4 w-4 text-champagne-gold/60" />
      </motion.div>
    </motion.div>
  )
}

export default function PaymentSection() {
  const [cost, setCost] = useState<number>(5000)
  const [instalmentOption, setInstalmentOption] = useState<'3' | '6'>('6')
  const [glowing, setGlowing] = useState(false)
  const glowTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const instalments = instalmentOption === '3' ? 4 : 7
  const monthlyPayment = Math.round((cost * 1.06) / instalments)

  const handleCostChange = (val: number) => {
    setCost(val)
    // Trigger glow effect
    setGlowing(true)
    if (glowTimer.current) clearTimeout(glowTimer.current)
    glowTimer.current = setTimeout(() => setGlowing(false), 800)
  }

  const handleInstalmentChange = (option: '3' | '6') => {
    setInstalmentOption(option)
    // Trigger glow effect
    setGlowing(true)
    if (glowTimer.current) clearTimeout(glowTimer.current)
    glowTimer.current = setTimeout(() => setGlowing(false), 800)
  }

  return (
    <section id="financing" className="relative overflow-hidden bg-sand py-24">
      <div className="max-w-6xl mx-auto px-6 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Affordable Dental Care
          </h2>
          <p className="section-subheading mx-auto mt-4 max-w-xl">
            Your smile shouldn't come with financial stress. We accept all major
            medical aids and offer flexible, interest-free payment plans through Athena.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column — Medical Aid */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage-teal/10 mb-2">
            <Shield className="w-7 h-7 text-sage-teal" />
          </div>

          <h3 className="font-dm-serif text-2xl text-espresso">
            All Medical Aids Accepted
          </h3>

          <p className="text-brown-warm/80 leading-relaxed max-w-md">
            We accept all major South African medical aid schemes — simply bring your
            card to your appointment and we'll handle the rest. No paperwork hassles, no surprises.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {medicalAids.map((aid) => (
              <motion.span
                key={aid}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="bg-sage-teal/10 text-sage-teal rounded-full px-3 py-1 text-sm font-medium cursor-default hover-lift"
              >
                {aid}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Gold Divider (desktop only) */}
        <GoldDivider />

        {/* Right Column — Athena Finance Calculator */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-ivory rounded-3xl p-8 shadow-elevated border border-soft-border space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-champagne-gold/10">
              <CreditCard className="w-7 h-7 text-champagne-gold" />
            </div>
            {/* Decorative tooth/diamond icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Diamond className="h-5 w-5 text-champagne-gold/40" />
            </motion.div>
          </div>

          <h3 className="font-dm-serif text-2xl text-espresso">
            Pay Over 3–6 Months, Interest-Free
          </h3>

          <p className="text-brown-warm/80 leading-relaxed">
            We&apos;ve partnered with Athena to offer flexible, interest-free payment plans.
            Just a small once-off 6% processing fee — and that&apos;s it. No hidden costs, no surprises.
          </p>

          {/* Interactive Calculator */}
          <div className="space-y-5 pt-4">
            {/* Cost Input */}
            <div className="space-y-2">
              <label className="text-sm text-sand-muted font-medium uppercase tracking-wider">
                Procedure Cost
              </label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-espresso font-semibold text-lg">
                  R
                </span>
                <input
                  type="number"
                  value={cost || ''}
                  onChange={(e) => handleCostChange(Number(e.target.value) || 0)}
                  className="w-full bg-transparent border-b-2 border-champagne-gold focus:border-champagne-gold outline-none text-espresso font-semibold text-2xl pl-8 pb-2 transition-colors"
                  placeholder="5000"
                  min={0}
                />
              </div>
            </div>

            {/* Instalment Tabs */}
            <div className="space-y-2">
              <label className="text-sm text-sand-muted font-medium uppercase tracking-wider">
                Payment Plan
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleInstalmentChange('3')}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    instalmentOption === '3'
                      ? 'bg-espresso text-ivory shadow-sm'
                      : 'bg-sand text-brown-warm hover:bg-sand-muted/10'
                  }`}
                >
                  3 months
                </button>
                <button
                  onClick={() => handleInstalmentChange('6')}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    instalmentOption === '6'
                      ? 'bg-espresso text-ivory shadow-sm'
                      : 'bg-sand text-brown-warm hover:bg-sand-muted/10'
                  }`}
                >
                  6 months
                </button>
              </div>
            </div>

            {/* Result with glow animation */}
            <motion.div
              className="bg-sand/60 rounded-2xl p-6 text-center space-y-1"
              animate={{
                boxShadow: glowing
                  ? '0 0 20px rgba(201, 169, 110, 0.3), 0 0 40px rgba(201, 169, 110, 0.15)'
                  : '0 0 0px rgba(201, 169, 110, 0)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="text-sm text-sand-muted uppercase tracking-wider">
                Your monthly payment
              </p>
              <p className="text-4xl font-dm-serif text-champagne-gold">
                R<span className="inline-block"><AnimatedNumber value={monthlyPayment} /></span>
                <span className="text-lg text-sand-muted">/month</span>
              </p>
              <p className="text-xs text-sand-muted mt-2">
                {instalments} instalments · includes 6% processing fee
              </p>
            </motion.div>
          </div>

          <a
            href="#financing"
            className="inline-flex items-center gap-2 text-champagne-gold font-medium shadow-gold rounded-full px-5 py-2.5 hover:gap-3 transition-all group"
          >
            Learn More About Financing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
