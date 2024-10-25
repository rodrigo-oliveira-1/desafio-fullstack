import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidBrazilianZipCodeError extends Error implements DomainError {
  constructor(code: number) {
    super(`The zip code "${code}" is invalid, it must be between "0" and "99999999".`)
    this.name = 'InvalidBrazilianZipCodeError'
  }
}
