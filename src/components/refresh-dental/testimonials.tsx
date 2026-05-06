'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ArrowRight,
  MessageCircle,
  Quote,
  Sparkles,
} from 'lucide-react'

/* ========================================
   TESTIMONIAL DATA
   ======================================== */

const testimonials = [
  {
    name: 'Phillimon Utla',
    initials: 'PU',
    avatarSrc: '/images/clinic/team/thandi-mokoena-hygienist.jpg',
    avatarColor: 'from-sage-teal to-teal-light',
    rating: 5,
    date: '2 months ago',
    treatment: 'General Checkup',
    text: 'Had a great experience with Dr. Lebo! The team was super friendly and made me feel really comfortable. Dr. Lebo explained everything clearly and didn\'t rush through anything. The clinic was clean and modern, which I appreciated. Overall, a really positive visit — I\'d definitely recommend them to anyone looking for a good dentist!',
    highlight: 'explained everything clearly and didn\'t rush through anything',
    useImage: true,
  },
  {
    name: 'Shaun Kleynhans',
    initials: 'SK',
    avatarSrc: '/images/clinic/team/sarah-dental-assistant.jpg',
    avatarColor: 'from-champagne-gold to-gold-light',
    rating: 5,
    date: '3 weeks ago',
    treatment: 'Cosmetic Treatment',
    text: 'Had my appointment with Dr Lebogang and she and her staff were truly amazing, was very thoughtful and explained everything in detail pertaining to my procedure. Her kindness and gentle way of carrying out her procedure was excellent. Definitely my go-to dentist from this day forward.',
    highlight: 'kindness and gentle way of carrying out her procedure was excellent',
    useImage: true,
  },
  {
    name: 'Adaani Frost',
    initials: 'AF',
    avatarSrc: '/images/clinic/team/staff-collaboration.jpg',
    avatarColor: 'from-warm-blush to-gold-pale',
    rating: 5,
    date: '1 week ago',
    treatment: 'Emergency Care',
    text: 'Dr. Malunga made herself available for a dental emergency within minutes of our call. She was fast, efficient, courteous, her facility and staff were immaculate and professional. Refresh Dental is close to the airport... We recommend her and her facility highly.',
    highlight: 'made herself available for a dental emergency within minutes',
    useImage: true,
  },
]

/* ========================================
   ANIMATION VARIANTS
   ======================================== */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ========================================
   TESTIMONIAL CARD COMPONENT
   ======================================== */

function TestimonialCard({
  testimonial,
  index,
  isActive,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
  isActive: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardReveal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-card p-7 sm:p-8"
        animate={{
          boxShadow: isHovered
            ? '0 12px 40px rgba(15,13,10,0.12), 0 0 0 1px rgba(184,152,48,0.15)'
            : isActive
              ? '0 8px 32px rgba(15,13,10,0.08), 0 0 0 1px rgba(184,152,48,0.1)'
              : '0 4px 20px rgba(15,13,10,0.06), 0 0 0 1px rgba(184,152,48,0.05)',
          y: isHovered ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated gold border on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl z-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(201,169,110,0.5) 0%, rgba(232,213,176,0.15) 40%, rgba(201,169,110,0.5) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Glass highlight at top */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)',
          }}
        />

        {/* Left gold accent bar */}
        <div
          className="absolute top-6 left-0 bottom-6 w-[3px] rounded-full z-20"
          style={{
            background:
              'linear-gradient(180deg, #D4C08A 0%, #B89830 30%, #A07D1A 70%, #D4C08A 100%)',
            opacity: isActive ? 1 : 0.5,
            transition: 'opacity 0.4s',
          }}
        />

        {/* Top: Stars + Quote icon */}
        <div className="relative z-10 flex items-start justify-between mb-5">
          {/* Quote icon */}
          <div className="relative">
            <Quote
              className="w-8 h-8 text-champagne-gold/20"
              strokeWidth={1}
            />
          </div>

          {/* Star rating — static */}
          <div className="flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, si) => (
              <Star key={si} className="w-4 h-4 fill-gold-pale text-gold-pale" />
            ))}
          </div>
        </div>

        {/* Review text with highlighted portion */}
        <div className="relative z-10 mb-6">
          <p className="font-jost text-[15px] font-light leading-[1.8] text-brown-muted">
            {testimonial.text.split(testimonial.highlight).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="relative inline">
                    <span className="font-medium text-espresso relative z-10">
                      {testimonial.highlight}
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne-gold/30 via-champagne-gold/50 to-champagne-gold/30 rounded-full" />
                  </span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>

        {/* Bottom: Author info + Badges */}
        <div className="relative z-10 flex items-center justify-between border-t border-soft-border/60 pt-5">
          <div className="flex items-center gap-3.5">
            {/* Avatar with real photo */}
            <img
              src={testimonial.avatarSrc}
              alt={testimonial.name}
              className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-ivory"
            />
            <div>
              <span className="font-jost text-sm font-semibold text-espresso tracking-wide block">
                {testimonial.name}
              </span>
              <span className="font-jost text-xs text-brown-muted/70 tracking-wide">
                {testimonial.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Treatment badge */}
            <span className="hidden sm:inline-flex items-center rounded-full bg-champagne-gold/10 border border-champagne-gold/20 px-3 py-1">
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.12em] text-champagne-gold">
                {testimonial.treatment}
              </span>
            </span>

            {/* Verified badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-teal/8 border border-sage-teal/15 px-2.5 py-1">
              <BadgeCheck className="h-3.5 w-3.5 text-sage-teal" strokeWidth={2.5} />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-wider text-sage-teal">
                Verified
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ========================================
   GOOGLE RATING PILL
   ======================================== */

function GoogleRatingPill() {
  return (
    <motion.div
      variants={fadeSlideUp}
      className="inline-flex items-center gap-3 rounded-full bg-espresso/90 backdrop-blur-md px-5 py-2.5 shadow-elevated"
      style={{ border: '1px solid rgba(184,152,48,0.15)' }}
    >
      {/* Google G logo */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="w-3.5 h-3.5 fill-champagne-gold text-champagne-gold" />
        ))}
      </div>
      <span className="font-cormorant text-xl font-semibold text-champagne-gold leading-none">
        5.0
      </span>
      <span className="w-px h-4 bg-ivory/20" />
      <span className="font-jost text-[11px] text-ivory/60 tracking-wide">
        Google Reviews
      </span>
    </motion.div>
  )
}

