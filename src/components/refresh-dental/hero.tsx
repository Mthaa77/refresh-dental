'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Clock,
  Shield,
  Sparkles,
  Star,
  CheckCircle,
  Award,
  ChevronDown,
  Phone,
  MapPin,
} from 'lucide-react';

/* ========================================
   ANIMATION VARIANTS
   ======================================== */

const wordVariants = {
  hidden: { y: 60, opacity: 0, filter: 'blur(8px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 0.4 + i * 0.14,
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const imageVariants = {
  hidden: { x: 80, opacity: 0, scale: 1.04 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.15,
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 1.5,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const availabilityVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.4 + i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 2.2, duration: 0.8 } },
};

/* ========================================
   PARTICLES (deterministic values)
   ======================================== */

const particles = [
  { id: 0, size: 18, x: 12, y: 25, duration: 14, delay: 0.5, opacity: 0.09, color: 'bg-champagne-gold' },
  { id: 1, size: 24, x: 78, y: 15, duration: 16, delay: 1.2, opacity: 0.06, color: 'bg-champagne-gold' },
  { id: 2, size: 10, x: 45, y: 60, duration: 11, delay: 2.8, opacity: 0.13, color: 'bg-champagne-gold' },
  { id: 3, size: 28, x: 88, y: 72, duration: 18, delay: 0.8, opacity: 0.05, color: 'bg-champagne-gold' },
  { id: 4, size: 14, x: 22, y: 80, duration: 13, delay: 3.5, opacity: 0.10, color: 'bg-champagne-gold' },
  { id: 5, size: 20, x: 65, y: 40, duration: 15, delay: 1.8, opacity: 0.07, color: 'bg-champagne-gold' },
  { id: 6, size: 12, x: 35, y: 10, duration: 12, delay: 2.2, opacity: 0.14, color: 'bg-champagne-gold' },
  { id: 7, size: 16, x: 92, y: 50, duration: 17, delay: 3.0, opacity: 0.09, color: 'bg-champagne-gold' },
  { id: 8, size: 8,  x: 5,  y: 45, duration: 19, delay: 4.1, opacity: 0.11, color: 'bg-champagne-gold' },
  { id: 9, size: 22, x: 55, y: 85, duration: 10, delay: 0.3, opacity: 0.07, color: 'bg-champagne-gold' },
  { id: 10, size: 6, x: 30, y: 35, duration: 20, delay: 1.7, opacity: 0.15, color: 'bg-champagne-gold' },
  { id: 11, size: 15, x: 82, y: 5, duration: 13, delay: 2.5, opacity: 0.06, color: 'bg-champagne-gold' },
  { id: 12, size: 11, x: 50, y: 20, duration: 16, delay: 3.3, opacity: 0.10, color: 'bg-champagne-gold' },
  { id: 13, size: 14, x: 70, y: 75, duration: 15, delay: 2.0, opacity: 0.07, color: 'bg-sage-teal' },
];

const orbs = [
  { id: 'orb-gold',  size: 520, x: '2%',  y: '10%', color: 'bg-champagne-gold', opacity: 0.045, blur: 'blur-3xl', dur: 16, del: 0 },
  { id: 'orb-teal',  size: 420, x: '60%', y: '55%', color: 'bg-sage-teal',      opacity: 0.040, blur: 'blur-3xl', dur: 20, del: 2 },
  { id: 'orb-ivory', size: 340, x: '38%', y: '2%',  color: 'bg-gold-pale',      opacity: 0.030, blur: 'blur-3xl', dur: 18, del: 4 },
];

/* ========================================
   TRUST BADGES
   ======================================== */

const trustBadges = [
  { icon: Star,        label: '5.0 Google Rating', accent: 'text-champagne-gold' },
  { icon: Shield,      label: 'All Medical Aids',   accent: 'text-sage-teal' },
  { icon: Award,       label: 'HPCSA Registered',   accent: 'text-champagne-gold' },
  { icon: CheckCircle, label: 'Interest-Free Plans', accent: 'text-sage-teal' },
];

/* ========================================
   HERO COMPONENT
   ======================================== */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const parallaxY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textFadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const headingWords = [
    { text: 'Your',       className: '' },
    { text: 'Smile,',     className: '' },
    { text: 'Refreshed.', className: 'hero-gradient-text text-shadow-luxury italic' },
    { text: 'Revived.',   className: 'hero-gradient-text text-shadow-luxury italic' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center grain-overlay overflow-hidden bg-ivory"
    >
      {/* ============ BACKGROUND LAYER ============ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Radial vignette — depth and drama */}
        <div className="absolute inset-0 bg-radial-[circle_at_70%_50%] from-transparent via-transparent to-espresso/10" />

        {/* Diagonal grid texture */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #B89830 0px, #B89830 1px, transparent 1px, transparent 60px), repeating-linear-gradient(-45deg, #B89830 0px, #B89830 1px, transparent 1px, transparent 60px)',
          }}
        />

        {/* Ambient orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full ${orb.color} ${orb.blur}`}
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, opacity: orb.opacity }}
            animate={{ y: [0, -28, 14, -12, 0], x: [0, 20, -14, 24, 0], scale: [1, 1.09, 0.97, 1.06, 1] }}
            transition={{ duration: orb.dur, delay: orb.del, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
            animate={{ y: [0, -32, 10, -22, 0], x: [0, 14, -10, 18, 0], scale: [1, 1.14, 0.95, 1.1, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ============ MAIN CONTENT GRID ============ */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">

        {/* ======= LEFT — TEXT CONTENT ======= */}
        <motion.div
          style={{ opacity: textFadeOut }}
          className="relative z-20 flex flex-col justify-center w-full lg:w-[55%] px-6 sm:px-10 lg:px-16 xl:px-24 py-28 lg:py-0"
        >
          {/* Subtle left-edge gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-ivory/20 to-transparent pointer-events-none" />

          {/* === AVAILABILITY BADGE === */}
          <motion.div
            variants={availabilityVariants}
            initial="hidden"
            animate="visible"
            className="relative mb-8 inline-flex items-center gap-2.5 self-start"
          >
            <span className="relative inline-flex items-center gap-2 bg-sage-teal/10 border border-sage-teal/30 rounded-full pl-3 pr-4 py-1.5 shadow-teal">
              {/* Pulsing green dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-teal opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage-teal" />
              </span>
              <span className="font-jost text-xs font-semibold tracking-[0.15em] text-sage-teal uppercase">
                Now Accepting New Patients
              </span>
            </span>
          </motion.div>

          {/* === EYEBROW LABEL === */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-7"
          >
            <span className="font-jost text-xs tracking-[0.22em] text-champagne-gold uppercase">
              Refresh Dental · Centurion, Pretoria
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 h-[1.5px] w-32 origin-left bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold/0"
            />
          </motion.div>

          {/* === MEGA HEADING === */}
          <h1 className="font-cormorant font-light text-espresso leading-[0.92] mb-9 relative">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.22em] last:mr-0 text-[clamp(4.4rem,10.5vw,9.5rem)] ${word.className}`}
              >
                {word.text}
              </motion.span>
            ))}

            {/* Animated gold rule beneath heading */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="block mt-5 h-[2px] w-[70%] origin-left bg-gradient-to-r from-champagne-gold via-gold-light to-transparent"
            />
          </h1>

          {/* === SUBHEADING COPY === */}
          <motion.p
            custom={0.95}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="font-jost font-normal text-brown-warm text-lg md:text-xl max-w-[520px] leading-relaxed mb-2"
          >
            Experience world-class dentistry crafted around your comfort.
          </motion.p>
          <motion.p
            custom={1.1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="font-jost font-normal text-brown-muted text-base md:text-lg max-w-[500px] leading-relaxed mb-11"
          >
            Where artistry meets science — for smiles that inspire lasting confidence.
          </motion.p>

          {/* === CTA BUTTONS === */}
          <motion.div
            custom={1.2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* Primary — Chrome Gold */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(184,152,48,0.38)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center bg-gradient-to-r from-champagne-gold to-gold-light text-espresso font-jost font-semibold text-sm tracking-[0.12em] uppercase rounded-full px-9 py-4 shadow-gold overflow-hidden transition-all duration-300"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent"
                animate={{ x: ['-110%', '210%'] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Book Your Transformation</span>
              <motion.span
                className="relative z-10 ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.a>

            {/* Secondary — Sage Teal Outlined */}
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(45,107,92,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center border-[2px] border-sage-teal text-sage-teal font-jost font-medium text-sm tracking-[0.1em] uppercase rounded-full px-9 py-4 transition-all duration-300"
            >
              Explore Services
            </motion.a>
          </motion.div>

          {/* === TRUST BADGES === */}
          <motion.div
            custom={1.35}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge.label}
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-1.5 backdrop-blur-sm bg-card/60 border border-soft-border/35 rounded-full px-3.5 py-1.5 shadow-sm"
              >
                <badge.icon className={`w-3.5 h-3.5 ${badge.accent}`} />
                <span className="font-jost text-[11px] font-medium text-brown-warm tracking-wide">
                  {badge.label}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* === CONTACT QUICK-LINKS === */}
          <motion.div
            custom={1.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="tel:+27614164649"
              className="inline-flex items-center gap-2 font-jost text-sm text-brown-muted hover:text-champagne-gold transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-champagne-gold" />
              +27 61 416 4649
            </a>
            <span className="w-px h-4 bg-soft-border/50" />
            <a
              href="#location"
              className="inline-flex items-center gap-2 font-jost text-sm text-brown-muted hover:text-sage-teal transition-colors duration-300"
            >
              <MapPin className="w-3.5 h-3.5 text-sage-teal" />
              153 River Road, Centurion
            </a>
          </motion.div>
        </motion.div>

        {/* ======= RIGHT — IMAGE COLUMN ======= */}
        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-screen overflow-hidden">
          {/* Diagonal clip-path for editorial feel */}
          <div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0"
            >
              {/* Parallax image wrapper */}
              <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 scale-110"
              >
                <img
                  src="/images/dr-lebo-hero.png"
                  alt="Dr. Lebogang Malunga — Principal Dentist at Refresh Dental, Centurion"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>

              {/* Layered gradient overlays for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ivory/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/8 via-transparent to-sage-teal/10" />
            </motion.div>
          </div>

          {/* ======= GOOGLE SOCIAL PROOF CARD ======= */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-4 left-4 sm:bottom-14 sm:right-8 sm:left-auto lg:bottom-20 lg:right-6 xl:right-10 z-30"
          >
            <div
              className="relative rounded-2xl p-5 max-w-[290px] glass-card shadow-elevated"
              style={{ border: '1px solid rgba(200,187,170,0.45)' }}
            >
              {/* Gold gradient top accent bar */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent rounded-full" />

              {/* Google rating row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  {/* Google G icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="font-jost text-sm font-semibold text-espresso">Google Reviews</span>
                </div>
                <span className="font-cormorant font-semibold text-2xl text-champagne-gold leading-none">5.0</span>
              </div>

              {/* 5-star row */}
              <div className="flex items-center gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + star * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Star className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
                  </motion.div>
                ))}
                <span className="font-jost text-xs text-brown-muted ml-1.5">(3 reviews)</span>
              </div>

              {/* Practice info items */}
              <div className="space-y-2.5 pt-1 border-t border-soft-border/30">
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center border border-sage-teal/15">
                    <Clock className="w-3.5 h-3.5 text-sage-teal" />
                  </div>
                  <span className="font-jost text-xs text-espresso">30-Min Consultations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center border border-sage-teal/15">
                    <Shield className="w-3.5 h-3.5 text-sage-teal" />
                  </div>
                  <span className="font-jost text-xs text-espresso">All Medical Aids Accepted</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center border border-sage-teal/15">
                    <Sparkles className="w-3.5 h-3.5 text-sage-teal" />
                  </div>
                  <span className="font-jost text-xs text-espresso">Interest-Free Payment Plans</span>
                </div>
              </div>

              {/* Bottom gold rule */}
              <div className="absolute bottom-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent rounded-full" />
            </div>
          </motion.div>

          {/* ======= DR NAME OVERLAY (bottom of image) ======= */}
          <motion.div
            custom={1.8}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 left-10 z-30 hidden lg:block"
          >
            <p className="font-cormorant font-light text-ivory/90 text-xl tracking-wide leading-tight">
              Dr. Lebogang Malunga
            </p>
            <p className="font-jost text-xs text-ivory/60 tracking-[0.15em] uppercase mt-0.5">
              BDS · PDD · Principal Dentist
            </p>
          </motion.div>
        </div>
      </div>

      {/* ============ SCROLL INDICATOR ============ */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="font-jost text-[10px] tracking-[0.2em] text-brown-muted uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
          <ChevronDown className="w-5 h-5 text-champagne-gold/40 -mt-2.5" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* ============ SVG BOTTOM WAVE TRANSITION ============ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#F0EBE1"
            fillOpacity="0.6"
          />
          <path
            d="M0,55 C360,90 720,20 1080,55 C1260,72 1380,50 1440,55 L1440,80 L0,80 Z"
            fill="#F0EBE1"
          />
        </svg>
      </div>
    </section>
  );
}
