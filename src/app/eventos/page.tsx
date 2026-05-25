import { Button } from '@/components/ui/Button'
import { WHATSAPP_LINKS } from '@/lib/config'

const tiposDeEvento = [
  {
    title: 'Noites especiais',
    description:
      'Jantares temáticos com menu fechado, ambientação especial e música ao vivo.',
  },
  {
    title: 'Aniversários e confraternizações',
    description:
      'Reserve o espaço para celebrar datas especiais com grupo de até 40 pessoas.',
  },
  {
    title: 'Jantares corporativos',
    description:
      'Almoços e jantares para equipes, reuniões de diretoria e encontros de negócios.',
  },
]

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-cream-200">
      {/* Page hero */}
      <section className="bg-cream-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-ink-400">
            Noites especiais
          </p>
          <h1 className="font-sans text-5xl font-bold text-ink-900 md:text-6xl">
            Eventos
          </h1>
          <p className="mt-4 font-sans text-[17px] text-ink-700">
            Reserve o Escritório de Bohemio para o seu próximo evento.
          </p>
        </div>
      </section>

      {/* Tipos de evento */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {tiposDeEvento.map((tipo) => (
              <div key={tipo.title} className="rounded-xl bg-cream-50 p-8 shadow-sm">
                <h3 className="font-sans text-[18px] font-bold text-ink-900">
                  {tipo.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-700">
                  {tipo.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-ink-900 px-10 py-14 text-center">
          <h2 className="font-sans text-3xl font-bold text-cream-50">
            Quer organizar algo aqui?
          </h2>
          <p className="mt-3 font-sans text-[16px] text-cream-300">
            Fale com a gente pelo WhatsApp e vamos planejar juntos.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href={WHATSAPP_LINKS.eventos}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
