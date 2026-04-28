'use client'

import { useState } from 'react'
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

  return (
    <section id="contact" className="relative bg-ivory py-20 md:py-28 overflow-hidden blue-tint">
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
        <div className="relative mb-16 text-center animate-fade-in-up">
          {/* Static golden ring behind title */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
          </div>

          {/* Static compass/map-pin icon — top-right corner */}
          <div
            className="absolute right-4 top-0 hidden lg:block"
            aria-hidden="true"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/10">
              <Navigation className="h-5 w-5 text-accent-blue" />
            </div>
          </div>

          {/* Static gold diamond icon */}
          <div className="relative mx-auto mb-4 flex items-center justify-center w-10 h-10 rounded-full bg-champagne-gold/10">
            <Diamond className="w-5 h-5 text-champagne-gold" />
          </div>
          <span className="relative mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Get in Touch
          </span>
          <h2 className="relative section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Contact Us
          </h2>
          <p className="relative font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Ready to take the first step towards your dream smile? We&rsquo;d love to hear from you. Walk-ins welcome, appointments preferred.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Left Column — Map + Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* "Visit Us" subheading with static gold dot */}
            <div className="flex items-center gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              {/* Static gold dot */}
              <div className="relative flex items-center justify-center" aria-hidden="true">
                <span className="block h-2.5 w-2.5 rounded-full bg-champagne-gold" />
              </div>
              <h3 className="font-dm-serif text-lg text-espresso">Visit Us</h3>
            </div>

            {/* Location Card with Directions Link */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=153+River+Road+Lyttelton+Manor+Centurion+Pretoria+0157"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative p-[2px] rounded-2xl shadow-elevated animate-fade-in-up group"
              style={{ animationDelay: '0.2s' }}
            >
              {/* Static gradient border — champagne-gold */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'conic-gradient(from 0deg, #B89830, #D4C08A, #B89830, #D4C08A, #B89830)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-[1] rounded-2xl overflow-hidden bg-card p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne-gold/10 mb-3">
                  <MapPin className="h-6 w-6 text-champagne-gold" />
                </div>
                <p className="font-dm-serif text-base text-espresso mb-1">Family Wellness Centre</p>
                <p className="font-jost text-sm text-brown-muted leading-relaxed">
                  153 River Road, Lyttelton Manor<br />Centurion, Pretoria 0157
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-jost text-xs font-semibold text-champagne-gold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  Get Directions
                  <Navigation className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>

            {/* Trading Hours Widget */}
            <TradingHours />

            {/* Contact Info Cards */}
            <div className="relative space-y-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              {/* Static dotted path line connecting the cards */}
              <svg
                className="absolute left-5 top-14 bottom-14 w-px hidden lg:block pointer-events-none"
                style={{ height: 'calc(100% - 112px)' }}
                aria-hidden="true"
              >
                <line
                  x1="0.5"
                  y1="0"
                  x2="0.5"
                  y2="100%"
                  stroke="#B89830"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  style={{ strokeOpacity: 0.3 }}
                />
              </svg>

              {/* Address */}
              <div
                className="flex items-start gap-4 rounded-xl bg-card p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('address')}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  hoveredCard === 'address'
                    ? {
                        backgroundColor: 'rgba(250, 247, 242, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderLeft: '3px solid #B89830',
                      }
                    : { borderLeft: '3px solid #B89830' }
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
              </div>

              {/* Phone */}
              <div
                className="flex items-start gap-4 rounded-xl bg-card p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('phone')}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  hoveredCard === 'phone'
                    ? {
                        backgroundColor: 'rgba(250, 247, 242, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderLeft: '3px solid #3B6FA0',
                      }
                    : { borderLeft: '3px solid #3B6FA0' }
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
              </div>

              {/* Email */}
              <div
                className="flex items-start gap-4 rounded-xl bg-card p-4 border border-soft-border shadow-premium hover-lift transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredCard('email')}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  hoveredCard === 'email'
                    ? {
                        backgroundColor: 'rgba(250, 247, 242, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderLeft: '3px solid #A63D40',
                      }
                    : { borderLeft: '3px solid #A63D40' }
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
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="https://wa.me/27614164649"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-2 bg-[#25D366] text-white font-jost font-semibold rounded-xl px-6 py-3.5 w-full hover:bg-[#20BD5A] transition-all duration-200 shadow-red z-10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Emergency Callout */}
            <div className="relative rounded-2xl p-5 space-y-2 bg-warm-blush/10 shadow-gold-strong animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
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
                className="relative inline-flex items-center justify-center gap-2 mt-2 min-h-[44px] bg-champagne-gold text-white font-jost font-semibold rounded-full px-6 py-2.5 text-sm hover:bg-[#A07D1A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                061 416 4649
              </a>
            </div>
          </div>

          {/* Right Column — Contact Form (3 cols) */}
          <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative overflow-hidden rounded-2xl border border-soft-border bg-card p-6 md:p-8 shadow-sm">
              {/* Static corner brackets (gold SVG) */}
              <svg
                className="absolute top-3 left-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2 L2 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="absolute top-3 right-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 2 L22 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="absolute bottom-3 left-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 22 L2 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="absolute bottom-3 right-3 z-[2] pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 22 L22 12 L12 12"
                  stroke="#B89830"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

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

              {/* Tooth icon watermark — bottom-right corner (static) */}
              <div
                className="absolute bottom-4 right-4 z-0 pointer-events-none"
                aria-hidden="true"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.03]">
                  <path
                    d="M20 2C15 2 11 5 10 9C8.5 14 9 18 11 22C12.5 25 13 28 13 32C13 35 14.5 38 16 38C17.5 38 18 36 19 33C19.5 31.5 20 30 20 30C20 30 20.5 31.5 21 33C22 36 22.5 38 24 38C25.5 38 27 35 27 32C27 28 27.5 25 29 22C31 18 31.5 14 30 9C29 5 25 2 20 2Z"
                    fill="#B89830"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
