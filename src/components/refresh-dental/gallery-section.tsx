'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
  Maximize2,
  Aperture,
  Users,
  Sparkles,
  Stethoscope,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

type GalleryCategory = 'all' | 'team' | 'treatment' | 'patient'

interface GalleryImage {
  src: string
  alt: string
  caption: string
  description: string
  category: Exclude<GalleryCategory, 'all'>
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/clinic/real/dr-malunga-graduation.jpg',
    alt: 'Dr. Lebogang Malunga graduating from Sefako Makgatho Health Sciences University',
    caption: 'Dr. Lebogang Malunga',
    description: 'BDS, PDD — Sefako Makgatho Health Sciences University',
    category: 'team',
  },
  {
    src: '/images/clinic/real/dr-malunga-procedure.jpg',
    alt: 'Dr. Malunga performing a precise dental procedure',
    caption: 'Clinical Excellence',
    description: 'Advanced restorative procedures delivered with meticulous precision',
    category: 'treatment',
  },
  {
    src: '/images/clinic/real/child-patient-experience.jpg',
    alt: 'Creating positive dental experiences for young patients',
    caption: 'Caring for Young Smiles',
    description: 'Gentle, compassionate care designed for our youngest patients',
    category: 'patient',
  },
  {
    src: '/images/clinic/real/patient-happy-moment.jpg',
    alt: 'Building lasting relationships through compassionate care',
    caption: 'Your Comfort Matters',
    description: 'Every visit is an opportunity to build trust and confidence',
    category: 'patient',
  },
  {
    src: '/images/clinic/real/dental-professional-portrait.jpg',
    alt: 'Our dedicated dental professionals',
    caption: 'Expert Care Team',
    description: 'Skilled professionals committed to your healthiest smile',
    category: 'team',
  },
  {
    src: '/images/clinic/real/dentist-performing-procedure.jpg',
    alt: 'Modern dental procedures with cutting-edge technology',
    caption: 'Modern Procedures',
    description: 'State-of-the-art techniques for superior clinical outcomes',
    category: 'treatment',
  },
  {
    src: '/images/clinic/real/treatment-closeup.jpg',
    alt: 'Precision dentistry with attention to detail',
    caption: 'Precision Dentistry',
    description: 'Unwavering attention to detail in every procedure',
    category: 'treatment',
  },
  {
    src: '/images/clinic/real/orthodontics-braces.jpg',
    alt: 'Custom orthodontic treatments at Refresh Dental',
    caption: 'Orthodontic Solutions',
    description: 'Bespoke orthodontic treatments for a perfectly aligned smile',
    category: 'treatment',
  },
]

const categoryTabs: { key: GalleryCategory; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All', icon: Aperture },
  { key: 'team', label: 'Our Team', icon: Users },
  { key: 'treatment', label: 'Treatments', icon: Stethoscope },
  { key: 'patient', label: 'Patient Care', icon: Sparkles },
]

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: { duration: 0.3 },
  },
}

/* ─────────────────────────────────────────────
   GALLERY CARD
   ───────────────────────────────────────────── */

const spanClasses = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  '',
  'md:row-span-2',
  '',
  '',
  '',
]

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage
  index: number
  onClick: () => void
}) {
  const isLarge = index === 0 || index === 4

  return (
    <motion.div
      layout
      variants={cardVariants}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative h-full w-full min-h-[260px] md:min-h-[300px] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
          decoding="async"
        />

        {/* Dark gradient overlay — always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />

        {/* Full dark overlay on hover */}
        <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Gold border reveal on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-champagne-gold/40 transition-all duration-500" />

        {/* Expand icon — top right */}
        <div className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75">
          <Expand className="h-4 w-4 text-white" />
        </div>

        {/* Category tag — top left */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne-gold/20 border border-champagne-gold/30 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne-gold" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90">
              {image.category}
            </span>
          </span>
        </div>

        {/* Bottom content — caption + description */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
          <div className="transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-white leading-tight">
              {image.caption}
            </h3>
            <p className="mt-1.5 font-jost text-sm text-white/60 leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {image.description}
            </p>
          </div>

          {/* Gold divider line */}
          <div className="mt-3 h-[1px] w-0 bg-gradient-to-r from-champagne-gold to-champagne-gold/0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   CINEMATIC LIGHTBOX
   ───────────────────────────────────────────── */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const current = images[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white hover:border-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 transition-all duration-300 hover:bg-white/15 hover:text-white sm:left-8"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 transition-all duration-300 hover:bg-white/15 hover:text-white sm:right-8"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Image + Info */}
      <div
        className="relative z-10 flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-12 max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: -40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <img
              src={current?.src}
              alt={current?.alt}
              className="max-h-[70vh] max-w-[85vw] rounded-2xl object-cover shadow-2xl lg:max-h-[75vh] lg:max-w-[500px]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Info Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + '-info'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden lg:block max-w-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne-gold/15 border border-champagne-gold/25 px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne-gold" />
              <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.15em] text-champagne-gold">
                {current?.category}
              </span>
            </span>
            <h3 className="font-cormorant text-3xl font-semibold text-white mb-2">
              {current?.caption}
            </h3>
            <p className="font-jost text-sm text-white/60 leading-relaxed mb-6">
              {current?.description}
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-r from-champagne-gold to-transparent mb-4" />
            <p className="font-jost text-xs text-white/30 tracking-wide">
              {currentIndex + 1} / {images.length}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 lg:hidden">
        <div className="rounded-full bg-white/10 border border-white/10 px-5 py-2 backdrop-blur-sm">
          <span className="font-jost text-sm text-white/70">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN GALLERY SECTION
   ───────────────────────────────────────────── */

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
  }

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!lightboxOpen) return
    if (e.key === 'Escape') setLightboxOpen(false)
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <section
      id="gallery"
      className="relative bg-espresso py-24 md:py-32 overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/95 to-espresso" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold"
              >
                Our Practice
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-gold"
              >
                Inside Refresh Dental
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-jost text-base md:text-lg text-ivory/50 max-w-xl leading-relaxed mt-4"
              >
                A glimpse into the care, precision, and warmth that define every moment at our Centurion practice.
              </motion.p>
            </div>

            {/* View all badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0 hidden md:flex items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 px-4 py-2"
            >
              <Maximize2 className="h-3.5 w-3.5 text-champagne-gold" />
              <span className="font-jost text-xs font-medium text-ivory/60">
                {galleryImages.length} photos
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mb-10 flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:justify-center"
        >
          {categoryTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeCategory === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  isActive
                    ? 'bg-champagne-gold text-espresso shadow-gold'
                    : 'border border-white/10 text-ivory/50 hover:border-champagne-gold/30 hover:text-ivory/80 bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* ── Gallery Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            viewport={{ once: true, margin: '-60px' }}
            className="grid auto-rows-[280px] grid-cols-1 gap-4 md:auto-rows-[300px] md:grid-cols-3 md:gap-5"
          >
            {filteredImages.map((image, idx) => (
              <GalleryCard
                key={image.src}
                image={image}
                index={idx}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="font-jost text-sm text-ivory/40 mb-5">
            Want to see the practice in person?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold/40 px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-[0.12em] text-champagne-gold transition-all duration-300 hover:bg-champagne-gold hover:text-espresso hover:border-champagne-gold hover:shadow-gold"
          >
            Book a Visit
            <Expand className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
