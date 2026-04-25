'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles, Calendar, Zap, Heart, Smile, Check } from 'lucide-react'

interface Question {
  id: number
  question: string
  icon: React.ElementType
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your primary concern?",
    icon: Heart,
    options: ['Teeth Discolouration', 'Missing Teeth', 'Crooked Teeth', 'Gum Problems', 'General Checkup'],
  },
  {
    id: 2,
    question: 'How long have you been considering treatment?',
    icon: Calendar,
    options: ['Just started', 'A few weeks', 'A few months', 'Over a year'],
  },
  {
    id: 3,
    question: "What's most important to you?",
    icon: Zap,
    options: ['Quick results', 'Natural look', 'Pain-free experience', 'Affordable options'],
  },
]

interface TreatmentResult {
  title: string
  description: string
  icon: React.ElementType
  benefits: string[]
}

function getRecommendation(answers: string[]): TreatmentResult {
  const primary = answers[0]
  const timeline = answers[1]
  const priority = answers[2]

  const recommendations: Record<string, TreatmentResult> = {
    'Teeth Discolouration': {
      title: 'Teeth Whitening',
      description:
        'Our professional teeth whitening treatment uses advanced whitening systems supervised by Dr. Malunga. Most patients see brilliant results in just one session — a safe, effective way to restore your smile\'s natural radiance.',
      icon: Sparkles,
      benefits: ['Up to 8 shades brighter', 'Single session results', 'Enamel-safe formula'],
    },
    'Missing Teeth': {
      title: 'Dental Implants',
      description:
        'Dental implants are the gold standard for replacing missing teeth. Our implant solutions look, feel, and function like natural teeth. With proper care, they can last a lifetime — giving you complete confidence in your smile.',
      icon: Zap,
      benefits: ['Lifetime durability', 'Natural appearance', 'Preserves jaw bone'],
    },
    'Crooked Teeth': {
      title: 'Clear Aligners (Slimming Wires)',
      description:
        'Our virtually invisible clear aligners gradually straighten your teeth without metal braces. They\'re removable, comfortable, and perfect for adults and teens who want a discreet path to a perfectly aligned smile.',
      icon: Smile,
      benefits: ['Virtually invisible', 'Removable design', '12-18 month treatment'],
    },
    'Gum Problems': {
      title: 'Periodontal Care',
      description:
        'Healthy gums are the foundation of a beautiful smile. Our comprehensive gum care programme includes deep cleaning, periodontal therapy, and personalised maintenance plans to restore and protect your gum health.',
      icon: Heart,
      benefits: ['Deep cleaning therapy', 'Personalised plans', 'Prevents tooth loss'],
    },
    'General Checkup': {
      title: 'Comprehensive Dental Consultation',
      description:
        'Start your journey with a thorough 30-minute assessment. Dr. Malunga will evaluate your oral health, address any concerns, and create a personalised treatment plan tailored to your unique needs and goals.',
      icon: Calendar,
      benefits: ['30-minute assessment', 'Full oral evaluation', 'Personalised plan'],
    },
  }

  const base = recommendations[primary] || recommendations['General Checkup']

  if (priority === 'Quick results' && primary === 'Crooked Teeth') {
    return {
      ...base,
      title: 'Accelerated Clear Aligners',
      description:
        'For faster results, we offer accelerated clear aligner treatment with targeted protocols. Combined with professional monitoring, this approach can deliver visible improvements in a shorter timeframe.',
      icon: Zap,
      benefits: ['Faster treatment time', 'Professional monitoring', 'Targeted protocols'],
    }
  }

  if (priority === 'Affordable options' && primary === 'Missing Teeth') {
    return {
      ...base,
      title: 'Dental Prosthesis',
      description:
        'Our custom dental prostheses offer a reliable and cost-effective solution for replacing missing teeth. Crafted with precision and care, they restore both function and aesthetics to your smile.',
      icon: Smile,
      benefits: ['Cost-effective solution', 'Custom crafted', 'Natural aesthetics'],
    }
  }

  return base
}

