type ColourRibbonProps = {
  variant?: 'warm' | 'cool' | 'prism'
}

const variants = {
  warm: {
    line: 'from-transparent via-amber-300/80 to-transparent',
    glow: 'from-rose-300/0 via-amber-300/25 to-orange-300/0',
    dots: ['bg-rose-300', 'bg-amber-300', 'bg-orange-300'],
  },
  cool: {
    line: 'from-transparent via-teal-300/80 to-transparent',
    glow: 'from-sky-300/0 via-teal-300/25 to-violet-300/0',
    dots: ['bg-sky-300', 'bg-teal-300', 'bg-violet-300'],
  },
  prism: {
    line: 'from-amber-300/0 via-rose-300/85 to-sky-300/0',
    glow: 'from-amber-300/0 via-violet-300/28 to-sky-300/0',
    dots: ['bg-amber-300', 'bg-rose-300', 'bg-violet-300', 'bg-sky-300', 'bg-teal-300'],
  },
} as const

export default function ColourRibbon({ variant = 'prism' }: ColourRibbonProps) {
  const palette = variants[variant]

  return (
    <div aria-hidden="true" className="relative z-20 h-12 overflow-hidden bg-[#120f17] sm:h-14">
      <div className={`absolute inset-x-[8%] top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r ${palette.glow} blur-2xl`} />
      <div className={`absolute inset-x-[5%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r ${palette.line}`} />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.65)_1px,transparent_1.4px)] [background-size:18px_18px] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        {palette.dots.map((dot, index) => (
          <span key={`${variant}-${index}`} className={`h-1.5 w-1.5 rounded-full ${dot} shadow-[0_0_14px_currentColor]`} />
        ))}
      </div>
    </div>
  )
}
