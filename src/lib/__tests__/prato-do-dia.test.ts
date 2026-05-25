import { getPratoDoDia, DIAS_SLUGS } from '../prato-do-dia'

describe('DIAS_SLUGS', () => {
  it('maps Sunday (0) to segunda', () => {
    expect(DIAS_SLUGS[0]).toBe('segunda')
  })

  it('maps Monday (1) to segunda', () => {
    expect(DIAS_SLUGS[1]).toBe('segunda')
  })

  it('maps Tuesday (2) to terca', () => {
    expect(DIAS_SLUGS[2]).toBe('terca')
  })

  it('maps Wednesday (3) to quarta', () => {
    expect(DIAS_SLUGS[3]).toBe('quarta')
  })

  it('maps Thursday (4) to quinta', () => {
    expect(DIAS_SLUGS[4]).toBe('quinta')
  })

  it('maps Friday (5) to sexta', () => {
    expect(DIAS_SLUGS[5]).toBe('sexta')
  })

  it('maps Saturday (6) to sabado', () => {
    expect(DIAS_SLUGS[6]).toBe('sabado')
  })
})

describe('getPratoDoDia', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns imagePath pointing to /images/ folder', () => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(3)
    const result = getPratoDoDia()
    expect(result.imagePath).toBe('/images/3-quarta.jpeg')
  })

  it('returns correct slug for each day', () => {
    const expected: [number, string][] = [
      [0, 'segunda'],
      [1, 'segunda'],
      [2, 'terca'],
      [3, 'quarta'],
      [4, 'quinta'],
      [5, 'sexta'],
      [6, 'sabado'],
    ]
    expected.forEach(([day, slug]) => {
      jest.spyOn(Date.prototype, 'getDay').mockReturnValue(day)
      const result = getPratoDoDia()
      expect(result.slug).toBe(slug)
    })
  })

  it('imagePath is a non-empty /images/ path', () => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(5)
    const { imagePath } = getPratoDoDia()
    expect(imagePath).toMatch(/^\/images\/.+\.jpeg$/)
  })
})
