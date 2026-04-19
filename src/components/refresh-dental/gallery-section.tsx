'use client'

import { motion } from 'framer-motion'

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
  return (
    <section className="bg-ivory py-20 md:py-28">
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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Step Inside Refresh Dental
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            Discover our warm, modern clinic where cutting-edge technology meets
            compassionate care. Every detail has been designed with your comfort in
            mind.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-3 md:gap-5"
        >
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm ${image.span}`}
            >
              <div
                className={`relative h-full w-full ${image.aspect} overflow-hidden rounded-2xl`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
                <motion.p
                  initial={{ y: 12, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="font-cormorant text-xl font-medium text-white md:text-2xl"
                >
                  {image.caption}
                </motion.p>
                <motion.span
                  initial={{ y: 8, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="mt-2 h-[1px] w-8 bg-champagne-gold"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
