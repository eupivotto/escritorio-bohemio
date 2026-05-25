import Link from 'next/link'
import { WHATSAPP_LINKS } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-200">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-sans text-[15px] font-bold text-cream-50">
            Escritório de Bohemio
          </p>
          <p className="mt-2 font-sans text-[13px] text-ink-400">
            Restaurante com alma.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
            Navegação
          </p>
          <ul className="space-y-2">
            {[
              { href: '/cardapio', label: 'Cardápio' },
              { href: '/a-casa', label: 'A Casa' },
              { href: '/eventos', label: 'Eventos' },
              { href: '/para-empresas', label: 'Para Empresas' },
              { href: '/contato', label: 'Contato' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-sans text-[14px] text-cream-300 transition-colors hover:text-cream-50"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
            Contato
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={WHATSAPP_LINKS.geral}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[14px] text-cream-300 transition-colors hover:text-cream-50"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/escritoriodebohemio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[14px] text-cream-300 transition-colors hover:text-cream-50"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Horário */}
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-400">
            Horário
          </p>
          <p className="font-mono text-[13px] text-cream-300">
            Seg – Sex · 11h às 15h
          </p>
          <p className="mt-1 font-mono text-[13px] text-cream-300">
            Sáb · 11h às 15h
          </p>
          <p className="mt-1 font-mono text-[13px] text-ink-400">
            Dom · fechado
          </p>
        </div>
      </div>

      <div className="border-t border-ink-700 px-6 py-6">
        <p className="mx-auto max-w-6xl font-mono text-[11px] text-ink-400">
          © {new Date().getFullYear()} Escritório de Bohemio · Campo Grande, MS
        </p>
      </div>
    </footer>
  )
}
