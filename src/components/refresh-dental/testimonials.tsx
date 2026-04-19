'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: "Phillimon Utla",
    rating: 5,
    text: "Had a great experience with Dr. Lebo! The team was super friendly and made me feel really comfortable. Dr. Lebo explained everything clearly and didn't rush through anything. The clinic was clean and modern, which I appreciated. Overall, a really positive visit — I'd definitely recommend them to anyone looking for a good dentist!",
  },
  {
    name: "Shaun Kleynhans",
    rating: 5,
    text: "Had my appointment with Dr Lebogang and she and her staff were truly amazing, was very thoughtful and explained everything in detail pertaining to my procedure. Her kindness and gentle way of carrying out her procedure was excellent. Definitely my go-to dentist from this day forward.",
  },
  {
    name: "Adaani Frost",
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
    <section id="testimonials" className="bg-ivory py-20 md:py-28">
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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-espresso">
            What Our Patients Say
          </h2>
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
              className={`w-[350px] shrink-0 snap-center rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 ${
                activeIndex === i
                  ? "border-l-4 border-sage-teal shadow-md"
                  : "border-l-4 border-transparent hover:shadow-md"
              }`}
            >
              {/* Stars */}
              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-champagne-gold text-champagne-gold"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-jost text-sm font-light italic leading-relaxed text-brown-warm/80">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Bottom: Name + Badge */}
              <div className="mt-6 flex items-center justify-between">
                <span className="font-jost text-sm font-medium text-espresso">
                  {t.name}
                </span>
                <span className="rounded-full bg-sage-teal/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sage-teal">
                  Google Review
                </span>
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
