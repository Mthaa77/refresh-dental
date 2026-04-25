'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'gold-line' | 'ornament' | 'dots' | 'elegant'
  className?: string
}

function GoldLineDivider() {
  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Left line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-champagne-gold/40 to-champagne-gold" />
      {/* Diamond center */}
      <div className="mx-3 flex h-6 w-6 rotate-45 items-center justify-center">
        <div className="h-4 w-4 border border-champagne-gold/80 bg-champagne-gold/20" />
      </div>
      {/* Right line */}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-champagne-gold/40 to-champagne-gold" />
    </div>
  )
}

function OrnamentDivider() {
  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Left flourish */}
      <svg
        viewBox="0 0 80 24"
        className="w-20 h-5 text-champagne-gold/50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 12C65 12 50 2 35 12C30 15 20 18 0 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M70 12C60 12 50 6 40 12"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="35" cy="12" r="2" fill="currentColor" />
        <circle cx="55" cy="12" r="1" fill="currentColor" opacity="0.6" />
      </svg>
      {/* Center ornament */}
      <div className="mx-2 flex flex-col items-center gap-0.5">
        <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-champagne-gold" />
        <svg
          viewBox="0 0 28 28"
          className="h-6 w-6 text-champagne-gold"
          fill="currentColor"
        >
          <path d="M14 0L16.5 10.5L28 14L16.5 17.5L14 28L11.5 17.5L0 14L11.5 10.5Z" />
        </svg>
        <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-champagne-gold" />
      </div>
      {/* Right flourish */}
      <svg
        viewBox="0 0 80 24"
        className="w-20 h-5 text-champagne-gold/50 rotate-180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 12C65 12 50 2 35 12C30 15 20 18 0 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M70 12C60 12 50 6 40 12"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="35" cy="12" r="2" fill="currentColor" />
        <circle cx="55" cy="12" r="1" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  )
}

function DotsDivider() {
  return (
    <div className="flex items-center justify-center gap-3 w-full">
      <div className="h-2 w-2 rounded-full bg-champagne-gold/40" />
      <div className="h-2.5 w-2.5 rounded-full bg-champagne-gold" />
      <div className="h-2 w-2 rounded-full bg-champagne-gold/40" />
    </div>
  )
}

function ElegantDivider() {
  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Left thin gold line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-champagne-gold/60 to-champagne-gold" />

      {/* Left decorative swirl */}
      <svg
        viewBox="0 0 40 20"
        className="w-10 h-5 text-champagne-gold/40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 10C35 10 32 5 28 8C25 10 22 12 18 10C14 8 12 5 8 8C6 9 4 10 0 10"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="18" cy="10" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Center diamond */}
      <div className="mx-2 flex h-5 w-5 rotate-45 items-center justify-center">
        <div className="h-3 w-3 bg-champagne-gold/80" />
      </div>

      {/* Right decorative swirl */}
      <svg
        viewBox="0 0 40 20"
        className="w-10 h-5 text-champagne-gold/40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10C5 10 8 5 12 8C15 10 18 12 22 10C26 8 28 5 32 8C34 9 36 10 40 10"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="22" cy="10" r="1" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Right thin gold line */}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-champagne-gold/60 to-champagne-gold" />
    </div>
  )
}

const dividerComponents = {
  'gold-line': GoldLineDivider,
  ornament: OrnamentDivider,
  dots: DotsDivider,
  elegant: ElegantDivider,
}

export default function SectionDivider({
  variant = 'gold-line',
  className = '',
}: SectionDividerProps) {
  const DividerComponent = dividerComponents[variant]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`mx-auto max-w-[200px] py-4 ${className}`}
    >
      <DividerComponent />
    </motion.div>
  )
}
