'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion'
import {
  ArrowRight,
  Minus,
  Plus,
  Check,
  CreditCard,
  Info,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────
interface Treatment {
  id: string
  name: string
  description: string
  price: number
  hasQuantity: boolean
  defaultQty?: number
}

// ── Treatment Data ─────────────────────────────────────
const treatments: Treatment[] = [
  {
    id: 'consultation',
    name: 'Dental Consultation',
    description: 'Comprehensive oral examination with Dr. Malunga',
    price: 800,
    hasQuantity: false,
  },
  {
    id: 'cleaning',
    name: 'Professional Cleaning',
    description: 'Scaling & polishing for a fresh, clean smile',
    price: 1200,
    hasQuantity: false,
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening (In-Office)',
    description: 'Professional whitening — up to 8 shades brighter',
    price: 4500,
    hasQuantity: false,
  },
  {
    id: 'veneers',
    name: 'Porcelain Veneers',
    description: 'Premium custom veneers per tooth',
    price: 8000,
    hasQuantity: true,
    defaultQty: 1,
  },
  {
    id: 'crowns',
    name: 'Dental Crown',
    description: 'High-quality ceramic crown per tooth',
    price: 6500,
    hasQuantity: true,
    defaultQty: 1,
  },
  {
    id: 'rootcanal',
    name: 'Root Canal Treatment',
    description: 'Pain-free root canal therapy',
    price: 7000,
    hasQuantity: false,
  },
  {
    id: 'implants',
    name: 'Dental Implant',
    description: 'Titanium implant with abutment per tooth',
    price: 25000,
    hasQuantity: true,
    defaultQty: 1,
  },
  {
    id: 'ortho',
    name: 'Orthodontic Consultation',
    description: 'Assessment for braces or clear aligners',
    price: 1500,
    hasQuantity: false,
  },
]

// ── Helpers ────────────────────────────────────────────
function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString('en-ZA')}`
}

// ── Animation Variants ─────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ── Custom Checkbox ────────────────────────────────────
function GoldCheckbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200"
      style={{
        borderColor: checked ? '#B89830' : 'rgba(200, 187, 170, 0.5)',
        backgroundColor: checked ? '#B89830' : 'transparent',
      }}
      aria-label={checked ? 'Deselect' : 'Select'}
    >
      <motion.div
        initial={false}
        animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </motion.div>
    </button>
  )
}

// ── Main Component ─────────────────────────────────────
export default function DentalCostEstimator() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    treatments.forEach((t) => {
      if (t.hasQuantity) initial[t.id] = t.defaultQty ?? 1
    })
    return initial
  })

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHeaderVisible(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Toggle treatment selection
  const toggleTreatment = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Adjust quantity
  const adjustQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 1
      const next = Math.max(1, Math.min(8, current + delta))
      return { ...prev, [id]: next }
    })
  }

  // Compute totals
  const { subtotal, breakdown } = useMemo(() => {
    let total = 0
    const items: { name: string; qty: number; unitPrice: number; lineTotal: number }[] = []

    selectedIds.forEach((id) => {
      const treatment = treatments.find((t) => t.id === id)
      if (!treatment) return
      const qty = treatment.hasQuantity ? (quantities[treatment.id] ?? 1) : 1
      const lineTotal = treatment.price * qty
      total += lineTotal
      items.push({
        name: treatment.name,
        qty,
        unitPrice: treatment.price,
        lineTotal,
      })
    })

    return { subtotal: total, breakdown: items }
  }, [selectedIds, quantities])

  const monthly3 = subtotal > 0 ? Math.ceil(subtotal / 3) : 0
  const monthly6 = subtotal > 0 ? Math.ceil(subtotal / 6) : 0

  // Animated total using spring
  const animatedTotal = useSpring(0, { stiffness: 50, damping: 25 })
  useEffect(() => {
    animatedTotal.set(subtotal)
  }, [animatedTotal, subtotal])

  return (
    <section id="cost-estimator" ref={sectionRef} className="relative overflow-hidden bg-ivory blue-tint py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={headerVisible ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Transparent Pricing
          </span>
          <h2 className="section-heading gold-gradient-text text-[clamp(2rem,4vw,3.5rem)] font-cormorant font-light">
            Treatment Cost Estimator
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-muted">
            Get an approximate idea of treatment costs. Final pricing confirmed during your consultation.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left Column — Treatment Selector */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {treatments.map((treatment, i) => {
                const isSelected = selectedIds.has(treatment.id)
                const qty = quantities[treatment.id] ?? 1

                return (
                  <motion.div
                    key={treatment.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate={headerVisible ? 'visible' : 'hidden'}
                    whileTap={{ scale: 0.985 }}
                    className={`rounded-xl border p-4 transition-all duration-300 ${
                      isSelected
                        ? 'border-champagne-gold/50 bg-champagne-gold/5 shadow-gold'
                        : 'border-soft-border/30 bg-card hover:border-champagne-gold/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <GoldCheckbox
                        checked={isSelected}
                        onClick={() => toggleTreatment(treatment.id)}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-dm-serif text-sm text-espresso md:text-base">
                              {treatment.name}
                            </h4>
                            <p className="mt-0.5 font-jost text-xs text-brown-muted">
                              {treatment.description}
                            </p>
                          </div>
                          <span className="flex-shrink-0 font-cormorant text-lg text-champagne-gold">
                            {formatZAR(treatment.price)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        {treatment.hasQuantity && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isSelected ? 1 : 0.4,
                              height: 'auto',
                            }}
                            className="mt-3 flex items-center gap-2"
                          >
                            <span className="font-jost text-xs text-brown-muted">
                              Quantity:
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => adjustQty(treatment.id, -1)}
                                disabled={qty <= 1}
                                className="flex h-7 w-7 items-center justify-center rounded-md bg-espresso/5 text-espresso transition-colors hover:bg-champagne-gold/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center font-jost text-sm font-medium text-espresso">
                                {qty}
                              </span>
                              <button
                                onClick={() => adjustQty(treatment.id, 1)}
                                disabled={qty >= 8}
                                className="flex h-7 w-7 items-center justify-center rounded-md bg-espresso/5 text-espresso transition-colors hover:bg-champagne-gold/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="ml-auto font-jost text-xs font-medium text-champagne-gold">
                              {formatZAR(treatment.price * qty)}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column — Results Panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="mb-4 font-dm-serif text-lg text-espresso">
                  Your Estimated Total
                </h3>

                {/* Total Amount */}
                <div className="mb-6 text-center">
                  <AnimatePresence mode="wait">
                    {subtotal > 0 ? (
                      <motion.span
                        key={subtotal}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="font-cormorant text-5xl font-light gold-gradient-text text-shadow-gold"
                      >
                        {formatZAR(subtotal)}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-cormorant text-4xl font-light text-brown-muted/40"
                      >
                        R 0
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Breakdown */}
                <AnimatePresence>
                  {breakdown.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <div className="max-h-64 overflow-y-auto scrollbar-hide rounded-xl border border-soft-border/20 bg-ivory/50 p-3">
                        <AnimatePresence>
                          {breakdown.map((item) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-center justify-between border-b border-soft-border/10 py-2.5 last:border-0"
                            >
                              <div className="min-w-0">
                                <span className="block font-jost text-xs font-medium text-espresso truncate">
                                  {item.name}
                                  {item.qty > 1 && (
                                    <span className="text-brown-muted"> × {item.qty}</span>
                                  )}
                                </span>
                                <span className="block font-jost text-[10px] text-brown-muted">
                                  {formatZAR(item.unitPrice)} per unit
                                </span>
                              </div>
                              <span className="flex-shrink-0 font-jost text-xs font-semibold text-espresso">
                                {formatZAR(item.lineTotal)}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Payment Options */}
                {subtotal > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-6 rounded-xl border border-soft-border/20 bg-ivory/50 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-champagne-gold" />
                      <span className="font-dm-serif text-sm text-espresso">
                        Payment Options
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-jost text-xs text-brown-muted">
                          3-month plan
                        </span>
                        <span className="font-jost text-sm font-semibold text-accent-blue">
                          {formatZAR(monthly3)}/mo
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-jost text-xs text-brown-muted">
                          6-month plan
                        </span>
                        <span className="font-jost text-sm font-semibold text-accent-blue">
                          {formatZAR(monthly6)}/mo
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-sage-teal/10 px-3 py-2">
                      <Info className="h-3.5 w-3.5 flex-shrink-0 text-sage-teal" />
                      <span className="font-jost text-[10px] font-medium text-sage-teal">
                        0% Interest with Athena
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Disclaimer */}
                <p className="mb-5 font-jost text-[10px] leading-relaxed text-brown-muted">
                  Prices are estimates for our Centurion practice and may vary based on individual treatment needs.
                  Medical aid contributions not included. Contact us for a detailed quote.
                </p>

                {/* CTA */}
                <a
                  href="#contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-full chrome-gold-bg px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-gold"
                >
                  Get Exact Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
