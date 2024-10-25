import { Validator } from '@core/infra/Validator'
import { Either, left, right } from '@core/logic/Either'

import { MissingParamError } from './errors/MissingParamError'

export class RequiredFieldsValidator<T = any> implements Validator<T> {
  
  constructor(
    private readonly ignoreFields: string[] = []
  ) {}
  
  public validate(data: T): Either<MissingParamError, null> {
    const fields = Object.getOwnPropertyNames(data)
    for (const field of fields) {
      if (this.ignoreFields.includes(field)) continue
      if (
        data[field] === null ||
        data[field] === undefined ||
        (typeof data[field] === 'string' && data[field].trim() === '')
      ) {
        return left(new MissingParamError(field))
      }
    }

    return right(null)
  }
}
