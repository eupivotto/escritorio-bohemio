import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

type Variant = 'success' | 'warning' | 'danger' | 'neutral' | 'outline' | 'accent' | 'filter'

type BadgeProps = {
  variant?: Variant
  active?: boolean
} & HTMLAttributes<HTMLSpanElement>

const variantClasses: Record<Variant, string> = {
  success: 'success bg-success/10 text-success border-success/20',
  warning: 'warning bg-warning/10 text-warning border-warning/20',
  danger: 'danger bg-danger/10 text-danger border-danger/20',
  neutral: 'neutral bg-cream-100 text-ink-700 border-cream-300',
  outline: 'outline border-ink-400 text-ink-700',
  accent: 'accent bg-accent-mustard/10 text-accent-mustard border-accent-mustard/20',
  filter: 'filter border-cream-300 text-ink-700 hover:border-ink-400 cursor-pointer',
}

const activeFilterClasses = 'active !border-ink-900 !text-ink-900 bg-ink-900/5 font-medium'

export function Badge({
  variant = 'neutral',
  active = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1',
        'font-mono text-[12px] leading-none tracking-wide',
        'transition-colors duration-[var(--duration-quick)]',
        variantClasses[variant],
        active && activeFilterClasses,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
