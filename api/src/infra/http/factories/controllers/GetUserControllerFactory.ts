import { Controller } from '@core/infra/Controller'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { GetUser } from '@modules/accounts/useCases/getUser/GetUser'
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController' 

export function makeGetUserController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  
  const useCase = new GetUser(usersRepository)
  const controller = new GetUserController(useCase)

  return controller
}
