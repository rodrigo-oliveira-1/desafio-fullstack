import { Name } from './name'

describe('User name value object', () => {
  it('should accept valid name', () => {
    const nameOrError = Name.create('John Doe',2,50)

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject name with less than 2 characters', () => {
    const nameOrError = Name.create('j',2,50)

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject name with more than 255 characters', () => {
    const nameOrError = Name.create('d'.repeat(260),2,255)

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
