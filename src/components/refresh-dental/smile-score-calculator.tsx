'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles, Calendar, Heart, Smile, Star, Shield } from 'lucide-react'

// ── Types ──────────────────────────────────────────────
interface QuizOption {
  label: string
  score: number
}

interface QuizQuestion {
  id: number
  question: string
  icon: React.ElementType
  options: QuizOption[]
  // Which recommendation triggers at low scores
  lowScoreRecKey: string
}

interface Recommendation {
  icon: React.ElementType
  title: string
  description: string
}

// ── Quiz Data ──────────────────────────────────────────
const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'How often do you visit the dentist?',
    icon: Calendar,
    options: [
      { label: 'Every 6 months', score: 4 },
      { label: 'Once a year', score: 3 },
      { label: 'Only when needed', score: 2 },
      { label: "It's been years", score: 1 },
    ],
    lowScoreRecKey: 'checkup',
  },
  {
    id: 2,
    question: 'How would you rate your daily oral hygiene routine?',
    icon: Shield,
    options: [
      { label: 'Excellent', score: 4 },
      { label: 'Good', score: 3 },
      { label: 'Fair', score: 2 },
      { label: 'Needs improvement', score: 1 },
    ],
    lowScoreRecKey: 'hygiene',
  },
  {
    id: 3,
    question: 'Do you experience any dental discomfort?',
    icon: Heart,
    options: [
      { label: 'No, never', score: 4 },
      { label: 'Occasionally', score: 3 },
      { label: 'Frequently', score: 2 },
      { label: 'Constantly', score: 1 },
    ],
    lowScoreRecKey: 'discomfort',
  },
  {
    id: 4,
    question: 'How confident are you with your smile?',
    icon: Smile,
    options: [
      { label: 'Very confident', score: 4 },
      { label: 'Somewhat confident', score: 3 },
      { label: 'Not very confident', score: 2 },
      { label: 'Not confident', score: 1 },
    ],
    lowScoreRecKey: 'cosmetic',
  },
  {
    id: 5,
    question: 'Are you interested in cosmetic dental treatments?',
    icon: Sparkles,
    options: [
      { label: 'Yes, very', score: 4 },
      { label: 'Somewhat', score: 3 },
      { label: 'Maybe', score: 2 },
      { label: 'Not really', score: 1 },
    ],
    lowScoreRecKey: 'cosmetic',
  },
]

const allRecommendations: Record<string, Recommendation> = {
  checkup: {
    icon: Calendar,
    title: 'Schedule a Checkup',
    description: 'Regular dental visits at our Centurion practice help catch issues early and keep your oral health on track.',
  },
  hygiene: {
    icon: Shield,
    title: 'Upgrade Your Oral Care',
    description: 'Ask about our professional cleaning and personalised hygiene guidance for a healthier smile at home.',
  },
  discomfort: {
    icon: Heart,
    title: 'Address Discomfort Early',
    description: 'Dental discomfort can signal underlying issues. Our team will diagnose and treat the cause with gentle care.',
  },
  cosmetic: {
    icon: Star,
    title: 'Explore Cosmetic Options',
    description: 'From whitening to veneers, discover treatments that can transform your confidence and your smile.',
  },
}

// ── Animation Variants ─────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const optionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const resultContainerVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── Helper: Score Category ─────────────────────────────
function getScoreCategory(score: number): { label: string; color: string; gradient: string } {
  if (score >= 80) return { label: 'Excellent', color: '#B89830', gradient: 'url(#goldGradient)' }
  if (score >= 60) return { label: 'Good', color: '#3B6FA0', gradient: 'url(#blueGradient)' }
  if (score >= 40) return { label: 'Fair', color: '#D4A030', gradient: 'url(#amberGradient)' }
  return { label: 'Needs Attention', color: '#A63D40', gradient: 'url(#redGradient)' }
}

