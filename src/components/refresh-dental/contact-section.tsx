'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
  Diamond,
} from 'lucide-react'
import ContactForm from './contact-form'
import TradingHours from './trading-hours'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Animated gold diamond icon */}
          <motion.div
            className="mx-auto mb-4 flex items-center justify-center w-10 h-10 rounded-full bg-champagne-gold/10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Diamond className="w-5 h-5 text-champagne-gold" />
          </motion.div>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Get in Touch
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Contact Us
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-warm/70">
            Ready to start your journey to a refreshed smile? Reach out and we&apos;ll take it from there.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Left Column — Map + Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden shadow-sm border border-soft-border h-[300px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=153+River+Road,+Centurion,+Pretoria+0157&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Refresh Dental Location"
              />
            </motion.div>

            {/* Trading Hours Widget */}
            <TradingHours />

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {/* Address */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold/10">
                  <MapPin className="h-5 w-5 text-champagne-gold" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Address</h4>
                  <p className="font-jost text-sm text-brown-warm/80 leading-relaxed">
                    153 River Road<br />
                    Lyttelton Manor, Centurion<br />
                    Pretoria 0157
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sage-teal/10">
                  <Phone className="h-5 w-5 text-sage-teal" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Phone</h4>
                  <a href="tel:0128833636" className="block font-jost text-sm text-brown-warm/80 hover:text-champagne-gold transition-colors">
                    012 883 3636
                  </a>
                  <a href="tel:0614164649" className="block font-jost text-sm text-brown-warm/80 hover:text-champagne-gold transition-colors">
                    061 416 4649
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-blush/20">
                  <Mail className="h-5 w-5 text-warm-blush" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Email</h4>
                  <a href="mailto:admin@refreshdental.co.za" className="block font-jost text-sm text-brown-warm/80 hover:text-champagne-gold transition-colors">
                    admin@refreshdental.co.za
                  </a>
                  <a href="mailto:drlebo@refreshdental.co.za" className="block font-jost text-sm text-brown-warm/80 hover:text-champagne-gold transition-colors">
                    drlebo@refreshdental.co.za
                  </a>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Button with pulsing ring */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Pulsing ring animation */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-[#25D366]/20"
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-[#25D366]/15"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.6,
                }}
              />
              <motion.a
                href="https://wa.me/27614164649"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center gap-2 bg-[#25D366] text-white font-jost font-semibold rounded-xl px-6 py-3.5 w-full hover:bg-[#20BD5A] transition-colors shadow-sm z-10"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Emergency Callout with pulsing border */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative rounded-2xl p-5 space-y-2 bg-warm-blush/10"
            >
              {/* Pulsing red border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-warm-blush/30"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  borderColor: ['rgba(220, 120, 120, 0.2)', 'rgba(220, 120, 120, 0.6)', 'rgba(220, 120, 120, 0.2)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-warm-blush flex-shrink-0" />
                <h4 className="font-dm-serif text-base text-espresso">
                  Dental Emergency?
                </h4>
              </div>
              <p className="relative font-jost text-sm text-brown-warm/70 leading-relaxed">
                Dr. Malunga is available for urgent cases. Call immediately for same-day appointments.
              </p>
              <a
                href="tel:0614164649"
                className="relative inline-flex items-center gap-2 mt-2 bg-champagne-gold text-white font-jost font-semibold rounded-full px-5 py-2 text-sm hover:bg-[#b8964f] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                061 416 4649
              </a>
            </motion.div>
          </div>

          {/* Right Column — Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-soft-border bg-white p-6 md:p-8 shadow-sm">
              <h3 className="font-dm-serif text-xl text-espresso mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
