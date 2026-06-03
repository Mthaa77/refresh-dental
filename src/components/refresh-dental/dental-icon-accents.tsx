import { Smile, Shield, Zap, CheckCircle } from 'lucide-react'

/* ─────────────────────────────────────────────
   Subtle Dental Icon Accents for UI Enrichment
   ───────────────────────────────────────────── */

export function SmileAccent({
  size = 'sm',
  className = '',
  animate = false,
}: {
  size?: 'xs' | 'sm' | 'md'
  className?: string
  animate?: boolean
}) {
  const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5' }
  const animClass = animate ? 'float-gentle' : ''

  return (
    <Smile
      className={`${sizeMap[size]} ${animClass} inline text-champagne-gold opacity-70 ${className}`}
      strokeWidth={2.5}
    />
  )
}

export function ShieldAccent({
  size = 'sm',
  className = '',
  animate = false,
}: {
  size?: 'xs' | 'sm' | 'md'
  className?: string
  animate?: boolean
}) {
  const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5' }
  const animClass = animate ? 'float-gentle' : ''

  return (
    <Shield
      className={`${sizeMap[size]} ${animClass} inline text-sapphire-light opacity-70 ${className}`}
      strokeWidth={2.5}
    />
  )
}

export function ZapAccent({
  size = 'sm',
  className = '',
  animate = false,
}: {
  size?: 'xs' | 'sm' | 'md'
  className?: string
  animate?: boolean
}) {
  const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5' }
  const animClass = animate ? 'float-gentle' : ''

  return (
    <Zap
      className={`${sizeMap[size]} ${animClass} inline text-champagne-gold opacity-70 ${className}`}
      strokeWidth={2.5}
    />
  )
}

export function CheckAccent({
  size = 'sm',
  className = '',
  animate = false,
}: {
  size?: 'xs' | 'sm' | 'md'
  className?: string
  animate?: boolean
}) {
  const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5' }
  const animClass = animate ? 'float-gentle' : ''

  return (
    <CheckCircle
      className={`${sizeMap[size]} ${animClass} inline text-sapphire-light opacity-70 ${className}`}
      strokeWidth={2.5}
    />
  )
}

/* ─────────────────────────────────────────────
   Inline Icon Enrichment Helpers
   ───────────────────────────────────────────── */

export function DentalIconBadge({
  icon: Icon,
  text,
  color = 'text-champagne-gold',
}: {
  icon: React.ComponentType<any>
  text: string
  color?: string
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${color} opacity-80`}>
      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
      <span className="text-xs font-semibold">{text}</span>
    </span>
  )
}
