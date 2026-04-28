'use client'

import { useState } from 'react'
import { Phone, Clock, AlertTriangle, Heart, MessageCircle } from 'lucide-react'

interface EmergencyCard {
  icon: React.ReactNode
  title: string
  description: string
  advice: string
}

const emergencyServices: EmergencyCard[] = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Severe Toothache',
    description: 'Persistent, severe tooth pain that over-the-counter medication cannot relieve — this is your body signalling that professional attention is needed.',
    advice: 'Apply a cold compress to the area and call us right away',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Broken Tooth',
    description: 'A cracked, chipped, or fractured tooth resulting from injury, hard biting, or advanced decay — prompt treatment prevents further damage.',
    advice: 'Rinse gently, save any fragments, and contact us immediately',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Knocked Out Tooth',
    description: 'A fully dislodged tooth where every minute counts — with prompt, expert care, re-implantation is often possible.',
    advice: 'Keep the tooth moist in milk or saliva and come straight to us',
  },
]

export default function EmergencyDental() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section id="emergency" className="relative overflow-hidden">
      {/* ===== BACKGROUND LAYERS ===== */}

      {/* FIX: Main background gradient — MUST be absolute inset-0 to cover section */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-burgundy via-espresso to-accent-red/80" />

      {/* Subtle texture noise overlay for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Static radial pulse background */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(166, 61, 64, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Vignette overlay — radial gradient, transparent center → dark edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15, 13, 10, 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Thin gold-red gradient line at top of section */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-20 origin-left scale-x-0 animate-scale-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #A63D40 20%, #B89830 50%, #A63D40 80%, transparent 100%)',
        }}
      />

      {/* Thin gold-red gradient line at bottom of section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20 origin-right scale-x-0 animate-scale-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #B89830 30%, #A63D40 70%, transparent 100%)',
          animationDelay: '0.3s',
        }}
      />

      {/* Corner decorative cross marks (gold SVG) */}
      {/* Top-left */}
      <div className="absolute top-8 left-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Top-right */}
      <div className="absolute top-8 right-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-8 left-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-8 right-6 z-[5]" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0V10M0 5H10" stroke="#B89830" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ===== CONTENT — relative z-10 to sit above all overlays ===== */}
      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* ===== LEFT COLUMN — Emergency Contact ===== */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            {/* 24/7 Emergency Care badge with static border */}
            <div className="relative inline-block">
              {/* Static conic gradient border ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(184, 152, 48, 0.7) 25%, transparent 50%, rgba(166, 61, 64, 0.6) 75%, transparent 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                  borderRadius: '9999px',
                }}
              />
              <span className="relative inline-block rounded-full bg-champagne-gold/15 px-5 py-2 font-jost text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                24/7 Emergency Care
              </span>
            </div>

            {/* Main heading — dramatic gold gradient text */}
            <h2 className="font-cormorant text-[clamp(2.5rem,5.5vw,4.2rem)] font-medium leading-tight gold-gradient-text text-shadow-gold">
              Dental Emergency? We&rsquo;re Here for You.
            </h2>

            {/* Subtitle — reassuring text */}
            <p className="font-jost text-base leading-relaxed text-ivory/75 max-w-lg mx-auto lg:mx-0">
              Pain doesn&rsquo;t wait, and neither should you. Our dedicated emergency team is available around the clock to provide swift, compassionate relief and expert care precisely when you need it most.
            </p>

            {/* Phone icon with static pulse rings */}
            <div className="relative flex items-center justify-center lg:justify-start pt-2">
              <a
                href="tel:0123456789"
                className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent-red/40 sm:h-32 sm:w-32 transition-transform duration-200 hover:scale-105 active:scale-95"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Static ring (visual only, no animation) */}
                <div
                  className="absolute inset-0 rounded-full border border-accent-red/30"
                />

                {/* Phone icon background */}
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24 transition-transform duration-300"
                  style={{ backgroundColor: 'rgba(166, 61, 64, 0.2)', transform: isHovering ? 'scale(1.08)' : 'scale(1)' }}
                >
                  <Phone className="h-10 w-10 text-accent-red sm:h-12 sm:w-12" />
                </div>
              </a>
            </div>

            {/* Phone number — large, prominent, hover-to-gold */}
            <div className="relative inline-block">
              <a
                href="tel:0123456789"
                className="relative block font-cormorant text-[clamp(2.5rem,5vw,3.5rem)] font-semibold text-ivory transition-colors duration-300 hover:text-champagne-gold"
              >
                012 345 6789
              </a>
            </div>

            {/* CTA buttons row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/27123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366]/90 px-6 py-3.5 font-jost text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#25D366] hover:shadow-xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] min-h-[44px]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>

              {/* Call Now CTA */}
              <a
                href="tel:0123456789"
                className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-champagne-gold px-8 py-4 font-jost text-sm font-semibold text-espresso shadow-lg transition-all duration-200 hover:bg-champagne-gold/90 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] min-h-[44px] sm:px-10 sm:py-4 sm:text-base"
              >
                <Phone className="relative z-10 h-5 w-5" />
                <span className="relative z-10">Call Now</span>
              </a>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — Emergency Service Cards ===== */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {/* Column header */}
            <h3
              className="font-dm-serif text-xl text-ivory/90 mb-6 text-center lg:text-left animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              Common Dental Emergencies We Treat
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {emergencyServices.map((service, index) => (
                <div
                  key={service.title}
                  className="group flex items-start gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-5 backdrop-blur-sm transition-all duration-200 hover:border-accent-red/40 hover:bg-ivory/8 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${0.35 + index * 0.15}s` }}
                >
                  {/* Icon in red-accented circle */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-red/15 text-accent-red transition-colors duration-300 group-hover:bg-accent-red/25">
                    {service.icon}
                  </div>
                  {/* Text content */}
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-dm-serif text-lg text-ivory">
                      {service.title}
                    </h3>
                    <p className="font-jost text-sm leading-relaxed text-ivory/75">
                      {service.description}
                    </p>
                    <p className="font-jost text-xs leading-relaxed text-champagne-gold/70 italic">
                      💡 {service.advice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom reassurance text */}
        <p
          className="mt-14 text-center font-jost text-sm text-ivory/50 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          Same-day emergency appointments available · Walk-ins always welcome · No referral required
        </p>
      </div>
    </section>
  )
}
