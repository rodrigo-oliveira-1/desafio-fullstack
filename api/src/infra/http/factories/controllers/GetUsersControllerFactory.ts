import { Controller } from '@core/infra/Controller'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { GetUsers } from '@modules/accounts/useCases/getUsers/GetUsers'
import { GetUsersController } from '@modules/accounts/useCases/getUsers/GetUsersController' 

export function makeGetUsersController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  
  const useCase = new GetUsers(usersRepository)
  const controller = new GetUsersController(useCase)

  return controller
}
