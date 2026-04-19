'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ComparisonItem {
  title: string
  description: string
  beforeGradient: string
  afterGradient: string
  beforeOverlay: string
  afterOverlay: string
  beforeIcon: string
  afterIcon: string
}

const comparisons: ComparisonItem[] = [
  {
    title: 'Teeth Whitening',
    description: 'Professional-grade whitening for a radiant, confident smile',
    beforeGradient: 'from-stone-300 via-stone-400 to-amber-200/60',
    afterGradient: 'from-white via-amber-50 to-yellow-50',
    beforeOverlay: 'bg-stone-400/30',
    afterOverlay: 'bg-white/10',
    beforeIcon: '🦷',
    afterIcon: '✨',
  },
  {
    title: 'Dental Veneers',
    description: 'Flawless porcelain veneers for a perfect, natural look',
    beforeGradient: 'from-stone-200 via-warm-blush/40 to-stone-300',
    afterGradient: 'from-white via-pink-50/30 to-white',
    beforeOverlay: 'bg-stone-300/25',
    afterOverlay: 'bg-white/5',
    beforeIcon: '🦷',
    afterIcon: '💎',
  },
  {
    title: 'Complete Smile Makeover',
    description: 'Full-mouth transformation with comprehensive cosmetic care',
    beforeGradient: 'from-stone-300 via-stone-400/80 to-amber-100/40',
    afterGradient: 'from-white via-champagne-gold/5 to-yellow-50/60',
    beforeOverlay: 'bg-espresso/20',
    afterOverlay: 'bg-white/8',
    beforeIcon: '🦷',
    afterIcon: '🌟',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function ComparisonSlider({ item }: { item: ComparisonItem }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX)
    },
    [handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX)
    },
    [handleMove]
  )

  return (
    <div className="group overflow-hidden rounded-2xl border border-soft-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative h-64 w-full cursor-col-resize select-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After (Full Background) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.afterGradient}`}
        >
          <div
            className={`absolute inset-0 ${item.afterOverlay}`}
          />
          {/* After decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl opacity-80">{item.afterIcon}</span>
              <div className="mt-2 font-cormorant text-lg font-medium text-brown-warm/40">
                After
              </div>
            </div>
          </div>
          {/* Bright accent circles */}
          <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-champagne-gold/10" />
          <div className="absolute bottom-6 right-8 h-8 w-8 rounded-full bg-sage-teal/10" />
        </div>

        {/* Before (Clipped) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.beforeGradient}`}
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div
            className={`absolute inset-0 ${item.beforeOverlay}`}
          />
          {/* Before decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl opacity-60">{item.beforeIcon}</span>
              <div className="mt-2 font-cormorant text-lg font-medium text-espresso/30">
                Before
              </div>
            </div>
          </div>
          {/* Dark accent circles */}
          <div className="absolute top-6 left-6 h-12 w-12 rounded-full bg-espresso/8" />
          <div className="absolute bottom-4 left-10 h-6 w-6 rounded-full bg-stone-400/20" />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-champagne-gold shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Center knob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-champagne-gold shadow-lg">
            <div className="flex gap-[3px]">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                className="text-white"
              >
                <path
                  d="M6 2L2 6L6 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                className="text-white"
              >
                <path
                  d="M2 2L6 6L2 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Before / After Labels */}
        <div className="pointer-events-none absolute top-4 left-4 z-20 rounded-full bg-espresso/60 px-3 py-1 font-jost text-[10px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          Before
        </div>
        <div className="pointer-events-none absolute top-4 right-4 z-20 rounded-full bg-champagne-gold/80 px-3 py-1 font-jost text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          After
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5">
        <h3 className="font-dm-serif text-lg text-espresso mb-1">
          {item.title}
        </h3>
        <p className="font-jost text-xs font-light leading-relaxed text-brown-warm/60">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function BeforeAfterSection() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Transformations
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            See the Transformation
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            Real results from our cosmetic dental treatments. Drag the slider to
            see the difference.
          </p>
        </motion.div>

        {/* Comparisons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {comparisons.map((item) => (
            <motion.div key={item.title} variants={cardVariants}>
              <ComparisonSlider item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="font-jost text-sm text-brown-warm/70">
            Ready to transform your smile?
          </p>
        </motion.div>
      </div>
    </section>
  )
}
