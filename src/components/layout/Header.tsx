'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const navLinks = [
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/a-casa', label: 'A Casa' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/para-empresas', label: 'Para Empresas' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-[var(--duration-quick)]',
        scrolled
          ? 'bg-cream-200/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-sans text-[15px] font-bold tracking-tight text-ink-900"
        >
          Escritório de Bohemio
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-sans text-[14px] transition-colors duration-[var(--duration-quick)]',
                pathname === href
                  ? 'text-ink-900 font-medium'
                  : 'text-ink-700 hover:text-ink-900',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className={cn(
              'h-0.5 w-5 bg-ink-900 transition-transform duration-[var(--duration-quick)]',
              menuOpen && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-5 bg-ink-900 transition-opacity duration-[var(--duration-quick)]',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-5 bg-ink-900 transition-transform duration-[var(--duration-quick)]',
              menuOpen && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-cream-300 bg-cream-50 px-6 py-4 md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block py-3 font-sans text-[15px] transition-colors',
                pathname === href
                  ? 'text-ink-900 font-medium'
                  : 'text-ink-700 hover:text-ink-900',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
