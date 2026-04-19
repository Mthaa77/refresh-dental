'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'

interface PatientStory {
  name: string
  title: string
  description: string
  treatment: string
  duration: string
  result: string
  rating: number
  visual: 'before-after' | 'tooth' | 'family'
}

const stories: PatientStory[] = [
  {
    name: 'Sarah',
    title: "Sarah's Smile Makeover",
    description:
      'After years of hiding her smile, Sarah chose porcelain veneers and teeth whitening for a complete transformation.',
    treatment: 'Veneers + Whitening',
    duration: '6 weeks',
    result: 'Life-changing confidence',
    rating: 5,
    visual: 'before-after',
  },
  {
    name: 'James',
    title: "James's Dental Implant Journey",
    description:
      'James lost a tooth in an accident. Our implant team restored his smile in just 3 visits.',
    treatment: 'Dental Implant',
    duration: '3 months',
    result: 'Looks completely natural',
    rating: 5,
    visual: 'tooth',
  },
  {
    name: 'Mokoena',
    title: 'The Mokoena Family',
    description:
      'A family of four who switched to Refresh Dental for comprehensive care under one roof.',
    treatment: 'Family Checkups',
    duration: 'Ongoing',
    result: 'Best dental experience',
    rating: 5,
    visual: 'family',
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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

function StoryVisual({ type }: { type: PatientStory['visual'] }) {
  if (type === 'before-after') {
    return (
      <div className="flex gap-2">
        <div className="relative h-20 w-[72px] overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-500" />
          <div className="absolute bottom-0 left-0 right-0 bg-espresso/60 px-1.5 py-0.5">
            <span className="font-jost text-[9px] font-semibold uppercase tracking-wider text-ivory/90">
              Before
            </span>
          </div>
        </div>
        <div className="relative h-20 w-[72px] overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/40 via-white to-sage-teal/30" />
          <div className="absolute bottom-0 left-0 right-0 bg-sage-teal/60 px-1.5 py-0.5">
            <span className="font-jost text-[9px] font-semibold uppercase tracking-wider text-ivory/90">
              After
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'tooth') {
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg bg-gradient-to-br from-champagne-gold/10 to-sage-teal/10">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3D7D6E" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M20 8C17 8 14 10 14 14V30C14 30 13 36 16 38C17 39 18 38.5 19 37C20 35 21 32 24 32C27 32 28 35 29 37C30 38.5 31 39 32 38C35 36 34 30 34 30V14C34 10 31 8 28 8H20Z"
            fill="url(#toothGrad)"
            stroke="#C9A96E"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Sparkle */}
          <path
            d="M36 10L37 13L40 14L37 15L36 18L35 15L32 14L35 13L36 10Z"
            fill="#C9A96E"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    )
  }

  // family
  return (
    <div className="flex h-20 w-full items-end justify-center gap-1.5 rounded-lg bg-gradient-to-br from-sage-teal/10 to-champagne-gold/10 px-4 pb-3">
      <svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Adult 1 */}
        <circle cx="20" cy="12" r="5" fill="#3D7D6E" fillOpacity="0.4" />
        <path d="M12 36C12 28 16 24 20 24C24 24 28 28 28 36" fill="#3D7D6E" fillOpacity="0.3" />
        {/* Adult 2 */}
        <circle cx="60" cy="12" r="5" fill="#C9A96E" fillOpacity="0.5" />
        <path d="M52 36C52 28 56 24 60 24C64 24 68 28 68 36" fill="#C9A96E" fillOpacity="0.35" />
        {/* Child 1 */}
        <circle cx="34" cy="16" r="3.5" fill="#8FBFB5" fillOpacity="0.5" />
        <path d="M28 36C28 30 31 28 34 28C37 28 40 30 40 36" fill="#8FBFB5" fillOpacity="0.35" />
        {/* Child 2 */}
        <circle cx="46" cy="16" r="3.5" fill="#E8D5B0" fillOpacity="0.6" />
        <path d="M40 36C40 30 43 28 46 28C49 28 52 30 52 36" fill="#E8D5B0" fillOpacity="0.4" />
      </svg>
    </div>
  )
}

function StoryCard({
  story,
  index,
}: {
  story: PatientStory
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl bg-white p-6"
      animate={{
        y: isHovered ? -6 : 0,
        boxShadow: isHovered
          ? '0 20px 60px -12px rgba(201, 169, 110, 0.2)'
          : '0 4px 16px -4px rgba(0, 0, 0, 0.06)',
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Gold gradient top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Gold border glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: '1px',
          background:
            'linear-gradient(135deg, rgba(201,169,110,0.6) 0%, rgba(232,213,176,0.2) 50%, rgba(201,169,110,0.6) 100%)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Visual area */}
      <div className="mb-5">
        <StoryVisual type={story.visual} />
      </div>

      {/* Treatment badge */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-champagne-gold/15 px-3 py-1 font-jost text-[11px] font-semibold uppercase tracking-wider text-champagne-gold">
          {story.treatment}
        </span>
        <span className="inline-flex items-center rounded-full bg-sage-teal/15 px-3 py-1 font-jost text-[11px] font-semibold uppercase tracking-wider text-sage-teal">
          {story.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-dm-serif text-lg leading-snug text-espresso">
        {story.title}
      </h3>

      {/* Description */}
      <p className="mb-4 font-jost text-sm font-light leading-relaxed text-brown-warm/70">
        &ldquo;{story.description}&rdquo;
      </p>

      {/* Star rating + Result */}
      <div className="flex items-center justify-between border-t border-soft-border pt-4">
        <div>
          <span className="mb-1 block font-jost text-[10px] font-semibold uppercase tracking-wider text-sand-muted">
            Result
          </span>
          <span className="font-jost text-sm font-medium text-espresso">
            {story.result}
          </span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: story.rating }).map((_, si) => (
            <motion.div
              key={si}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.4,
                delay: si * 0.05,
                ease: 'easeInOut',
              }}
            >
              <Star
                className="h-4 w-4 fill-champagne-gold text-champagne-gold"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function PatientStories() {
  return (
    <section
      id="patient-stories"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: '#FDFAF6' }}
    >
      {/* Subtle gold diagonal lines pattern at 2% opacity */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(201, 169, 110, 0.02) 0px,
            rgba(201, 169, 110, 0.02) 1px,
            transparent 1px,
            transparent 28px
          )`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Real Transformations
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-espresso">
            Patient Success Stories
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm font-light leading-relaxed text-brown-warm/60">
            Real transformations, real smiles
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-px w-20 bg-champagne-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Story Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {stories.map((story, i) => (
            <StoryCard key={story.name} story={story} index={i} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-8 py-3.5 font-jost text-sm font-semibold tracking-wide text-espresso transition-colors duration-300 hover:bg-champagne-gold/90 hover:shadow-lg"
          >
            Read More Stories
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
