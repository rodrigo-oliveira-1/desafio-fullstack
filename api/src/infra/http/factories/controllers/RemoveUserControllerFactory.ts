import { Controller } from '@core/infra/Controller'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { RemoveUser } from '@modules/accounts/useCases/RemoveUser/RemoveUser'
import { RemoveUserController } from '@modules/accounts/useCases/RemoveUser/RemoveUserController' 
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'

export function makeRemoveUserController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  const dateProvider = new DayJsProvider()
  
  const useCase = new RemoveUser(usersRepository, dateProvider)
  const controller = new RemoveUserController(useCase)

  return controller
}
