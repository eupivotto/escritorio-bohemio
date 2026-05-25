import { cn } from '@/lib/cn'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type ButtonProps<T extends ElementType = 'button'> = {
  variant?: Variant
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'variant'>

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-terra text-cream-50 hover:bg-[#9e4625] focus-visible:ring-accent-terra',
  secondary:
    'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-cream-50 focus-visible:ring-ink-900',
  ghost:
    'ghost text-ink-700 hover:text-ink-900 hover:bg-cream-100 focus-visible:ring-ink-400',
}

export function Button<T extends ElementType = 'button'>({
  variant = 'primary',
  as,
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Tag = (as ?? 'button') as ElementType
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5',
        'font-sans text-[15px] font-medium leading-none',
        'transition-colors duration-[var(--duration-quick)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
