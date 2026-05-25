type Testimonial = {
  text: string
  author: string
  role?: string
}

const testimonials: Testimonial[] = [
  {
    text: 'O almoço do Escritório de Bohemio é a melhor pausa do dia. Comida caseira de verdade, no coração da cidade.',
    author: 'Ana Paula M.',
    role: 'Cliente fiel',
  },
  {
    text: 'Contratamos para o coffee break da empresa e foi um sucesso. Profissionalismo e sabor em cada detalhe.',
    author: 'Rodrigo S.',
    role: 'Gerente de RH',
  },
  {
    text: 'O prato do dia de sexta é simplesmente inesquecível.',
    author: 'Carla F.',
  },
  {
    text: 'Ambiente acolhedor e comida que lembra o almoço de domingo em casa.',
    author: 'Marcos T.',
  },
]

export function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section className="bg-cream-200 px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-sans text-4xl font-bold text-ink-900">
          O que dizem nossos clientes
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Featured testimonial — spans 2 rows visually */}
          {featured && (
            <div className="rounded-xl bg-cream-50 p-8 shadow-sm md:col-span-1 md:row-span-2">
              <p className="font-sans text-[17px] leading-relaxed text-ink-900">
                &ldquo;{featured.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-cream-300 pt-4">
                <p className="font-sans text-[14px] font-medium text-ink-900">
                  {featured.author}
                </p>
                {featured.role && (
                  <p className="mt-0.5 font-mono text-[12px] text-ink-400">
                    {featured.role}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Smaller testimonials */}
          {rest.map((t) => (
            <div key={t.author} className="rounded-xl bg-cream-50 p-6 shadow-sm">
              <p className="font-sans text-[15px] leading-relaxed text-ink-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-cream-300 pt-3">
                <p className="font-sans text-[13px] font-medium text-ink-900">
                  {t.author}
                </p>
                {t.role && (
                  <p className="mt-0.5 font-mono text-[11px] text-ink-400">
                    {t.role}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
