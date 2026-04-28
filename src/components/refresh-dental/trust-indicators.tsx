'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Star, Users, Award, Shield } from 'lucide-react'

const indicators = [
  { icon: Star, number: '5.0', numberSuffix: '★', title: '5.0 Star Rating', description: 'Rated 5.0/5 on Google Reviews — perfect scores across the board from our valued patients', accentColor: '#B89830', glowColor: 'rgba(184, 152, 48, 0.12)', ringProgress: 100, stars: true },
  { icon: Users, number: '500', numberSuffix: '+', title: 'Happy Patients', description: 'And counting — join our growing family of patients who trust us with their smiles', accentColor: '#2D6B5C', glowColor: 'rgba(45, 107, 92, 0.12)', ringProgress: 78, stars: false },
  { icon: Award, number: '10', numberSuffix: '+', title: 'Years Experience', description: 'A decade of clinical excellence, continuously advancing the art and science of dentistry', accentColor: '#B89830', glowColor: 'rgba(184, 152, 48, 0.12)', ringProgress: 85, stars: false },
  { icon: Shield, number: 'HPCSA', numberSuffix: '', title: 'Registered', description: 'Fully registered, compliant, and committed to the highest standards of professional care', accentColor: '#2D6B5C', glowColor: 'rgba(45, 107, 92, 0.12)', ringProgress: 100, stars: false },
]

/* ── Animated Number Counter ── */
function AnimatedNumber({ target, suffix, className }: { target: string; suffix: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
  const isNumeric = !isNaN(numericTarget)
  const isDecimal = target.includes('.')
  const [displayValue, setDisplayValue] = useState(isNumeric ? '0' : target)

  useEffect(() => {
    const el = ref.current
    if (!el || !isNumeric) return
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          observer.disconnect()
          const duration = 1200
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = numericTarget * eased
            setDisplayValue(isDecimal ? current.toFixed(1) : Math.round(current).toString())
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isNumeric, isDecimal, numericTarget])

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
    </span>
  )
}

/* ── Animated SVG Ring Progress ── */
function RingProgress({ progress, color, size = 80, strokeWidth = 3 }: { progress: number; color: string; size?: number; strokeWidth?: number }) {
  const ref = useRef<SVGCircleElement>(null)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          observer.disconnect()
          const duration = 1500
          const startTime = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 4)
            setAnimatedProgress(progress * eased)
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [progress])

  return (
    <svg width={size} height={size} className="absolute -top-1 -right-1 pointer-events-none">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (animatedProgress / 100) * circumference}
        className="transition-all duration-100"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ opacity: 0.2 }}
      />
    </svg>
  )
}

/* ── 3D Tilt Card ── */
function TiltTrustCard({ item, index }: { item: (typeof indicators)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -12, y: x * 12 })
  }, [])

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const Icon = item.icon

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative animate-fade-in-up"
      style={{ animationDelay: `${0.15 + index * 0.1}s`, perspective: '800px' }}
    >
      <div
        className={`relative rounded-2xl border bg-white p-6 md:p-7 text-center transition-all duration-300 ease-out cursor-default ${
          isHovered ? 'border-champagne-gold/30 shadow-xl' : 'border-soft-border shadow-premium'
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-8px)' : 'translateY(0)'}`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.08), 0 0 30px ${item.glowColor}`
            : '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* Ring progress indicator */}
        <RingProgress progress={item.ringProgress} color={item.accentColor} size={90} strokeWidth={2.5} />

        {/* Floating glow orb — follows mouse via tilt */}
        <div
          className="absolute pointer-events-none transition-all duration-200 ease-out rounded-full"
          style={{
            width: '120px',
            height: '120px',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${tilt.y * 2}px), calc(-50% + ${tilt.x * 2}px))`,
            background: `radial-gradient(circle, ${item.glowColor}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Icon */}
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
          style={{
            background: `linear-gradient(135deg, ${item.accentColor}15, ${item.accentColor}08)`,
          }}
        >
          <Icon
            className="h-7 w-7 transition-colors duration-300"
            style={{ color: item.accentColor }}
            strokeWidth={1.5}
          />
        </div>

        {/* Stars */}
        {item.stars && (
          <div className="flex items-center justify-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 text-champagne-gold fill-champagne-gold" />
            ))}
          </div>
        )}

        {/* Animated number */}
        <AnimatedNumber
          target={item.number}
          suffix={item.numberSuffix}
          className={`font-cormorant text-4xl md:text-5xl font-medium mb-1`}
          style={item.stars ? { color: item.accentColor } : undefined}
        />

        <h3 className="font-dm-serif text-sm md:text-base text-espresso mb-1.5">{item.title}</h3>
        <p className="font-jost text-xs font-light leading-relaxed text-brown-muted/90">{item.description}</p>

        {/* Bottom accent line — expands on hover */}
        <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: isHovered ? '100%' : '0%',
              background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Main Section ── */
export default function TrustIndicators() {
  return (
    <section className="bg-white border-t border-b border-soft-border py-16 md:py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(184, 152, 48, 0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-14 text-center animate-fade-in-up">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Trust & Credibility
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl section-heading text-shadow-espresso gold-gradient-text">
            Trusted by Centurion Families
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            When you choose Refresh Dental, you&rsquo;re choosing a practice built on trust, excellence, and a genuine passion for creating beautiful smiles.
          </p>
          <p className="mt-2 font-cormorant text-base md:text-lg italic text-champagne-gold/60 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Our Promise
          </p>
        </div>

        {/* Gold line separator */}
        <div className="mb-10 md:mb-12 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent origin-center animate-scale-x-full" />

        {/* Indicators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {indicators.map((item, idx) => (
            <TiltTrustCard key={item.title} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
