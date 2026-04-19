'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ComparisonItem {
  title: string
  description: string
  treatmentLink: string
  beforeGradient: string
  afterGradient: string
  beforeOverlay: string
  afterOverlay: string
  beforeIcon: string
  afterIcon: string
}

const procedureDetails: Record<string, string> = {
  'Teeth Whitening': 'In-office LED-accelerated whitening achieving up to 8 shades brighter in 60 minutes',
  'Dental Veneers': 'Custom-crafted porcelain shells bonded to correct chips, gaps, and discoloration permanently',
  'Complete Smile Makeover': 'Comprehensive multi-treatment plan combining veneers, whitening, and alignment correction',
}

const comparisons: ComparisonItem[] = [
  {
    title: 'Teeth Whitening',
    description: 'Professional-grade whitening for a radiant, confident smile',
    treatmentLink: '#services',
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
    treatmentLink: '#services',
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
    treatmentLink: '#services',
    beforeGradient: 'from-stone-300 via-stone-400/80 to-amber-100/40',
    afterGradient: 'from-white via-champagne-gold/5 to-yellow-50/60',
    beforeOverlay: 'bg-espresso/20',
    afterOverlay: 'bg-white/8',
    beforeIcon: '🦷',
    afterIcon: '🌟',
  },
]

// Deterministic floating particle positions per card
const cardParticles = [
  [
    { x: '20%', y: '25%', size: 5, delay: 0, duration: 3.5 },
    { x: '70%', y: '70%', size: 4, delay: 0.7, duration: 4.2 },
    { x: '45%', y: '15%', size: 3, delay: 1.4, duration: 3.8 },
  ],
  [
    { x: '75%', y: '20%', size: 4, delay: 0.3, duration: 4.0 },
    { x: '30%', y: '65%', size: 5, delay: 1.0, duration: 3.6 },
    { x: '55%', y: '80%', size: 3, delay: 1.8, duration: 4.5 },
  ],
  [
    { x: '25%', y: '75%', size: 5, delay: 0.5, duration: 3.9 },
    { x: '65%', y: '30%', size: 4, delay: 1.2, duration: 4.3 },
    { x: '40%', y: '50%', size: 3, delay: 0.9, duration: 3.7 },
  ],
]

const shimmerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: '200%',
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

const particleFloat = (p: { delay: number; duration: number }) => ({
  opacity: [0, 0.6, 0.2, 0.6, 0],
  scale: [0, 1, 0.5, 1, 0],
  y: [0, -10, -5, -15, -8],
  transition: {
    duration: p.duration,
    delay: p.delay,
    repeat: Infinity,
    repeatDelay: 2,
    ease: 'easeInOut',
  },
})

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

