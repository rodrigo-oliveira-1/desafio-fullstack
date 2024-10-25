import { Either, left, right } from '@core/logic/Either'

import { InvalidPhoneNumberError } from './errors/InvalidPhoneNumberError'

const MAX_MASK_LENGTH = 20; //+55 (73) 9 9999-9999

export class BrazilianPhone {
  protected readonly phone: string
  
  get value(): string {
    return this.phone
  }

  protected constructor(phone: string) {
    this.phone = phone;
  }

  static getNumbers(phone: string) {
    return phone.replace(/\D/g, '')
  }

  static validate(phone: string): boolean {
    if (phone.length > MAX_MASK_LENGTH) return false
    
    const numbers = this.getNumbers(phone)
    if (numbers.length < 10 || numbers.length > 11) return false

    return true
  }

  static create(phone: string): Either<InvalidPhoneNumberError, BrazilianPhone> {
    if (!this.validate(phone)) {
      return left(new InvalidPhoneNumberError(phone))
    }

    return right(new BrazilianPhone(phone))
  }
}
