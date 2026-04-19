'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gift, Heart, Users, MessageCircle, Mail, Copy, Check } from 'lucide-react'

const benefits = [
  {
    icon: Gift,
    title: 'Friend Discount',
    description: 'Your friend gets 20% off their first consultation',
  },
  {
    icon: Heart,
    title: 'Your Reward',
    description: 'You receive a complimentary teeth whitening session',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Help your community achieve better oral health',
  },
]

// Deterministic sparkle particle positions (no Math.random)
const sparkleParticles = [
  { x: '15%', y: '20%', size: 6, delay: 0, duration: 4 },
  { x: '80%', y: '15%', size: 4, delay: 0.8, duration: 5 },
  { x: '60%', y: '75%', size: 5, delay: 1.5, duration: 3.5 },
  { x: '25%', y: '65%', size: 3, delay: 2.2, duration: 4.5 },
  { x: '70%', y: '40%', size: 5, delay: 0.5, duration: 3.8 },
  { x: '40%', y: '85%', size: 4, delay: 1.8, duration: 4.2 },
  { x: '85%', y: '55%', size: 3, delay: 3.0, duration: 5.2 },
  { x: '10%', y: '45%', size: 6, delay: 2.5, duration: 3.6 },
  { x: '50%', y: '10%', size: 4, delay: 0.3, duration: 4.8 },
  { x: '35%', y: '35%', size: 5, delay: 1.2, duration: 3.4 },
  { x: '90%', y: '80%', size: 3, delay: 2.8, duration: 5.0 },
  { x: '20%', y: '90%', size: 4, delay: 1.0, duration: 4.1 },
]

// Extra sparkle particles around the decorative SVG
const svgSparkles = [
  { x: '38%', y: '18%', size: 4, delay: 0.2, duration: 3.2 },
  { x: '62%', y: '15%', size: 3, delay: 0.6, duration: 3.8 },
  { x: '32%', y: '78%', size: 5, delay: 1.0, duration: 4.0 },
  { x: '68%', y: '82%', size: 4, delay: 1.4, duration: 3.5 },
  { x: '28%', y: '48%', size: 3, delay: 0.9, duration: 4.3 },
  { x: '72%', y: '52%', size: 4, delay: 0.4, duration: 3.9 },
]

const REFERRAL_CODE = 'REFRESH-FRIEND'

const shareMessage = encodeURIComponent(
  "I've been loving my experience at Refresh Dental in Centurion! They're offering 20% off your first consultation. Use code REFRESH-FRIEND. Book yours today: https://refreshdental.co.za"
)

const emailSubject = encodeURIComponent('You\'re Invited to Refresh Dental — 20% Off!')
const emailBody = encodeURIComponent(
  "Hi there!\n\nI've been loving my experience at Refresh Dental in Centurion. As a special offer, you can get 20% off your first consultation using code: REFRESH-FRIEND\n\nBook your appointment today and discover the difference premium dental care makes.\n\nWarm regards"
)

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const sparkleFloat = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.7, 0.3, 0.7, 0],
    scale: [0, 1, 0.6, 1, 0],
    y: [0, -12, -6, -18, -8],
    transition: {
      duration: sparkleParticles[i].duration,
      delay: sparkleParticles[i].delay,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    },
  }),
}

const svgSparkleFloat = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 0.8, 0.3, 0.8, 0],
    scale: [0, 1, 0.5, 1, 0],
    y: [0, -8, -4, -12, -6],
    transition: {
      duration: svgSparkles[i].duration,
      delay: svgSparkles[i].delay,
      repeat: Infinity,
      repeatDelay: 1.5,
      ease: 'easeInOut',
    },
  }),
}

