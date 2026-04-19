'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-ivory py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Portrait Image */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full lg:w-[45%] aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0 lg:-ml-12 xl:-ml-20"
          >
            <img
              src="/images/dr-lebo-hero.png"
              alt="Dr. Lebogang Malunga — Principal Dentist at Refresh Dental"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle decorative frame */}
            <div className="absolute inset-0 border-2 border-champagne-gold/20 rounded-2xl pointer-events-none" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full lg:w-[55%] lg:py-8"
          >
            {/* Gold label */}
            <motion.span
              variants={textItemVariants}
              className="inline-block font-jost text-xs tracking-[0.15em] text-champagne-gold uppercase mb-6"
            >
              Meet Your Dentist
            </motion.span>

            {/* H2 Name */}
            <motion.h2
              variants={textItemVariants}
              className="font-cormorant font-light text-espresso text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-6"
            >
              Dr. Lebogang Malunga
            </motion.h2>

            {/* Pull Quote */}
            <motion.blockquote
              variants={textItemVariants}
              className="font-cormorant italic text-xl md:text-2xl text-sage-teal mb-8 leading-relaxed"
            >
              &ldquo;A revitalised smile doesn&rsquo;t just change your appearance
              — it changes your life.&rdquo;
            </motion.blockquote>

            {/* Bio Paragraph */}
            <motion.p
              variants={textItemVariants}
              className="font-jost font-light text-[#5C4E3D] leading-relaxed mb-8 max-w-lg"
            >
              Dr. Lebogang Malunga is the dedicated founder and principal dentist
              at Refresh Dental. Driven by a passion for aesthetics and holistic
              well-being, Dr. Malunga is committed to transforming smiles while
              prioritising overall health.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              variants={textItemVariants}
              className="font-jost text-sm text-brown-warm mb-8 space-y-1"
            >
              <a
                href="mailto:drlebo@refreshdental.co.za"
                className="block hover:text-champagne-gold transition-colors duration-300"
              >
                drlebo@refreshdental.co.za
              </a>
              <a
                href="tel:+27614164649"
                className="block hover:text-champagne-gold transition-colors duration-300"
              >
                061 416 4649
              </a>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={textItemVariants} className="mb-8">
              <a
                href="#about"
                className="inline-flex items-center gap-2 border-2 border-sage-teal text-sage-teal hover:bg-sage-teal hover:text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3 transition-all duration-300"
              >
                Read Full Story
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Trust Row */}
            <motion.div
              variants={textItemVariants}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sand border border-soft-border">
                <Linkedin className="w-4 h-4 text-brown-warm" />
              </div>
              <span className="font-jost text-sm text-brown-warm">
                HPCSA Registered
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
