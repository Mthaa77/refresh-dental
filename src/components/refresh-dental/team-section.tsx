'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Sparkles, CircleDot, Linkedin, BadgeCheck } from 'lucide-react'

const teamMembers = [
  {
    name: 'Thandi Mokoena',
    role: 'Dental Hygienist',
    bio: 'Specializing in preventive care and oral health education',
    initials: 'TM',
    color: 'bg-sage-teal',
    specialties: ['Preventive Care', 'Periodontal Therapy', 'Teeth Cleaning'],
    readTime: '3 min read',
  },
  {
    name: 'Sarah van der Merwe',
    role: 'Dental Assistant',
    bio: 'Certified dental assistant with 8 years of experience',
    initials: 'SM',
    color: 'bg-warm-blush',
    specialties: ['Chairside Assistance', 'Infection Control', 'Patient Comfort'],
    readTime: '2 min read',
  },
  {
    name: 'David Nkosi',
    role: 'Practice Manager',
    bio: 'Ensuring a seamless and welcoming patient experience',
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
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            The People Behind Your Smile
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jost text-sm leading-relaxed text-brown-warm/70">
            A dedicated team of professionals committed to delivering
            exceptional dental care with warmth and expertise.
          </p>
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
                ? ['0 20px 50px -12px rgba(201, 169, 110, 0.25)', '0 20px 60px -12px rgba(201, 169, 110, 0.40)', '0 20px 50px -12px rgba(201, 169, 110, 0.25)']
                : '0 4px 12px -2px rgba(0, 0, 0, 0.06)',
            }}
            transition={{ duration: 2, repeat: hoveredCard === 'dr-lebo' ? Infinity : 0, ease: 'easeInOut' }}
            className="group sm:col-span-2 rounded-2xl border border-soft-border bg-white overflow-hidden transition-colors duration-300 hover:border-champagne-gold/40"
          >
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
              <div className="relative flex flex-1 flex-col justify-center p-6 md:p-8">
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
                <h3 className="relative font-dm-serif text-xl md:text-2xl text-espresso mb-1">
                  Dr. Lebogang Malunga
                </h3>
                <span className="relative inline-block mb-2 font-jost text-xs font-medium text-sage-teal">
                  Lead Dentist
                </span>
                <p className="relative font-jost text-xs text-brown-warm/60 mb-4">
                  BDS, PDD
                </p>
                <p className="relative font-jost text-sm font-light leading-relaxed text-brown-warm/70 mb-6">
                  Dr. Lebo is passionate about delivering exceptional dental care
                  with a gentle, patient-first approach. With expertise spanning
                  cosmetic dentistry, dental implants, and facial aesthetics, she
                  is committed to helping every patient achieve their best smile.
                </p>
                <div className="relative flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-teal/10">
                    <Shield className="h-4 w-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-xs font-medium text-brown-warm/70">
                    HPCSA Registered
                  </span>
                  {/* Verified badge with animated check */}
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-1 ml-1 rounded-full bg-sage-teal/10 px-2 py-0.5"
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
                transition: { duration: 0.35 },
              }}
              animate={{
                boxShadow: hoveredCard === member.name
                  ? ['0 16px 40px -10px rgba(201, 169, 110, 0.20)', '0 16px 48px -10px rgba(201, 169, 110, 0.35)', '0 16px 40px -10px rgba(201, 169, 110, 0.20)']
                  : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
              }}
              transition={{ duration: 2, repeat: hoveredCard === member.name ? Infinity : 0, ease: 'easeInOut', delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-soft-border bg-white p-6 transition-colors duration-300 hover:border-champagne-gold/40"
            >
              {/* Gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-champagne-gold/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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
                  <h3 className="font-dm-serif text-lg text-espresso leading-snug">
                    {member.name}
                  </h3>
                  <p className="font-jost text-xs font-medium uppercase tracking-wider text-champagne-gold">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="relative font-jost text-sm font-light leading-relaxed text-brown-warm/70">
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
                          <span className="font-jost text-xs text-brown-warm/70">
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

              {/* LinkedIn icon — slides in from bottom on hover */}
              <motion.div
                className="absolute bottom-3 right-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: hoveredCard === member.name ? 0 : 20,
                  opacity: hoveredCard === member.name ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-teal/10 transition-colors hover:bg-sage-teal/20">
                  <Linkedin className="h-3.5 w-3.5 text-sage-teal" />
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
            className="group/link inline-flex items-center gap-2 font-jost text-sm text-brown-warm/70 transition-colors duration-300 hover:text-champagne-gold"
          >
            Interested in joining our team?
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