/* ========================================
   MAIN TESTIMONIALS SECTION
   ======================================== */

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const scrollToIndex = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background: 'linear-gradient(180deg, #F0EBE1 0%, #E8E1D5 40%, #EDE8DE 60%, #F0EBE1 100%)',
      }}
    >
      {/* Subtle diagonal line pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(184, 152, 48, 0.015) 0px,
            rgba(184, 152, 48, 0.015) 1px,
            transparent 1px,
            transparent 32px
          )`,
        }}
      />

      {/* Top edge gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, #F0EBE1 0%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ HEADER ============ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16 md:mb-20"
        >
          {/* Eyebrow label */}
          <motion.div variants={fadeSlideUp} className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              variants={lineExpand}
              className="h-[1px] w-12 bg-gradient-to-r from-transparent to-champagne-gold/50 origin-right"
            />
            <span className="font-jost text-xs font-semibold tracking-[0.25em] text-champagne-gold uppercase">
              Testimonials
            </span>
            <motion.div
              variants={lineExpand}
              className="h-[1px] w-12 bg-gradient-to-l from-transparent to-champagne-gold/50 origin-left"
            />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            variants={fadeSlideUp}
            className="font-cormorant font-light text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.08] tracking-tight text-espresso mb-5"
          >
            Voices of{' '}
            <span className="gold-gradient-text text-shadow-gold">
              Trust
            </span>
            <span className="text-espresso"> &amp; Satisfaction</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeSlideUp}
            className="font-jost text-base md:text-lg text-brown-muted/80 max-w-2xl mx-auto leading-relaxed"
          >
            These are the unfiltered words of real patients — each one a
            reflection of the standard, transparency, and results that define
            every visit to Refresh Dental.
          </motion.p>

          {/* Google Rating Pill */}
          <motion.div variants={fadeSlideUp} className="mt-8 flex justify-center">
            <GoogleRatingPill />
          </motion.div>
        </motion.div>

        {/* ============ TESTIMONIAL CARDS GRID ============ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
        </motion.div>

        {/* ============ CAROUSEL NAVIGATION ============ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14"
        >
          {/* Dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`relative rounded-full transition-all duration-500 ${
                  activeIndex === i ? 'w-10 h-3' : 'w-3 h-3 hover:w-5'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                style={
                  activeIndex !== i
                    ? {
                        background: 'rgba(250, 247, 242, 0.6)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(200, 187, 170, 0.4)',
                      }
                    : {}
                }
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="activeTestimonialDot"
                    className="absolute inset-0 rounded-full chrome-gold-bg shadow-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveIndex(
                  activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/80 bg-card/80 backdrop-blur-sm text-sand-muted transition-all duration-300 hover:border-champagne-gold hover:text-champagne-gold hover:shadow-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setActiveIndex(
                  activeIndex < testimonials.length - 1 ? activeIndex + 1 : 0
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/80 bg-card/80 backdrop-blur-sm text-sand-muted transition-all duration-300 hover:border-champagne-gold hover:text-champagne-gold hover:shadow-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* ============ CTA SECTION ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-20 text-center"
        >
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 1.2 }}
              className="h-[1px] w-16 bg-gradient-to-r from-transparent to-champagne-gold/40 origin-right"
            />
            <Sparkles className="w-4 h-4 text-champagne-gold/40" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 1.2 }}
              className="h-[1px] w-16 bg-gradient-to-l from-transparent to-champagne-gold/40 origin-left"
            />
          </div>

          <h3 className="font-cormorant text-2xl md:text-3xl font-light text-espresso mb-3 leading-tight">
            Ready to Write Your Own{' '}
            <span className="gold-gradient-text">Success Story</span>?
          </h3>
          <p className="font-jost text-sm md:text-base text-brown-muted/70 mb-8 max-w-lg mx-auto leading-relaxed">
            Take the first step towards the smile you&apos;ve always dreamed of.
            Your journey to confidence starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-champagne-gold to-gold-light text-espresso font-jost font-semibold text-sm tracking-[0.12em] uppercase rounded-full px-9 py-4 shadow-gold overflow-hidden group transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(184,152,48,0.35)]"
            >
              <span className="relative z-10">Book Your Consultation</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="https://wa.me/27614164649"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border-2 border-sage-teal/50 text-sage-teal font-jost font-medium text-sm tracking-[0.1em] uppercase rounded-full px-8 py-4 transition-all duration-300 hover:border-sage-teal hover:bg-sage-teal hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom edge gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(0deg, #F0EBE1 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
