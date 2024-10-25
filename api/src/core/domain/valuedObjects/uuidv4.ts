import { Either, left, right } from '@core/logic/Either'
import { InvalidUUIDV4LengthError } from './errors/InvalidUUIDV4LengthError'

export class UUID_v4 {
  private readonly value: string
  
  private constructor(uuid: string) {
    this.value = uuid
  }

  static validate(uuid: string): boolean {
    if (
      !uuid ||
      uuid.trim().length < 36 ||
      uuid.trim().length > 36
    ) {
      return false
    }

    return true
  }

  static create(uuid: string): Either<InvalidUUIDV4LengthError, UUID_v4> {
    if (!this.validate(uuid)) {
      return left(new InvalidUUIDV4LengthError('__constructor'))
    }

    return right(new UUID_v4(uuid))
  }
}
