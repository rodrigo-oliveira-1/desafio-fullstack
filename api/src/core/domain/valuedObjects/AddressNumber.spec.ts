import { AddressNumber } from "./AddressNumber"  

describe('Address number value object', () => {
  it('should accept valid addresss number', () => {
    const nameOrError = AddressNumber.create('123A')

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject address number with less than 1 characters', () => {
    const nameOrError = AddressNumber.create('')

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject Address number with more than 6 characters', () => {
    const nameOrError = AddressNumber.create('d'.repeat(7))

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
