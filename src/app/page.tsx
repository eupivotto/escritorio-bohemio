import { HeroPratoDoDia } from '@/components/sections/HeroPratoDoDia'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { getPratoDoDia } from '@/lib/prato-do-dia'

export default function HomePage() {
  const pratoDoDia = getPratoDoDia()

  return (
    <>
      <HeroPratoDoDia slug={pratoDoDia.slug} imagePath={pratoDoDia.imagePath} />
      <MenuPreview />
      <Testimonials />
    </>
  )
}
