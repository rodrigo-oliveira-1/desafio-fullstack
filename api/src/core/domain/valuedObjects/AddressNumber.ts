import { Either, left, right } from '@core/logic/Either'
import { Name } from '@core/domain/valuedObjects/name'
import { InvalidNameError } from '@core/domain/valuedObjects/errors/InvalidNameError'

export class AddressNumber extends Name {
  
  static create(name: string): Either<InvalidNameError, AddressNumber> {
    if (!this.validate(name, 1, 6)) {
      return left(new InvalidNameError(name))
    }

    return right(new AddressNumber(name))
  }
}
