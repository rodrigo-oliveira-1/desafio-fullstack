import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError'
import { CreateUser } from './CreateUser'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'


let usersRepository: IUsersRepository
let passHasher: IPasswordHasher
let useCase: CreateUser
let dateProvider: IDateProvider

describe('Create new User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passHasher = new BcryptPasswordHasher()
    dateProvider = new DayJsProvider()
    
    useCase = new CreateUser(
      usersRepository, 
      passHasher, 
      dateProvider)
  })

  it('should be able to register new user', async () => {
    
    const userOrError = await useCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '357.785.940-70',
      password: '123456',
      bornDate: new Date(),
      street: 'Street one',
      number: '1250',
      neighborhood: 'center',
      reference: 'center',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: 12256000,
      createdBy: 'test-123456'
    })

    expect(userOrError.isRight()).toBeTruthy()
    expect(usersRepository.exists('email','john@doe.com')).toBeTruthy()
  })

  it('should not be able to register new account with invalid data', async () => {
    const userOrError = await useCase.execute({
      name: 'John Doe',
      email: 'john@doe',//invalid
      cpf: '357.785.940-70',
      password: '123456',
      bornDate: new Date(),
      street: 'Street one',
      number: '1250',
      neighborhood: 'center',
      reference: 'center',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: 12256000,
      createdBy: 'test-123456'
    })

    expect(userOrError.isLeft()).toBeTruthy()
  })

  it('should not be able to register new account with existing email', async () => {
    
    const account = createUserFactory({
      email: 'john@doe.com'
    })
    
    usersRepository.create(account)

    const userOrError = await useCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '357.785.940-70',
      password: '123456',
      bornDate: new Date(),
      street: 'Street one',
      number: '1250',
      neighborhood: 'center',
      reference: 'center',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: 12256000,
      createdBy: 'test-123456'
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new AccountAlreadyExistsError('john@doe.com')
    )
  })

  it('should not be able to register new account with existing cpf', async () => {
    
    const account = createUserFactory({
      cpf: '357.785.940-70'
    })
    
    usersRepository.create(account)

    const userOrError = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      cpf: '357.785.940-70',
      password: '123456',
      bornDate: new Date(),
      street: 'Street one',
      number: '1250',
      neighborhood: 'center',
      reference: 'center',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: 12256000,
      createdBy: 'test-123456'
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new AccountAlreadyExistsError('35778594070')
    )
  })
})