function BenefitCard({ benefit, isInView }: { benefit: typeof benefits[number]; isInView: boolean }) {
  const BenefitIcon = benefit.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl p-5 backdrop-blur-sm transition-colors duration-300"
      animate={{
        backgroundColor: isHovered ? 'rgba(253, 250, 246, 0.12)' : 'rgba(253, 250, 246, 0.05)',
      }}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(201,169,110,0.6) 0%, rgba(232,213,176,0.3) 50%, rgba(201,169,110,0.6) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-champagne-gold/20">
          <BenefitIcon className="h-5 w-5 text-champagne-gold" />
        </div>
        <div>
          <h3 className="font-dm-serif text-base text-ivory">
            {benefit.title}
          </h3>
          <p className="mt-0.5 font-jost text-sm font-light leading-relaxed text-ivory/75">
            {benefit.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReferFriend() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [copied, setCopied] = useState(false)
  const [rippleActive, setRippleActive] = useState<string | null>(null)

  const copyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const triggerRipple = (id: string) => {
    setRippleActive(id)
    setTimeout(() => setRippleActive(null), 600)
  }

  return (
    <section id="refer-friend" ref={sectionRef} className="relative overflow-hidden bg-sage-teal py-20 md:py-28">
      {/* Decorative corner ornaments (gold L-shaped brackets) */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 24V0H6V18H24V24H0Z" fill="#B89830" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-6 top-6 z-10 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 24V0H26V18H8V24H32Z" fill="#B89830" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 z-10 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 8V32H6V14H24V8H0Z" fill="#B89830" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 8V32H26V14H8V8H32Z" fill="#B89830" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Column — Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={headerVariants}
          >
            <div className="flex items-center gap-3">
              <span className="mb-0 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
                Share the Love
              </span>
              {/* Floating gift box icon */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Gift className="h-5 w-5 text-champagne-gold" />
              </motion.div>
            </div>
            <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-ivory">
              Share Your Smile Journey
            </h2>
            <p className="mt-4 max-w-md font-jost text-sm font-light leading-relaxed text-ivory/70">
              Refer a friend and you both receive benefits. Together, we can create
              healthier, more confident smiles in our community.
            </p>

            {/* Referral Code Display */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <span className="mb-2 block font-jost text-[10px] font-semibold uppercase tracking-wider text-ivory/55">
                Your Referral Code
              </span>
              <div className="flex items-center gap-2">
                <div className="flex h-11 flex-1 items-center rounded-xl border border-champagne-gold/30 bg-ivory/5 px-4 backdrop-blur-sm">
                  <span className="flex-1 font-jost text-sm font-semibold tracking-[0.15em] text-champagne-gold">
                    {REFERRAL_CODE}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={copyCode}
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-champagne-gold/20 text-champagne-gold transition-colors duration-300 hover:bg-champagne-gold/30"
                  aria-label="Copy referral code"
                >
                  {copied ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Copy className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Benefit Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-10 space-y-4"
            >
              {benefits.map((benefit) => (
                <BenefitCard key={benefit.title} benefit={benefit} isInView={isInView} />
              ))}
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href={`https://wa.me/?text=${shareMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => triggerRipple('whatsapp')}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-6 py-3 font-jost text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#1ebe57] hover:shadow-lg"
              >
                {rippleActive === 'whatsapp' && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/20"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <MessageCircle className="relative h-4 w-4" />
                <span className="relative">Share via WhatsApp</span>
              </motion.a>
              <motion.a
                href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => triggerRipple('email')}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-ivory/20 bg-ivory/5 px-6 py-3 font-jost text-sm font-semibold tracking-wide text-ivory transition-all duration-300 hover:border-ivory/40 hover:bg-ivory/10"
              >
                {rippleActive === 'email' && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-ivory/15"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                <Mail className="relative h-4 w-4" />
                <span className="relative">Share via Email</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[360px] w-full overflow-hidden rounded-3xl md:h-[440px]">
              {/* Gold gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold via-gold-light to-champagne-gold/80" />

              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #0F0D0A 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Sparkle particles */}
              {sparkleParticles.map((p, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={sparkleFloat}
                  initial="hidden"
                  animate="visible"
                  className="absolute rounded-full bg-ivory"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                  }}
                />
              ))}

              {/* Additional sparkle particles around SVG */}
              {svgSparkles.map((p, i) => (
                <motion.div
                  key={`svg-${i}`}
                  custom={i}
                  variants={svgSparkleFloat}
                  initial="hidden"
                  animate="visible"
                  className="absolute rounded-full bg-ivory/80"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                  }}
                />
              ))}

              {/* Center icon — Heart with tooth */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 150,
                    damping: 12,
                  }}
                  className="mb-6"
                >
                  {/* Custom SVG heart-tooth icon */}
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg md:h-24 md:w-24"
                  >
                    <defs>
                      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F0EBE1" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#D4C08A" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    {/* Heart outline */}
                    <path
                      d="M40 70C40 70 8 48 8 28C8 16 16 8 26 8C32 8 37 12 40 16C43 12 48 8 54 8C64 8 72 16 72 28C72 48 40 70 40 70Z"
                      fill="url(#heartGrad)"
                      stroke="rgba(253, 250, 246, 0.4)"
                      strokeWidth="1.5"
                    />
                    {/* Tooth icon inside heart */}
                    <path
                      d="M33 30C33 26 36 23 40 23C44 23 47 26 47 30V48C47 48 46 53 44 55C43 56 42 56 41 55C40 54 40 50 40 50C40 50 40 54 39 55C38 56 37 56 36 55C34 53 33 48 33 48V30Z"
                      fill="rgba(15, 13, 10, 0.15)"
                    />
                  </svg>
                </motion.div>

                {/* Quote text */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="max-w-[240px] text-center font-cormorant text-xl font-medium italic leading-relaxed text-espresso/80 md:text-2xl"
                >
                  &ldquo;The greatest gift is a healthy smile&rdquo;
                </motion.p>

                {/* Gift icon row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="mt-6 flex items-center gap-2"
                >
                  {[Gift, Heart, Users].map((Icon, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso/10"
                    >
                      <Icon className="h-4 w-4 text-espresso/60" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
