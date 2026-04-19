'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'

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
    <section id="testimonials" className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Patient Stories
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            What Our Patients Say
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-warm/70 max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Don&rsquo;t just take our word for it — hear directly from the patients whose lives we&rsquo;ve touched and smiles we&rsquo;ve transformed.
          </motion.p>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="mb-6 flex items-center justify-end gap-2">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-border bg-white text-sand-muted transition-all duration-200 hover:border-champagne-gold hover:text-champagne-gold"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-border bg-white text-sand-muted transition-all duration-200 hover:border-champagne-gold hover:text-champagne-gold"
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
              className={`relative w-[350px] shrink-0 snap-center overflow-hidden rounded-2xl bg-white p-8 shadow-elevated transition-all duration-300 hover-lift ${
                activeIndex === i
                  ? "border-l-4 border-sage-teal shadow-md"
                  : "border-l-4 border-transparent hover:shadow-md"
              }`}
              style={
                activeIndex === i
                  ? { boxShadow: '0 8px 32px -4px rgba(201, 169, 110, 0.15)' }
                  : undefined
              }
            >
              {/* Gold gradient top accent line — animates width on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ scaleX: activeIndex === i ? 1 : undefined }}
              />

              {/* Large decorative quote mark */}
              <span className="absolute top-4 left-6 font-cormorant text-6xl leading-none text-champagne-gold select-none" style={{ opacity: 0.15 }}>
                &ldquo;
              </span>

              {/* Stars with pulse animation — bigger and more prominent */}
              <div className="relative z-10 mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <motion.div
                    key={si}
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: si * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Star
                      className="h-5 w-5 fill-champagne-gold text-champagne-gold"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Review Text */}
              <p className="relative z-10 font-jost text-[15px] font-light italic leading-relaxed text-brown-warm/80">
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
                  <span className="font-jost text-sm font-medium text-espresso">
                    {t.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Verified Patient badge */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-champagne-gold/8 px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3 text-sage-teal" strokeWidth={2.5} />
                    <span className="font-jost text-[9px] font-semibold uppercase tracking-wider text-sage-teal">
                      Verified
                    </span>
                  </span>
                  <span className="rounded-full bg-sage-teal/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sage-teal">
                    Google Review
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spacer for centering last card on large screens */}
          <div className="hidden shrink-0 md:block" style={{ width: 'calc((100vw - 1120px) / 2)' }} />
        </div>

        {/* Navigation Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-champagne-gold"
                  : "w-2.5 bg-soft-border hover:bg-champagne-gold/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
