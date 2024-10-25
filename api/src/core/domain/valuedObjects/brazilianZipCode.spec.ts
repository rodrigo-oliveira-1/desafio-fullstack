import { BrazilianZipCode } from "./brazilianZipCode" 

describe('Brazilian zip code value object', () => {
  it('should accept valid code', () => {
    const nameOrError = BrazilianZipCode.create(45987474)

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject IBGE city code smaller than 01000000 (Sao Paulo initial code)', () => {
    const nameOrError = BrazilianZipCode.create(999999)

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject IBGE city code higher than 99999999', () => {
    const nameOrError = BrazilianZipCode.create(999999991)

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
