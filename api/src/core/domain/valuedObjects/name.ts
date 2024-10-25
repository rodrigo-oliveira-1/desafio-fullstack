import { Either, left, right } from '@core/logic/Either'

import { InvalidNameError } from './errors/InvalidNameError'

export class Name {
  protected readonly name: string
  
  get value(): string {
    return this.name
  }

  protected constructor(name: string) {
    this.name = name;
  }

  static validate(name: string, minLength: number, maxLength: number): boolean {
    if (!name || name.trim().length < minLength || name.trim().length > maxLength) {
      return false
    }

    return true
  }

  static create(name: string, minLength: number, maxLength: number): Either<InvalidNameError, Name> {
    if (!this.validate(name, minLength, maxLength)) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }
}
