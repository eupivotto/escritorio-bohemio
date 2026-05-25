import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { getPratoDoDia } from '@/lib/prato-do-dia'

const DIA_LABELS: Record<string, string> = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
}

type Prato = {
  name: string
  description: string
  price: string
  badges?: Array<{ label: string; variant: 'success' | 'accent' | 'neutral' }>
}

const pratos: Prato[] = [
  {
    name: 'Prato do dia',
    description: 'Preparado diariamente com ingredientes frescos. Consulte o cardápio do dia.',
    price: 'consulte',
    badges: [{ label: 'Destaque', variant: 'accent' }],
  },
  {
    name: 'Opção vegetariana',
    description: 'Prato sem carne com proteína vegetal e acompanhamentos da estação.',
    price: 'consulte',
    badges: [{ label: 'Vegetariano', variant: 'success' }],
  },
  {
    name: 'Marmita para viagem',
    description: 'Prato do dia em embalagem prática para levar. Disponível durante o almoço.',
    price: 'consulte',
  },
]

const guarnicoes: Prato[] = [
  { name: 'Arroz branco', description: 'Arroz branco soltinho.', price: 'incluso' },
  { name: 'Feijão', description: 'Feijão caldo temperado na hora.', price: 'incluso' },
  { name: 'Salada da estação', description: 'Salada fresca com vegetais da época.', price: 'incluso' },
  { name: 'Pão de fermentação natural', description: 'Assado diariamente na casa.', price: 'incluso' },
]

type Bebida = {
  name: string
  details: string
  price: string
}

const bebidas: Bebida[] = [
  { name: 'Água mineral', details: '500 ml · com ou sem gás', price: 'consulte' },
  { name: 'Refrigerante', details: 'Lata 350 ml', price: 'consulte' },
  { name: 'Cerveja', details: 'Long neck 355 ml', price: 'consulte' },
]

export default function CardapioPage() {
  const pratoDoDia = getPratoDoDia()

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Page hero */}
      <section className="bg-cream-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-ink-400">
            Escritório de Bohemio
          </p>
          <h1 className="font-sans text-5xl font-bold text-ink-900 md:text-6xl">
            Cardápio
          </h1>
          <p className="mt-4 font-sans text-[17px] text-ink-700">
            Almoço executivo de segunda a sábado, das 11h às 15h.
          </p>
        </div>
      </section>

      {/* Prato do dia destaque */}
      <section className="px-6 py-12 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-xl bg-ink-900 md:flex">
            <div className="relative aspect-video md:aspect-auto md:w-2/5">
              <Image
                src={pratoDoDia.imagePath}
                alt={`Prato do dia — ${DIA_LABELS[pratoDoDia.slug]}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-3/5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">
                Hoje · {DIA_LABELS[pratoDoDia.slug]}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-bold text-cream-50">
                Prato do dia
              </h2>
              <p className="mt-2 font-sans text-[15px] text-cream-300">
                Preparado com ingredientes frescos. Consulte a equipe para o prato de hoje.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pratos */}
      <section className="px-6 pb-12 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-sans text-2xl font-bold text-ink-900">Pratos</h2>
          <ul className="divide-y divide-cream-300 rounded-xl bg-cream-50">
            {pratos.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-6 px-6 py-5">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-sans text-[16px] font-medium text-ink-900">
                      {item.name}
                    </h3>
                    {item.badges?.map((b) => (
                      <Badge key={b.label} variant={b.variant}>
                        {b.label}
                      </Badge>
                    ))}
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

      {/* Guarnições */}
      <section className="px-6 pb-12 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-sans text-2xl font-bold text-ink-900">Guarnições</h2>
          <ul className="divide-y divide-cream-300 rounded-xl bg-cream-50">
            {guarnicoes.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-6 px-6 py-5">
                <div className="flex-1">
                  <h3 className="font-sans text-[16px] font-medium text-ink-900">
                    {item.name}
                  </h3>
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

      {/* Bebidas */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-sans text-2xl font-bold text-ink-900">Bebidas</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {bebidas.map((item) => (
              <div
                key={item.name}
                className="rounded-xl bg-cream-50 p-6 shadow-sm"
              >
                <h3 className="font-sans text-[16px] font-medium text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-1 font-mono text-[12px] text-ink-400">
                  {item.details}
                </p>
                <p className="mt-4 font-mono text-[14px] font-medium text-ink-700">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