// ── Score Ring (no useSpring, static SVG transition) ────────────────
function ScoreRing({ score, category }: { score: number; category: ReturnType<typeof getScoreCategory> }) {
  const radius = 80
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative mx-auto flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#D4C08A" />
            <stop offset="100%" stopColor="#B89830" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A2744" />
            <stop offset="50%" stopColor="#5A8DB8" />
            <stop offset="100%" stopColor="#3B6FA0" />
          </linearGradient>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A07D1A" />
            <stop offset="50%" stopColor="#D4C08A" />
            <stop offset="100%" stopColor="#B89830" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B2D2D" />
            <stop offset="50%" stopColor="#C46060" />
            <stop offset="100%" stopColor="#A63D40" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          stroke="rgba(200, 187, 170, 0.15)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated progress */}
        <motion.circle
          stroke={category.gradient}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
      </svg>
      {/* Score number in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-cormorant text-5xl font-light text-ivory text-shadow-gold md:text-6xl"
          style={{ color: category.color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 120 }}
        >
          {score}
        </motion.span>
        <span className="font-jost text-xs uppercase tracking-widest text-ivory/50">
          out of 100
        </span>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────
export default function SmileScoreCalculator() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHeaderVisible(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Calculate score
  const score = useMemo(() => {
    if (!showResults) return 0
    const total = answers.reduce((sum, a) => sum + (a ?? 0), 0)
    return Math.round((total / 20) * 100)
  }, [answers, showResults])

  const category = getScoreCategory(score)

  // Get personalized recommendations based on low-scoring answers
  const recommendations = useMemo(() => {
    if (!showResults) return []
    const seen = new Set<string>()
    const recs: Recommendation[] = []
    questions.forEach((q, i) => {
      const answerScore = answers[i] ?? 0
      if (answerScore <= 2 && !seen.has(q.lowScoreRecKey)) {
        seen.add(q.lowScoreRecKey)
        recs.push(allRecommendations[q.lowScoreRecKey])
      }
    })
    // Always return at least 2
    if (recs.length < 2) {
      const keys = Object.keys(allRecommendations)
      for (const key of keys) {
        if (!seen.has(key) && recs.length < 2) {
          recs.push(allRecommendations[key])
        }
      }
    }
    return recs.slice(0, 3)
  }, [answers, showResults])

  const handleSelect = (scoreValue: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = scoreValue
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setDirection(1)
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 150)
    } else {
      // All done — show results
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1)
      setTimeout(() => setCurrentQuestion((prev) => prev - 1), 150)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(Array(5).fill(null))
    setShowResults(false)
    setDirection(0)
  }

  const CurrentIcon = questions[currentQuestion].icon

  return (
    <section
      id="smile-score"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso py-20 md:py-28"
    >
      {/* Radial gradient overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(184, 152, 48, 0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 80%, rgba(26, 39, 68, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Gold gradient decorative border — top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />
      {/* Gold gradient decorative border — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={headerVisible ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Smile Health Assessment
          </span>
          <h2 className="section-heading gold-gradient-text text-[clamp(2rem,4vw,3.5rem)] font-cormorant font-light">
            Discover Your Smile Score
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-muted">
            Answer 5 quick questions to get your personalised smile health assessment
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl border border-champagne-gold/15 bg-ivory/[0.04]"
        >
          {!showResults ? (
            <div className="p-6 md:p-10">
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-jost text-xs font-medium uppercase tracking-wider text-ivory/40">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="font-jost text-xs font-semibold text-champagne-gold">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-ivory/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-champagne-gold to-gold-light"
                    initial={{ width: '0%' }}
                    animate={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>

              {/* Step Dots */}
              <div className="mb-8 flex items-center justify-center gap-2">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i < currentQuestion
                        ? 'w-6 bg-champagne-gold'
                        : i === currentQuestion
                          ? 'w-2 border border-champagne-gold bg-transparent'
                          : 'w-2 bg-ivory/20'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestion}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="mb-8 flex items-center gap-3">
                    {/* Step number — static glow */}
                    <div className="relative">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-champagne-gold/10">
                        <CurrentIcon className="h-5 w-5 text-champagne-gold" />
                      </div>
                    </div>
                    <h3 className="font-dm-serif text-xl text-ivory md:text-2xl">
                      {questions[currentQuestion].question}
                    </h3>
                  </div>

                  {/* Options as horizontal cards */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {questions[currentQuestion].options.map((option, i) => {
                      const isSelected = answers[currentQuestion] === option.score
                      return (
                        <motion.button
                          key={option.label}
                          custom={i}
                          variants={optionVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{
                            y: -2,
                            boxShadow: isSelected
                              ? '0 8px 24px -4px rgba(184, 152, 48, 0.3)'
                              : '0 4px 16px -4px rgba(0, 0, 0, 0.2)',
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSelect(option.score)}
                          className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border px-4 py-4 text-center transition-colors duration-300 md:px-6 md:py-5 ${
                            isSelected
                              ? 'border-champagne-gold/60 bg-champagne-gold/10 shadow-gold'
                              : 'border-soft-border/20 bg-card/10 text-ivory hover:border-champagne-gold/30 hover:bg-card/15'
                          }`}
                        >
                          <span className="font-jost text-sm md:text-base">{option.label}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleBack}
                  className="mt-6 inline-flex items-center gap-2 font-jost text-xs font-medium uppercase tracking-wider text-ivory/40 transition-colors hover:text-champagne-gold"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous Question
                </motion.button>
              )}
            </div>
          ) : (
            /* Results Screen */
            <motion.div
              variants={resultContainerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 md:p-10"
            >
              {/* Gold gradient border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  padding: '2px',
                  background:
                    'linear-gradient(135deg, #B89830 0%, #D4C08A 30%, #B89830 60%, #1A2744 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Score Ring */}
              <div className="mb-6">
                <ScoreRing score={score} category={category} />
              </div>

              {/* Category Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="mb-8 text-center"
              >
                <span
                  className="inline-block font-cormorant text-2xl font-light text-shadow-gold md:text-3xl"
                  style={{ color: category.color }}
                >
                  {category.label}
                </span>
                <p className="mt-2 font-jost text-sm text-ivory/50">
                  {score >= 80
                    ? 'Your smile health is outstanding! Keep up the great work.'
                    : score >= 60
                      ? 'Good foundations — a few small improvements can make a big difference.'
                      : score >= 40
                        ? "There's room for improvement. Let us help you get on track."
                        : "Your smile deserves attention. We're here to help every step of the way."}
                </p>
              </motion.div>

              {/* Personalized Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mb-8 space-y-3"
              >
                <span className="mb-3 block text-center font-jost text-[10px] font-semibold uppercase tracking-wider text-ivory/40">
                  Personalised Recommendations
                </span>
                {recommendations.map((rec, i) => {
                  const RecIcon = rec.icon
                  return (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + i * 0.12, duration: 0.4 }}
                      className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-ivory/[0.04] p-4"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-champagne-gold/10">
                        <RecIcon className="h-4 w-4 text-champagne-gold" />
                      </div>
                      <div>
                        <span className="block font-dm-serif text-sm text-ivory">
                          {rec.title}
                        </span>
                        <span className="block mt-0.5 font-jost text-xs leading-relaxed text-ivory/50">
                          {rec.description}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full chrome-gold-bg px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-gold"
                >
                  Book Your Free Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <button
                  onClick={handleRestart}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-ivory/20 px-6 py-3 font-jost text-xs font-medium uppercase tracking-wider text-ivory/60 transition-all duration-300 hover:border-champagne-gold/40 hover:text-champagne-gold"
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
                  Retake Quiz
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