function ComparisonSlider({ item, cardIndex }: { item: ComparisonItem; cardIndex: number }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isHovered, setIsHovered] = useState(false)
  const [titleHovered, setTitleHovered] = useState(false)
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

  const particles = cardParticles[cardIndex] || cardParticles[0]

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-elevated hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gold gradient border on hover — rotates via framer-motion */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? [
                'linear-gradient(0deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
                'linear-gradient(90deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
                'linear-gradient(180deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
                'linear-gradient(270deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
                'linear-gradient(360deg, #B89830 0%, #D4C08A 50%, #B89830 100%)',
              ]
            : 'transparent',
        }}
        transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
        style={{
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Corner decorative gold dots */}
      <span className="absolute left-3 top-3 z-30 h-1.5 w-1.5 rounded-full bg-champagne-gold/60 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute right-3 top-3 z-30 h-1.5 w-1.5 rounded-full bg-champagne-gold/60 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-3 z-30 h-1.5 w-1.5 rounded-full bg-champagne-gold/60 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-3 right-3 z-30 h-1.5 w-1.5 rounded-full bg-champagne-gold/60 transition-opacity duration-300 group-hover:opacity-100" />

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
              <div className="mt-2 font-cormorant text-lg font-medium text-brown-muted/70">
                After
              </div>
            </div>
          </div>
          {/* Bright accent circles */}
          <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-champagne-gold/10" />
          <div className="absolute bottom-6 right-8 h-8 w-8 rounded-full bg-sage-teal/10" />

          {/* "After" watermark text */}
          <div className="pointer-events-none absolute bottom-3 right-4 z-10 font-cormorant text-6xl font-bold leading-none text-champagne-gold/[0.06]">
            After
          </div>

          {/* Gold shimmer sweep across After side */}
          <motion.div
            className="absolute inset-y-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-champagne-gold/[0.08] to-transparent pointer-events-none"
            variants={shimmerVariants}
            initial="hidden"
            animate="visible"
          />
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

          {/* "Before" watermark text */}
          <div className="pointer-events-none absolute bottom-3 left-4 z-10 font-cormorant text-6xl font-bold leading-none text-espresso/[0.05]">
            Before
          </div>
        </div>

        {/* Floating sparkle / tooth particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute z-20 rounded-full bg-champagne-gold/50"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={particleFloat(p)}
          />
        ))}

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-champagne-gold shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Center knob with animated glow ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              boxShadow: isHovered
                ? '0 0 0 6px rgba(184, 152, 48, 0.3), 0 0 20px rgba(184, 152, 48, 0.4)'
                : '0 0 0 3px rgba(184, 152, 48, 0.15), 0 0 12px rgba(184, 152, 48, 0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-champagne-gold shadow-lg">
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
          </motion.div>
        </div>

        {/* Animated step indicator dots — gold dots showing slider position */}
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
          {[0, 25, 50, 75, 100].map((pos, dotIdx) => {
            const isActive = Math.abs(sliderPosition - pos) < 15
            const isNear = Math.abs(sliderPosition - pos) < 30
            return (
              <motion.div
                key={dotIdx}
                className="rounded-full"
                animate={{
                  width: isActive ? 16 : 6,
                  height: isActive ? 6 : 6,
                  backgroundColor: isActive
                    ? '#B89830'
                    : isNear
                    ? 'rgba(184, 152, 48, 0.4)'
                    : 'rgba(184, 152, 48, 0.15)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )
          })}
        </div>

        {/* Before Label — premium typography */}
        <div className="pointer-events-none absolute top-4 left-4 z-20">
          <span className="rounded-full bg-espresso/70 px-3.5 py-1.5 font-dm-serif text-[11px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm border border-white/10">
            Before
          </span>
          <div className="mx-auto mt-1.5 h-px w-6 bg-gradient-to-r from-espresso/40 to-transparent" />
        </div>
        {/* After Label — premium typography */}
        <div className="pointer-events-none absolute top-4 right-4 z-20">
          <span className="rounded-full bg-champagne-gold/90 px-3.5 py-1.5 font-dm-serif text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm border border-champagne-gold-light/30">
            After
          </span>
          <div className="mx-auto mt-1.5 h-px w-6 bg-gradient-to-l from-champagne-gold/40 to-transparent" />
        </div>
      </div>

      {/* Card Footer with gold accent line */}
      <div className="relative">
        {/* Gold accent line at top of footer */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="p-5">
          {/* Card title with procedure details tooltip */}
          <div className="relative">
            <h3
              className="font-dm-serif text-lg text-espresso mb-1 cursor-default"
              onMouseEnter={() => setTitleHovered(true)}
              onMouseLeave={() => setTitleHovered(false)}
            >
              {item.title}
            </h3>
            {/* Tooltip — appears on hover over card title */}
            <motion.div
              className="absolute left-0 top-full z-50 mt-1 max-w-xs rounded-lg bg-espresso/90 px-3 py-2 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 4 }}
              animate={{
                opacity: titleHovered ? 1 : 0,
                y: titleHovered ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: titleHovered ? 'auto' : 'none' }}
            >
              <p className="font-jost text-[11px] leading-relaxed text-ivory/90">
                {procedureDetails[item.title] || item.description}
              </p>
              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-espresso/90" />
            </motion.div>
          </div>
          <p className="font-jost text-xs font-light leading-relaxed text-brown-muted/90">
            {item.description}
          </p>
          <motion.a
            href={item.treatmentLink}
            className="mt-3 inline-flex items-center gap-1.5 font-jost text-xs font-medium uppercase tracking-wider text-champagne-gold"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            View Treatment
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-champagne-gold">
              <path d="M3 6H9M9 6L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
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
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-muted">
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
          {comparisons.map((item, index) => (
            <motion.div key={item.title} variants={cardVariants}>
              <ComparisonSlider item={item} cardIndex={index} />
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
          <p className="font-jost text-sm text-brown-muted">
            Ready to transform your smile?
          </p>
        </motion.div>
      </div>
    </section>
  )
}
