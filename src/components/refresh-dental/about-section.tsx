'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, ArrowRight, ChevronDown } from 'lucide-react';

const credentials = [
  { label: 'BDS', desc: 'Bachelor of Dental Surgery' },
  { label: 'PDD', desc: 'Postgraduate Diploma in Dentistry' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  // Gold accent line width based on scroll
  const accentLineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

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

  const credentialVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-ivory py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Portrait Image with gold glow */}
          <div className="relative w-full lg:w-[45%] flex-shrink-0 lg:-ml-12 xl:-ml-20 overflow-hidden">
            {/* Gold glow behind portrait */}
            <motion.div
              className="absolute -inset-4 rounded-3xl bg-champagne-gold/10 blur-2xl pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              ref={imageRef}
              style={{ y: imageY, scale: imageScale }}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src="/images/dr-lebo-hero.png"
                alt="Dr. Lebogang Malunga — Principal Dentist at Refresh Dental"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Subtle decorative frame */}
              <div className="absolute inset-0 border-2 border-champagne-gold/20 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Right — Content */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full lg:w-[55%] lg:py-8 shadow-elevated rounded-3xl bg-card border-soft-border p-6 md:p-10"
          >
            {/* Gold label with blue accent dot */}
            <motion.div variants={textItemVariants} className="flex items-center mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue mr-2" />
              <span className="inline-block font-jost text-xs tracking-[0.15em] text-champagne-gold uppercase">
                Meet Your Dentist
              </span>
            </motion.div>

            <motion.p className="font-jost text-base text-brown-muted max-w-md leading-relaxed mb-6">
              Transforming lives through exceptional dental care — one smile at a time.
            </motion.p>

            {/* Animated gold accent line */}
            <motion.div
              style={{ width: accentLineWidth }}
              className="h-[2px] bg-gradient-to-r from-champagne-gold to-champagne-gold/20 mb-6 origin-left"
            />

            {/* H2 Name */}
            <motion.h2
              variants={textItemVariants}
              className="font-cormorant font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 gold-gradient-text text-shadow-espresso"
            >
              Dr. Lebogang Malunga
            </motion.h2>

            {/* Credential badges */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {credentials.map((cred, i) => (
                <motion.span
                  key={cred.label}
                  custom={i}
                  variants={credentialVariants}
                  title={cred.desc}
                  className="inline-flex items-center gap-1.5 bg-champagne-gold/10 border border-champagne-gold/25 text-champagne-gold rounded-full px-3.5 py-1 font-jost text-xs tracking-wider uppercase cursor-default hover-lift"
                >
                  <span className="font-semibold">{cred.label}</span>
                  <span className="hidden sm:inline text-champagne-gold/60 text-[10px]">{cred.desc}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* Pull Quote */}
            <motion.blockquote
              variants={textItemVariants}
              className="font-cormorant italic text-xl md:text-2xl text-sage-teal text-shadow-teal mb-8 leading-relaxed"
            >
              &ldquo;A revitalised smile doesn&rsquo;t just change your appearance
              — it changes your life.&rdquo;
            </motion.blockquote>

            {/* Subtitle */}
            <motion.p
              variants={textItemVariants}
              className="text-lg md:text-xl section-subheading mb-6"
            >
              Founder & Principal Dentist, Refresh Dental
            </motion.p>

            {/* Bio Paragraph */}
            <motion.div variants={textItemVariants}>
              <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                Dr. Lebogang Malunga founded Refresh Dental with a bold vision — to transform dental care from a clinical necessity into a life-changing experience that celebrates each patient&rsquo;s unique journey to confidence.
              </p>

              {/* Expandable read more section */}
              <motion.div
                initial={false}
                animate={{
                  height: showMore ? 'auto' : 0,
                  opacity: showMore ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                  With over a decade of expertise in cosmetic and restorative dentistry, Dr. Malunga combines artistry with cutting-edge science to deliver results that go beyond expectations.
                </p>
                <p className="font-jost font-light text-brown-warm leading-relaxed mb-4 max-w-lg">
                  Beyond the clinic, Dr. Malunga is deeply invested in the Centurion
                  community. She leads corporate dental wellness programmes, participates
                  in outreach initiatives, and mentors aspiring dental professionals. Her
                  approach is rooted in the belief that everyone deserves access to
                  compassionate, high-quality dental care.
                </p>
              </motion.div>

              {/* Gold "Read More" toggle */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="group inline-flex items-center gap-1.5 text-champagne-gold font-jost text-sm font-medium tracking-wider uppercase mb-8 hover:text-[#A07D1A] transition-colors duration-300"
              >
                {showMore ? 'Read Less' : 'Read More'}
                <motion.span
                  animate={{ rotate: showMore ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
            </motion.div>

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
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-sage-teal text-sage-teal hover:bg-sage-teal hover:text-white font-jost font-medium text-sm tracking-wider uppercase rounded-full px-8 py-3 transition-all duration-300 shadow-gold"
              >
                Book Your Consultation
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
