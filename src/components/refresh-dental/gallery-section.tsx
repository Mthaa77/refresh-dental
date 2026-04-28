'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  Pause,
  Play,
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
   CAROUSEL HOOK
   ───────────────────────────────────────────── */

function useCarousel(totalItems: number, autoPlayInterval = 5000) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goTo = useCallback((index: number, dir?: 'left' | 'right') => {
    if (isTransitioning) return
    setDirection(dir ?? (index > current ? 'right' : 'left'))
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [current, isTransitioning])

  const goNext = useCallback(() => {
    goTo((current + 1) % totalItems, 'right')
  }, [current, totalItems, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + totalItems) % totalItems, 'left')
  }, [current, totalItems, goTo])

  // Auto-play
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(goNext, autoPlayInterval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, goNext, autoPlayInterval])

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  }

  const togglePlay = () => setIsPlaying(p => !p)

  // Progress
  const progress = ((current + 1) / totalItems) * 100

  return {
    current,
    direction,
    isTransitioning,
    isPlaying,
    progress,
    goNext,
    goPrev,
    goTo,
    togglePlay,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
  }
}

/* ─────────────────────────────────────────────
   CAROUSEL SLIDE
   ───────────────────────────────────────────── */

function CarouselSlide({
  image,
  index,
  isActive,
  direction,
}: {
  image: GalleryImage
  index: number
  isActive: boolean
  direction: 'left' | 'right'
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className={`absolute inset-0 transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isActive
          ? 'opacity-100 scale-100 z-10'
          : `opacity-0 ${direction === 'right' ? 'scale-105 translate-x-[5%]' : 'scale-105 translate-x-[-5%]'} z-0`
      }`}
      aria-hidden={!isActive}
    >
      {/* Image with Ken Burns zoom */}
      <div className={`relative w-full h-full transition-transform duration-[8000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}>
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={index < 2 ? 'eager' : 'lazy'}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-espresso animate-pulse" />
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-espresso/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-espresso/40" />

      {/* Content — slides up on active */}
      <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 transition-all duration-700 delay-100 ${
        isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}>
        {/* Category pill */}
        <div className={`transition-all duration-500 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-champagne-gold/15 border border-champagne-gold/25 px-4 py-1.5 backdrop-blur-md mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne-gold animate-pulse" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.15em] text-champagne-gold">
              {image.category}
            </span>
          </span>
        </div>

        <h3 className={`font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-xl transition-all duration-500 delay-100 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {image.caption}
        </h3>

        <p className={`font-jost text-sm md:text-base text-white/60 leading-relaxed max-w-lg mt-3 transition-all duration-500 delay-200 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {image.description}
        </p>

        {/* Gold line */}
        <div className={`mt-5 h-[1px] w-20 bg-gradient-to-r from-champagne-gold to-champagne-gold/0 transition-all duration-700 delay-300 ${
          isActive ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'
        }`} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FILMSTRIP
   ───────────────────────────────────────────── */

function Filmstrip({
  images,
  current,
  onSelect,
}: {
  images: GalleryImage[]
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1 md:gap-2.5">
      {images.map((img, idx) => (
        <button
          key={img.src}
          onClick={() => onSelect(idx)}
          className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
            idx === current
              ? 'w-16 h-12 md:w-20 md:h-14 ring-2 ring-champagne-gold ring-offset-1 ring-offset-espresso opacity-100 scale-105'
              : 'w-12 h-9 md:w-16 md:h-11 opacity-40 hover:opacity-70 hover:scale-105'
          }`}
          aria-label={`View ${img.caption}`}
        >
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          {idx === current && (
            <div className="absolute inset-0 bg-champagne-gold/10" />
          )}
        </button>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   CINEMATIC LIGHTBOX WITH FILMSTRIP
   ───────────────────────────────────────────── */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onGoTo: (idx: number) => void
}) {
  const current = images[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex flex-col" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso/95 backdrop-blur-xl" onClick={onClose} />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne-gold/15 border border-champagne-gold/25 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne-gold" />
            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.15em] text-champagne-gold">
              {current?.category}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-jost text-sm text-white/50">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 px-4 sm:px-8 min-h-0">
        {/* Prev button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/15 hover:text-white sm:left-6"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/15 hover:text-white sm:right-6"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image */}
        <div
          className="relative flex-shrink-0 max-h-[50vh] lg:max-h-[70vh] max-w-[90vw] lg:max-w-[600px] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current?.src}
            alt={current?.alt}
            className="w-full h-full object-cover"
          />
          {/* Bottom gradient for caption on mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-espresso/80 to-transparent lg:hidden" />
          <div className="absolute bottom-3 left-4 right-4 lg:hidden">
            <p className="font-cormorant text-xl text-white font-semibold">{current?.caption}</p>
          </div>
        </div>

        {/* Info panel — desktop only */}
        <div className="hidden lg:flex flex-col items-start max-w-sm px-4">
          <h3 className="font-cormorant text-3xl font-semibold text-white mb-2">
            {current?.caption}
          </h3>
          <p className="font-jost text-sm text-white/60 leading-relaxed mb-6">
            {current?.description}
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-champagne-gold to-transparent mb-4" />

          {/* Expand CTA */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-champagne-gold/30 bg-champagne-gold/10 px-5 py-2.5 font-jost text-xs font-semibold text-champagne-gold uppercase tracking-wider hover:bg-champagne-gold/20 transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Close Gallery
          </button>
        </div>
      </div>

      {/* Filmstrip at bottom */}
      <div className="relative z-20 flex-shrink-0 px-6 pb-6 pt-3">
        <div className="max-w-2xl mx-auto">
          <Filmstrip images={images} current={currentIndex} onSelect={onGoTo} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN GALLERY SECTION
   ───────────────────────────────────────────── */

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const {
    current,
    direction,
    isPlaying,
    progress,
    goNext,
    goPrev,
    goTo,
    togglePlay,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
  } = useCarousel(filteredImages.length, 5500)

  // Reset carousel when category changes
  useEffect(() => {
    goTo(0, 'right')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxPrev = () => {
    setLightboxIndex((prev) => prev === 0 ? filteredImages.length - 1 : prev - 1)
  }
  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }

  return (
    <section
      id="gallery"
      className="relative bg-espresso py-24 md:py-32 overflow-hidden"
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
                Our Practice
              </span>
              <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-gold">
                Inside Refresh Dental
              </h2>
              <p className="font-jost text-base md:text-lg text-ivory/50 max-w-xl leading-relaxed mt-4">
                A glimpse into the care, precision, and warmth that define every moment at our Centurion practice.
              </p>
            </div>

            {/* Controls cluster */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 px-4 py-2">
                <Maximize2 className="h-3.5 w-3.5 text-champagne-gold" />
                <span className="font-jost text-xs font-medium text-ivory/60">
                  {filteredImages.length} photos
                </span>
              </div>
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/60 transition-all hover:bg-white/15 hover:text-ivory"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => openLightbox(current)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/60 transition-all hover:bg-white/15 hover:text-ivory"
                aria-label="Open fullscreen gallery"
              >
                <Expand className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="mb-8 flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:justify-center">
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
        </div>

        {/* ── Main Carousel ── */}
        <div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group/carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Practice gallery"
        >
          {/* Slides */}
          {filteredImages.map((image, idx) => (
            <CarouselSlide
              key={image.src}
              image={image}
              index={idx}
              isActive={idx === current}
              direction={direction}
            />
          ))}

          {/* Progress bar — thin gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-champagne-gold to-gold-light transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide counter — left */}
          <div className="absolute bottom-4 left-4 z-20 md:bottom-6 md:left-6">
            <div className="rounded-full bg-espresso/60 backdrop-blur-md border border-white/10 px-4 py-2">
              <span className="font-jost text-sm text-white/70 tabular-nums">
                <span className="text-white font-semibold">{String(current + 1).padStart(2, '0')}</span>
                <span className="mx-1 text-white/30">/</span>
                <span>{String(filteredImages.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>

          {/* Expand button — right */}
          <button
            onClick={() => openLightbox(current)}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-espresso/60 backdrop-blur-md border border-white/10 px-4 py-2 text-white/70 hover:text-white hover:bg-espresso/80 transition-all md:bottom-6 md:right-6"
            aria-label="View fullscreen"
          >
            <Expand className="h-3.5 w-3.5" />
            <span className="font-jost text-xs font-medium hidden sm:inline">Fullscreen</span>
          </button>

          {/* Nav arrows — appear on hover */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/15 hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/50 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/15 hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Click to expand */}
          <button
            onClick={() => openLightbox(current)}
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label="Open lightbox"
          />
        </div>

        {/* ── Filmstrip thumbnails ── */}
        <div className="mt-5">
          <Filmstrip
            images={filteredImages}
            current={current}
            onSelect={goTo}
          />
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {filteredImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? 'w-8 h-2 bg-champagne-gold'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current ? 'true' : undefined}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
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
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
          onGoTo={setLightboxIndex}
        />
      )}
    </section>
  )
}
