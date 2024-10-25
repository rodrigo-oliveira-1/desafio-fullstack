import { Controller } from '@core/infra/Controller'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { CreateUser } from '@modules/accounts/useCases/CreateUser/CreateUser'
import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController'

export function makeCreateUserController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  const passHasher = new BcryptPasswordHasher()
  const dateProvider = new DayJsProvider()
  
  const useCase = new CreateUser(
    usersRepository,
    passHasher,
    dateProvider
  )
  
  const controller = new CreateUserController(useCase)

  return controller
}
