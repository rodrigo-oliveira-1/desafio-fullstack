import { InMemoryUsersRepository } from '../../persistence/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { UpdateUser } from './UpdateUser'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { createUserFactory } from '@test/factories/UserFactory'
import { User } from '@modules/accounts/domain/user/user'
import { InvalidAccountStatusError } from '@modules/accounts/domain/user/errors/InvalidAccountStatusError'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'


let usersRepository: IUsersRepository
let useCase: UpdateUser
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

describe('Update User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passHasher = new BcryptPasswordHasher()
    dateProvider = new DayJsProvider()
    
    useCase = new UpdateUser(
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

  it('should be able to update an user', async () => {
    
    const newName = 'Joana Doe'
    const newBornDate = new Date()
    const newStreet = 'Street two'
    const newNeighborhood = 'industrial center'
    const newCity = 'Rio de Janeiro'
    
    const userOrError = await useCase.execute({
      id,
      name: newName,
      status: 'ACTIVE',
      email: 'john@doetest.com',
      cpf: '999.353.630-07',
      bornDate: newBornDate,
      street: newStreet,
      number: '1250',
      neighborhood: newNeighborhood,
      reference: 'center',
      city: newCity,
      state: 'SP',
      zipCode: 12256000
    })

    const user = userOrError.value as User

    expect(userOrError.isRight()).toBeTruthy()
    expect(usersRepository.exists('email', email)).toBeTruthy()
    expect(usersRepository.exists('cpf', cpf)).toBeTruthy()
    expect(user.name.value).toEqual(newName)
    expect(user.bornDate).toEqual(newBornDate)
    expect(user.address.street.value).toEqual(newStreet)
    expect(user.address.neighborhood.value).toEqual(newNeighborhood)
    expect(user.address.city.value).toEqual(newCity)
    expect(user.cpf.value).toEqual('35778594070')
    expect(user.email.value).toEqual(email)
  })

  it('should not be able to update user with invalid status', async () => {
    const userOrError = await useCase.execute({
      id,
      name: 'newName',
      status: 'ERROR',
      email: 'john@doetest.com',
      cpf: '999.353.630-07',
      bornDate: new Date(),
      street: '',
      number: '1250',
      neighborhood: 'newNeighborhood',
      reference: 'center',
      city: 'newCity',
      state: 'SP',
      zipCode: 12256000
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new InvalidAccountStatusError()
    )
  })

  it('should not be able to UPDATE user with inexisting id', async () => {
    
    const userOrError = await useCase.execute({
      id: '333333',
      name: 'newName',
      status: 'ERROR',
      email: 'john@doetest.com',
      cpf: '999.353.630-07',
      bornDate: new Date(),
      street: '',
      number: '1250',
      neighborhood: 'newNeighborhood',
      reference: 'center',
      city: 'newCity',
      state: 'SP',
      zipCode: 12256000
    })

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(
      new RecordNotFountError('333333')
    )
  })
})
