'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Check } from 'lucide-react'

interface MedicalAid {
  name: string
  display: string
  short: string
  color: string
  colorLight: string
}

const medicalAids: MedicalAid[] = [
  { name: 'discovery', display: 'Discovery Health', short: 'Discovery', color: '#1A6DD4', colorLight: '#0A3D7C' },
  { name: 'momentum', display: 'Momentum Health', short: 'Momentum', color: '#E8384F', colorLight: '#B22234' },
  { name: 'bonitas', display: 'Bonitas', short: 'Bonitas', color: '#28A05B', colorLight: '#1B7A3D' },
  { name: 'medihelp', display: 'Medihelp', short: 'Medihelp', color: '#F5922A', colorLight: '#D4681A' },
  { name: 'fedhealth', display: 'Fedhealth', short: 'Fedhealth', color: '#E85D75', colorLight: '#C41E3A' },
  { name: 'gems', display: 'GEMS', short: 'GEMS', color: '#2A9D8F', colorLight: '#1A6B5C' },
  { name: 'bestmed', display: 'Bestmed', short: 'Bestmed', color: '#4A7BC8', colorLight: '#2E5090' },
  { name: 'bankmed', display: 'Bankmed', short: 'Bankmed', color: '#2C4270', colorLight: '#1B2A4A' },
  { name: 'netcare', display: 'Netcare', short: 'Netcare', color: '#1E4090', colorLight: '#0D2B5E' },
  { name: 'polmed', display: 'Polmed', short: 'Polmed', color: '#2E86C1', colorLight: '#1A5276' },
  { name: 'profmed', display: 'Profmed', short: 'Profmed', color: '#7B4FBA', colorLight: '#5B2D8E' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ── Premium Glass Badge Card ── */
function GlassBadge({ aid, index }: { aid: MedicalAid; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -6, y: x * 6 })
  }, [])

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: '600px' }}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onMouseLeave}
        className="group relative cursor-default rounded-xl p-5 md:p-6 text-center transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)'}`,
          background: isHovered
            ? `linear-gradient(135deg, ${aid.colorLight}18, ${aid.color}12, ${aid.colorLight}08)`
            : `linear-gradient(135deg, ${aid.colorLight}10, ${aid.color}08)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${isHovered ? aid.color + '40' : aid.color + '15'}`,
          boxShadow: isHovered
            ? `0 16px 32px rgba(0,0,0,0.1), 0 0 20px ${aid.color}10`
            : `0 2px 8px rgba(0,0,0,0.04)`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      >
        {/* Colored top accent bar */}
        <div className="absolute top-0 left-3 right-3 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: isHovered ? '100%' : '40%',
              background: `linear-gradient(90deg, transparent, ${aid.color}80, transparent)`,
            }}
          />
        </div>

        {/* Floating glow orb */}
        <div
          className="absolute pointer-events-none rounded-full transition-all duration-200"
          style={{
            width: '140px',
            height: '140px',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${tilt.y * 2}px), calc(-50% + ${tilt.x * 2}px))`,
            background: `radial-gradient(circle, ${aid.color}12, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Color icon dot */}
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: `${aid.color}12`,
            boxShadow: isHovered ? `0 0 12px ${aid.color}20` : 'none',
          }}
        >
          <div
            className="h-3.5 w-3.5 rounded-full transition-all duration-300"
            style={{
              background: aid.color,
              boxShadow: isHovered ? `0 0 8px ${aid.color}60` : 'none',
            }}
          />
        </div>

        {/* Provider name */}
        <span className="relative block font-jost text-sm font-bold tracking-wide text-espresso mb-2 transition-colors duration-300"
          style={{ color: isHovered ? aid.color : '#1A1714' }}
        >
          {aid.display}
        </span>

        {/* Verified tag — appears on hover */}
        <div className={`flex items-center justify-center gap-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
          <Check className="h-3 w-3" style={{ color: aid.color }} strokeWidth={3} />
          <span className="font-jost text-[10px] font-semibold uppercase tracking-wider" style={{ color: aid.color }}>
            In-network
          </span>
        </div>

        {/* "Most Popular" badge on Discovery */}
        {index === 0 && (
          <div className="absolute -top-1 -right-1 z-[5]">
            <div className="rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-white shadow-md"
              style={{ background: '#B89830' }}
            >
              Popular
            </div>
          </div>
        )}

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
          <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
            <div className="w-[50%] h-full" style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), rgba(255,255,255,0.05), transparent)',
              transform: 'skewX(-15deg)',
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function InsurancePartners() {
  return (
    <section id="insurance" className="relative overflow-hidden bg-white">
      {/* Gold gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            We Work With
          </span>
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight gold-gradient-text">
              Accepted Medical Aids
            </h2>
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border border-champagne-gold/30 bg-champagne-gold/5 px-3 py-1 font-jost text-[10px] font-semibold uppercase tracking-wider text-champagne-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Provider
            </motion.span>
          </div>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-muted">
            Making quality dental care accessible to everyone through partnerships with South Africa&apos;s leading medical aid providers.
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="mx-auto mb-14 h-px w-32"
          style={{ backgroundColor: '#B89830' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Background glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(184, 152, 48, 0.04) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Medical Aid Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-5"
        >
          {medicalAids.map((aid, index) => (
            <GlassBadge key={aid.name} aid={aid} index={index} />
          ))}
        </motion.div>

        {/* Bottom text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center space-y-5"
        >
          <p className="font-jost text-sm text-brown-muted/90">
            Don&apos;t see your medical aid? Contact us — we work with most providers and can verify your cover on the spot.
          </p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-champagne-gold bg-champagne-gold px-8 py-3 font-jost text-sm font-semibold text-espresso transition-all hover:bg-transparent hover:text-champagne-gold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Check Your Cover
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <span className="font-jost text-xs text-brown-muted/70 tracking-wider">
              And many more...
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E3DACA] to-transparent" />
    </section>
  )
}
