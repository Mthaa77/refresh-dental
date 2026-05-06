'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Heart, Sparkles, Shield, Star, Phone, MessageCircle, ChevronRight } from 'lucide-react'
import ServiceDetailDrawer from './service-detail-drawer'

const services = [
  { name: "Dental Implants", duration: "1 hr 30 min", category: "Specialised", desc: "Titanium-rooted, natural-looking tooth replacements built to last a lifetime", featured: true, color: '#B89830', image: '/images/clinic/procedures/treatment-in-progress.jpg' },
  { name: "Teeth Whitening", duration: "1 hr", category: "Cosmetic", desc: "In-chair and take-home whitening systems for a brilliantly luminous smile", featured: false, color: '#C4907C', image: '/images/clinic/procedures/teeth-whitening-treatment.jpg' },
  { name: "Fillers & Neurotoxins", duration: "1 hr", category: "Aesthetics", desc: "Non-surgical facial aesthetics designed to harmonise with your new smile", featured: false, color: '#A63D40', image: '/images/clinic/environment/modern-operatory.jpg' },
  { name: "Aligners / Slimming Wires", duration: "30 min", category: "Cosmetic", desc: "Nearly invisible orthodontic solutions for discreet, comfortable alignment", featured: false, color: '#2D6B5C', image: '/images/clinic/procedures/teeth-whitening-treatment.jpg' },
  { name: "Dental Consultation", duration: "30 min", category: "General", desc: "Thorough 30-minute oral assessment with personalised treatment planning", featured: false, color: '#3B6FA0', image: '/images/clinic/environment/modern-operatory.jpg' },
  { name: "Scaling and Polishing", duration: "30 min", category: "General", desc: "Professional deep cleaning to protect gums and maintain oral health", featured: false, color: '#2D6B5C', image: '/images/clinic/procedures/teeth-whitening-treatment.jpg' },
  { name: "Restorations", duration: "30 min", category: "General", desc: "Mercury-free, tooth-coloured restorations that blend seamlessly with your natural teeth", featured: false, color: '#B89830', image: '/images/clinic/procedures/treatment-in-progress.jpg' },
  { name: "Root Canal Therapy", duration: "1 hr 30 min", category: "Specialised", desc: "Gentle, advanced endodontic therapy to save and restore compromised teeth", featured: false, color: '#A63D40', image: '/images/clinic/procedures/treatment-in-progress.jpg' },
  { name: "Wisdom Teeth Removal", duration: "1 hr", category: "Specialised", desc: "Safe, comfortable wisdom tooth extraction with minimal recovery time", featured: false, color: '#3B6FA0', image: '/images/clinic/environment/modern-operatory.jpg' },
  { name: "Dental Prosthesis", duration: "30 min", category: "Specialised", desc: "Precision-crafted dentures designed for comfort, function, and a natural appearance", featured: false, color: '#B89830', image: '/images/clinic/procedures/treatment-in-progress.jpg' },
  { name: "Crowns and Veneers", duration: "1 hr", category: "Cosmetic", desc: "Handcrafted porcelain crowns and veneers for a picture-perfect finish", featured: true, color: '#C4907C', image: '/images/clinic/procedures/teeth-whitening-treatment.jpg' },
  { name: "Fixed Dental Prosthesis", duration: "1 hr 30 min", category: "Specialised", desc: "Custom permanent bridges and prosthetics that restore full dental function", featured: false, color: '#2D6B5C', image: '/images/clinic/environment/modern-operatory.jpg' },
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
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ── 3D Tilt Hook ── */
function useTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8, active: true })
  }, [])

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false })
  }, [])

  return { tilt, onMouseMove, onMouseLeave }
}

