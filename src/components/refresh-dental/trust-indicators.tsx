'use client'

import { useRef, useState, useEffect } from 'react'
import { Star, Users, Award, Shield } from 'lucide-react'

const indicators = [
  { icon: Star, number: '5.0', numberSuffix: '★', title: '5.0 Star Rating', description: 'Rated 5.0/5 on Google Reviews — perfect scores across the board from our valued patients', accentText: 'text-champagne-gold', borderColor: 'border-champagne-gold/20', iconBg: 'bg-champagne-gold/20', iconColor: 'text-champagne-gold', stars: true, glowColor: 'rgba(184, 152, 48, 0.15)' },
  { icon: Users, number: '500', numberSuffix: '+', title: 'Happy Patients', description: 'And counting — join our growing family of patients who trust us with their smiles', accentText: 'text-sage-teal', borderColor: 'border-sage-teal/15', iconBg: 'bg-sage-teal/10', iconColor: 'text-sage-teal', stars: false, glowColor: 'rgba(45, 107, 92, 0.15)' },
  { icon: Award, number: '10', numberSuffix: '+', title: 'Years Experience', description: 'A decade of clinical excellence, continuously advancing the art and science of dentistry', accentText: 'text-champagne-gold', borderColor: 'border-accent-red/15', iconBg: 'bg-champagne-gold/20', iconColor: 'text-champagne-gold', stars: false, glowColor: 'rgba(166, 61, 64, 0.15)' },
  { icon: Shield, number: 'HPCSA', numberSuffix: '', title: 'Registered', description: 'Fully registered, compliant, and committed to the highest standards of professional care', accentText: 'text-sage-teal', borderColor: 'border-sage-teal/15', iconBg: 'bg-sage-teal/10', iconColor: 'text-sage-teal', stars: false, glowColor: 'rgba(45, 107, 92, 0.15)' },
]

/* ── SpringNumber: lightweight rAF counter instead of framer-motion spring ── */
function SpringNumber({ target, suffix, className }: { target: string; suffix: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
  const isNumeric = !isNaN(numericTarget)
  const isDecimal = target.includes('.')
  const [displayValue, setDisplayValue] = useState(isNumeric ? '0' : target)

  useEffect(() => {
    const el = ref.current
    if (!el || !isNumeric) return

    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          observer.disconnect()

          const duration = 1000
          const startTime = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            const current = numericTarget * eased
            setDisplayValue(isDecimal ? current.toFixed(1) : Math.round(current).toString())
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isNumeric, isDecimal, numericTarget])

  return (
    <span ref={ref} className={className}>
      {displayValue}
      <span className="text-2xl md:text-3xl">{suffix}</span>
    </span>
  )
}

function TrustCard({ item }: { item: (typeof indicators)[number] }) {
  const Icon = item.icon

  return (
    <div
      className={`group relative rounded-2xl border ${item.borderColor} bg-white p-5 md:p-6 text-center transition-all duration-300 shadow-premium hover:-translate-y-1 hover:shadow-gold animate-fade-in-up`}
      style={{ animationDelay: `${0.15 + indicators.indexOf(item) * 0.1}s` }}
    >
      {/* Static accent glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 0 12px ${item.glowColor}` }}
      />

      {/* Icon */}
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
          <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Stars (only for rating) */}
      {item.stars && (
        <div className="flex items-center justify-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-champagne-gold fill-champagne-gold" />
          ))}
        </div>
      )}

      {/* Number with counter animation */}
      <SpringNumber
        target={item.number}
        suffix={item.numberSuffix}
        className={`font-cormorant text-4xl md:text-5xl font-medium mb-1 text-shadow-gold-strong ${item.accentText}`}
      />

      <h3 className="font-dm-serif text-sm md:text-base text-espresso mb-1.5">{item.title}</h3>
      <p className="font-jost text-xs font-light leading-relaxed text-brown-muted/90">{item.description}</p>
    </div>
  )
}

export default function TrustIndicators() {
  return (
    <section className="bg-white border-t border-b border-soft-border py-16 md:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(184, 152, 48, 0.03) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-14 text-center animate-fade-in-up">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Trust & Credibility
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Trusted by Centurion Families
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            When you choose Refresh Dental, you&rsquo;re choosing a practice built on trust, excellence, and a genuine passion for creating beautiful smiles.
          </p>
          <p className="mt-2 font-cormorant text-base md:text-lg italic text-champagne-gold/60 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Our Promise
          </p>
        </div>

        {/* Gold line separator */}
        <div className="mb-10 md:mb-12 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent origin-center animate-scale-x-full" />

        {/* Indicators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {indicators.map((item) => (
            <TrustCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
