'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Star,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  ChevronDown,
  Clock,
  Sparkles,
} from 'lucide-react';

/* ========================================
   ANIMATION VARIANTS
   ======================================== */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const badgeSection = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scrollFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 2.0, duration: 1.0 } },
};

/* ========================================
   TRUST DATA
   ======================================== */

const trustBadges = [
  { icon: Star, label: '5.0 Google Rating', accent: 'text-champagne-gold' },
  { icon: Shield, label: 'All Medical Aids', accent: 'text-sage-teal' },
  { icon: Award, label: 'HPCSA Registered', accent: 'text-champagne-gold' },
  { icon: CheckCircle, label: 'Interest-Free Plans', accent: 'text-sage-teal' },
];

/* ========================================
   HERO COMPONENT
   ======================================== */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ============ BACKGROUND IMAGE + OVERLAY ============ */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-dental-bg.jpg"
          alt="Refresh Dental — Premium Dental Clinic in Centurion"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-espresso/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-espresso/40" />
        {/* Subtle gold tint at bottom-right */}
        <div className="absolute inset-0 bg-gradient-to-bl from-champagne-gold/10 via-transparent to-transparent" />
      </motion.div>

      {/* ============ DECORATIVE ELEMENTS ============ */}
      {/* Thin gold vertical accent line */}
      <motion.div
        variants={lineExpand}
        initial="hidden"
        animate="visible"
        className="absolute left-8 lg:left-16 top-[18%] bottom-[22%] w-[1px] bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent z-10 origin-top hidden lg:block"
      />

      {/* Animated corner bracket — top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.0 }}
        className="absolute top-12 left-8 lg:left-16 z-10 hidden lg:block"
      >
        <div className="w-16 h-16 border-t border-l border-champagne-gold/25" />
      </motion.div>

      {/* Animated corner bracket — bottom-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.0 }}
        className="absolute bottom-12 right-8 lg:right-16 z-10 hidden lg:block"
      >
        <div className="w-16 h-16 border-b border-r border-champagne-gold/25" />
      </motion.div>

      {/* ============ MAIN CONTENT ============ */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full min-h-screen flex items-center"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-32 lg:py-0">
          <div className="max-w-3xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-0"
            >
              {/* --- AVAILABILITY BADGE --- */}
              <motion.div variants={fadeSlideUp} className="mb-8">
                <span className="inline-flex items-center gap-2.5 bg-sage-teal/15 border border-sage-teal/30 backdrop-blur-md rounded-full pl-3 pr-4 py-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage-teal" />
                  </span>
                  <span className="font-jost text-xs font-semibold tracking-[0.18em] text-teal-light uppercase">
                    Now Accepting New Patients
                  </span>
                </span>
              </motion.div>

              {/* --- EYEBROW --- */}
              <motion.div variants={fadeSlideUp} className="mb-5">
                <span className="font-jost text-xs sm:text-sm tracking-[0.25em] text-champagne-gold uppercase font-medium">
                  Where Science Meets the Art of Smiling
                </span>
                <motion.div
                  variants={lineExpand}
                  className="mt-3 h-[1.5px] w-28 origin-left bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold/0"
                />
              </motion.div>

              {/* --- MEGA HEADING --- */}
              <motion.h1
                variants={fadeSlideUp}
                className="font-cormorant font-light text-ivory leading-[0.92] mb-8"
              >
                <span className="block text-[clamp(3.2rem,8.5vw,8.5rem)] tracking-tight">
                  Your Smile,
                </span>
                <span className="block text-[clamp(3.2rem,8.5vw,8.5rem)] tracking-tight">
                  <span className="shimmer-text text-shadow-gold-strong">Our Passion.</span>
                </span>
              </motion.h1>

              {/* --- DESCRIPTION --- */}
              <motion.p
                variants={fadeSlideUp}
                className="font-jost font-normal text-ivory/80 text-lg sm:text-xl max-w-[540px] leading-relaxed mb-3"
              >
                Discover exceptional dental care tailored to your unique needs — where cutting-edge technology meets compassionate artistry.
              </motion.p>
              <motion.p
                variants={fadeSlideUp}
                className="font-jost font-normal text-ivory/60 text-base sm:text-lg max-w-[520px] leading-relaxed mb-4"
              >
                Every smile tells a story. Let us help you write your most confident chapter yet.
              </motion.p>

              {/* --- DR. NAME --- */}
              <motion.div variants={fadeSlideUp} className="mb-10">
                <p className="font-cormorant text-ivory/70 text-lg sm:text-xl italic">
                  Dr. Lebogang Malunga
                </p>
                <p className="font-jost text-xs text-ivory/45 tracking-[0.15em] uppercase mt-0.5">
                  BDS · PDD · Principal Dentist
                </p>
              </motion.div>

              {/* --- CTA BUTTONS --- */}
              <motion.div
                variants={fadeSlideUp}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Primary CTA */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(184,152,48,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-champagne-gold to-gold-light text-espresso font-jost font-semibold text-sm tracking-[0.12em] uppercase rounded-full px-8 py-4 shadow-gold overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">Book Your Transformation</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03, borderColor: 'rgba(127,181,168,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-teal-light/40 text-teal-light font-jost font-medium text-sm tracking-[0.1em] uppercase rounded-full px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-teal-light/10"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* --- TRUST BADGES --- */}
              <motion.div variants={badgeSection} className="flex flex-wrap gap-3 mb-10">
                {trustBadges.map((badge) => (
                  <motion.span
                    key={badge.label}
                    variants={badgePop}
                    className="inline-flex items-center gap-1.5 backdrop-blur-md bg-ivory/8 border border-ivory/12 rounded-full px-3.5 py-1.5"
                  >
                    <badge.icon className={`w-3.5 h-3.5 ${badge.accent}`} />
                    <span className="font-jost text-[11px] font-medium text-ivory/75 tracking-wide">
                      {badge.label}
                    </span>
                  </motion.span>
                ))}
              </motion.div>

              {/* --- CONTACT QUICK LINKS --- */}
              <motion.div variants={fadeSlideUp} className="flex flex-wrap items-center gap-5">
                <a
                  href="tel:+27614164649"
                  className="inline-flex items-center gap-2 font-jost text-sm text-ivory/60 hover:text-champagne-gold transition-colors duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-champagne-gold" />
                  +27 61 416 4649
                </a>
                <span className="w-px h-4 bg-ivory/20" />
                <a
                  href="#location"
                  className="inline-flex items-center gap-2 font-jost text-sm text-ivory/60 hover:text-teal-light transition-colors duration-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-light" />
                  153 River Road, Centurion
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ============ RIGHT-SIDE FLOATING CARD ============ */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          delay: 1.4,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute right-6 sm:right-10 lg:right-16 xl:right-24 bottom-32 lg:bottom-20 z-20 hidden sm:block"
      >
        <div
          className="relative rounded-2xl p-5 w-[280px] glass-card-dark shadow-elevated"
          style={{ border: '1px solid rgba(184,152,48,0.15)' }}
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent rounded-full" />

          {/* Google rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-jost text-sm font-semibold text-ivory">Google Reviews</span>
            </div>
            <span className="font-cormorant font-semibold text-2xl text-champagne-gold leading-none">5.0</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[0, 1, 2, 3, 4].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.8 + star * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Star className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
              </motion.div>
            ))}
            <span className="font-jost text-xs text-ivory/50 ml-1.5">(3 reviews)</span>
          </div>

          {/* Quick info */}
          <div className="space-y-2.5 pt-3 border-t border-ivory/10">
            {[
              { icon: Clock, label: '30-Min Consultations' },
              { icon: Shield, label: 'All Medical Aids Accepted' },
              { icon: Sparkles, label: 'Interest-Free Payment Plans' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/15 flex items-center justify-center border border-sage-teal/20">
                  <item.icon className="w-3.5 h-3.5 text-teal-light" />
                </div>
                <span className="font-jost text-xs text-ivory/80">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom gold accent */}
          <div className="absolute bottom-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent rounded-full" />
        </div>
      </motion.div>

      {/* ============ SCROLL INDICATOR ============ */}
      <motion.div
        variants={scrollFadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="font-jost text-[10px] tracking-[0.25em] text-ivory/40 uppercase">
          Scroll to Explore
        </span>
        <div className="animate-bounce">
          <ChevronDown className="w-5 h-5 text-champagne-gold/60" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* ============ BOTTOM TRANSITION ============ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 C320,100 640,10 960,50 C1120,70 1320,30 1440,45 L1440,100 L0,100 Z"
            fill="#F0EBE1"
            fillOpacity="0.7"
          />
          <path
            d="M0,80 C480,100 960,55 1440,75 L1440,100 L0,100 Z"
            fill="#F0EBE1"
          />
        </svg>
      </div>
    </section>
  );
}
