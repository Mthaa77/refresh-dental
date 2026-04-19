'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Heart, MessageCircle, ZoomIn } from 'lucide-react'

const instagramImages = [
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Refresh Dental — Dr. Lebo Malunga',
    aspect: 'aspect-[3/4]',
    likes: 312,
    comments: 18,
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'Modern dental clinic interior',
    aspect: 'aspect-square',
    likes: 245,
    comments: 12,
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Beautiful smile transformation',
    aspect: 'aspect-[4/3]',
    likes: 489,
    comments: 34,
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Professional dental care',
    aspect: 'aspect-[3/4]',
    likes: 178,
    comments: 8,
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'State-of-the-art treatment rooms',
    aspect: 'aspect-square',
    likes: 356,
    comments: 22,
  },
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Your smile journey starts here',
    aspect: 'aspect-[4/3]',
    likes: 421,
    comments: 27,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const INSTAGRAM_URL = 'https://www.instagram.com/refresh_dental_'

export default function InstagramFeed() {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [heartPopups, setHeartPopups] = useState<Record<number, boolean>>({})

  const handleLike = (index: number) => {
    setLikedImages((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
    // Trigger heart popup animation
    setHeartPopups((prev) => ({ ...prev, [index]: true }))
    setTimeout(() => {
      setHeartPopups((prev) => ({ ...prev, [index]: false }))
    }, 800)
  }

  return (
    <section className="relative bg-sand py-20 md:py-28 overflow-hidden">
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Connect With Us
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Follow Us on Instagram
          </h2>
          {/* Gradient gold underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-3 h-[2px] w-24 origin-center bg-gradient-to-r from-transparent via-champagne-gold to-transparent"
          />
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="mt-4 inline-flex items-center gap-2 font-jost text-sm text-brown-warm/60 transition-colors duration-300 hover:text-champagne-gold"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
            @refresh_dental
          </motion.a>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-px bg-soft-border md:grid-cols-3"
        >
          {instagramImages.map((image, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative block overflow-hidden bg-white"
              onMouseEnter={() => {}}
            >
              <div className={`relative w-full ${image.aspect} overflow-hidden`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* "Latest Post" badge on first image */}
              {idx === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-3 left-3 z-10"
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-champagne-gold px-2.5 py-1 text-[10px] font-jost font-semibold uppercase tracking-wider text-white shadow-sm">
                    <motion.span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-white"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    Latest Post
                  </span>
                </motion.div>
              )}

              {/* Gold gradient border sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 60%, rgba(201, 169, 110, 0.6) 75%, rgba(232, 213, 176, 0.8) 80%, rgba(201, 169, 110, 0.6) 85%, transparent 100%)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '2px',
                    borderRadius: '0px',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>

              {/* Heart popup animation on click */}
              <AnimatePresence>
                {heartPopups[idx] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.4, opacity: 0, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
                  >
                    <Heart className="h-12 w-12 fill-red-500 text-red-500 drop-shadow-lg" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-[10] flex flex-col items-center justify-center bg-espresso/60 backdrop-blur-[2px]"
              >
                {/* Like and comment counters */}
                <div className="mb-4 flex items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-ivory" />
                    <span className="font-jost text-xs font-medium text-ivory">
                      {likedImages.has(idx) ? image.likes + 1 : image.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4 text-ivory" />
                    <span className="font-jost text-xs font-medium text-ivory">
                      {image.comments}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  {/* Like button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleLike(idx)
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${
                        likedImages.has(idx)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </motion.button>

                  {/* Instagram icon */}
                  <motion.a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.15 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    <Instagram className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </motion.a>

                  {/* Zoom icon */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    <ZoomIn className="h-5 w-5 text-white/70" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Clickable overlay for the link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-[8]"
                aria-label={`View ${image.alt} on Instagram`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              boxShadow: '0 8px 30px -4px rgba(201, 169, 110, 0.25)',
            }}
            transition={{ duration: 0.3 }}
            className="relative inline-flex items-center gap-2.5 rounded-full border border-champagne-gold/40 bg-white px-7 py-3 font-jost text-sm font-medium uppercase tracking-wider text-espresso transition-all duration-300 hover:border-champagne-gold hover:bg-champagne-gold/5"
          >
            <Instagram size={16} strokeWidth={1.5} />
            Follow @refresh_dental
          </motion.a>
        </motion.div>
      </div>

      {/* Subtle wave animation at bottom of section */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"
            fill="#FDFAF6"
            initial={{ d: 'M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z' }}
            animate={{
              d: [
                'M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z',
                'M0,50 C240,10 480,70 720,30 C960,10 1200,70 1440,30 L1440,100 L0,100 Z',
                'M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z',
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M0,60 C240,30 480,80 720,50 C960,30 1200,80 1440,50 L1440,100 L0,100 Z"
            fill="#FDFAF6"
            opacity="0.5"
            initial={{ d: 'M0,60 C240,30 480,80 720,50 C960,30 1200,80 1440,50 L1440,100 L0,100 Z' }}
            animate={{
              d: [
                'M0,60 C240,30 480,80 720,50 C960,30 1200,80 1440,50 L1440,100 L0,100 Z',
                'M0,45 C240,75 480,35 720,65 C960,75 1200,35 1440,65 L1440,100 L0,100 Z',
                'M0,60 C240,30 480,80 720,50 C960,30 1200,80 1440,50 L1440,100 L0,100 Z',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>
    </section>
  )
}
