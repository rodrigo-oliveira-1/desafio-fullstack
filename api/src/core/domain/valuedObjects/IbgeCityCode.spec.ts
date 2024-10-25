import { IBGECityCode } from "./IbgeCityCode"

describe('IBGE city code value object', () => {
  it('should accept valid code', () => {
    const nameOrError = IBGECityCode.create(5219100)

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject IBGE city code smaller than 1100015', () => {
    const nameOrError = IBGECityCode.create(1100014)

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject IBGE city code higher than 5300108', () => {
    const nameOrError = IBGECityCode.create(5300109)

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
