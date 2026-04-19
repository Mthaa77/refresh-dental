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

export default function Hero() {
  const words = ['Your', 'Smile,', 'Refreshed.', 'Revived.'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center grain-overlay overflow-hidden bg-ivory"
    >
      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Side - Content */}
        <div className="relative z-20 flex flex-col justify-center w-full lg:w-[60%] px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0">
          {/* Top Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jost text-xs tracking-[0.15em] text-champagne-gold uppercase mb-8"
          >
            Refresh Dental · Centurion
          </motion.span>

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
            <a
              href="#contact"
              className="inline-flex items-center bg-[#C9A96E] hover:bg-[#b8964f] text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-champagne-gold/20"
            >
              Book an Appointment →
            </a>
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
              src="https://static.wixstatic.com/media/a78f12_53141acea4c54f4da9028c40f2b7323d~mv2.jpeg"
              alt="Dr. Lebogang Malunga — Refresh Dental"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-l from-espresso/30 via-transparent to-espresso/20 lg:from-espresso/40 lg:via-transparent lg:to-espresso/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/10" />
          </motion.div>

          {/* Floating Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-[-1rem] z-30"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-espresso/10 p-5 border border-soft-border max-w-[260px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    30-Min Consultations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-sage-teal" />
                  </div>
                  <span className="font-jost text-sm text-espresso">
                    All Medical Aids Accepted
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-teal/10 flex items-center justify-center">
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
