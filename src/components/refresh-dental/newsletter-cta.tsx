'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Phone, Sparkles, Check } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 2500)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Static gradient background (espresso → deep brown) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0F0D0A 0%, #1A1208 50%, #0F0D0A 100%)',
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] max-w-[90vw] bg-champagne-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Static decorative SVG tooth/smile watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <svg
          viewBox="0 0 48 48"
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] text-champagne-gold/[0.02]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4C18 4 14 8 14 14C14 18 16 20 14 30C13 35 12 40 16 42C18 43 20 40 22 36C23 34 23 34 24 34C25 34 25 34 26 36C28 40 30 43 32 42C36 40 35 35 34 30C32 20 34 18 34 14C34 8 30 4 24 4Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8 shadow-gold-strong rounded-3xl py-16 md:py-20">
        {/* Headline with decorative gold frame */}
        <div className="space-y-4 animate-fade-in-up">
          {/* Static tooth icon */}
          <div className="inline-flex mx-auto mb-4">
            <svg
              viewBox="0 0 48 48"
              className="w-10 h-10 text-champagne-gold"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C18 4 14 8 14 14C14 18 16 20 14 30C13 35 12 40 16 42C18 43 20 40 22 36C23 34 23 34 24 34C25 34 25 34 26 36C28 40 30 43 32 42C36 40 35 35 34 30C32 20 34 18 34 14C34 8 30 4 24 4Z"
                fill="currentColor"
                opacity="0.85"
              />
            </svg>
          </div>

          <div className="relative">
            {/* Decorative gold border frame */}
            <div className="absolute -inset-4 md:-inset-6 rounded-3xl border border-champagne-gold/20 pointer-events-none" />
            <div className="absolute -inset-2 md:-inset-3 rounded-2xl border border-champagne-gold/10 pointer-events-none" />
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 h-4 w-4 border-t-2 border-l-2 border-champagne-gold/40 rounded-tl-lg" />
            <div className="absolute -top-3 -right-3 h-4 w-4 border-t-2 border-r-2 border-champagne-gold/40 rounded-tr-lg" />
            <div className="absolute -bottom-3 -left-3 h-4 w-4 border-b-2 border-l-2 border-champagne-gold/40 rounded-bl-lg" />
            <div className="absolute -bottom-3 -right-3 h-4 w-4 border-b-2 border-r-2 border-champagne-gold/40 rounded-br-lg" />

            {/* Gold gradient heading */}
            <h2
              className="shimmer-text font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium italic leading-tight relative text-shadow-ivory"
            >
              Ready for your
              <br />
              Refreshed Smile?
            </h2>
            <p className="text-ivory/70 text-lg max-w-md mx-auto mt-3 font-jost leading-relaxed">
              Take the first step towards the smile you've always dreamed of.
              Book your consultation today — no pressure, no obligation, just expert care.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-champagne-gold text-espresso font-semibold rounded-full px-10 py-4 text-base shadow-gold hover:bg-gold-light transition-colors"
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
        </div>

        {/* Divider */}
        <div className="border-t border-ivory/10 max-w-xs mx-auto" />

        {/* Newsletter Signup with glass morphism */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-ivory/65 text-sm max-w-md mx-auto flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold/60" />
            Join 500+ patients who receive exclusive oral health tips, special offers, and early access to new treatments.
          </p>
          <form
            onSubmit={handleSubmit}
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
                disabled={submitted}
              />
              {/* Inner glass highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            </div>
            {/* Glass morphism button with press animation */}
            <button
              type="submit"
              className="relative bg-champagne-gold/90 backdrop-blur-sm text-espresso font-semibold rounded-full px-8 py-3.5 text-sm transition-all duration-200 shrink-0 shadow-gold hover:shadow-champagne-gold/25 hover:scale-[1.03] active:scale-[0.88]"
              disabled={submitted}
            >
              {/* Inner highlight */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <span className="relative inline-flex items-center gap-1.5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Done!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="subscribe"
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Subscribe
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
