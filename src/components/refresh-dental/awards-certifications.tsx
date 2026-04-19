'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, BookOpen, Heart, ShieldCheck } from 'lucide-react'

interface Certification {
  title: string
  description: string
  icon: React.ElementType
  borderColor: string
}

const certifications: Certification[] = [
  {
    title: 'HPCSA Registered',
    description:
      'Registered with the Health Professions Council of South Africa',
    icon: Shield,
    borderColor: 'border-champagne-gold',
  },
  {
    title: 'SADJ Member',
    description:
      'Member of the South African Dental Association',
    icon: Award,
    borderColor: 'border-sage-teal',
  },
  {
    title: '10+ Years Experience',
    description: 'A decade of dedicated dental excellence',
    icon: Clock,
    borderColor: 'border-champagne-gold',
  },
  {
    title: 'Continuing Education',
    description:
      'Regular advanced training in latest dental techniques',
    icon: BookOpen,
    borderColor: 'border-sage-teal',
  },
  {
    title: 'Community Excellence',
    description:
      'Recognized for community dental health initiatives',
    icon: Heart,
    borderColor: 'border-champagne-gold',
  },
  {
    title: 'Infection Control Certified',
    description: 'Hospital-grade sterilization protocols',
    icon: ShieldCheck,
    borderColor: 'border-sage-teal',
  },
]

// Deterministic floating gold particle positions
const goldParticles = [
  { x: '12%', y: '18%', size: 4, delay: 0, duration: 6 },
  { x: '88%', y: '25%', size: 3, delay: 1.2, duration: 7 },
  { x: '25%', y: '72%', size: 5, delay: 0.8, duration: 5.5 },
  { x: '78%', y: '68%', size: 3, delay: 2.0, duration: 6.5 },
  { x: '45%', y: '12%', size: 4, delay: 1.6, duration: 7.5 },
  { x: '65%', y: '82%', size: 3, delay: 0.4, duration: 5 },
]

const particleDrift = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.4, 0.15, 0.35, 0],
    scale: [0, 1, 0.7, 1, 0],
    y: [0, -20, -10, -25, -15],
    x: [0, 5, -3, 8, 2],
    transition: {
      duration: goldParticles[i].duration,
      delay: goldParticles[i].delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeInOut',
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function CertificationCard({
  cert,
  index,
}: {
  cert: Certification
  index: number
}) {
  const IconComponent = cert.icon
  const isGoldBorder = cert.borderColor === 'border-champagne-gold'

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="group flex flex-col items-center gap-4 rounded-2xl bg-ivory/5 p-6 backdrop-blur-sm transition-colors duration-300 md:p-8"
      whileHover={{
        backgroundColor: 'rgba(253, 250, 246, 0.08)',
      }}
    >
      {/* Icon in circle with colored border */}
      <motion.div
        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${cert.borderColor} transition-all duration-300 group-hover:scale-110`}
        whileHover={{
          boxShadow: isGoldBorder
            ? '0 0 24px rgba(201, 169, 110, 0.3)'
            : '0 0 24px rgba(61, 125, 110, 0.25)',
        }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent
          className={`h-7 w-7 transition-colors duration-300 ${
            isGoldBorder ? 'text-champagne-gold' : 'text-sage-teal'
          }`}
        />
      </motion.div>

      {/* Title */}
      <h3 className="font-dm-serif text-center text-base leading-snug text-ivory">
        {cert.title}
      </h3>

      {/* Description */}
      <p className="text-center font-jost text-sm font-light leading-relaxed text-ivory/50">
        {cert.description}
      </p>
    </motion.div>
  )
}

export default function AwardsCertifications() {
  return (
    <section
      id="awards"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: '#1A1510' }}
    >
      {/* Floating gold particles */}
      {goldParticles.map((p, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleDrift}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: '#C9A96E',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Subtle radial gradient glow in center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px]"
        style={{
          background:
            'radial-gradient(circle, rgba(201, 169, 110, 0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Recognized Excellence
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-medium leading-tight gold-gradient-text">
            Awards &amp; Recognition
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm font-light leading-relaxed text-ivory/50">
            Excellence recognized by industry leaders
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-px w-20 bg-champagne-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Certification Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
