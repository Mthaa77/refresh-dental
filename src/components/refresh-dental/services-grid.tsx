'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Heart, Sparkles, Shield, Star, Phone, MessageCircle } from 'lucide-react'
import ServiceDetailDrawer from './service-detail-drawer'

const services = [
  { name: "Dental Implants", duration: "1 hr 30 min", category: "Specialised", desc: "Permanent, natural-looking tooth replacement solutions", span: "col-span-2 row-span-2" },
  { name: "Teeth Whitening", duration: "1 hr", category: "Cosmetic", desc: "Professional whitening for a brilliantly radiant smile", span: "col-span-2" },
  { name: "Fillers & Neurotoxins", duration: "1 hr", category: "Aesthetics", desc: "Facial aesthetics to complement your refreshed smile", span: "col-span-2" },
  { name: "Aligners / Slimming Wires", duration: "30 min", category: "Cosmetic", desc: "Invisible orthodontics for a perfectly aligned smile", span: "col-span-2" },
  { name: "Dental Consultation", duration: "30 min", category: "General", desc: "Comprehensive oral health assessment", span: "" },
  { name: "Scaling and Polishing", duration: "30 min", category: "General", desc: "Deep clean for optimal oral hygiene", span: "" },
  { name: "Restorations", duration: "30 min", category: "General", desc: "Tooth-coloured fillings and restorative care", span: "" },
  { name: "Root Canal Therapy", duration: "1 hr 30 min", category: "Specialised", desc: "Pain-free advanced endodontic treatment", span: "" },
  { name: "Wisdom Teeth Removal", duration: "1 hr", category: "Specialised", desc: "Safe and comfortable extraction", span: "" },
  { name: "Dental Prosthesis", duration: "30 min", category: "Specialised", desc: "Custom-crafted dentures for natural function", span: "" },
  { name: "Crowns and Veneers", duration: "1 hr", category: "Cosmetic", desc: "Premium restorations for a flawless finish", span: "" },
  { name: "Fixed Dental Prosthesis", duration: "1 hr 30 min", category: "Specialised", desc: "Permanent bridges and fixed prosthetic solutions", span: "" },
]

const categoryIcons: Record<string, React.ElementType> = {
  General: Heart,
  Cosmetic: Sparkles,
  Specialised: Shield,
  Aesthetics: Star,
}

