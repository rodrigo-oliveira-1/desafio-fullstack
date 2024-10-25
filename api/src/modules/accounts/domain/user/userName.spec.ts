import { UserName } from './userName'

describe('User name value object', () => {
  it('should accept valid name', () => {
    const nameOrError = UserName.create('John Doe')

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject name with less than 2 characters', () => {
    const nameOrError = UserName.create('j')

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  it('should reject name with more than 60 characters', () => {
    const nameOrError = UserName.create('d'.repeat(65))

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
