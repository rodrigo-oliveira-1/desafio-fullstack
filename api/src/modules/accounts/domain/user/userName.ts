import { Either, left, right } from '@core/logic/Either'
import { Name } from '@core/domain/valuedObjects/name'
import { InvalidNameError } from '@core/domain/valuedObjects/errors/InvalidNameError'

export class UserName extends Name {
  
  static create(name: string): Either<InvalidNameError, UserName> {
    if (!this.validate(name, 2, 60)) {
      return left(new InvalidNameError(name))
    }

    return right(new UserName(name))
  }
}
