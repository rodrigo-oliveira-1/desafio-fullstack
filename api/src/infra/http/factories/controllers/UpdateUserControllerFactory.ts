import { Controller } from '@core/infra/Controller'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { UpdateUser } from '@modules/accounts/useCases/UpdateUser/UpdateUser'
import { UpdateUserController } from '@modules/accounts/useCases/UpdateUser/UpdateUserController' 

export function makeUpdateUserController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  const dateProvider = new DayJsProvider()
  
  const useCase = new UpdateUser(usersRepository, dateProvider)
  const controller = new UpdateUserController(useCase)

  return controller
}
