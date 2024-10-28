import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { SigninUser } from './SigninUser'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'
import { User } from '@modules/accounts/domain/user/user'
import { InvalidAccountStatusError } from '@modules/accounts/domain/user/errors/InvalidAccountStatusError'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'
import { getUserResponseDto } from '@modules/accounts/dto/user.dto'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { AccountSigninNotFoundError } from './error/AccountSigninNotFoundError'


let usersRepository: IUsersRepository
let useCase: SigninUser
let userRegistred: User
let passHasher: IPasswordHasher
let dateProvider: IDateProvider

const id = '123456789'
const name = 'John Doe'
const email = 'john@doe.com'
const cpf = '357.785.940-70'
const street = 'Street One'
const neighborhood = 'center'
const reference = 'no reference'
const city = 'Sao Paulo'
const pass = '123456'

describe('Signin User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passHasher = new BcryptPasswordHasher()
    dateProvider = new DayJsProvider()
    
    useCase = new SigninUser(usersRepository, passHasher)

    userRegistred = createUserFactory({
      id, 
      name,
      email, 
      cpf, 
      bornDate: dateProvider.getCurrentDate(),
      street, 
      neighborhood, 
      reference, 
      city, 
      pass
    })
    
    usersRepository.create(userRegistred)  
  })

  it('should be able to get an valid access token', async () => {
    
    const userOrError = await useCase.execute(email, pass)
    
    expect(userOrError.isRight()).toBeTruthy()
  })

  it('should not be able to get an access token with inexistent account', async () => {
    const userOrError = await useCase.execute('user@fake.com', '123456')

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new AccountSigninNotFoundError())
  })

  it('should not be able to get an access token with incorrect pass', async () => {
    const userOrError = await useCase.execute(email, '123')

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new AccountSigninNotFoundError())
  })
})
