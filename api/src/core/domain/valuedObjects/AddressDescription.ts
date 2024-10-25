import { Either, left, right } from '@core/logic/Either'
import { Name } from '@core/domain/valuedObjects/name'
import { InvalidNameError } from '@core/domain/valuedObjects/errors/InvalidNameError'

export class AddressDescription extends Name {
  
  static create(name: string): Either<InvalidNameError, AddressDescription> {
    if (!this.validate(name, 2, 60)) {
      return left(new InvalidNameError(name))
    }

    return right(new AddressDescription(name))
  }
}
