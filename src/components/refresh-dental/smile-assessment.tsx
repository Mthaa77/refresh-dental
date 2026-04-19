'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles, Calendar, Zap, Heart, Smile } from 'lucide-react'

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
    },
    'Missing Teeth': {
      title: 'Dental Implants',
      description:
        'Dental implants are the gold standard for replacing missing teeth. Our implant solutions look, feel, and function like natural teeth. With proper care, they can last a lifetime — giving you complete confidence in your smile.',
      icon: Zap,
    },
    'Crooked Teeth': {
      title: 'Clear Aligners (Slimming Wires)',
      description:
        'Our virtually invisible clear aligners gradually straighten your teeth without metal braces. They\'re removable, comfortable, and perfect for adults and teens who want a discreet path to a perfectly aligned smile.',
      icon: Smile,
    },
    'Gum Problems': {
      title: 'Periodontal Care',
      description:
        'Healthy gums are the foundation of a beautiful smile. Our comprehensive gum care programme includes deep cleaning, periodontal therapy, and personalised maintenance plans to restore and protect your gum health.',
      icon: Heart,
    },
    'General Checkup': {
      title: 'Comprehensive Dental Consultation',
      description:
        'Start your journey with a thorough 30-minute assessment. Dr. Malunga will evaluate your oral health, address any concerns, and create a personalised treatment plan tailored to your unique needs and goals.',
      icon: Calendar,
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
    }
  }

  if (priority === 'Affordable options' && primary === 'Missing Teeth') {
    return {
      ...base,
      title: 'Dental Prosthesis',
      description:
        'Our custom dental prostheses offer a reliable and cost-effective solution for replacing missing teeth. Crafted with precision and care, they restore both function and aesthetics to your smile.',
      icon: Smile,
    }
  }

  return base
}

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

export default function SmileAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [direction, setDirection] = useState(0)
  const [showResult, setShowResult] = useState(false)
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
  }

  const result = answers.length === 3 ? getRecommendation(answers) : null
  const ResultIcon = result?.icon || Sparkles
  const CurrentIcon = questions[currentStep].icon

  return (
    <section id="smile-assessment" ref={sectionRef} className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <p className="mx-auto mt-4 max-w-lg font-jost text-sm leading-relaxed text-brown-warm/70">
            Take our quick 3-step assessment and find out which treatment is right for you.
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden rounded-3xl border border-soft-border bg-white shadow-sm"
        >
          {!showResult ? (
            <div className="p-6 md:p-10">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-jost text-xs font-medium uppercase tracking-wider text-brown-warm/50">
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne-gold/10">
                      <CurrentIcon className="h-5 w-5 text-champagne-gold" />
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
                              ? '0 8px 24px -4px rgba(201, 169, 110, 0.2)'
                              : '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelect(option)}
                          className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left transition-colors duration-300 md:px-6 md:py-5 ${
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
                            transition={{ duration: 0.25 }}
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold"
                          >
                            <Sparkles className="h-3 w-3 text-white" />
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
                  className="mt-6 inline-flex items-center gap-2 font-jost text-xs font-medium uppercase tracking-wider text-brown-warm/50 transition-colors hover:text-champagne-gold"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous Step
                </motion.button>
              )}
            </div>
          ) : result ? (
            /* Result Card */
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              className="p-6 md:p-10"
            >
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
                className="mb-8 text-center font-jost text-sm font-light leading-relaxed text-brown-warm/80"
              >
                {result.description}
              </motion.p>

              {/* Answers Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-8 rounded-2xl border border-soft-border bg-sand/50 p-4"
              >
                <span className="mb-3 block font-jost text-[10px] font-semibold uppercase tracking-wider text-brown-warm/40">
                  Your Responses
                </span>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={q.id} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-champagne-gold/10 font-jost text-[10px] font-semibold text-champagne-gold">
                        {i + 1}
                      </span>
                      <div>
                        <span className="block font-jost text-xs text-brown-warm/50">{q.question}</span>
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
                transition={{ delay: 0.65, duration: 0.5 }}
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
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-soft-border px-6 py-3 font-jost text-xs font-medium uppercase tracking-wider text-brown-warm/60 transition-all duration-300 hover:border-champagne-gold/40 hover:text-champagne-gold"
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
