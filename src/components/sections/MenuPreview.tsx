import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

type MenuItem = {
  name: string
  description: string
  price: string
  badge?: string
}

const previewItems: MenuItem[] = [
  {
    name: 'Prato do dia',
    description: 'Muda diariamente — preparado com ingredientes frescos da época.',
    price: 'consulte',
    badge: 'Destaque',
  },
  {
    name: 'Opção vegetariana',
    description: 'Prato sem carne, com proteína vegetal e guarnições da estação.',
    price: 'consulte',
    badge: 'Veggie',
  },
  {
    name: 'Marmita para viagem',
    description: 'O mesmo prato do dia em embalagem prática para levar.',
    price: 'consulte',
  },
]

export function MenuPreview() {
  return (
    <section className="bg-cream-200 px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-sans text-4xl font-bold text-ink-900">
            O que servimos
          </h2>
          <Link
            href="/cardapio"
            className="font-sans text-[14px] text-accent-terra transition-colors hover:text-ink-900"
          >
            Ver cardápio completo →
          </Link>
        </div>

        <ul className="divide-y divide-cream-300">
          {previewItems.map((item) => (
            <li key={item.name} className="flex items-start justify-between gap-6 py-6">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-sans text-[17px] font-medium text-ink-900">
                    {item.name}
                  </h3>
                  {item.badge && (
                    <Badge variant={item.badge === 'Veggie' ? 'success' : 'accent'}>
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 font-sans text-[14px] text-ink-700">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[14px] text-ink-400">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
