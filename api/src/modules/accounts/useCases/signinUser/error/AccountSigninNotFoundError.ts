import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AccountSigninNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Invalid email or pass.`)
    this.name = 'AccountSigninNotFoundError'
  }
}
