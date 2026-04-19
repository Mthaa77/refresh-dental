'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
  Diamond,
  Navigation,
} from 'lucide-react'
import ContactForm from './contact-form'
import TradingHours from './trading-hours'

export default function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { scrollYProgress } = useScroll({ offset: ['start 0.8', 'end 0.5'] })
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="contact" className="relative bg-ivory py-20 md:py-28 overflow-hidden">
      {/* Grain texture overlay on section background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        aria-hidden="true"
        style={{ mixBlendMode: 'overlay', opacity: 0.03 }}
      >
        <filter id="grain-filter-contact-section">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter-contact-section)" />
      </svg>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 text-center"
        >
          {/* Animated golden ring behind title */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          >
            <svg width="320" height="120" viewBox="0 0 320 120" className="text-champagne-gold opacity-30">
              <ellipse
                cx="160"
                cy="60"
                rx="155"
                ry="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>

          {/* Floating compass/map-pin icon — top-right corner */}
          <motion.div
            className="absolute right-4 top-0 hidden lg:block"
            animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10">
              <Navigation className="h-5 w-5 text-accent-blue" />
            </div>
          </motion.div>

          {/* Animated gold diamond icon */}
          <motion.div
            className="relative mx-auto mb-4 flex items-center justify-center w-10 h-10 rounded-full bg-champagne-gold/10"
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
          <span className="relative mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Get in Touch
          </span>
          <h2 className="relative section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Contact Us
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Ready to take the first step towards your dream smile? We&rsquo;d love to hear from you. Walk-ins welcome, appointments preferred.
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Left Column — Map + Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* "Visit Us" subheading with pulsing gold dot */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5"
            >
              {/* Pulsing gold dot */}
              <motion.div
                className="relative flex items-center justify-center"
                aria-hidden="true"
              >
                <motion.span
                  className="block h-2.5 w-2.5 rounded-full bg-champagne-gold"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.span
                  className="absolute block h-2.5 w-2.5 rounded-full bg-champagne-gold/30"
                  animate={{
                    scale: [1, 2.2, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
              <h3 className="font-dm-serif text-lg text-espresso">Visit Us</h3>
            </motion.div>

            {/* Google Maps with animated gradient border */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative p-[2px] rounded-2xl shadow-elevated"
            >
              {/* Animated gradient border — champagne-gold to gold-light sweep */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'conic-gradient(from 0deg, #B89830, #D4C08A, #B89830, #D4C08A, #B89830)',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                aria-hidden="true"
              />
              {/* Inner mask to create border effect */}
              <div className="relative z-[1] rounded-2xl overflow-hidden h-[300px] bg-white">
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
              </div>
            </motion.div>

            {/* Trading Hours Widget */}
            <TradingHours />

            {/* Contact Info Cards with animated dotted path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative space-y-4"
            >
              {/* Animated dotted path line connecting the cards */}
              <svg
                className="absolute left-5 top-14 bottom-14 w-px hidden lg:block pointer-events-none"
                style={{ height: 'calc(100% - 112px)' }}
                aria-hidden="true"
              >
                <motion.line
                  x1="0.5"
                  y1="0"
                  x2="0.5"
                  y2="100%"
                  stroke="#B89830"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  style={{ pathLength: pathProgress, strokeOpacity: 0.3 }}
                />
              </svg>

              {/* Address */}
              <motion.div
                className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('address')}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -2 }}
                style={
                  hoveredCard === 'address'
                    ? {
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                      }
                    : {}
                }
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold/10">
                  <MapPin className="h-5 w-5 text-champagne-gold" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Address</h4>
                  <p className="font-jost text-sm text-brown-muted leading-relaxed">
                    153 River Road<br />
                    Lyttelton Manor, Centurion<br />
                    Pretoria 0157
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('phone')}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -2 }}
                style={
                  hoveredCard === 'phone'
                    ? {
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                      }
                    : {}
                }
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/10">
                  <Phone className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Phone</h4>
                  <a href="tel:0128833636" className="block font-jost text-sm text-brown-muted hover:text-accent-blue transition-colors">
                    012 883 3636
                  </a>
                  <a href="tel:0614164649" className="block font-jost text-sm text-brown-muted hover:text-accent-blue transition-colors">
                    061 416 4649
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-start gap-4 rounded-xl bg-white p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('email')}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -2 }}
                style={
                  hoveredCard === 'email'
                    ? {
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                      }
                    : {}
                }
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-blush/20">
                  <Mail className="h-5 w-5 text-warm-blush" />
                </div>
                <div>
                  <h4 className="font-dm-serif text-sm text-espresso mb-1">Email</h4>
                  <a href="mailto:admin@refreshdental.co.za" className="block font-jost text-sm text-brown-muted hover:text-accent-blue transition-colors">
                    admin@refreshdental.co.za
                  </a>
                  <a href="mailto:drlebo@refreshdental.co.za" className="block font-jost text-sm text-brown-muted hover:text-accent-blue transition-colors">
                    drlebo@refreshdental.co.za
                  </a>
                </div>
              </motion.div>
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
                className="relative flex items-center justify-center gap-2 bg-[#25D366] text-white font-jost font-semibold rounded-xl px-6 py-3.5 w-full hover:bg-[#20BD5A] transition-colors shadow-gold gold-pulse z-10"
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
              className="relative rounded-2xl p-5 space-y-2 bg-warm-blush/10 shadow-gold-strong"
            >
              {/* Pulsing red border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-accent-red/30"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  borderColor: ['rgba(166, 61, 64, 0.2)', 'rgba(166, 61, 64, 0.6)', 'rgba(166, 61, 64, 0.2)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                <h4 className="font-dm-serif text-base text-espresso">
                  Dental Emergency?
                </h4>
              </div>
              <p className="relative font-jost text-sm text-brown-muted leading-relaxed">
                Dr. Malunga is available for urgent cases. Call immediately for same-day appointments.
              </p>
              <a
                href="tel:0614164649"
                className="relative inline-flex items-center gap-2 mt-2 bg-champagne-gold text-white font-jost font-semibold rounded-full px-5 py-2 text-sm hover:bg-[#A07D1A] transition-colors"
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
            <div className="relative overflow-hidden rounded-2xl border border-soft-border bg-white p-6 md:p-8 shadow-sm">
              {/* Animated corner brackets (gold SVG) */}
              {/* Top-left corner bracket */}
              <motion.svg
                className="absolute top-3 left-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                aria-hidden="true"
              >
                <motion.path
                  d="M2 2 L2 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                />
              </motion.svg>

              {/* Top-right corner bracket */}
              <motion.svg
                className="absolute top-3 right-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M22 2 L22 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </motion.svg>

              {/* Bottom-left corner bracket */}
              <motion.svg
                className="absolute bottom-3 left-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 22 L2 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                />
              </motion.svg>

              {/* Bottom-right corner bracket */}
              <motion.svg
                className="absolute bottom-3 right-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M22 22 L22 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
                />
              </motion.svg>

              {/* Paper texture overlay (SVG noise, mix-blend-overlay, 2% opacity) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                aria-hidden="true"
                style={{ mixBlendMode: 'overlay', opacity: 0.02 }}
              >
                <filter id="noise-filter-contact">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-filter-contact)" />
              </svg>

              <h3 className="relative font-dm-serif text-xl text-espresso mb-6">
                Send Us a Message
              </h3>
              <div className="relative">
                <ContactForm />
              </div>

              {/* Tooth icon watermark — bottom-right corner */}
              <motion.div
                className="absolute bottom-4 right-4 z-0 pointer-events-none"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.03]">
                  <path
                    d="M20 2C15 2 11 5 10 9C8.5 14 9 18 11 22C12.5 25 13 28 13 32C13 35 14.5 38 16 38C17.5 38 18 36 19 33C19.5 31.5 20 30 20 30C20 30 20.5 31.5 21 33C22 36 22.5 38 24 38C25.5 38 27 35 27 32C27 28 27.5 25 29 22C31 18 31.5 14 30 9C29 5 25 2 20 2Z"
                    fill="#B89830"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
