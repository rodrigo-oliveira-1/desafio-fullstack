import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidUUIDV4LengthError extends Error implements DomainError {
  constructor(propName: string) {
    super(`The UUID for ${propName} is invalid. Must be only 36 characters.`)
    this.name = 'InvalidUUIDV4LengthError'
  }
}
