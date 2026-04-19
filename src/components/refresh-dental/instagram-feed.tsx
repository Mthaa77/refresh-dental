'use client'

import { motion } from 'framer-motion'
import { Instagram, Heart, ZoomIn } from 'lucide-react'

const instagramImages = [
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Refresh Dental — Dr. Lebo Malunga',
    aspect: 'aspect-[3/4]',
    likes: 312,
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'Modern dental clinic interior',
    aspect: 'aspect-square',
    likes: 245,
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Beautiful smile transformation',
    aspect: 'aspect-[4/3]',
    likes: 489,
  },
  {
    src: '/images/dental-smile-hero.jpg',
    alt: 'Professional dental care',
    aspect: 'aspect-[3/4]',
    likes: 178,
  },
  {
    src: '/images/dental-clinic-interior.png',
    alt: 'State-of-the-art treatment rooms',
    aspect: 'aspect-square',
    likes: 356,
  },
  {
    src: '/images/dr-lebo-hero.png',
    alt: 'Your smile journey starts here',
    aspect: 'aspect-[4/3]',
    likes: 421,
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
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <motion.a
              key={idx}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative block overflow-hidden bg-white"
            >
              <div className={`relative w-full ${image.aspect} overflow-hidden`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-espresso/60 backdrop-blur-[2px]"
              >
                {/* Like counter with pulse animation */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="mb-3 flex items-center gap-1.5"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="inline-block"
                  >
                    <Heart className="h-4 w-4 fill-white text-white" />
                  </motion.span>
                  <span className="font-jost text-xs font-medium text-ivory">
                    {image.likes} likes
                  </span>
                </motion.div>

                {/* Icons row */}
                <div className="flex items-center gap-4">
                  <Instagram
                    className="text-white"
                    size={24}
                    strokeWidth={1.5}
                  />
                  <ZoomIn
                    className="text-white/70"
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button — with gradient gold border and glow */}
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
            {/* Animated gradient border effect via pseudo-approach: inner glow line */}
            <motion.span
              className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.3), rgba(232, 213, 176, 0.1), rgba(201, 169, 110, 0.3))',
                zIndex: -1,
              }}
              animate={undefined}
            />
            <Instagram size={16} strokeWidth={1.5} />
            Follow @refresh_dental
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
