import { AddressDescription } from "./AddressDescription"  

describe('Address description value object', () => {
  it('should accept valid addresss', () => {
    const nameOrError = AddressDescription.create('Street one')

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject address description with less than 2 characters', () => {
    const nameOrError = AddressDescription.create('j')

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject Address description with more than 60 characters', () => {
    const nameOrError = AddressDescription.create('d'.repeat(65))

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
