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

export function getPratoDoDia(): { slug: DiaSlug; imagePath: string } {
  const day = new Date().getDay() as keyof typeof DIAS_SLUGS
  const slug = DIAS_SLUGS[day]
  return { slug, imagePath: `/pratos-do-dia/${slug}.jpg` }
}
