'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Sparkles } from 'lucide-react'

/* ── Floating Sparkle Particles ── */
function SparkleParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-champagne-gold"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Animated Smile Icon ── */
function SmileIcon() {
  return (
    <motion.div
      initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
      whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
      className="inline-flex mx-auto mb-4"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 text-champagne-gold"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tooth shape */}
          <path
            d="M24 4C18 4 14 8 14 14C14 18 16 20 14 30C13 35 12 40 16 42C18 43 20 40 22 36C23 34 23 34 24 34C25 34 25 34 26 36C28 40 30 43 32 42C36 40 35 35 34 30C32 20 34 18 34 14C34 8 30 4 24 4Z"
            fill="currentColor"
            opacity="0.85"
          />
          {/* Sparkle accent */}
          <motion.circle
            cx="38"
            cy="10"
            r="2"
            fill="#E8D5B0"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="8"
            cy="14"
            r="1.5"
            fill="#E8D5B0"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative bg-espresso py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Floating sparkle particles */}
      <SparkleParticles />

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Headline with decorative gold frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4"
        >
          <SmileIcon />
          <div className="relative">
            {/* Decorative gold border frame */}
            <div className="absolute -inset-4 md:-inset-6 rounded-3xl border border-champagne-gold/20 pointer-events-none" />
            <div className="absolute -inset-2 md:-inset-3 rounded-2xl border border-champagne-gold/10 pointer-events-none" />
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 h-4 w-4 border-t-2 border-l-2 border-champagne-gold/40 rounded-tl-lg" />
            <div className="absolute -top-3 -right-3 h-4 w-4 border-t-2 border-r-2 border-champagne-gold/40 rounded-tr-lg" />
            <div className="absolute -bottom-3 -left-3 h-4 w-4 border-b-2 border-l-2 border-champagne-gold/40 rounded-bl-lg" />
            <div className="absolute -bottom-3 -right-3 h-4 w-4 border-b-2 border-r-2 border-champagne-gold/40 rounded-br-lg" />

            <h2 className="font-cormorant text-[clamp(2rem,5vw,4rem)] text-ivory italic leading-tight relative">
              Ready for your
              <br />
              Refreshed Smile?
            </h2>
            <p className="text-ivory/60 text-lg max-w-md mx-auto mt-2">
              Book your consultation today. No commitment, no pressure.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-champagne-gold text-espresso font-semibold rounded-full px-8 py-3.5 hover:bg-gold-light transition-colors shadow-lg shadow-champagne-gold/20"
          >
            Book Online
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:0614164649"
            className="inline-flex items-center gap-2 border border-ivory/40 text-ivory font-semibold rounded-full px-8 py-3.5 hover:bg-ivory/10 hover:border-ivory/60 transition-all"
          >
            <Phone className="w-4 h-4" />
            061 416 4649
          </a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-ivory/10 max-w-xs mx-auto" />

        {/* Newsletter Signup with glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-ivory/50 text-sm max-w-md mx-auto flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold/60" />
            Stay connected — subscribe for oral health tips and exclusive offers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
            className="flex items-center gap-3 max-w-md mx-auto"
          >
            {/* Glass morphism input */}
            <div className="flex-1 relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/[0.06] backdrop-blur-md border border-white/[0.12] focus:border-champagne-gold/60 outline-none text-ivory placeholder:text-ivory/25 rounded-full px-5 py-3 text-sm transition-all duration-300 focus:bg-white/[0.1] focus:shadow-[0_0_20px_rgba(201,169,110,0.1)]"
                required
              />
              {/* Inner glass highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            </div>
            {/* Glass morphism button */}
            <button
              type="submit"
              className="relative bg-champagne-gold/90 backdrop-blur-sm text-espresso font-semibold rounded-full px-6 py-3 text-sm hover:bg-champagne-gold transition-all duration-300 shrink-0 shadow-lg shadow-champagne-gold/15 hover:shadow-champagne-gold/25 hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* Inner highlight */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <span className="relative">Subscribe</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