// Confetti / sparkle burst particles
const confettiParticles = [
  { x: '15%', y: '20%', size: 8, color: '#B89830', delay: 0, duration: 1.2, yEnd: -40 },
  { x: '80%', y: '15%', size: 6, color: '#D4C08A', delay: 0.05, duration: 1.0, yEnd: -35 },
  { x: '50%', y: '10%', size: 7, color: '#2D6B5C', delay: 0.1, duration: 1.4, yEnd: -45 },
  { x: '25%', y: '25%', size: 5, color: '#B89830', delay: 0.15, duration: 1.1, yEnd: -30 },
  { x: '70%', y: '18%', size: 6, color: '#F0EBE1', delay: 0.08, duration: 1.3, yEnd: -38 },
  { x: '40%', y: '22%', size: 5, color: '#B89830', delay: 0.12, duration: 1.0, yEnd: -32 },
  { x: '60%', y: '12%', size: 7, color: '#D4C08A', delay: 0.03, duration: 1.5, yEnd: -42 },
  { x: '35%', y: '28%', size: 4, color: '#2D6B5C', delay: 0.18, duration: 1.2, yEnd: -28 },
  { x: '55%', y: '16%', size: 6, color: '#F0EBE1', delay: 0.07, duration: 1.1, yEnd: -36 },
  { x: '85%', y: '24%', size: 5, color: '#B89830', delay: 0.14, duration: 1.3, yEnd: -34 },
  { x: '10%', y: '30%', size: 4, color: '#D4C08A', delay: 0.2, duration: 1.0, yEnd: -26 },
  { x: '75%', y: '20%', size: 6, color: '#B89830', delay: 0.06, duration: 1.4, yEnd: -40 },
]

const confettiBurst = (p: { delay: number; duration: number; yEnd: number }) => ({
  opacity: [0, 1, 1, 0],
  scale: [0, 1.2, 0.8, 0],
  y: [0, p.yEnd * 0.3, p.yEnd * 0.7, p.yEnd],
  rotate: [0, 90, 200, 360],
  transition: {
    duration: p.duration,
    delay: p.delay,
    ease: 'easeOut',
  },
})

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const optionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const resultVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Tooth SVG watermark
function ToothWatermark() {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-64 w-64 md:h-80 md:w-80"
      style={{ opacity: 0.02 }}
    >
      <path
        d="M50 10C35 10 22 18 18 32C14 46 18 62 22 78C24 88 26 95 30 100C32 103 35 102 37 98C40 92 43 82 50 82C57 82 60 92 63 98C65 102 68 103 70 100C74 95 76 88 78 78C82 62 86 46 82 32C78 18 65 10 50 10Z"
        fill="#B89830"
      />
    </svg>
  )
}

