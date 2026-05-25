import { Button } from '@/components/ui/Button'
import { WHATSAPP_LINKS } from '@/lib/config'

const servicos = [
  {
    title: 'Refeições diárias',
    description:
      'Fornecimento de almoço executivo para refeitórios corporativos. Cardápio variado, entrega pontual.',
    icon: '●',
  },
  {
    title: 'Coffee break',
    description:
      'Café da manhã, intervalos e pausas para reuniões. Montagem no local e atendimento personalizado.',
    icon: '●',
  },
  {
    title: 'Eventos corporativos',
    description:
      'Jantares de confraternização, almoços de diretoria, lançamentos e celebrações empresariais.',
    icon: '●',
  },
]

const passos = [
  { numero: '01', label: 'Fale pelo WhatsApp', descricao: 'Conte o que precisa — data, número de pessoas, tipo de serviço.' },
  { numero: '02', label: 'Receba o orçamento', descricao: 'Enviamos uma proposta personalizada em até 24 horas.' },
  { numero: '03', label: 'Confirme e relaxe', descricao: 'Cuidamos de tudo — produção, montagem e entrega no horário.' },
]

export default function ParaEmpresasPage() {
  return (
    <div className="min-h-screen bg-cream-200">
      {/* Hero — fundo espresso */}
      <section className="bg-ink-900 px-6 py-24 text-center md:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-[12px] uppercase tracking-widest text-ink-400">
            Atendimento externo
          </p>
          <h1 className="font-sans text-5xl font-bold leading-tight text-cream-50 md:text-6xl">
            Para Empresas
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[17px] text-cream-300">
            Refeições corporativas, coffee breaks e eventos empresariais.
            Entregamos o Escritório de Bohemio onde você precisar.
          </p>
          <div className="mt-10">
            <Button
              as="a"
              href={WHATSAPP_LINKS.paraEmpresas}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir orçamento pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-sans text-3xl font-bold text-ink-900">
            O que oferecemos
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {servicos.map((s) => (
              <div key={s.title} className="rounded-xl bg-cream-50 p-8 shadow-sm">
                <span className="font-mono text-[10px] text-accent-terra">{s.icon}</span>
                <h3 className="mt-3 font-sans text-[18px] font-bold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-700">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-cream-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-sans text-3xl font-bold text-ink-900">
            Como funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {passos.map((p) => (
              <div key={p.numero} className="flex gap-6">
                <span className="shrink-0 font-mono text-[32px] font-medium text-accent-terra">
                  {p.numero}
                </span>
                <div>
                  <p className="font-sans text-[17px] font-bold text-ink-900">
                    {p.label}
                  </p>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink-700">
                    {p.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-accent-terra px-6 py-16 text-center md:px-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-bold text-cream-50">
            Pronto para levar o almoço para a sua empresa?
          </h2>
          <p className="mt-3 font-sans text-[16px] text-cream-100">
            Fale com a gente agora pelo WhatsApp e receba um orçamento personalizado.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href={WHATSAPP_LINKS.paraEmpresas}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-accent-terra"
            >
              Falar pelo WhatsApp →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
