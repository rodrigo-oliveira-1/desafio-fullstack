import { AccountStatus } from './accountStatus'

describe('Event type value object', () => {
  it('should accept valid account type', () => {
    const typeOrError = AccountStatus.create('ACTIVE')

    expect(typeOrError.isRight()).toBeTruthy()
  })

  it('should reject invalid account type', () => {
    // @ts-expect-error
    const typeOrError = AccountStatus.create('INVALID')

    expect(typeOrError.isLeft()).toBeTruthy()
  })
})
