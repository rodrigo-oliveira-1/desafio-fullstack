import { Either, left, right } from '@core/logic/Either'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { AccountSigninNotFoundError } from './error/AccountSigninNotFoundError'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '@core/config/config'

type AuthorizedUserToken = {
  accessToken: string
}
type AuthenticatedUserResponse = Either<AccountSigninNotFoundError, AuthorizedUserToken>

export class SigninUser {
  constructor(
    private usersRepository: IUsersRepository,
    private passHassher: IPasswordHasher
  ) {}

  async execute(userEmail: string, userPass: string): Promise<AuthenticatedUserResponse> {

    const user = await this.usersRepository.findByEmail(userEmail)
    if (!user) return left(new AccountSigninNotFoundError())

    const validPass = await this.passHassher.comparePasswords(userPass, await user.password.getHashedValue())  

    if (!validPass) return left(new AccountSigninNotFoundError())
    
    const accessToken = await sign({ sub: user.id }, JWT_SECRET_KEY, { expiresIn: '2h' }) as string;

    const userData = {
      id: user.id,
      user: user.email,
      name: user.name
    }
    
    return right({ accessToken, user: userData })
  }
}
