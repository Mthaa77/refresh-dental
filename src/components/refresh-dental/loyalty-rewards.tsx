'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, ArrowRight, Star, Gem, Award, CircleDot } from 'lucide-react'

interface RewardTier {
  number: string
  name: string
  threshold: string
  benefits: string
  gradientFrom: string
  gradientTo: string
  textColor: string
  borderColor: string
  isGold?: boolean
  badgeColor?: string
}

const tiers: RewardTier[] = [
  {
    number: '01',
    name: 'Bronze',
    threshold: 'First Visit',
    benefits: 'Complimentary dental exam and consultation',
    gradientFrom: '#B87333',
    gradientTo: '#D4A574',
    textColor: 'text-[#B87333]',
    borderColor: 'border-[#B87333]/30',
    badgeColor: '#B87333',
  },
  {
    number: '02',
    name: 'Silver',
    threshold: '5+ Visits',
    benefits: '10% off all treatments + free annual cleaning',
    gradientFrom: '#A8A9AD',
    gradientTo: '#D1D5DB',
    textColor: 'text-[#6B7280]',
    borderColor: 'border-[#A8A9AD]/30',
    badgeColor: '#A8A9AD',
  },
  {
    number: '03',
    name: 'Gold',
    threshold: '10+ Visits',
    benefits: '20% off all treatments + priority booking + free whitening',
    gradientFrom: '#C9A96E',
    gradientTo: '#E8D5B0',
    textColor: 'text-champagne-gold',
    borderColor: 'border-champagne-gold/30',
    isGold: true,
    badgeColor: '#C9A96E',
  },
  {
    number: '04',
    name: 'Platinum',
    threshold: '20+ Visits',
    benefits: '30% off all treatments + VIP priority + exclusive perks + family benefits',
    gradientFrom: '#7C8EA0',
    gradientTo: '#B0C4DE',
    textColor: 'text-[#7C8EA0]',
    borderColor: 'border-[#7C8EA0]/30',
    badgeColor: '#7C8EA0',
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

function TierCard({ tier }: { tier: RewardTier }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl bg-white p-5 ${tier.borderColor}`}
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered
          ? tier.isGold
            ? '0 16px 48px -8px rgba(201, 169, 110, 0.3)'
            : '0 12px 32px -8px rgba(0, 0, 0, 0.1)'
          : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer sweep animation on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.8,
          ease: 'linear',
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201, 169, 110, 0.08) 50%, transparent 100%)',
        }}
      />

      {/* Gold border glow for Gold tier on hover */}
      {tier.isGold && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(201,169,110,0.7) 0%, rgba(232,213,176,0.3) 50%, rgba(201,169,110,0.7) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      <div className="relative z-20 flex items-start gap-4">
        {/* Tier icon with gradient + badge icon */}
        <div className="relative flex-shrink-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${tier.gradientFrom}, ${tier.gradientTo})`,
            }}
          >
            <span className="font-cormorant text-lg font-bold text-white drop-shadow-sm">
              {tier.number}
            </span>
          </div>
          {/* Tier badge icon — small colored dot */}
          {tier.badgeColor && (
            <div
              className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white"
              style={{ backgroundColor: tier.badgeColor }}
            >
              <CircleDot className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className={`font-dm-serif text-base ${tier.textColor}`}>
              {tier.name} Tier
            </h3>
            <span className="rounded-full bg-sand px-2 py-0.5 font-jost text-[10px] font-semibold uppercase tracking-wider text-brown-warm/60">
              {tier.threshold}
            </span>
          </div>
          <p className="font-jost text-sm font-light leading-relaxed text-brown-warm/70">
            {tier.benefits}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function LoyaltyRewards() {
  // Deterministic floating coin/star positions
  const floatingCoins = [
    { x: '8%', y: '15%', delay: 0, icon: Star },
    { x: '92%', y: '20%', delay: 1.0, icon: Gem },
    { x: '5%', y: '80%', delay: 2.0, icon: Star },
    { x: '90%', y: '75%', delay: 0.5, icon: Gem },
    { x: '15%', y: '50%', delay: 1.5, icon: Star },
    { x: '85%', y: '45%', delay: 2.5, icon: Gem },
  ]

  return (
    <section
      id="rewards"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: '#F5EFE6' }}
    >
      {/* Floating gold coin/star icons that float up on scroll reveal */}
      {floatingCoins.map((coin, i) => {
        const Icon = coin.icon
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-[1]"
            style={{ left: coin.x, top: coin.y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: [0, 0.5, 0.3, 0.5, 0], y: [30, 10, 20, 5, -10] }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{
              duration: 4,
              delay: coin.delay,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            <Icon className="h-4 w-4 text-champagne-gold/30" />
          </motion.div>
        )
      })}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Loyalty Program
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-espresso">
            Refresh Rewards
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm font-light leading-relaxed text-brown-warm/60">
            Your smile, your benefits
          </p>
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mt-6 h-px w-20 bg-champagne-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-8 font-jost text-sm font-light leading-relaxed text-brown-warm/70">
              At Refresh Dental, we believe in rewarding loyalty. Our exclusive
              rewards program is designed to give back to our valued patients.
              The more you visit, the more you earn — because your smile journey
              deserves to be celebrated.
            </p>

            {/* Tier Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-4"
            >
              {tiers.map((tier) => (
                <TierCard key={tier.name} tier={tier} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              {/* Progress bar — Visit 1 of 5 → Free Whitening */}
              <motion.div
                className="mb-6 rounded-xl border border-champagne-gold/20 bg-white p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-jost text-xs font-medium text-brown-warm/70">
                    Your Progress
                  </span>
                  <span className="font-jost text-xs font-semibold text-champagne-gold">
                    Visit 1 of 5
                  </span>
                </div>
                <div className="relative mb-2 h-3 w-full overflow-hidden rounded-full bg-sand">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)' }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '20%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((visit) => (
                      <motion.div
                        key={visit}
                        className="flex h-5 w-5 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: visit <= 1 ? '#C9A96E' : 'rgba(201, 169, 110, 0.15)',
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + visit * 0.1, ease: 'easeOut' }}
                      >
                    <Star
                      className={`h-3 w-3 ${visit <= 1 ? 'fill-white text-white' : 'text-champagne-gold/40'}`}
                    />
                  </motion.div>
                    ))}
                  </div>
                  <span className="font-jost text-[10px] font-medium text-sage-teal">
                    🎁 Free Whitening
                  </span>
                </div>
              </motion.div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-champagne-gold px-8 py-3.5 font-jost text-sm font-semibold tracking-wide text-espresso transition-colors duration-300 hover:bg-champagne-gold/90 hover:shadow-lg"
              >
                Join the Program
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Visual: Stylized loyalty card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div
                className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
                  aspectRatio: '1.586 / 1',
                  minHeight: '220px',
                }}
              >
                {/* Subtle pattern overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #1A1510 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Decorative circles */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(253,250,246,0.15) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(253,250,246,0.1) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Card content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    {/* Logo / Brand */}
                    <div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/25 backdrop-blur-sm">
                          <Crown className="h-4 w-4 text-espresso" />
                        </div>
                        <span className="font-cormorant text-lg font-semibold text-espresso">
                          Refresh Dental
                        </span>
                      </motion.div>
                    </div>

                    {/* Reward badge */}
                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-espresso text-espresso" />
                      <span className="font-jost text-[10px] font-bold uppercase tracking-wider text-espresso">
                        Rewards
                      </span>
                    </div>
                  </div>

                  {/* Center — Big title */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="my-6"
                  >
                    <h3 className="font-cormorant text-3xl font-bold tracking-wide text-espresso md:text-4xl">
                      REFRESH
                    </h3>
                    <h3 className="font-cormorant text-3xl font-bold tracking-wide text-espresso md:text-4xl">
                      REWARDS
                    </h3>
                  </motion.div>

                  {/* Bottom row */}
                  <div className="flex items-end justify-between">
                    {/* Gem icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Gem className="h-10 w-10 text-espresso/30" />
                    </motion.div>

                    {/* Card number decorative */}
                    <div className="font-jost text-xs font-light tracking-[0.3em] text-espresso/40">
                      •••• •••• •••• 0001
                    </div>
                  </div>
                </div>
              </div>

              {/* Shadow / reflection beneath card */}
              <div
                className="mx-4 mt-2 h-4 rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(201,169,110,0.15) 0%, transparent 100%)',
                  filter: 'blur(8px)',
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
