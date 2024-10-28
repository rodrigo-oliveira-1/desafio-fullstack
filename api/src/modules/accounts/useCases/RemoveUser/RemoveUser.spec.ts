import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { RemoveUser } from './RemoveUser'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'
import { User } from '@modules/accounts/domain/user/user'


let usersRepository: IUsersRepository
let useCase: RemoveUser
let dateProvider: IDateProvider
let userRegistred: User
let passHasher: IPasswordHasher

const id = '123456789'
const name = 'John Doe'
const email = 'john@doe.com'
const cpf = '357.785.940-70'
const street = 'Street One'
const neighborhood = 'center'
const reference = 'no reference'
const city = 'Sao Paulo'

describe('Remove User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passHasher = new BcryptPasswordHasher()
    dateProvider = new DayJsProvider()
    
    useCase = new RemoveUser(
      usersRepository, 
      dateProvider)

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

  it('should be able to remove an user', async () => {
    
    await useCase.execute({
      id,
      userId: 'test-123456789'
    })

    const user = await usersRepository.findById(id)


    expect(user).toBeTruthy()
    expect(user.deletedAt).toBeDefined()
    expect(user.deletedBy).toEqual('test-123456789')
  })  
})
