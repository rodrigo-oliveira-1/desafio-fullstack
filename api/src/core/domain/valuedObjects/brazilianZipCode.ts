import { Either, left, right } from '@core/logic/Either'

import { InvalidBrazilianZipCodeError } from './errors/InvalidBrazilianZipCodeError';  

export class BrazilianZipCode {
  private readonly code: number
  
  get value(): number {
    return this.code
  }

  protected constructor(code: number) {
    this.code = code;
  }

  static validate(code: number): boolean {
    if (!code || code < 1000000 || code > 99999999) {
      return false
    }

    return true
  }

  static create(code: number): Either<InvalidBrazilianZipCodeError, BrazilianZipCode> {
    if (!this.validate(code)) {
      return left(new InvalidBrazilianZipCodeError(code))
    }

    return right(new BrazilianZipCode(code))
  }
}
