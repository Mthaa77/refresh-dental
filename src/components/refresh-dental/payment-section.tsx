'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Shield, CreditCard, ArrowRight, Diamond } from 'lucide-react'

const medicalAids = ['Discovery', 'Momentum', 'Bonitas', 'All Schemes']

/* ── Animated Number (simplified — no spring) ── */
function AnimatedNumber({ value }: { value: number }) {
  return <>{value}</>
}

/* ── Gold Diamond Divider (static) ── */
function GoldDivider() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center mx-auto w-px self-stretch py-4">
      <div className="h-full w-px bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent" />
      <div className="absolute my-auto">
        <Diamond className="h-4 w-4 text-champagne-gold/60" />
      </div>
    </div>
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
    setGlowing(true)
    if (glowTimer.current) clearTimeout(glowTimer.current)
    glowTimer.current = setTimeout(() => setGlowing(false), 800)
  }

  const handleInstalmentChange = (option: '3' | '6') => {
    setInstalmentOption(option)
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
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Premium dental care shouldn&rsquo;t break the bank. We work with all major medical aids and offer flexible payment options so nothing stands between you and your best smile.
          </motion.p>
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

            <p className="text-brown-muted leading-relaxed max-w-md">
              We accept all major South African medical aid schemes — simply bring your
              card to your appointment and we'll handle the rest. No paperwork hassles, no surprises.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {medicalAids.map((aid) => (
                <span
                  key={aid}
                  className="bg-sage-teal/10 text-sage-teal rounded-full px-3 py-1 text-sm font-medium cursor-default hover-lift hover:-translate-y-0.5 hover:scale-105 transition-transform duration-200"
                >
                  {aid}
                </span>
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-blue/10">
                <CreditCard className="w-7 h-7 text-accent-blue" />
              </div>
              {/* Static diamond icon */}
              <div>
                <Diamond className="h-5 w-5 text-champagne-gold/40" />
              </div>
            </div>

            <h3 className="font-dm-serif text-2xl text-espresso">
              Pay Over 3–6 Months, Interest-Free
            </h3>

            <p className="text-brown-muted leading-relaxed">
              We&apos;ve partnered with Athena to offer flexible, interest-free payment plans.
              Just a small once-off 6% processing fee — and that&apos;s it. No hidden costs, no surprises.
            </p>

            {/* Interactive Calculator */}
            <div className="space-y-5 pt-4">
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
                    className="w-full bg-transparent border-b-2 border-accent-blue focus:border-accent-blue outline-none text-espresso font-semibold text-2xl pl-8 pb-2 transition-colors"
                    placeholder="5000"
                    min={0}
                  />
                </div>
              </div>

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

              {/* Result with glow transition (CSS) */}
              <div
                className="bg-sand/60 rounded-2xl p-6 text-center space-y-1 transition-shadow duration-400"
                style={{
                  boxShadow: glowing
                    ? '0 0 16px rgba(59, 111, 160, 0.2)'
                    : 'none',
                }}
              >
                <p className="text-sm text-sand-muted uppercase tracking-wider">
                  Your monthly payment
                </p>
                <p className="text-4xl font-dm-serif text-accent-blue">
                  R<span className="inline-block"><AnimatedNumber value={monthlyPayment} /></span>
                  <span className="text-lg text-sand-muted">/month</span>
                </p>
                <p className="text-xs text-sand-muted mt-2">
                  {instalments} instalments · includes 6% processing fee
                </p>
              </div>
            </div>

            <a
              href="#financing"
              className="inline-flex items-center gap-2 text-accent-blue font-medium shadow-gold rounded-full px-5 py-2.5 hover:gap-3 transition-all group"
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
