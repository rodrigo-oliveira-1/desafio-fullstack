import { Either, left, right } from '@core/logic/Either'

import { InvalidIBGECityCodeError } from './errors/InvalidIBGECityCodeError'; 

export class IBGECityCode {
  private readonly code: number
  
  get value(): number {
    return this.code
  }

  protected constructor(code: number) {
    this.code = code;
  }

  static validate(code: number): boolean {
    if (!code || code < 1100015 || code > 5300108) {
      return false
    }

    return true
  }

  static create(code: number): Either<InvalidIBGECityCodeError, IBGECityCode> {
    if (!this.validate(code)) {
      return left(new InvalidIBGECityCodeError(code))
    }

    return right(new IBGECityCode(code))
  }
}
