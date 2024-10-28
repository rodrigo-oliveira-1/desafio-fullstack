import { Controller } from '@core/infra/Controller'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { SequelizeUsersRepository } from '@modules/accounts/persistence/repositories/sequelize/SequelizeUsersRepository'
import { SigninUser } from '@modules/accounts/useCases/signinUser/SigninUser'
import { SigninUserController } from '@modules/accounts/useCases/signinUser/SigninUserController' 

export function makeSigninUserController(): Controller {
  const usersRepository = new SequelizeUsersRepository()
  const passHaser = new BcryptPasswordHasher()
  
  const useCase = new SigninUser(usersRepository, passHaser)
  const controller = new SigninUserController(useCase)

  return controller
}
