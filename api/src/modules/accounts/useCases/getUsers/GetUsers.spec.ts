import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { GetUsers } from './GetUsers'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'
import { User } from '@modules/accounts/domain/user/user'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'
import { getUserResponseDto } from '@modules/accounts/dto/user.dto'


let usersRepository: IUsersRepository
let useCase: GetUsers
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

describe('Get Users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    dateProvider = new DayJsProvider()
    
    useCase = new GetUsers(usersRepository)

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
    
    const userOrError = await useCase.execute()
    
    expect(userOrError.isRight()).toBeTruthy()
    expect(userOrError.value).toBeInstanceOf(Array)
    expect((userOrError.value as getUserResponseDto[]).length).toBeGreaterThanOrEqual(1)
  })
})
