'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Sparkles } from 'lucide-react';

const wordVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.4 + i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const imageVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.5,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Floating gold particles (deterministic values to avoid hydration mismatch)
const particles = [
  { id: 0, size: 18, x: 12, y: 25, duration: 14, delay: 0.5, opacity: 0.08 },
  { id: 1, size: 24, x: 78, y: 15, duration: 16, delay: 1.2, opacity: 0.06 },
  { id: 2, size: 10, x: 45, y: 60, duration: 11, delay: 2.8, opacity: 0.12 },
  { id: 3, size: 28, x: 88, y: 72, duration: 18, delay: 0.8, opacity: 0.05 },
  { id: 4, size: 14, x: 22, y: 80, duration: 13, delay: 3.5, opacity: 0.10 },
  { id: 5, size: 20, x: 65, y: 40, duration: 15, delay: 1.8, opacity: 0.07 },
  { id: 6, size: 12, x: 35, y: 10, duration: 12, delay: 2.2, opacity: 0.14 },
  { id: 7, size: 16, x: 92, y: 50, duration: 17, delay: 3.0, opacity: 0.09 },
];

export default function Hero() {
  const words = ['Your', 'Smile,', 'Refreshed.', 'Revived.'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grain-overlay overflow-hidden bg-ivory"
    >
      {/* Floating gold circles / particles in background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-champagne-gold"
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
        {/* Larger soft glow circles */}
        <motion.div
          className="absolute rounded-full bg-champagne-gold/5 blur-3xl"
          style={{ width: 300, height: 300, top: '10%', left: '5%' }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full bg-sage-teal/5 blur-3xl"
          style={{ width: 250, height: 250, bottom: '20%', right: '30%' }}
          animate={{ y: [0, 15, 0], x: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Side - Content */}
        <div className="relative z-20 flex flex-col justify-center w-full lg:w-[60%] px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <span className="font-jost text-xs tracking-[0.15em] text-champagne-gold uppercase">
              Refresh Dental · Centurion
            </span>
            {/* Thin decorative gold line under label */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-2 h-[1px] w-24 origin-left bg-gradient-to-r from-champagne-gold to-champagne-gold/0"
            />
          </motion.div>

          {/* H1 Heading */}
          <h1 className="font-cormorant font-light text-espresso leading-[1.05] mb-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.3em] ${
                  i >= 2 ? 'text-sage-teal' : ''
                } ${
                  word === 'Refreshed.'
                    ? 'text-[clamp(3.5rem,8vw,7rem)] italic'
                    : word === 'Revived.'
                      ? 'text-[clamp(3.5rem,8vw,7rem)] italic'
                      : 'text-[clamp(3.5rem,8vw,7rem)]'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-jost font-light text-brown-warm text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            Premium dental care in the heart of Centurion — where confidence
            begins.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center bg-[#C9A96E] text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3.5 transition-colors duration-300 hover:bg-[#b8964f] overflow-hidden"
            >
              {/* Shimmer / pulse overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative z-10">Book an Appointment →</span>
            </motion.a>
            <a
              href="#services"
              className="inline-flex items-center border-2 border-sage-teal text-sage-teal hover:bg-sage-teal hover:text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3.5 transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Google Reviews Badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center"
          >
            <span className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-jost text-brown-warm shadow-sm border border-soft-border">
              ⭐ 5.0 · Google Reviews
            </span>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full lg:w-[40%] min-h-[50vh] lg:min-h-screen">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0"
          >
            <img
              src="/images/dr-lebo-hero.png"
              alt="Dr. Lebogang Malunga — Refresh Dental"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-l from-espresso/30 via-transparent to-espresso/20 lg:from-espresso/40 lg:via-transparent lg:to-espresso/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/10" />
          </motion.div>

          {/* Floating Card — Enhanced glass-morphism */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-[-1rem] z-30"
          >
            <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-espresso/5 p-5 border border-white/40 max-w-[260px]">
              {/* Glass highlight top edge */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center">
                    <Clock className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    30-Min Consultations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center">
                    <Shield className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    All Medical Aids Accepted
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 backdrop-blur-sm flex items-center justify-center">
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
