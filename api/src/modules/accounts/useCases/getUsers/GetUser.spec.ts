import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { GetUser } from './GetUser'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'
import { User } from '@modules/accounts/domain/user/user'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'


let usersRepository: IUsersRepository
let useCase: GetUser
let dateProvider: IDateProvider
let userRegistred: User

const id = '123456789'
const name = 'John Doe'
const email = 'john@doe.com'
const cpf = '357.785.940-70'
const street = 'Street One'
const neighborhood = 'center'
const reference = 'no reference'
const city = 'Sao Paulo'

describe('Get User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    dateProvider = new DayJsProvider()
    
    useCase = new GetUser(usersRepository)

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
    })
    
    usersRepository.create(userRegistred)  
  })

  it('should be able to get an user', async () => {
    
    const userOrError = await useCase.execute(id)
    
    expect(userOrError.isRight()).toBeTruthy()
    expect(usersRepository.exists('email', email)).toBeTruthy()
    expect(usersRepository.exists('cpf', cpf)).toBeTruthy()
  })

  it('should not be able to get user with an inexistent id', async () => {
    const userOrError = await useCase.execute('123')

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new RecordNotFountError('123'))
  })
})
