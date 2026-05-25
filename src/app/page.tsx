import { HeroPratoDoDia } from '@/components/sections/HeroPratoDoDia'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { Gallery } from '@/components/sections/Gallery'
import { Testimonials } from '@/components/sections/Testimonials'
import { getPratoDoDia } from '@/lib/prato-do-dia'

const galleryImages = [
  { src: '/galeria/salao-1.jpg', alt: 'Salão do Escritório de Bohemio' },
  { src: '/galeria/cozinha-1.jpg', alt: 'Cozinha aberta' },
  { src: '/galeria/mesa-1.jpg', alt: 'Mesa posta' },
  { src: '/galeria/balcao-1.jpg', alt: 'Balcão de atendimento' },
  { src: '/galeria/equipe-1.jpg', alt: 'Equipe' },
]

export default function HomePage() {
  const pratoDoDia = getPratoDoDia()

  return (
    <>
      <HeroPratoDoDia slug={pratoDoDia.slug} imagePath={pratoDoDia.imagePath} />
      <MenuPreview />
      <Gallery images={galleryImages} title="O lugar" />
      <Testimonials />
    </>
  )
}
