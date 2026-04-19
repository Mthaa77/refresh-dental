'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-champagne-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function SmileCta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-espresso py-24 sm:py-32"
    >
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(184, 152, 48, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(45, 107, 92, 0.04) 0%, transparent 60%)',
        }}
      />

      {/* Floating gold particles */}
      <FloatingParticles />

      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Decorative top/bottom gradient lines */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.4), rgba(212, 192, 138, 0.2), transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.2), rgba(212, 192, 138, 0.1), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Sparkle icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-champagne-gold/20 bg-champagne-gold/5"
        >
          <Sparkles className="h-7 w-7 text-champagne-gold" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 font-cormorant text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #B89830 0%, #D4C08A 40%, #E8D5B0 60%, #D4C08A 80%, #B89830 100%)',
            }}
          >
            Ready to Transform Your Smile?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-12 max-w-2xl font-jost text-lg text-ivory/60 sm:text-xl"
        >
          Join 500+ patients who chose Refresh Dental for their smile journey
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary CTA — Gold filled */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(184, 152, 48, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-8 py-4 font-jost text-sm font-semibold uppercase tracking-widest text-espresso transition-colors duration-300 hover:bg-champagne-gold-light"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          {/* Secondary CTA — Gold outlined */}
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-champagne-gold/40 px-8 py-4 font-jost text-sm font-semibold uppercase tracking-widest text-champagne-gold transition-all duration-300 hover:border-champagne-gold hover:bg-champagne-gold/5"
          >
            View Our Services
          </motion.a>
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 font-jost text-xs uppercase tracking-[0.2em] text-ivory/30"
        >
          ★ 5.0 Rated on Google · No Obligation · All Medical Aids Accepted
        </motion.p>
      </div>
    </section>
  )
}