export default function SmileAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [direction, setDirection] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHeaderVisible(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const handleSelect = (option: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = option
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setDirection(1)
      setTimeout(() => setCurrentStep(currentStep + 1), 150)
    } else {
      setShowResult(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setTimeout(() => setCurrentStep(currentStep - 1), 150)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers([])
    setDirection(0)
    setShowResult(false)
    setShowConfetti(false)
  }

  const result = answers.length === 3 ? getRecommendation(answers) : null
  const ResultIcon = result?.icon || Sparkles
  const CurrentIcon = questions[currentStep].icon

  return (
    <section id="smile-assessment" ref={sectionRef} className="relative overflow-hidden bg-sand py-20 md:py-28">
      {/* Tooth watermark background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <ToothWatermark />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={headerVisible ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            Personalised Recommendation
          </span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-espresso">
            Discover Your Perfect Smile
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-muted">
            Take our quick 3-step assessment and find out which treatment is right for you.
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl border border-soft-border bg-white shadow-sm"
        >
          {/* Confetti / sparkle burst overlay */}
          <AnimatePresence>
            {showConfetti && (
              <div className="pointer-events-none absolute inset-0 z-50">
                {confettiParticles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                    }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={confettiBurst(p)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {!showResult ? (
            <div className="p-6 md:p-10">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-jost text-xs font-medium uppercase tracking-wider text-brown-muted/80">
                    Step {currentStep + 1} of {questions.length}
                  </span>
                  <span className="font-jost text-xs font-semibold text-champagne-gold">
                    {Math.round(((currentStep + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-soft-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-champagne-gold to-gold-light"
                    initial={{ width: '0%' }}
                    animate={{
                      width: `${((currentStep + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="mb-8 flex items-center gap-3">
                    {/* Step number with pulsing glow */}
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-champagne-gold/20 blur-md"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-champagne-gold/10">
                        <CurrentIcon className="h-5 w-5 text-champagne-gold" />
                      </div>
                    </div>
                    <h3 className="font-dm-serif text-xl text-espresso md:text-2xl">
                      {questions[currentStep].question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentStep].options.map((option, i) => {
                      const isSelected = answers[currentStep] === option
                      return (
                        <motion.button
                          key={option}
                          custom={i}
                          variants={optionVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{
                            y: -2,
                            boxShadow: isSelected
                              ? '0 8px 24px -4px rgba(184, 152, 48, 0.2)'
                              : '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelect(option)}
                          className={`relative flex w-full items-center justify-between overflow-hidden rounded-2xl border-2 px-5 py-4 text-left transition-colors duration-300 md:px-6 md:py-5 ${
                            isSelected
                              ? 'border-champagne-gold bg-champagne-gold/5'
                              : 'border-soft-border bg-white hover:border-champagne-gold/30 hover:bg-champagne-gold/[0.02]'
                          }`}
                        >
                          <span className="font-jost text-sm md:text-base text-espresso">
                            {option}
                          </span>
                          <motion.span
                            animate={{
                              scale: isSelected ? 1 : 0,
                              opacity: isSelected ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                            }}
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold"
                          >
                            <motion.div
                              animate={isSelected ? { scale: [0, 1.3, 1], rotate: [0, 10, 0] } : {}}
                              transition={{ duration: 0.35 }}
                            >
                              <Check className="h-3 w-3 text-white" />
                            </motion.div>
                          </motion.span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Back Button */}
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleBack}
                  className="mt-6 inline-flex items-center gap-2 font-jost text-xs font-medium uppercase tracking-wider text-brown-muted/80 transition-colors hover:text-champagne-gold"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous Step
                </motion.button>
              )}
            </div>
          ) : result ? (
            /* Result Card with gold gradient border */
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              className="relative p-6 md:p-10"
            >
              {/* Gold gradient border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  padding: '2px',
                  background: 'linear-gradient(135deg, #B89830 0%, #D4C08A 30%, #B89830 60%, #2D6B5C 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-champagne-gold to-gold-light shadow-lg"
                >
                  <ResultIcon className="h-8 w-8 text-white" />
                </motion.div>

                <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
                  We Recommend
                </span>
                <h3 className="font-cormorant text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-tight text-espresso">
                  {result.title}
                </h3>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-8 text-center font-jost text-sm font-light leading-relaxed text-brown-muted"
              >
                {result.description}
              </motion.p>

              {/* Animated treatment benefit icons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-8 flex flex-wrap items-center justify-center gap-3"
              >
                {result.benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.55 + i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 px-3 py-1.5"
                  >
                    <Sparkles className="h-3 w-3 text-champagne-gold" />
                    <span className="font-jost text-xs font-medium text-champagne-gold">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Answers Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="mb-8 rounded-2xl border border-soft-border bg-sand/50 p-4"
              >
                <span className="mb-3 block font-jost text-[10px] font-semibold uppercase tracking-wider text-brown-muted/70">
                  Your Responses
                </span>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={q.id} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold/10 font-jost text-[10px] font-semibold text-champagne-gold">
                        {i + 1}
                      </span>
                      <div>
                        <span className="block font-jost text-xs text-brown-muted/80">{q.question}</span>
                        <span className="block font-jost text-xs font-medium text-espresso">
                          {answers[i]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-champagne-gold px-8 py-3.5 font-jost text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-champagne-gold/90 hover:shadow-lg"
                >
                  Book Your Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <button
                  onClick={handleRestart}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-soft-border px-6 py-3 font-jost text-xs font-medium uppercase tracking-wider text-brown-muted/90 transition-all duration-300 hover:border-champagne-gold/40 hover:text-champagne-gold"
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
                  Retake Assessment
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
