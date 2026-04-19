'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageLightbox from './image-lightbox'

const galleryImages = [
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Dr. Lebo Malunga — Refresh Dental',
    caption: 'Dr. Lebo Malunga',
    span: 'md:col-span-1 md:row-span-2',
    aspect: 'aspect-[3/4]',
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'Refresh Dental clinic interior',
    caption: 'Welcome to Refresh Dental',
    span: 'md:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Professional dental care and beautiful smiles',
    caption: 'Your Smile, Our Passion',
    span: 'md:col-span-1',
    aspect: 'aspect-square',
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Advanced dental technology',
    caption: 'Advanced Technology',
    span: 'md:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'Modern dental treatment room',
    caption: 'Modern Treatment Rooms',
    span: 'md:col-span-1',
    aspect: 'aspect-square',
  },
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Refresh Dental team',
    caption: 'Experience Excellence',
    span: 'md:col-span-1 md:row-span-2',
    aspect: 'aspect-[3/4]',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  })

  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
    setLightboxOpen(true)
  }

  const lightboxImages = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
  }))

  return (
    <section className="bg-ivory py-20 md:py-28 overflow-hidden">
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
            Our Practice
          </span>
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Step Inside Refresh Dental
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-warm/70 max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            Step inside our warm, modern practice — designed to make every visit feel like an escape, not an appointment.
          </motion.p>
          {/* Photo count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagne-gold/30 bg-champagne-gold/5 px-4 py-1.5"
          >
            <span className="text-sm" role="img" aria-hidden="true">📷</span>
            <span className="font-jost text-xs font-medium text-champagne-gold">
              {galleryImages.length} photos
            </span>
          </motion.div>
        </motion.div>

        {/* Gallery Grid Container with parallax */}
        <div className="relative overflow-hidden">
          {/* Decorative "Our Practice" watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-cormorant text-[clamp(6rem,15vw,14rem)] font-medium text-ivory/5 select-none -rotate-6 whitespace-nowrap">
              Our Practice
            </span>
          </div>

          {/* Masonry Grid with parallax */}
          <motion.div
            ref={gridRef}
            style={{ y: gridY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-3 md:gap-5 relative z-10"
          >
            {galleryImages.map((image, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-premium hover:shadow-elevated hover-lift transition-shadow duration-300 ${image.span}`}
                onClick={() => handleImageClick(idx)}
                whileHover={{ rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div
                  className={`relative h-full w-full ${image.aspect} overflow-hidden rounded-2xl`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
                    loading="lazy"
                  />
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-espresso/50 backdrop-blur-[2px]"
                >
                  {/* Grain texture overlay on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-30 mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '128px 128px',
                    }}
                  />
                  <motion.p
                    initial={{ y: 12, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="font-cormorant text-xl font-medium text-white md:text-2xl relative z-10"
                  >
                    {image.caption}
                  </motion.p>
                  <motion.span
                    initial={{ y: 8, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.12 }}
                    className="mt-2 h-[1px] w-8 bg-champagne-gold relative z-10"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow Navigation Buttons - appear on hover over grid area */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center opacity-0 transition-opacity duration-300 group-hover/area:opacity-100" style={{ opacity: undefined }}>
            {/* We use a wrapper approach instead */}
          </div>
        </div>

        {/* Arrow Navigation Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/40 bg-transparent text-champagne-gold transition-colors duration-300 hover:border-champagne-gold hover:bg-champagne-gold/10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <span className="font-jost text-xs text-brown-warm/50">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/40 bg-transparent text-champagne-gold transition-colors duration-300 hover:border-champagne-gold hover:bg-champagne-gold/10"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
