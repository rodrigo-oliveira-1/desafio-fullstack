import { Either, left, right } from '@core/logic/Either'

import { InvalidAccountStatusError } from './errors/InvalidAccountStatusError'

export const validAccountStatus = [
  'ACTIVE',
  'SUSPENDED',
  'DEACTIVED'
] as const

export type ValidAccountStatus = typeof validAccountStatus[number]

export class AccountStatus {
  private readonly type: ValidAccountStatus

  get value(): ValidAccountStatus {
    return this.type
  }

  private constructor(type: ValidAccountStatus) {
    this.type = type
  }

  static validate(type: ValidAccountStatus): boolean {
    if (!validAccountStatus.includes(type)) {
      return false
    }

    return true
  }

  static create(type: ValidAccountStatus): Either<InvalidAccountStatusError, AccountStatus> {
    if (!this.validate(type)) {
      return left(new InvalidAccountStatusError())
    }

    return right(new AccountStatus(type))
  }
}
