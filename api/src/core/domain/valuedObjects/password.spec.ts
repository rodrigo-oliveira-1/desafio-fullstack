import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { Password } from './password'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'

let passHasher : IPasswordHasher;

describe('User password value object', () => {
  beforeEach(() => {
    passHasher = new BcryptPasswordHasher()
  })

  it('should accept valid password', () => {
    const passwordOrError = Password.create(passHasher,'123456')

    expect(passwordOrError.isRight()).toBeTruthy()
  })

  it('should reject password with less than 6 characters', () => {
    const passwordOrError = Password.create(passHasher, '12345')

    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 255 characters', () => {
    const passwordOrError = Password.create(passHasher, '1'.repeat(260))

    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should be able to hash the password', async () => {
    const password = Password.create(passHasher, '123456')

    if (password.isLeft()) {
      throw new Error()
    }

    const hashedPassword = await password.value.getHashedValue()

    expect(await passHasher.comparePasswords('123456', hashedPassword)).toBeTruthy()
  })

  it('should not hash the password when already hashed', async () => {
    const hashedPassword = await passHasher.hashPassword('123456')
    const password = Password.create(passHasher, hashedPassword, true)

    if (password.isLeft()) {
      throw new Error()
    }

    expect(await password.value.getHashedValue()).toEqual(hashedPassword)
  })

  it('should be able to compare the password when not hashed', async () => {
    const password = Password.create(passHasher, '123456')

    if (password.isLeft()) {
      throw new Error()
    }

    expect(password.value.comparePassword('123456')).toBeTruthy()
  })

  it('should be able to compare the password when hashed', async () => {
    const hashedPassword = await passHasher.hashPassword('123456')
    const password = Password.create(passHasher, hashedPassword, true)

    if (password.isLeft()) {
      throw new Error()
    }

    expect(password.value.comparePassword('123456')).toBeTruthy()
  })
})