const categories = ["All", "General", "Cosmetic", "Specialised", "Aesthetics"]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function ServiceCard({ service, idx, onSelect }: { service: typeof services[number]; idx: number; onSelect: (name: string) => void }) {
  const isLarge = service.span.includes("row-span-2")
  const Icon = categoryIcons[service.category]

  return (
    <motion.div
      variants={cardVariants}
      onClick={() => onSelect(service.name)}
      className={`${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''} group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-premium shadow-inner-gold ${
        isLarge
          ? "relative min-h-[220px] sm:min-h-[320px] md:min-h-[360px] shadow-elevated"
          : "min-h-[160px] md:min-h-[180px]"
      }`}
      style={{
        border: '1px solid var(--color-soft-border)',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 8px 30px rgba(15,13,10,0.12)',
        borderColor: 'rgba(184, 152, 48, 0.55)',
        transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
      }}
    >
      {/* Animated gold accent line at top — expands 0→100% on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-gold-rich via-champagne-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.25,0.4,0.25,1)]" />
      </div>

      {/* Glass highlight shine at top of card */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 40%, transparent 100%)',
          borderRadius: '1rem 1rem 0 0',
        }}
      />

      {/* Subtle gradient overlay on card */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isLarge
            ? 'linear-gradient(135deg, rgba(184,152,48,0.04) 0%, transparent 30%, rgba(196,144,124,0.05) 70%, rgba(184,152,48,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(184,152,48,0.02) 0%, transparent 40%, rgba(240,235,225,0.3) 100%)',
        }}
      />

      {/* Large card warm gradient overlay */}
      {isLarge && (
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 via-sand/40 to-warm-blush/20 pointer-events-none z-0" />
      )}

      {/* Floating shine/glare sweep effect on hover */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none z-10 rounded-2xl">
        <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
          <div className="w-[60%] h-full" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.05), transparent)',
            transform: 'skewX(-15deg)',
          }} />
        </div>
      </div>

      {/* Watermark icon in top-right (static) */}
      {Icon && (() => {
        const iconSize = isLarge ? 'h-12 w-12' : 'h-8 w-8'
        return (
          <div className={`absolute top-3 right-3 md:top-4 md:right-4 pointer-events-none z-[5] ${iconSize}`}>
            <Icon className="h-full w-full text-champagne-gold/[0.08] transition-colors duration-500 group-hover:text-champagne-gold/[0.20]" />
          </div>
        )
      })()}

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 z-[15]">
        {/* Top content */}
        <div>
          {/* Duration Badge + Category Badge */}
          <div className="mb-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory-dark/60 px-3 py-1 text-[10px] font-medium tracking-wide text-brown-warm">
              <Clock className="h-3 w-3 text-champagne-gold" />
              {service.duration}
            </span>
            <span
              className="inline-flex items-center rounded-full bg-gold-pale/30 px-3 py-1 text-[10px] font-semibold tracking-wide text-gold-rich uppercase"
              style={{ borderLeft: '2px solid var(--color-champagne-gold)' }}
            >
              {service.category}
            </span>
          </div>

          {/* Service Name */}
          <h3
            className={`font-dm-serif text-xl md:text-2xl leading-snug text-espresso text-shadow-espresso ${
              isLarge ? "text-2xl md:text-3xl lg:text-4xl" : ""
            }`}
          >
            {service.name}
          </h3>

          {/* Description */}
          <p className="mt-2 font-jost text-sm font-light leading-[1.75] text-brown-muted">
            {service.desc}
          </p>
        </div>

        {/* Book CTA */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="font-jost text-xs font-semibold uppercase tracking-[0.15em] text-champagne-gold transition-all duration-300 group-hover:tracking-[0.22em]">
            Book This Service
          </span>
          <div className="inline-flex text-champagne-gold">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <>
    <section id="services" className="bg-sand py-20 md:py-28 relative overflow-hidden">
      {/* Subtle blue tint decorative overlay */}
      <div className="pointer-events-none absolute inset-0 blue-tint" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold text-shadow-gold">
            What We Offer
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-luxury gold-gradient-text">
            Everything Your Smile Needs
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            From routine check-ups to complete smile makeovers — every treatment is delivered with precision, care, and a commitment to exceeding your expectations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex gap-2 overflow-x-auto scrollbar-hide px-4 -mx-4 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:mx-0 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:shrink hover:scale-[1.04] active:scale-[0.97] ${
                activeCategory === cat
                  ? "chrome-gold-bg text-white shadow-gold-strong"
                  : "bg-white/70 backdrop-blur-sm border border-soft-border text-brown-warm hover:bg-champagne-gold/10 hover:text-espresso hover:border-champagne-gold/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-5"
        >
          {filteredServices.map((service, idx) => (
            <ServiceCard key={service.name} service={service} idx={idx} onSelect={setSelectedService} />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white overflow-hidden chrome-gold-bg shadow-gold-strong hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            {/* Shimmer sweep on hover */}
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
              <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
                <div className="w-[60%] h-full" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), rgba(255,255,255,0.05), transparent)',
                  transform: 'skewX(-20deg)',
                }} />
              </div>
            </div>
            <span className="relative z-10">View All Services</span>
            <span className="relative z-10">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Quick Booking Card */}
        <div className="mt-12 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <div
            className="relative max-w-xl w-full rounded-2xl p-6 md:p-8 text-center"
            style={{
              background: 'rgba(250, 247, 242, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(184, 152, 48, 0.2)',
              boxShadow: '0 8px 32px rgba(15, 13, 10, 0.08), 0 0 0 1px rgba(184, 152, 48, 0.08)',
            }}
          >
            <div
              className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(184, 152, 48, 0.5), transparent)',
              }}
            />
            <h3 className="font-cormorant text-2xl md:text-3xl font-light text-espresso mb-2">
              Need Help Choosing?
            </h3>
            <p className="font-jost text-sm text-brown-muted mb-6 leading-relaxed">
              Chat with us for a personalised recommendation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+27614164649"
                className="inline-flex items-center gap-2 bg-sage-teal text-white font-jost text-sm font-medium tracking-wider uppercase rounded-full px-6 py-3 transition-all duration-300 hover:bg-sage-teal/90 hover:shadow-teal"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="https://wa.me/27614164649"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-jost text-sm font-medium tracking-wider uppercase rounded-full px-6 py-3 transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ServiceDetailDrawer
      serviceKey={selectedService}
      isOpen={!!selectedService}
      onClose={() => setSelectedService(null)}
    />
    </>
  )
}
