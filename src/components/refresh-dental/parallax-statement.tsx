'use client'

import { useRef, useMemo } from 'react'
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
              'url("/images/dental-clinic-interior.png")',
          }}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-espresso/60" />

      {/* Vignette effect (darker edges) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15, 13, 10, 0.5) 100%)',
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Floating gold particles */}
        {useMemo(() => {
          const particles = [
            { left: '15%', top: '20%', size: 4, dur: 6, delay: 0, drift: [0, -15, 8, 0] },
            { left: '80%', top: '30%', size: 3, dur: 7, delay: 1, drift: [0, 10, -8, 0] },
            { left: '25%', top: '70%', size: 5, dur: 8, delay: 2, drift: [5, 0, -5, -12] },
            { left: '70%', top: '65%', size: 3, dur: 5, delay: 0.5, drift: [-6, -8, 6, 8] },
            { left: '50%', top: '15%', size: 4, dur: 9, delay: 3, drift: [8, 5, -8, -5] },
          ]
          return particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-champagne-gold/20 pointer-events-none"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{
                x: p.drift,
                y: p.drift,
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))
        }, [])}

        {/* Decorative quote mark with gold shimmer */}
        <motion.span
          className="relative mb-6 block font-cormorant text-7xl leading-none md:text-9xl"
          style={{ opacity: textOpacity }}
        >
          <span className="text-champagne-gold/30">&ldquo;</span>
          {/* Shimmer overlay */}
          <motion.span
            className="absolute inset-0 text-transparent"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232, 213, 176, 0.5), transparent)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            aria-hidden="true"
          >
            &ldquo;
          </motion.span>
        </motion.span>

        {/* Quote Text with double-line frame */}
        <div className="relative px-6 py-5 md:px-10 md:py-7 shadow-gold-strong rounded-xl">
          {/* Double border frame */}
          <div className="absolute inset-0 rounded-xl border border-champagne-gold/20 pointer-events-none" />
          <div className="absolute inset-[5px] rounded-lg border border-champagne-gold/10 pointer-events-none" />

          <blockquote className="relative font-cormorant text-3xl md:text-4xl lg:text-5xl font-light italic leading-snug text-ivory text-shadow-ivory md:leading-tight">
            <span className="block">One refreshed smile</span>
            <span className="block mt-1">at a time.</span>
          </blockquote>
        </div>

        {/* Gold Separator Line */}
        <motion.div
          className="mx-auto mt-8 h-px w-16 bg-champagne-gold"
          style={{ scaleX: lineScale }}
        />

        {/* Attribution with shimmer-text animated effect */}
        <p className="mt-6 font-jost text-sm font-light tracking-wide shimmer-text">
          — Dr. Lebogang Malunga
        </p>

        <p className="mt-4 font-jost text-xs tracking-wider text-ivory/65">
          Serving Centurion · Lyttelton Manor · Family Wellness Centre
        </p>

        {/* Animated sparkles in corners — gold, blue, red, gold for variety */}
        {[
          { left: '5%', top: '10%', size: 3, delay: 0, color: 'rgba(184, 152, 48, 0.6)' },
          { right: '6%', top: '8%', size: 4, delay: 0.8, color: 'rgba(59, 111, 160, 0.5)' },
          { left: '7%', bottom: '12%', size: 4, delay: 1.6, color: 'rgba(166, 61, 64, 0.4)' },
          { right: '8%', bottom: '10%', size: 3, delay: 2.4, color: 'rgba(184, 152, 48, 0.6)' },
        ].map((sparkle, i) => (
          <motion.div
            key={`corner-sparkle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              ...Object.fromEntries(Object.entries(sparkle).filter(([k]) => k !== 'delay' && k !== 'color')),
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
        ))}
      </motion.div>
    </section>
  )
}
