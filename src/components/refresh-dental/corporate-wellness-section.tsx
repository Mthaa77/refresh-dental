'use client'

import { useState, useEffect, useRef } from 'react'
import { Building2, Heart, CheckCircle, ArrowRight, Diamond } from 'lucide-react'

const corporateBenefits = [
  { text: 'On-site dental screenings — we come to you, saving your team valuable time' },
  { text: 'Custom wellness plans designed around your company\'s unique needs and budget' },
  { text: 'Engaging oral health workshops that educate and motivate your employees' },
  { text: 'Proven reduction in dental-related absenteeism and healthcare costs' },
]

const communityItems = [
  { text: 'School dental health programmes that make oral care exciting for kids' },
  { text: 'Community health education talks at churches, community centres, and events' },
  { text: 'Free dental screening days open to all community members' },
  { text: 'Strategic partnerships with local organisations for lasting impact' },
]

const corporateBack = {
  title: 'Why Corporate Wellness?',
  description: 'Invest in your team\'s greatest asset — their health. Our corporate programmes deliver measurable ROI through reduced sick days, higher productivity, and a workforce that feels genuinely valued. Flexible scheduling ensures zero disruption to your operations.',
  stat: '40%',
  statLabel: 'Reduction in dental-related absenteeism',
}

const communityBack = {
  title: 'Our Impact',
  description: 'We\'re on a mission to make quality dental care accessible to everyone, not just those who can afford it. Our outreach programmes have touched thousands of lives across Gauteng — one smile at a time.',
  stat: '2,000+',
  statLabel: 'Community members served annually',
}

const stats = [
  { value: 50, suffix: '+', label: 'Corporate Partners' },
  { value: 5000, suffix: '+', label: 'Screenings' },
  { value: 25, suffix: '+', label: 'Workshops' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const stepTime = duration / steps
          let current = 0
          const increment = target / steps

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, stepTime)

          observer.disconnect()
        }
      },
      { margin: '-60px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {target >= 1000
        ? `${(count / 1000).toFixed(count >= target ? 0 : 0)}${count >= target ? ',' : ''}${count >= 1000 && count < target ? '' : ''}${count >= target ? '000' : count % 1000 > 0 ? count % 1000 : ''}${suffix}`
        : `${count}${suffix}`}
    </span>
  )
}

function FlipCard({
  frontContent,
  backContent,
  delay,
  accent = 'blue',
}: {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  delay: number
  accent?: 'blue' | 'red'
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const hasRevealed = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el || hasRevealed.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true
          const timer = setTimeout(() => setProgress(100), delay * 1000 + 300)
          observer.disconnect()
        }
      },
      { margin: '-60px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped((prev) => !prev)}
    >
      {/* Gold progress bar at top — fills on scroll reveal */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[3px] overflow-hidden rounded-t-2xl">
        <div
          className="h-full bg-gradient-to-r from-champagne-gold via-gold-light to-champagne-gold transition-all duration-[1200ms] ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative w-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className={`relative w-full rounded-2xl border border-soft-border bg-card p-8 shadow-elevated overflow-hidden shadow-inner-gold transition-transform duration-600 ${accent === 'blue' ? 'blue-accent-border' : 'red-accent-border'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {frontContent}
        </div>
        <div
          className="absolute inset-0 rounded-2xl border border-champagne-gold/30 bg-gradient-to-br from-champagne-gold/5 to-gold-light/5 p-8 shadow-elevated overflow-hidden shadow-inner-gold"
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  )
}

