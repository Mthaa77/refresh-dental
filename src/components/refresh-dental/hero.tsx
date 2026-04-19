'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Sparkles, Star, CheckCircle, Award } from 'lucide-react';

/* ========================================
   ANIMATION VARIANTS
   ======================================== */

const wordVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(6px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const imageVariants = {
  hidden: { x: 100, opacity: 0, scale: 1.05 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 1.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1.4,
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.3 + i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const subheadingLine1Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const subheadingLine2Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.05, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const ctaContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.15, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ========================================
   PARTICLES (deterministic values)
   ======================================== */

const particles = [
  { id: 0, size: 18, x: 12, y: 25, duration: 14, delay: 0.5, opacity: 0.08, color: 'bg-champagne-gold' },
  { id: 1, size: 24, x: 78, y: 15, duration: 16, delay: 1.2, opacity: 0.06, color: 'bg-champagne-gold' },
  { id: 2, size: 10, x: 45, y: 60, duration: 11, delay: 2.8, opacity: 0.12, color: 'bg-champagne-gold' },
  { id: 3, size: 28, x: 88, y: 72, duration: 18, delay: 0.8, opacity: 0.05, color: 'bg-champagne-gold' },
  { id: 4, size: 14, x: 22, y: 80, duration: 13, delay: 3.5, opacity: 0.10, color: 'bg-champagne-gold' },
  { id: 5, size: 20, x: 65, y: 40, duration: 15, delay: 1.8, opacity: 0.07, color: 'bg-champagne-gold' },
  { id: 6, size: 12, x: 35, y: 10, duration: 12, delay: 2.2, opacity: 0.14, color: 'bg-champagne-gold' },
  { id: 7, size: 16, x: 92, y: 50, duration: 17, delay: 3.0, opacity: 0.09, color: 'bg-champagne-gold' },
  // 5 additional gold particles
  { id: 8, size: 8, x: 5, y: 45, duration: 19, delay: 4.1, opacity: 0.11, color: 'bg-champagne-gold' },
  { id: 9, size: 22, x: 55, y: 85, duration: 10, delay: 0.3, opacity: 0.07, color: 'bg-champagne-gold' },
  { id: 10, size: 6, x: 30, y: 35, duration: 20, delay: 1.7, opacity: 0.15, color: 'bg-champagne-gold' },
  { id: 11, size: 15, x: 82, y: 5, duration: 13, delay: 2.5, opacity: 0.06, color: 'bg-champagne-gold' },
  { id: 12, size: 11, x: 50, y: 20, duration: 16, delay: 3.3, opacity: 0.10, color: 'bg-champagne-gold' },
  // Subtle red particle accent
  { id: 13, size: 14, x: 70, y: 75, duration: 15, delay: 2.0, opacity: 0.07, color: 'bg-soft-red' },
];

/* Large ambient orbs for luxury atmosphere */
const orbs = [
  {
    id: 'orb-gold',
    size: 420,
    x: '8%',
    y: '15%',
    color: 'bg-champagne-gold',
    opacity: 0.04,
    blur: 'blur-3xl',
    animDuration: 16,
    animDelay: 0,
  },
  {
    id: 'orb-teal',
    size: 360,
    x: '65%',
    y: '60%',
    color: 'bg-sage-teal',
    opacity: 0.035,
    blur: 'blur-3xl',
    animDuration: 20,
    animDelay: 2,
  },
  {
    id: 'orb-navy',
    size: 300,
    x: '40%',
    y: '5%',
    color: 'bg-royal-navy',
    opacity: 0.025,
    blur: 'blur-3xl',
    animDuration: 18,
    animDelay: 4,
  },
];

/* ========================================
   TRUST BADGES
   ======================================== */

const trustBadges = [
  { icon: Star, label: '5.0 Rating', accent: 'text-champagne-gold' },
  { icon: Shield, label: 'Medical Aids', accent: 'text-sage-teal' },
  { icon: Award, label: '10+ Years', accent: 'text-champagne-gold' },
  { icon: CheckCircle, label: 'Interest-Free', accent: 'text-sage-teal' },
];

/* ========================================
   HERO COMPONENT
   ======================================== */

export default function Hero() {
  const headingWords = [
    { text: 'Your', className: '' },
    { text: 'Smile,', className: '' },
    { text: 'Refreshed.', className: 'hero-gradient-text text-shadow-luxury italic' },
    { text: 'Revived.', className: 'hero-gradient-text text-shadow-luxury italic' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grain-overlay overflow-hidden bg-ivory"
    >
      {/* ============ BACKGROUND EFFECTS ============ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Small floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              scale: [1, 1.15, 0.95, 1.1, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Large ambient orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full ${orb.color} ${orb.blur}`}
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              opacity: orb.opacity,
            }}
            animate={{
              y: [0, -25, 15, -10, 0],
              x: [0, 18, -12, 22, 0],
              scale: [1, 1.08, 0.96, 1.05, 1],
            }}
            transition={{
              duration: orb.animDuration,
              delay: orb.animDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* ======= LEFT SIDE — TEXT CONTENT ======= */}
        <div className="relative z-20 flex flex-col justify-center w-full lg:w-[60%] px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-0">
          {/* Subtle dark gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/5 via-transparent to-transparent pointer-events-none rounded-none" />
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <span className="font-jost text-xs tracking-[0.2em] text-champagne-gold uppercase">
              Refresh Dental · Centurion
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-2.5 h-[1.5px] w-28 origin-left bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold/0"
            />
          </motion.div>

          {/* Massive H1 Heading */}
          <h1 className="font-cormorant font-light text-espresso leading-[0.95] mb-8">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.25em] text-[clamp(4rem,10vw,9rem)] ${word.className}`}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* Improved Copywriting — Two-line subheading */}
          <motion.p
            variants={subheadingLine1Variants}
            initial="hidden"
            animate="visible"
            className="font-jost font-normal text-brown-warm text-lg md:text-xl max-w-xl leading-relaxed mb-2"
          >
            Experience world-class dentistry crafted around your comfort.
          </motion.p>
          <motion.p
            variants={subheadingLine2Variants}
            initial="hidden"
            animate="visible"
            className="font-jost font-normal text-brown-muted text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            Where artistry meets science for smiles that inspire confidence.
          </motion.p>

          {/* Dual CTA Buttons */}
          <motion.div
            variants={ctaContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-8"
          >
            {/* Primary CTA — Premium Gold */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(184, 152, 48, 0.3)',
              }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center bg-gradient-to-r from-champagne-gold to-gold-light text-white font-jost font-semibold text-base tracking-wider uppercase rounded-full px-8 py-4 shadow-gold overflow-hidden transition-all duration-300"
            >
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative z-10">Book Your Transformation →</span>
            </motion.a>

            {/* Secondary CTA — Sage Teal Outlined */}
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center border-[2.5px] border-sage-teal text-sage-teal hover:bg-sage-teal hover:text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-4 transition-all duration-300"
            >
              Explore Our Services
            </motion.a>
          </motion.div>

          {/* Trust Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge.label}
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-1.5 backdrop-blur-sm bg-card/70 border border-soft-border/40 rounded-full px-3 py-1.5 shadow-sm"
              >
                <badge.icon className={`w-3.5 h-3.5 ${badge.accent}`} />
                <span className="font-jost text-xs font-medium text-brown-warm">
                  {badge.label}
                </span>
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ======= RIGHT SIDE — IMAGE ======= */}
        <div className="relative w-full lg:w-[40%] min-h-[50vh] lg:min-h-screen">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0"
          >
            {/* Gold gradient border frame */}
            <div className="absolute inset-3 rounded-2xl z-10 pointer-events-none border-2 border-transparent" style={{ borderImage: 'linear-gradient(180deg, rgba(184,152,48,0.4) 0%, rgba(184,152,48,0.05) 50%, rgba(184,152,48,0.3) 100%) 1' }} />

            <img
              src="/images/dr-lebo-hero.png"
              alt="Dr. Lebogang Malunga — Refresh Dental"
              className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl shadow-elevated"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-espresso/30 via-transparent to-espresso/20 lg:from-espresso/40 lg:via-transparent lg:to-espresso/30" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-espresso/10" />
          </motion.div>

          {/* ======= FLOATING INFO CARD ======= */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-[-1rem] z-30"
          >
            <div className="relative rounded-2xl shadow-elevated p-5 max-w-[260px] glass-card" style={{ border: '1px solid rgba(200, 187, 170, 0.4)' }}>
              {/* Gold gradient top border */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent rounded-full" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center border border-sage-teal/10">
                    <Clock className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    30-Min Consultations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center border border-sage-teal/10">
                    <Shield className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    All Medical Aids Accepted
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center border border-sage-teal/10">
                    <Sparkles className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    Interest-Free Payment Plans
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
