import { Gallery } from '@/components/sections/Gallery'

const galleryImages = [
  { src: '/galeria/salao-1.jpg', alt: 'Salão principal' },
  { src: '/galeria/cozinha-1.jpg', alt: 'Cozinha' },
  { src: '/galeria/mesa-1.jpg', alt: 'Mesa posta' },
  { src: '/galeria/balcao-1.jpg', alt: 'Balcão' },
  { src: '/galeria/equipe-1.jpg', alt: 'Equipe' },
]

export default function ACasaPage() {
  return (
    <div className="min-h-screen bg-cream-200">
      {/* Page hero */}
      <section className="bg-cream-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-ink-400">
            Nossa história
          </p>
          <h1 className="font-sans text-5xl font-bold text-ink-900 md:text-6xl">
            A Casa
          </h1>
          <p className="mt-4 font-sans text-[17px] text-ink-700">
            Um lugar que começou como ideia e virou ritual de almoço.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="font-sans text-[17px] leading-relaxed text-ink-900">
            O Escritório de Bohemio nasceu do desejo de criar um espaço onde as
            pessoas pudessem almoçar bem — de verdade — sem pressa e sem abrir
            mão do sabor. Situado no coração de Campo Grande, o restaurante se
            tornou um ponto de encontro para quem trabalha na região e quer uma
            pausa que vale a pena.
          </p>
          <p className="font-sans text-[17px] leading-relaxed text-ink-900">
            O nome vem da ideia de um lugar que mistura a seriedade de um
            escritório com a alma de quem vive a vida com leveza — um bohemio que
            não abre mão da qualidade. Cada prato do dia é escolhido com cuidado,
            preparado na hora, com ingredientes frescos e muito tempero.
          </p>
          <p className="font-sans text-[17px] leading-relaxed text-ink-900">
            Mais do que um restaurante, somos um ritual. Uma razão para você sair
            da cadeira, respirar fundo e comer o que de fato alimenta — o corpo e
            o espírito.
          </p>
        </div>
      </section>

      {/* Galeria */}
      <Gallery images={galleryImages} title="O espaço" />
    </div>
  )
}
