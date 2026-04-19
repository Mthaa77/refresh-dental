'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative bg-espresso py-24 overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="font-cormorant text-[clamp(2rem,5vw,4rem)] text-ivory italic leading-tight">
            Ready for your
            <br />
            Refreshed Smile?
          </h2>
          <p className="text-ivory/60 text-lg max-w-md mx-auto">
            Book your consultation today. No commitment, no pressure.
          </p>
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

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-ivory/50 text-sm max-w-md mx-auto">
            Stay connected — subscribe for oral health tips and exclusive offers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
            className="flex items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-b border-ivory/30 focus:border-champagne-gold outline-none text-ivory placeholder:text-ivory/30 pb-2 text-sm transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-champagne-gold text-espresso font-semibold rounded-full px-6 py-2 text-sm hover:bg-gold-light transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