export default function CorporateWellnessSection() {
  return (
    <section className="relative bg-sand py-20 md:py-28 overflow-hidden">
      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[0]"
        aria-hidden="true"
        style={{ opacity: 0.035 }}
      >
        <defs>
          <pattern id="corporate-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B89830" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#corporate-grid)" />
      </svg>

      {/* Static Building SVG watermark in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[0]"
        aria-hidden="true"
      >
        <Building2 className="w-[280px] h-[280px] text-champagne-gold opacity-[0.04]" strokeWidth={0.8} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Community Impact
          </span>
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl gold-gradient-text text-shadow-espresso">
            Corporate Wellness &amp; Outreach
          </h2>
          <p className="font-jost text-base md:text-lg text-brown-muted max-w-2xl mx-auto text-center leading-relaxed mt-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Elevate your team&rsquo;s wellbeing with on-site dental care that reduces absenteeism, boosts morale, and shows your people you genuinely care.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center px-6 py-4"
            >
              {/* Gold line divider on desktop — between stats, hidden on mobile */}
              {i > 0 && (
                <div className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent sm:block" />
              )}
              <span className="font-cormorant text-3xl font-semibold text-champagne-gold md:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 font-jost text-xs font-medium uppercase tracking-wider text-brown-muted/90">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Two-Column Cards with Flip Effect */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Corporate Wellness — Flip Card */}
          <FlipCard
            delay={0.1}
            frontContent={
              <>
                {/* Building watermark */}
                <Building2 className="absolute top-6 right-6 h-24 w-24 text-champagne-gold" style={{ opacity: 0.08 }} />

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-gold/10">
                    <Building2 className="h-6 w-6 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-dm-serif text-xl text-espresso">
                      Corporate Dental Wellness
                    </h3>
                    <span className="text-[10px] font-jost text-champagne-gold/60 uppercase tracking-wider">Hover to learn more</span>
                  </div>
                </div>

                <p className="mb-6 font-jost text-sm font-light leading-relaxed text-brown-muted">
                  We partner with forward-thinking businesses of all sizes to deliver on-site dental
                  screenings, customised employee wellness plans, and engaging oral health education sessions.
                  A healthier team is a more productive, happier team — and it starts with a healthy smile.
                </p>

                <ul className="space-y-3">
                  {corporateBenefits.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-sage-teal" />
                      </span>
                      <span className="font-jost text-sm text-brown-muted">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            }
            backContent={
              <>
                <div className="flex flex-col items-center justify-center h-full text-center py-4">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-champagne-gold/10">
                    <Building2 className="h-8 w-8 text-champagne-gold" />
                  </div>
                  <h3 className="font-dm-serif text-xl text-espresso mb-3">
                    {corporateBack.title}
                  </h3>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-muted mb-6">
                    {corporateBack.description}
                  </p>
                  <div className="bg-card/60 rounded-xl px-6 py-4 border border-champagne-gold/10">
                    <span className="block font-cormorant text-3xl font-semibold text-champagne-gold">
                      {corporateBack.stat}
                    </span>
                    <span className="block font-jost text-xs text-brown-muted/90 mt-1">
                      {corporateBack.statLabel}
                    </span>
                  </div>
                </div>
              </>
            }
          />

          {/* Decorative gold diamond ornament — desktop only */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:h-10 md:w-10 md:items-center md:justify-center">
            <div className="flex h-10 w-10 rotate-45 items-center justify-center rounded-md border border-champagne-gold/30 bg-sand">
              <Diamond className="h-4 w-4 -rotate-45 text-champagne-gold/60" />
            </div>
          </div>

          {/* Community Outreach — Flip Card */}
          <FlipCard
            delay={0.25}
            accent="red"
            frontContent={
              <>
                {/* Heart watermark */}
                <Heart className="absolute top-6 right-6 h-24 w-24 text-warm-blush" style={{ opacity: 0.08 }} />

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warm-blush/30">
                    <Heart className="h-6 w-6 text-warm-blush" />
                  </div>
                  <div>
                    <h3 className="font-dm-serif text-xl text-espresso">
                      Community Outreach
                    </h3>
                    <span className="text-[10px] font-jost text-champagne-gold/60 uppercase tracking-wider">Hover to learn more</span>
                  </div>
                </div>

                <p className="mb-6 font-jost text-sm font-light leading-relaxed text-brown-muted">
                  Giving back is at the heart of everything we do. Through school dental
                  health programmes, free community screening days, and meaningful partnerships
                  with local organisations, we extend quality dental care to those who need it most.
                </p>

                <ul className="space-y-3">
                  {communityItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${0.35 + i * 0.08}s` }}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-sage-teal" />
                      </span>
                      <span className="font-jost text-sm text-brown-muted">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            }
            backContent={
              <>
                <div className="flex flex-col items-center justify-center h-full text-center py-4">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-warm-blush/20">
                    <Heart className="h-8 w-8 text-warm-blush" />
                  </div>
                  <h3 className="font-dm-serif text-xl text-espresso mb-3">
                    {communityBack.title}
                  </h3>
                  <p className="font-jost text-sm font-light leading-relaxed text-brown-muted mb-6">
                    {communityBack.description}
                  </p>
                  <div className="bg-card/60 rounded-xl px-6 py-4 border border-warm-blush/10">
                    <span className="block font-cormorant text-3xl font-semibold text-warm-blush">
                      {communityBack.stat}
                    </span>
                    <span className="block font-jost text-xs text-brown-muted/90 mt-1">
                      {communityBack.statLabel}
                    </span>
                  </div>
                </div>
              </>
            }
          />
        </div>

        {/* CTA */}
        <div className="mt-14 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="mb-6 font-jost text-base text-espresso/80">
            Interested in Corporate Wellness?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full chrome-gold-bg px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white shadow-gold transition-all duration-300 hover:shadow-gold-strong"
          >
            Contact Dr. Malunga
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
