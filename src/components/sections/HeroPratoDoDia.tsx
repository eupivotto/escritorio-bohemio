import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { DiaSlug } from '@/lib/prato-do-dia'

const DIA_LABELS: Record<DiaSlug, string> = {
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
}

type Props = {
  slug: DiaSlug
  imagePath: string
}

export function HeroPratoDoDia({ slug, imagePath }: Props) {
  const diaLabel = DIA_LABELS[slug]

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-ink-900">
      {/* Background image */}
      <Image
        src={imagePath}
        alt={`Prato do dia — ${diaLabel}`}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
        style={{ filter: 'saturate(1.1) brightness(0.85)' }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] flex-col justify-end px-6 pb-20 pt-32 md:px-16">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.15em] text-cream-300">
            Prato do dia · {diaLabel}
          </p>
          <h1 className="font-sans text-5xl font-bold leading-tight text-cream-50 md:text-7xl">
            Almoço feito
            <br />
            com alma.
          </h1>
          <p className="mt-6 font-sans text-[17px] text-cream-200 md:max-w-md">
            Pratos do dia preparados com ingredientes frescos, servidos de
            segunda a sábado.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} href="/cardapio">
              Ver cardápio
            </Button>
            <Button as={Link} href="/a-casa" variant="secondary"
              className="border-cream-300 text-cream-50 hover:bg-cream-50 hover:text-ink-900"
            >
              A casa →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