/* ── Service Card ── */
function ServiceCard({ service, onSelect }: { service: typeof services[number]; onSelect: (name: string) => void }) {
  const { tilt, onMouseMove, onMouseLeave } = useTilt()
  const Icon = categoryIcons[service.category]
  const isFeatured = service.featured

  return (
    <motion.div
      variants={cardVariants}
      className={`${isFeatured ? 'md:col-span-2' : ''}`}
      style={{ perspective: '800px' }}
    >
      <div
        onClick={() => onSelect(service.name)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ease-out ${
          isFeatured
            ? 'min-h-[200px] md:min-h-[260px] p-6 md:p-8'
            : 'min-h-[180px] p-5 md:p-6'
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${tilt.active ? 'translateY(-6px)' : 'translateY(0)'}`,
          background: tilt.active
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FAFAF5 100%)'
            : '#FFFFFF',
          border: `1px solid ${tilt.active ? `${service.color}30` : 'var(--color-soft-border)'}`,
          boxShadow: tilt.active
            ? `0 20px 40px rgba(0,0,0,0.08), 0 0 20px ${service.color}15`
            : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      >
        {/* Background image overlay */}
        {service.image && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img
              src={service.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-8 transition-opacity duration-500 group-hover:opacity-15"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            {/* Dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-ivory/85 group-hover:from-white/90 group-hover:via-white/85 group-hover:to-ivory/80 transition-all duration-300" />
          </div>
        )}
        {/* Animated top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
          <div
            className="h-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
            style={{ background: `linear-gradient(90deg, ${service.color}80, ${service.color}, ${service.color}40)` }}
          />
        </div>

        {/* Floating glow orb */}
        <div
          className="absolute pointer-events-none rounded-full transition-all duration-200 ease-out"
          style={{
            width: '200px',
            height: '200px',
            top: '20%',
            right: '-40px',
            transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
            background: `radial-gradient(circle, ${service.color}08, transparent 70%)`,
            opacity: tilt.active ? 1 : 0,
          }}
        />

        {/* Corner icon watermark */}
        {Icon && (
          <div className={`absolute top-4 right-4 pointer-events-none z-[5] ${isFeatured ? 'h-14 w-14' : 'h-10 w-10'}`}>
            <Icon
              className={`h-full w-full transition-colors duration-500 ${tilt.active ? '' : ''}`}
              style={{ color: `${service.color}12`, transition: `color 0.5s` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between z-10">
          <div>
            {/* Badges */}
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory-dark/60 px-3 py-1 text-[10px] font-medium tracking-wide text-brown-warm">
                <Clock className="h-3 w-3" style={{ color: service.color }} />
                {service.duration}
              </span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide uppercase"
                style={{
                  background: `${service.color}12`,
                  color: service.color,
                  borderLeft: `2px solid ${service.color}`,
                }}
              >
                {service.category}
              </span>
            </div>

            {/* Service Name */}
            <h3 className={`font-dm-serif leading-snug text-espresso ${
              isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}>
              {service.name}
            </h3>

            {/* Description */}
            <p className={`mt-2 font-jost font-light leading-[1.75] text-brown-muted ${
              isFeatured ? 'text-sm md:text-base' : 'text-xs md:text-sm'
            }`}>
              {service.desc}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 pt-4">
            <span
              className="font-jost text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.22em]"
              style={{ color: service.color }}
            >
              Book This Service
            </span>
            <ChevronRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
              style={{ color: service.color }}
            />
          </div>
        </div>

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-2xl">
          <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
            <div className="w-[60%] h-full" style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.05), transparent)',
              transform: 'skewX(-15deg)',
            }} />
          </div>
        </div>

        {/* Featured ribbon */}
        {isFeatured && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 z-[5]">
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: service.color, color: '#FFFFFF' }}
            >
              <Star className="h-2.5 w-2.5" fill="currentColor" />
              Popular
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory)

  const activeIcon = activeCategory !== "All" ? categoryIcons[activeCategory] : null

  return (
    <>
    <section id="services" className="bg-sand py-20 md:py-28 relative overflow-hidden">
      {/* Subtle blue tint decorative overlay */}
      <div className="pointer-events-none absolute inset-0 blue-tint" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold text-shadow-gold">
            Our Services
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-luxury gold-gradient-text">
            Comprehensive Dental Care, Elevated
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Whether you need a routine cleaning or a full smile transformation, every treatment at Refresh Dental is delivered with meticulous precision, genuine care, and unwavering attention to your comfort.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex gap-2 overflow-x-auto scrollbar-hide px-4 -mx-4 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:mx-0 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat]
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:shrink hover:scale-[1.04] active:scale-[0.97] ${
                  isActive
                    ? "chrome-gold-bg text-white shadow-gold-strong"
                    : "bg-white/70 backdrop-blur-sm border border-soft-border text-brown-warm hover:bg-champagne-gold/10 hover:text-espresso hover:border-champagne-gold/30"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Category subtitle */}
        <AnimatePresence mode="wait">
          {activeCategory !== "All" && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm border border-soft-border px-4 py-2">
                {activeIcon && <activeIcon className="h-4 w-4 text-champagne-gold" />}
                <span className="font-jost text-xs font-medium text-brown-muted">
                  {filteredServices.length} {activeCategory} service{filteredServices.length !== 1 ? 's' : ''} available
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-5"
        >
          {filteredServices.map((service) => (
            <ServiceCard key={service.name} service={service} onSelect={setSelectedService} />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white overflow-hidden chrome-gold-bg shadow-gold-strong hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
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
              Not Sure Where to Start?
            </h3>
            <p className="font-jost text-sm text-brown-muted mb-6 leading-relaxed">
              Our team is here to guide you towards the right treatment for your unique needs and budget.
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
