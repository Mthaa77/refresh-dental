'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

/* ──────────────────────────────────────────────
   Animated Counter – counts up to 4.9
   ────────────────────────────────────────────── */
function AnimatedRating({
  target,
  isInView,
  onComplete,
}: {
  target: number
  isInView: boolean
  onComplete: () => void
}) {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return
    startTimeRef.current = null

    const tick = (timestamp: number) => {
      const start = startTimeRef.current ?? timestamp
      startTimeRef.current = start
      const duration = 2200
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = eased * target
      // Show one decimal, but only after we've passed 0.1
      setCount(value < 0.1 ? 0 : parseFloat(value.toFixed(1)))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(target)
        onComplete()
      }
    }
    requestAnimationFrame(tick)
  }, [isInView, target, onComplete])

  return <span>{count}</span>
}

/* ──────────────────────────────────────────────
   Star Rating Bar – 5 stars, last one partially filled
   ────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const partial = !filled && i === Math.floor(rating) && rating % 1 > 0
        const fillPercent = partial ? rating % 1 : 0

        return (
          <div key={i} className="relative">
            {/* Empty star */}
            <Star className="h-5 w-5 text-champagne-gold/25" strokeWidth={1.5} />
            {/* Filled star overlay */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? '100%' : `${fillPercent * 100}%` }}
            >
              <Star
                className="h-5 w-5 text-champagne-gold"
                fill="currentColor"
                strokeWidth={1.5}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function ReviewsSummary() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [counterDone, setCounterDone] = useState(false)

  return (
    <section
      id="reviews-summary"
      ref={ref}
      className="relative bg-white overflow-hidden"
    >
      {/* Sand border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* ── Left decorative element (desktop) ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne-gold/60" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/30 bg-champagne-gold/5">
              <Star className="h-5 w-5 text-champagne-gold" fill="currentColor" strokeWidth={1.5} />
            </div>
          </div>

          {/* ── Gold gradient card with glass morphism ── */}
          <div className="relative w-full max-w-lg mx-auto md:mx-0">
            {/* Background glow */}
            <motion.div
              className="absolute -inset-4 rounded-3xl opacity-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.15), transparent 70%)',
              }}
              animate={counterDone ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            />

            {/* Card */}
            <div
              className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(232,213,176,0.18) 50%, rgba(201,169,110,0.12) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,169,110,0.25)',
              }}
            >
              {/* Inner subtle pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 200 200">
                  <defs>
                    <pattern id="review-pattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                      <circle cx="1" cy="1" r="1" fill="#B89830" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#review-pattern)" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Google icon + label */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-jost text-xs font-medium uppercase tracking-[0.15em] text-brown-muted/90">
                    Google Reviews
                  </span>
                </div>

                {/* Rating number */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-cormorant text-5xl md:text-6xl font-medium text-espresso">
                    <AnimatedRating
                      target={4.9}
                      isInView={isInView}
                      onComplete={() => setCounterDone(true)}
                    />
                  </span>
                  <span className="font-cormorant text-2xl text-champagne-gold">/5</span>
                </div>

                {/* Stars */}
                <div className="mb-3">
                  <StarRating rating={4.9} />
                </div>

                {/* Review count */}
                <p className="font-jost text-sm text-brown-muted mb-6">
                  Based on{' '}
                  <span className="font-semibold text-brown-warm">127 reviews</span>{' '}
                  from our patients
                </p>

                {/* CTA Button */}
                <motion.a
                  href="#testimonials"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-jost text-sm font-medium transition-colors duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #B89830, #D4C08A)',
                    color: '#0F0D0A',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Read All Reviews
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* ── Right side: decorative trust elements (desktop) ── */}
          <div className="hidden md:flex flex-col gap-4 flex-shrink-0">
            {[
              { label: 'Excellent', value: '92%', delay: 0.3 },
              { label: 'Very Good', value: '6%', delay: 0.45 },
              { label: 'Good', value: '2%', delay: 0.6 },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: item.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-3"
              >
                <span className="font-jost text-xs text-brown-muted/80 w-20 text-right">
                  {item.label}
                </span>
                <div className="w-28 h-1.5 rounded-full bg-sand overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #B89830, #D4C08A)',
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: item.value } : { width: 0 }}
                    transition={{ duration: 1, delay: item.delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <span className="font-jost text-xs font-medium text-brown-warm w-8">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sand border bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
    </section>
  )
}
