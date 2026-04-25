'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageLightbox from './image-lightbox'

const galleryImages = [
  { src: '/images/clinic/dr-malunga-portrait.jpg', alt: 'Dr. Lebo Malunga — Refresh Dental', caption: 'Dr. Lebo Malunga', span: 'md:col-span-1 md:row-span-2', aspect: 'aspect-[3/4]' },
  { src: '/images/clinic/clinic-reception.jpg', alt: 'Refresh Dental clinic reception', caption: 'Welcome to Refresh Dental', span: 'md:col-span-1', aspect: 'aspect-[4/3]' },
  { src: '/images/clinic/beautiful-smile.jpg', alt: 'Professional dental care and beautiful smiles', caption: 'Your Smile, Our Passion', span: 'md:col-span-1', aspect: 'aspect-square' },
  { src: '/images/clinic/dental-technology.jpg', alt: 'Advanced dental technology', caption: 'Advanced Technology', span: 'md:col-span-1', aspect: 'aspect-[4/3]' },
  { src: '/images/clinic/dental-treatment-room.jpg', alt: 'Modern dental treatment room', caption: 'Modern Treatment Rooms', span: 'md:col-span-1', aspect: 'aspect-square' },
  { src: '/images/clinic/dental-team.jpg', alt: 'Refresh Dental team', caption: 'Experience Excellence', span: 'md:col-span-1 md:row-span-2', aspect: 'aspect-[3/4]' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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

  const lightboxImages = galleryImages.map((img) => ({ src: img.src, alt: img.alt }))

  return (
    <section className="bg-ivory py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Our Practice
          </span>
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Step Inside Refresh Dental
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Step inside our warm, modern practice — designed to make every visit feel like an escape, not an appointment.
          </p>
          {/* Photo count badge */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagne-gold/30 bg-champagne-gold/12 px-4 py-1.5 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <span className="text-sm" role="img" aria-hidden="true">📷</span>
            <span className="font-jost text-xs font-medium text-champagne-gold">
              {galleryImages.length} photos
            </span>
          </div>
        </div>

        {/* Gallery Grid Container */}
        <div className="relative overflow-hidden">
          {/* Decorative "Our Practice" watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-cormorant text-[clamp(6rem,15vw,14rem)] font-medium text-ivory/5 select-none -rotate-6 whitespace-nowrap">
              Our Practice
            </span>
          </div>

          {/* Masonry Grid (no parallax) */}
          <motion.div
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
                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-premium hover:shadow-elevated hover-lift transition-all duration-300 hover:-rotate-1 ${image.span}`}
                onClick={() => handleImageClick(idx)}
              >
                <div className={`relative h-full w-full ${image.aspect} overflow-hidden rounded-2xl`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Hover Overlay (CSS opacity transition) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-espresso/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-cormorant text-xl font-medium text-white md:text-2xl relative z-10">
                    {image.caption}
                  </p>
                  <span className="mt-2 h-[1px] w-8 bg-champagne-gold relative z-10" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Arrow Navigation Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/40 bg-transparent text-champagne-gold transition-all duration-200 hover:border-champagne-gold hover:bg-champagne-gold/10 hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-jost text-xs text-brown-muted/80">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-gold/40 bg-transparent text-champagne-gold transition-all duration-200 hover:border-champagne-gold hover:bg-champagne-gold/10 hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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
