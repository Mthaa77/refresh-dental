'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Star, Users, Award, Shield } from 'lucide-react'

const indicators = [
  {
    icon: Star,
    number: '5.0',
    numberSuffix: '★',
    title: '5.0 Star Rating',
    description: 'Rated 5.0/5 on Google Reviews — perfect scores across the board from our valued patients',
    accentText: 'text-champagne-gold',
    borderColor: 'border-champagne-gold/20',
    iconBg: 'bg-champagne-gold/20',
    iconColor: 'text-champagne-gold',
    stars: true,
    glowColor: 'rgba(184, 152, 48, 0.2)',
  },
  {
    icon: Users,
    number: '500',
    numberSuffix: '+',
    title: 'Happy Patients',
    description: 'And counting — join our growing family of patients who trust us with their smiles',
    accentText: 'text-sage-teal',
    borderColor: 'border-sage-teal/15',
    iconBg: 'bg-sage-teal/10',
    iconColor: 'text-sage-teal',
    stars: false,
    glowColor: 'rgba(45, 107, 92, 0.2)',
  },
  {
    icon: Award,
    number: '10',
    numberSuffix: '+',
    title: 'Years Experience',
    description: 'A decade of clinical excellence, continuously advancing the art and science of dentistry',
    accentText: 'text-champagne-gold',
    borderColor: 'border-accent-red/15',
    iconBg: 'bg-champagne-gold/20',
    iconColor: 'text-champagne-gold',
    stars: false,
    glowColor: 'rgba(166, 61, 64, 0.2)',
  },
  {
    icon: Shield,
    number: 'HPCSA',
    numberSuffix: '',
    title: 'Registered',
    description: 'Fully registered, compliant, and committed to the highest standards of professional care',
    accentText: 'text-sage-teal',
    borderColor: 'border-sage-teal/15',
    iconBg: 'bg-sage-teal/10',
    iconColor: 'text-sage-teal',
    stars: false,
    glowColor: 'rgba(45, 107, 92, 0.2)',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

function SpringNumber({ target, suffix, className }: { target: string; suffix: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
  const isNumeric = !isNaN(numericTarget)
  const isDecimal = target.includes('.')
  const numericValue = isNumeric ? numericTarget : 0

  const spring = useSpring(0, { stiffness: 60, damping: 18, mass: 1.2 })
  const motionVal = useMotionValue(0)

  const [displayValue, setDisplayValue] = useState(isNumeric ? '0' : target)

  // Sync spring to motion value and update display
  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (isDecimal) {
        setDisplayValue(v.toFixed(1))
      } else {
        setDisplayValue(Math.round(v).toString())
      }
    })
    return unsub
  }, [spring, isDecimal])

  // Start animation when in view
  useEffect(() => {
    if (isInView && isNumeric) {
      spring.set(numericValue)
    }
  }, [isInView, isNumeric, numericValue, spring])

  return (
    <span ref={ref} className={className}>
      {isNumeric ? displayValue : target}
      <span className="text-2xl md:text-3xl">{suffix}</span>
    </span>
  )
}

function TrustCard({ item }: { item: (typeof indicators)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)
    rotateX.set(-percentY * 8)
    rotateY.set(percentX * 8)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const Icon = item.icon

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 600,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
      className={`group relative rounded-2xl border ${item.borderColor} bg-white p-5 md:p-6 text-center transition-colors duration-300 shadow-premium hover-lift hover:shadow-gold`}
    >
      {/* Pulsing accent glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 0px ${item.glowColor}`,
            `0 0 20px ${item.glowColor}`,
            `0 0 0px ${item.glowColor}`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Icon with 3D effect and pulsing opacity */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
            <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>

      {/* Stars (only for rating) */}
      {item.stars && (
        <div className="flex items-center justify-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 text-champagne-gold fill-champagne-gold"
            />
          ))}
        </div>
      )}

      {/* Number with spring animation */}
      <SpringNumber
        target={item.number}
        suffix={item.numberSuffix}
        className={`font-cormorant text-4xl md:text-5xl font-medium mb-1 text-shadow-gold-strong ${item.accentText}`}
      />

      {/* Title */}
      <h3 className="font-dm-serif text-sm md:text-base text-espresso mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="font-jost text-xs font-light leading-relaxed text-brown-muted/90">
        {item.description}
      </p>
    </motion.div>
  )
}

export default function TrustIndicators() {
  return (
    <section className="bg-white border-t border-b border-soft-border py-16 md:py-20 relative overflow-hidden">
      {/* Subtle radial gradient background emanating from center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(184, 152, 48, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Trust & Credibility
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Trusted by Centurion Families
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-4"
          >
            When you choose Refresh Dental, you&rsquo;re choosing a practice built on trust, excellence, and a genuine passion for creating beautiful smiles.
          </motion.p>
          {/* "Our Promise" subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 font-cormorant text-base md:text-lg italic text-champagne-gold/60"
          >
            Our Promise
          </motion.p>
        </motion.div>

        {/* Gold line separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 md:mb-12 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent origin-center"
        />

        {/* Indicators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {indicators.map((item) => (
            <TrustCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
