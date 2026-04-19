'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CreditCard, ArrowRight } from 'lucide-react'

const medicalAids = ['Discovery', 'Momentum', 'Bonitas', 'All Schemes']

export default function PaymentSection() {
  const [cost, setCost] = useState<number>(5000)
  const [instalmentOption, setInstalmentOption] = useState<'3' | '6'>('6')

  const instalments = instalmentOption === '3' ? 4 : 7
  const monthlyPayment = ((cost * 1.06) / instalments).toFixed(0)

  return (
    <section id="financing" className="bg-sand py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
            We accept all major South African medical aid schemes. Bring your
            card and leave the admin to us.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {medicalAids.map((aid) => (
              <span
                key={aid}
                className="bg-sage-teal/10 text-sage-teal rounded-full px-3 py-1 text-sm font-medium"
              >
                {aid}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column — Athena Finance Calculator */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-ivory rounded-3xl p-8 shadow-sm border border-soft-border space-y-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-champagne-gold/10 mb-2">
            <CreditCard className="w-7 h-7 text-champagne-gold" />
          </div>

          <h3 className="font-dm-serif text-2xl text-espresso">
            Pay Over 3–6 Months, Interest-Free
          </h3>

          <p className="text-brown-warm/80 leading-relaxed">
            We&apos;ve partnered with Athena to offer flexible payment plans. A
            once-off 6% processing fee is all you pay — no interest, ever.
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
                  onChange={(e) => setCost(Number(e.target.value) || 0)}
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
                  onClick={() => setInstalmentOption('3')}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    instalmentOption === '3'
                      ? 'bg-espresso text-ivory shadow-sm'
                      : 'bg-sand text-brown-warm hover:bg-sand-muted/10'
                  }`}
                >
                  3 months
                </button>
                <button
                  onClick={() => setInstalmentOption('6')}
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

            {/* Result */}
            <div className="bg-sand/60 rounded-2xl p-6 text-center space-y-1">
              <p className="text-sm text-sand-muted uppercase tracking-wider">
                Your monthly payment
              </p>
              <p className="text-4xl font-dm-serif text-champagne-gold">
                R{monthlyPayment}
                <span className="text-lg text-sand-muted">/month</span>
              </p>
              <p className="text-xs text-sand-muted mt-2">
                {instalments} instalments · includes 6% processing fee
              </p>
            </div>
          </div>

          <a
            href="#financing"
            className="inline-flex items-center gap-2 text-champagne-gold font-medium hover:gap-3 transition-all group"
          >
            Learn More About Financing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
