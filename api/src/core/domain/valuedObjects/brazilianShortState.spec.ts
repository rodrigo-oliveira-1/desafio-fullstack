import { BrazilianShortState } from "./brazilianShortState" 

describe('Brazilian short state value object', () => {
  it('should accept valid short state', () => {
    const typeOrError = BrazilianShortState.create('BA')

    expect(typeOrError.isRight()).toBeTruthy()
  })

  it('should reject invalid brazilian short state', () => {
    // @ts-expect-error
    const typeOrError = BrazilianShortState.create('INVALID')

    expect(typeOrError.isLeft()).toBeTruthy()
  })
})
