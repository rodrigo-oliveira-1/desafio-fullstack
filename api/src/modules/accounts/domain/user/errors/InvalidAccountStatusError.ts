import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidAccountStatusError extends Error implements DomainError {
  constructor() {
    super(
      `The account type must be one of active, suspended, deactiveted.`
    )

    this.name = 'InvalidAccountStatusError'
  }
}
