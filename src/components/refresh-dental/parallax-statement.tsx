'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxStatement() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])
  const lineScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] overflow-hidden bg-espresso py-24"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://static.wixstatic.com/media/a78f12_7fc7c9e18d7f40a2800bafc5b7912798~mv2.jpeg")',
          }}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-espresso/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Decorative quote mark */}
        <motion.span
          className="mb-6 block font-cormorant text-6xl leading-none text-champagne-gold/30 md:text-8xl"
          style={{ opacity: textOpacity }}
        >
          &ldquo;
        </motion.span>

        {/* Quote Text */}
        <blockquote className="font-cormorant text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-snug text-ivory md:leading-tight">
          <span className="block">One refreshed smile</span>
          <span className="block mt-1">at a time.</span>
        </blockquote>

        {/* Gold Separator Line */}
        <motion.div
          className="mx-auto mt-8 h-px w-16 bg-champagne-gold"
          style={{ scaleX: lineScale }}
        />

        {/* Attribution */}
        <p className="mt-6 font-jost text-sm font-light tracking-wide text-ivory/80">
          — Dr. Lebogang Malunga
        </p>

        {/* Location */}
        <p className="mt-4 font-jost text-xs tracking-wider text-ivory/50">
          Serving Centurion · Lyttelton Manor · Family Wellness Centre
        </p>
      </motion.div>
    </section>
  )
}
