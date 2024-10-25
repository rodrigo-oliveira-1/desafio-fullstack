import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AccountAlreadyExistsError extends Error implements UseCaseError {
  constructor(value: string) {
    super(`The email/cpf "${value}" is already registered.`)
    this.name = 'AccountAlreadyExistsError'
  }
}
