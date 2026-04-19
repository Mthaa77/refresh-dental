'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'gold-line' | 'ornament' | 'dots'
  className?: string
}

function GoldLineDivider() {
  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Left line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-champagne-gold/40 to-champagne-gold" />
      {/* Diamond center */}
      <div className="mx-3 flex h-5 w-5 rotate-45 items-center justify-center">
        <div className="h-3.5 w-3.5 border border-champagne-gold/80 bg-champagne-gold/20" />
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
        viewBox="0 0 60 20"
        className="w-16 h-4 text-champagne-gold/50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 10C45 10 35 2 20 10C15 12 8 14 0 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="20" cy="10" r="1.5" fill="currentColor" />
      </svg>
      {/* Center ornament */}
      <div className="mx-2 flex flex-col items-center gap-0.5">
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-champagne-gold" />
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-champagne-gold"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
        </svg>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-champagne-gold" />
      </div>
      {/* Right flourish */}
      <svg
        viewBox="0 0 60 20"
        className="w-16 h-4 text-champagne-gold/50 rotate-180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 10C45 10 35 2 20 10C15 12 8 14 0 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="20" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}

function DotsDivider() {
  return (
    <div className="flex items-center justify-center gap-2.5 w-full">
      <div className="h-1.5 w-1.5 rounded-full bg-champagne-gold/40" />
      <div className="h-2 w-2 rounded-full bg-champagne-gold" />
      <div className="h-1.5 w-1.5 rounded-full bg-champagne-gold/40" />
    </div>
  )
}

const dividerComponents = {
  'gold-line': GoldLineDivider,
  ornament: OrnamentDivider,
  dots: DotsDivider,
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
