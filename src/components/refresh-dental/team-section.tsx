'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Sparkles, CircleDot, Linkedin, BadgeCheck } from 'lucide-react'

const teamMembers = [
  {
    name: 'Thandi Mokoena',
    role: 'Dental Hygienist',
    bio: 'With over a decade of experience in preventive care, Thandi transforms routine hygiene visits into deeply restorative experiences that patients actually look forward to.',
    initials: 'TM',
    color: 'bg-accent-blue',
    specialties: ['Preventive Care', 'Periodontal Therapy', 'Teeth Cleaning'],
    readTime: '3 min read',
  },
  {
    name: 'Sarah van der Merwe',
    role: 'Dental Assistant',
    bio: 'Sarah brings warmth and precision to every procedure, ensuring patients feel safe, informed, and genuinely cared for throughout their visit.',
    initials: 'SM',
    color: 'bg-warm-blush',
    specialties: ['Chairside Assistance', 'Infection Control', 'Patient Comfort'],
    readTime: '2 min read',
  },
  {
    name: 'David Nkosi',
    role: 'Practice Manager',
    bio: 'David goes above and beyond to make every interaction effortless — from scheduling to follow-ups, your comfort is always his priority.',
    initials: 'DN',
    color: 'bg-champagne-gold/80',
    specialties: ['Appointment Scheduling', 'Insurance Claims', 'Patient Relations'],
    readTime: '2 min read',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function GoldDiamond({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L12 6L6 12L0 6L6 0Z" fill="url(#goldDiamond)" />
      <defs>
        <linearGradient id="goldDiamond" x1="0" y1="0" x2="12" y2="12">
          <stop stopColor="#D4C08A" />
          <stop offset="0.5" stopColor="#B89830" />
          <stop offset="1" stopColor="#A07D1A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function TeamSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="team" className="bg-ivory py-20 md:py-28">
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
            Our Team
          </span>
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-luxury">
            The People Behind Your Smile
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12"
          >
            A dedicated team of professionals who share one mission — helping you achieve the smile you&rsquo;ve always dreamed of, in an environment that feels like home.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Dr. Lebo — Featured Card (spans 2 cols on desktop) */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredCard('dr-lebo')}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{
              y: -6,
              transition: { duration: 0.35 },
            }}
            animate={{
              boxShadow: hoveredCard === 'dr-lebo'
                ? ['0 20px 50px -12px rgba(184, 152, 48, 0.25)', '0 20px 60px -12px rgba(184, 152, 48, 0.40)', '0 20px 50px -12px rgba(184, 152, 48, 0.25)']
                : '0 4px 12px -2px rgba(0, 0, 0, 0.06)',
            }}
            transition={{ duration: 2, repeat: hoveredCard === 'dr-lebo' ? Infinity : 0, ease: 'easeInOut' }}
            className="group sm:col-span-2 rounded-2xl border border-soft-border bg-card overflow-hidden shadow-elevated shadow-inner-gold transition-colors duration-300 hover:border-champagne-gold/40"
          >
            {/* Animated gold accent line at top — expands 0→100% on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-rich via-champagne-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]" />
            </div>

            {/* Glass highlight shine at top */}
            <div
              className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.10) 40%, transparent 100%)',
                borderRadius: '1rem 1rem 0 0',
              }}
            />

            {/* Floating shine/glare sweep effect on hover */}
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none z-10 rounded-2xl">
              <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
                <div className="w-[60%] h-full" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), rgba(255,255,255,0.04), transparent)',
                  transform: 'skewX(-15deg)',
                }} />
              </div>
            </div>

            {/* Subtle gold glow pulse animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-[1] rounded-2xl"
              animate={{
                opacity: hoveredCard === 'dr-lebo' ? [0, 0.5, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: hoveredCard === 'dr-lebo' ? Infinity : 0,
                ease: 'easeInOut',
              }}
              style={{
                boxShadow: 'inset 0 0 40px rgba(184, 152, 48, 0.08)',
              }}
            />

            <div className="flex flex-col md:flex-row">
              {/* Portrait */}
              <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto flex-shrink-0">
                <img
                  src="/images/dr-lebo-hero.png"
                  alt="Dr. Lebogang Malunga — Principal Dentist at Refresh Dental"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-champagne-gold via-champagne-gold/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col justify-center p-6 md:p-8 blue-tint">
                {/* Gradient overlay on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-champagne-gold/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-champagne-gold">
                  Principal Dentist &amp; Founder
                  {/* Animated sparkle icon */}
                  <motion.span
                    animate={{
                      rotate: [0, 15, -15, 10, -10, 0],
                      scale: [1, 1.2, 1, 1.15, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-champagne-gold" />
                  </motion.span>
                </span>
                <h3 className="relative font-dm-serif text-xl md:text-2xl text-espresso text-shadow-espresso mb-1">
                  Dr. Lebogang Malunga
                </h3>

                {/* Decorative gold diamond between name and title */}
                <div className="relative flex items-center gap-2 mb-2">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-champagne-gold/40 to-transparent max-w-[60px]" />
                  <GoldDiamond className="w-2.5 h-2.5" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-champagne-gold/40 to-transparent max-w-[60px]" />
                </div>

                <span className="relative inline-block mb-2 font-jost text-xs font-medium text-sage-teal">
                  Lead Dentist
                </span>

                {/* Credential badges — glass effect + gold border */}
                <div className="relative flex items-center gap-2 mb-4">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-rich"
                    style={{
                      background: 'rgba(212, 192, 138, 0.15)',
                      border: '1px solid rgba(184, 152, 48, 0.25)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    BDS
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-rich"
                    style={{
                      background: 'rgba(212, 192, 138, 0.15)',
                      border: '1px solid rgba(184, 152, 48, 0.25)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    PDD
                  </span>
                </div>

                <p className="relative font-jost text-sm font-light leading-relaxed text-brown-muted mb-6">
                  Dr. Lebo doesn&apos;t just transform smiles — she transforms lives. With expertise
                  spanning cosmetic dentistry, dental implants, and facial aesthetics, she combines
                  clinical precision with genuine compassion. Every treatment plan is crafted
                  uniquely for you, because your smile deserves nothing less than extraordinary.
                </p>
                <div className="relative flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-teal/10">
                    <Shield className="h-4 w-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-xs font-medium text-brown-muted">
                    HPCSA Registered
                  </span>
                  {/* Verified badge — glass effect + gold border */}
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-1 ml-1 rounded-full px-2 py-0.5"
                    style={{
                      background: 'rgba(45, 107, 92, 0.10)',
                      border: '1px solid rgba(45, 107, 92, 0.25)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-sage-teal" />
                    <span className="font-jost text-[10px] font-semibold uppercase tracking-wider text-sage-teal">Verified</span>
                  </motion.span>
                </div>

                {/* LinkedIn icon — slides in from bottom on hover */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredCard === 'dr-lebo' ? 0 : 20,
                    opacity: hoveredCard === 'dr-lebo' ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-teal/10 transition-colors hover:bg-sage-teal/20">
                    <Linkedin className="h-4 w-4 text-sage-teal" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Team Member Cards */}
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(member.name)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.35 },
              }}
              animate={{
                boxShadow: hoveredCard === member.name
                  ? ['0 16px 40px -10px rgba(184, 152, 48, 0.20)', '0 16px 48px -10px rgba(184, 152, 48, 0.35)', '0 16px 40px -10px rgba(184, 152, 48, 0.20)']
                  : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
              }}
              transition={{ duration: 2, repeat: hoveredCard === member.name ? Infinity : 0, ease: 'easeInOut', delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-soft-border bg-card p-6 shadow-elevated shadow-inner-gold transition-colors duration-300 hover:border-champagne-gold/40"
            >
              {/* Animated gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-rich via-champagne-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]" />
              </div>

              {/* Glass highlight shine at top */}
              <div
                className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.10) 40%, transparent 100%)',
                  borderRadius: '1rem 1rem 0 0',
                }}
              />

              {/* Floating shine/glare sweep effect on hover */}
              <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none z-10 rounded-2xl">
                <div className="-translate-x-[120%] group-hover:translate-x-[400%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]">
                  <div className="w-[60%] h-full" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), rgba(255,255,255,0.04), transparent)',
                    transform: 'skewX(-15deg)',
                  }} />
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-champagne-gold/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-[15]">
                {/* Initials Avatar with animated gold ring on hover */}
                <div className="relative mb-5 flex items-center gap-4">
                  <div className="relative">
                    {/* Gold ring — pulses on hover */}
                    <div className="absolute -inset-1.5 rounded-full border-2 border-champagne-gold/0 transition-all duration-700 ease-out group-hover:border-champagne-gold/40 group-hover:scale-110" />
                    <div className="absolute -inset-3 rounded-full border border-champagne-gold/0 transition-all duration-1000 ease-out delay-100 group-hover:border-champagne-gold/15 group-hover:scale-115" />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full ${member.color} text-white font-cormorant text-xl font-semibold shadow-sm`}
                    >
                      {member.initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-dm-serif text-lg text-espresso text-shadow-espresso leading-snug">
                      {member.name}
                    </h3>
                    {/* Decorative gold diamond between name and title */}
                    <div className="flex items-center gap-2 my-0.5">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-champagne-gold/30 to-transparent max-w-[30px]" />
                      <GoldDiamond className="w-1.5 h-1.5" />
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-champagne-gold/30 to-transparent max-w-[30px]" />
                    </div>
                    <p className="font-jost text-xs font-medium uppercase tracking-wider text-champagne-gold">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="relative font-jost text-sm font-light leading-relaxed text-brown-muted">
                  {member.bio}
                </p>

                {/* Specialties — reveals on card hover with smooth max-height transition */}
                <div className="grid transition-all duration-500 ease-out group-hover:grid-rows-[1fr]" style={{ gridTemplateRows: '0fr' }}>
                  <div className="overflow-hidden">
                    <div className="mt-4 border-t border-soft-border pt-4">
                      <p className="mb-2 font-jost text-[10px] font-semibold uppercase tracking-[0.15em] text-champagne-gold">
                        Specialties
                      </p>
                      <ul className="space-y-1.5">
                        {member.specialties.map((specialty) => (
                          <li key={specialty} className="flex items-center gap-2">
                            <CircleDot className="h-2.5 w-2.5 flex-shrink-0 text-champagne-gold/60" />
                            <span className="font-jost text-xs text-brown-muted">
                              {specialty}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Gold accent line at bottom */}
                <div className="mt-5 h-[1px] w-10 bg-champagne-gold/40 transition-all duration-500 group-hover:w-full group-hover:bg-champagne-gold" />
              </div>

              {/* LinkedIn icon — slides in from bottom on hover */}
              <motion.div
                className="absolute bottom-3 right-3 z-[15]"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: hoveredCard === member.name ? 0 : 20,
                  opacity: hoveredCard === member.name ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  i === 0 ? 'bg-accent-blue/10 hover:bg-accent-blue/20' :
                  i === 1 ? 'bg-accent-red/10 hover:bg-accent-red/20' :
                  'bg-sage-teal/10 hover:bg-sage-teal/20'
                }`}>
                  <Linkedin className={`h-3.5 w-3.5 ${
                    i === 0 ? 'text-accent-blue' :
                    i === 1 ? 'text-accent-red' :
                    'text-sage-teal'
                  }`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-2 font-jost text-sm text-brown-muted shadow-gold rounded-full px-6 py-2.5 transition-all duration-300 hover:text-champagne-gold"
          >
            Interested in joining our team?
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
