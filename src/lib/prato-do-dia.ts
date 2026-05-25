export const DIAS_SLUGS = {
  0: 'segunda',
  1: 'segunda',
  2: 'terca',
  3: 'quarta',
  4: 'quinta',
  5: 'sexta',
  6: 'sabado',
} as const

export type DiaSlug = (typeof DIAS_SLUGS)[keyof typeof DIAS_SLUGS]

const DIAS_IMAGES: Record<DiaSlug, string> = {
  segunda: '/images/01-segunda.jpeg',
  terca: '/images/02-terca.jpeg',
  quarta: '/images/3-quarta.jpeg',
  quinta: '/images/4-quinta.jpeg',
  sexta: '/images/5-sexta.jpeg',
  sabado: '/images/6-sabado.jpeg',
}

export function getPratoDoDia(): { slug: DiaSlug; imagePath: string } {
  const day = new Date().getDay() as keyof typeof DIAS_SLUGS
  const slug = DIAS_SLUGS[day]
  return { slug, imagePath: DIAS_IMAGES[slug] }
}
