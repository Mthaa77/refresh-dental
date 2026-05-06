'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Heart,
  Sparkles,
  Clock,
  Star,
  ArrowRight,
  Quote,
  Shield,
} from 'lucide-react';

const welcomePromises = [
  {
    icon: Heart,
    label: 'Patient-First Care',
    desc: 'Every treatment tailored to your unique needs',
  },
  {
    icon: Shield,
    label: 'Safe & Sterile',
    desc: 'Hospital-grade infection control protocols',
  },
  {
    icon: Clock,
    label: 'Minimal Wait Times',
    desc: 'Respect for your schedule, every visit',
  },
  {
    icon: Sparkles,
    label: 'Lasting Results',
    desc: 'Premium materials and evidence-based techniques',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WelcomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={sectionRef}
      aria-label="Welcome message from Dr. Malunga"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* ═══ Background treatments ═══ */}
      {/* Warm gold radial vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-champagne-gold/[0.03] to-ivory" aria-hidden="true" />
      {/* Subtle teal accent in bottom-right */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-sage-teal/[0.04] blur-3xl" aria-hidden="true" />
      {/* Subtle gold accent in top-left */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-champagne-gold/[0.06] blur-3xl" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        {/* ═══ Top decorative line ═══ */}
        <motion.div
          variants={lineGrow}
          className="h-[2px] w-24 mx-auto mb-14 origin-center bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent"
          aria-hidden="true"
        />

        {/* ═══ Main welcome card ═══ */}
        <div className="relative">
          {/* Premium glass card */}
          <div className="relative rounded-3xl p-8 md:p-12 lg:p-16 glass-premium shadow-cinematic overflow-hidden">
            {/* Animated gold border gradient */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(184,152,48,0.15) 0%, transparent 40%, transparent 60%, rgba(45,107,92,0.1) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Corner accent decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-champagne-gold/20 rounded-tl-lg" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-sage-teal/20 rounded-br-lg" aria-hidden="true" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* ── Left: Personal image + quote ── */}
              <motion.div variants={scaleIn} className="relative flex-shrink-0 w-full lg:w-auto">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    {/* Glow behind image */}
                    <div
                      className="absolute -inset-3 rounded-full bg-gradient-to-br from-champagne-gold/20 via-sage-teal/10 to-champagne-gold/15 blur-xl"
                      aria-hidden="true"
                    />
                    {/* Image */}
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-champagne-gold/30 ring-offset-4 ring-offset-card/50">
                      <img
                        src="/images/clinic/real/dr-malunga-graduation.jpg"
                        alt="Dr. Lebogang Malunga — Principal Dentist at Refresh Dental Centurion"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-2 -right-2 flex items-center gap-1.5 bg-espresso/90 backdrop-blur-md rounded-full pl-2.5 pr-3.5 py-1.5 shadow-elevated border border-champagne-gold/20"
                    >
                      <Star className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
                      <span className="font-cormorant text-sm font-semibold text-champagne-gold">5.0</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* ── Center: Welcome message ── */}
              <motion.div variants={fadeUp} className="flex-1 text-center lg:text-left">
                {/* Greeting */}
                <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-4">
                  <div className="w-1 h-1 rounded-full bg-champagne-gold" aria-hidden="true" />
                  <span className="font-jost text-xs font-medium tracking-[0.2em] text-champagne-gold uppercase">
                    A Personal Welcome
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-espresso leading-[1.1] mb-6">
                  Welcome to{' '}
                  <span className="relative inline-block">
                    <span className="gold-gradient-text font-semibold">Refresh Dental</span>
                  </span>
                </h2>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote
                    className="absolute -top-1 -left-1 w-6 h-6 text-champagne-gold/20 rotate-180"
                    aria-hidden="true"
                  />
                  <blockquote className="pl-6 border-l-2 border-champagne-gold/25">
                    <p className="font-jost text-brown-muted text-base md:text-lg leading-relaxed italic">
                      &ldquo;I believe every patient deserves to feel heard, respected, and cared for — not just treated. 
                      My team and I have built Refresh Dental to be a space where clinical excellence meets genuine compassion. 
                      Whether you&apos;re visiting for a routine check-up or a complete smile transformation, 
                      I promise you&apos;ll experience dentistry the way it should be — personal, gentle, and focused entirely on you.&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex flex-col items-center lg:items-start gap-1 mb-8">
                  <p className="font-cormorant text-xl font-semibold text-espresso">
                    Dr. Lebogang Malunga
                  </p>
                  <p className="font-jost text-xs tracking-[0.15em] text-sand-muted uppercase">
                    BDS · PDD · Principal Dentist · HPCSA Registered
                  </p>
                </div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-champagne-gold to-gold-rich text-white font-jost font-semibold text-sm tracking-[0.12em] uppercase rounded-full px-7 py-3.5 shadow-gold transition-all duration-300 hover:shadow-gold-strong hover:scale-[1.03] active:scale-[0.97] group"
                  >
                    <span>Book Your Visit</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 border-2 border-sage-teal/30 text-sage-teal font-jost font-medium text-sm tracking-[0.08em] uppercase rounded-full px-7 py-3.5 transition-all duration-300 hover:bg-sage-teal/5 hover:border-sage-teal/50 hover:scale-[1.02] active:scale-[0.97]"
                  >
                    <span>View Services</span>
                  </a>
                </motion.div>
              </motion.div>

              {/* ── Right: Clinic environment image ── */}
              <motion.div variants={scaleIn} className="relative flex-shrink-0 w-full lg:w-auto hidden lg:block">
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Glow behind image */}
                    <div
                      className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sage-teal/20 via-champagne-gold/10 to-sage-teal/15 blur-2xl"
                      aria-hidden="true"
                    />
                    {/* Image */}
                    <div className="relative w-64 md:w-80 aspect-[3/4] rounded-3xl overflow-hidden ring-2 ring-champagne-gold/30 shadow-lg">
                      <img
                        src="/images/clinic/environment/modern-operatory.jpg"
                        alt="Modern Refresh Dental operatory in Centurion featuring comfortable patient chair and advanced dental equipment"
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Accent border at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-champagne-gold via-champagne-gold/60 to-transparent" />
                    </div>
                    {/* Caption badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card backdrop-blur-md rounded-full px-4 py-2 shadow-elevated border border-champagne-gold/20 whitespace-nowrap"
                    >
                      <span className="font-jost text-xs text-brown-muted">Experience modern comfort</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══ Promise cards row ═══ */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {welcomePromises.map((promise, idx) => (
            <motion.div
              key={promise.label}
              variants={fadeUp}
              className="group relative rounded-2xl p-5 md:p-6 glass-card shadow-premium transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 cursor-default"
            >
              {/* Accent line at top */}
              <div
                className="absolute top-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300 group-hover:w-full w-8"
                style={{
                  background:
                    idx % 2 === 0
                      ? 'linear-gradient(90deg, #B89830, #D4C08A, transparent)'
                      : 'linear-gradient(90deg, #2D6B5C, #7FB5A8, transparent)',
                }}
                aria-hidden="true"
              />
              <promise.icon
                className={`w-5 h-5 mb-3 transition-colors duration-300 ${
                  idx % 2 === 0 ? 'text-champagne-gold group-hover:text-gold-rich' : 'text-sage-teal group-hover:text-teal-light'
                }`}
                aria-hidden="true"
              />
              <h3 className="font-dm-serif text-sm md:text-base text-espresso mb-1">
                {promise.label}
              </h3>
              <p className="font-jost text-xs text-brown-muted leading-relaxed">
                {promise.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Bottom decorative line ═══ */}
        <motion.div
          variants={lineGrow}
          className="h-[1px] w-40 mx-auto mt-14 origin-center bg-gradient-to-r from-transparent via-soft-border to-transparent"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
