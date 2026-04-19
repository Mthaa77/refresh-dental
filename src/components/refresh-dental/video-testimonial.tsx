'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, ArrowRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Phillimon U.',
    treatment: 'General Checkup',
    gradient: 'from-[#2A2218] to-[#0F0D0A]',
  },
  {
    name: 'Shaun K.',
    treatment: 'Cosmetic Treatment',
    gradient: 'from-[#1A2020] to-[#0F0D0A]',
  },
  {
    name: 'Adaani F.',
    treatment: 'Emergency Care',
    gradient: 'from-[#201A18] to-[#0F0D0A]',
  },
]

const floatingParticles = [
  { left: '8%', top: '15%', size: 4, duration: 6 },
  { left: '85%', top: '25%', size: 3, duration: 7 },
  { left: '50%', top: '70%', size: 5, duration: 5 },
  { left: '20%', top: '80%', size: 3, duration: 8 },
]

export default function VideoTestimonial() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="video-testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso py-20 md:py-28"
    >
      {/* Floating gold particles */}
      {floatingParticles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-champagne-gold/20 pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-champagne-gold text-sm font-jost tracking-[0.2em] uppercase mb-4"
          >
            Patient Stories
          </motion.span>
          <h2 className="font-cormorant text-3xl md:text-5xl text-ivory mb-4">
            Hear From Our{' '}
            <span className="gold-gradient-text">Patients</span>
          </h2>
          <p className="font-jost text-ivory/65 text-base md:text-lg max-w-lg mx-auto">
            Watch real stories from real patients
          </p>
        </motion.div>

        {/* Video cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.12,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group relative"
            >
              {/* Video card */}
              <div className={`relative bg-gradient-to-b ${item.gradient} rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer`}>
                {/* Cinematic dark overlay texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/30" />

                {/* Subtle vignette */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,21,16,0.5) 100%)',
                }} />

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    {/* Gold glow on hover */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-champagne-gold/20 blur-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-gold/80 bg-white/10 backdrop-blur-md"
                      whileHover={{
                        boxShadow: '0 0 30px rgba(184, 152, 48, 0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Play className="h-8 w-8 text-champagne-gold ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>

                  {/* Patient info */}
                  <div className="mt-6 text-center relative z-10">
                    <p className="font-dm-serif text-lg text-ivory/90">
                      {item.name}
                    </p>
                    <p className="font-jost text-sm text-champagne-gold/70 mt-1">
                      {item.treatment}
                    </p>
                  </div>
                </div>

                {/* Gold accent line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />

                {/* Star rating */}
                <div className="absolute top-4 right-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-champagne-gold"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-champagne-gold/60 font-jost text-champagne-gold text-sm tracking-wide hover:bg-champagne-gold hover:text-espresso transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Consultation
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
