'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, BadgeCheck, ArrowRight, MessageCircle } from 'lucide-react'

const testimonials = [
  {
    name: "Phillimon Utla",
    initials: "PU",
    avatarColor: "bg-sage-teal",
    rating: 5,
    text: "Had a great experience with Dr. Lebo! The team was super friendly and made me feel really comfortable. Dr. Lebo explained everything clearly and didn't rush through anything. The clinic was clean and modern, which I appreciated. Overall, a really positive visit — I'd definitely recommend them to anyone looking for a good dentist!",
  },
  {
    name: "Shaun Kleynhans",
    initials: "SK",
    avatarColor: "bg-champagne-gold",
    rating: 5,
    text: "Had my appointment with Dr Lebogang and she and her staff were truly amazing, was very thoughtful and explained everything in detail pertaining to my procedure. Her kindness and gentle way of carrying out her procedure was excellent. Definitely my go-to dentist from this day forward.",
  },
  {
    name: "Adaani Frost",
    initials: "AF",
    avatarColor: "bg-warm-blush",
    rating: 5,
    text: "Dr. Malunga made herself available for a dental emergency within minutes of our call. She was fast, efficient, courteous, her facility and staff were immaculate and professional. Refresh Dental is close to the airport... We recommend her and her facility highly.",
  },
]

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: 60,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Calculate active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const cardWidth = 350 + 24 // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(newIndex, testimonials.length - 1))
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', updateActiveIndex, { passive: true })
    return () => container.removeEventListener('scroll', updateActiveIndex)
  }, [updateActiveIndex])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current
      if (!container) return

      const nextIndex =
        activeIndex >= testimonials.length - 1 ? 0 : activeIndex + 1
      const cardWidth = 350 + 24
      container.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth',
      })
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, activeIndex])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth = 350 + 24
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  const scrollPrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1
    scrollToIndex(prev)
  }

  const scrollNext = () => {
    const next =
      activeIndex < testimonials.length - 1 ? activeIndex + 1 : 0
    scrollToIndex(next)
  }

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #EDF1F7 0%, #F0EBE1 30%, #F0EBE1 70%, #EDF1F7 100%)' }}>
      {/* Subtle decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.03] via-transparent to-champagne-gold/[0.02]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
              Patient Stories
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            What Our Patients Say
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Don&rsquo;t just take our word for it — hear directly from the patients whose lives we&rsquo;ve touched and smiles we&rsquo;ve transformed.
          </motion.p>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="mb-6 flex items-center justify-end gap-2">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-border bg-card text-sand-muted transition-all duration-200 hover:border-champagne-gold hover:text-champagne-gold hover:shadow-gold"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-border bg-card text-sand-muted transition-all duration-200 hover:border-champagne-gold hover:text-champagne-gold hover:shadow-gold"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Spacer for centering first card on large screens */}
          <div className="hidden shrink-0 md:block" style={{ width: 'calc((100vw - 1120px) / 2)' }} />

          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`relative w-[350px] shrink-0 snap-center overflow-hidden rounded-2xl bg-card shadow-premium shadow-inner-gold transition-all duration-400 hover-lift ${
                activeIndex === i
                  ? ""
                  : ""
              }`}
              style={
                activeIndex === i
                  ? {
                      boxShadow: '0 4px 24px rgba(15, 13, 10, 0.08), 0 1px 3px rgba(15, 13, 10, 0.06), 0 0 0 1px rgba(184, 152, 48, 0.06), inset 0 1px 0 rgba(184, 152, 48, 0.25), inset 0 -1px 0 rgba(15, 13, 10, 0.06), 0 8px 32px -4px rgba(184, 152, 48, 0.15)',
                    }
                  : {
                      boxShadow: '0 4px 24px rgba(15, 13, 10, 0.08), 0 1px 3px rgba(15, 13, 10, 0.06), 0 0 0 1px rgba(184, 152, 48, 0.06), inset 0 1px 0 rgba(184, 152, 48, 0.25), inset 0 -1px 0 rgba(15, 13, 10, 0.06)',
                    }
              }
              whileHover={{
                boxShadow: '0 4px 24px rgba(15, 13, 10, 0.08), 0 1px 3px rgba(15, 13, 10, 0.06), 0 0 0 1px rgba(184, 152, 48, 0.06), inset 0 1px 0 rgba(184, 152, 48, 0.25), inset 0 -1px 0 rgba(15, 13, 10, 0.06), 0 0 30px rgba(184, 152, 48, 0.2), 0 0 60px rgba(184, 152, 48, 0.08), 0 12px 40px rgba(15, 13, 10, 0.12)',
              }}
            >
              {/* Glass highlight shine at top */}
              <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-10" style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
              }} />

              {/* Gold gradient border on left side */}
              <div className="absolute top-0 left-0 bottom-0 w-[3px] z-20" style={{
                background: 'linear-gradient(180deg, #D4C08A 0%, #B89830 30%, #A07D1A 70%, #D4C08A 100%)',
              }} />

              {/* Gold gradient top accent line — animates width on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold origin-left z-30"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ scaleX: activeIndex === i ? 1 : undefined }}
              />

              {/* Large decorative quote mark with shimmer animation */}
              <motion.span
                className="absolute top-4 left-6 font-cormorant text-6xl leading-none select-none z-0"
                style={{
                  opacity: 0.15,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundImage: 'linear-gradient(90deg, #8B6914 0%, #B89830 15%, #E8D9A8 30%, #FFFFFF 45%, #E8D9A8 55%, #B89830 70%, #D4C08A 85%, #8B6914 100%)',
                  backgroundSize: '200% auto',
                }}
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                  opacity: [0.12, 0.22, 0.12],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  },
                }}
              >
                &ldquo;
              </motion.span>

              {/* Stars with subtle gold glow */}
              <div className="relative z-10 mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <motion.div
                    key={si}
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: [
                        'drop-shadow(0 0 2px rgba(184, 152, 48, 0.3))',
                        'drop-shadow(0 0 6px rgba(184, 152, 48, 0.5))',
                        'drop-shadow(0 0 2px rgba(184, 152, 48, 0.3))',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: si * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Star
                      className="h-5 w-5 fill-gold-pale text-gold-pale"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Review Text */}
              <p className="relative z-10 font-jost text-[15px] font-light italic leading-relaxed text-brown-muted">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Bottom: Avatar + Name + Badges */}
              <div className="relative z-10 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${t.avatarColor} text-white font-cormorant text-sm font-semibold shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <span className="font-jost text-sm font-medium text-espresso text-shadow-espresso">
                    {t.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Verified Patient badge */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-blue/10 px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3 text-accent-blue" strokeWidth={2.5} />
                    <span className="font-jost text-[9px] font-semibold uppercase tracking-wider text-accent-blue">
                      Verified
                    </span>
                  </span>
                  {/* Google Review badge with Google "G" icon */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage-teal/8 px-2.5 py-1">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-jost text-[10px] font-semibold uppercase tracking-wider text-sage-teal">
                      Google
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spacer for centering last card on large screens */}
          <div className="hidden shrink-0 md:block" style={{ width: 'calc((100vw - 1120px) / 2)' }} />
        </div>

        {/* Navigation Dots — premium chrome-gold active, glass-morphism inactive */}
        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`relative rounded-full transition-all duration-400 ${
                activeIndex === i
                  ? "w-8 h-3"
                  : "w-3 h-3 hover:w-4"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              style={
                activeIndex === i
                  ? {}
                  : {
                      background: 'rgba(250, 247, 242, 0.6)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(200, 187, 170, 0.4)',
                    }
              }
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full chrome-gold-bg shadow-gold"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <h3 className="font-cormorant text-2xl md:text-3xl font-light text-espresso mb-3">
            Ready to Transform Your Smile?
          </h3>
          <p className="font-jost text-sm text-brown-muted mb-6 max-w-md mx-auto leading-relaxed">
            Take the first step towards the smile you&apos;ve always dreamed of.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-champagne-gold to-gold-light text-espresso font-jost font-semibold text-sm tracking-wider uppercase rounded-full px-8 py-3.5 shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:scale-[1.03]"
            >
              Book Your Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/27614164649"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-sage-teal text-sage-teal font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-sage-teal hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
