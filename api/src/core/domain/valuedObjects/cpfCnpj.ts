import { Either, left, right } from '@core/logic/Either'

import { InvalidCpfCnpjError } from './errors/InvalidCpfCnpj'; 

const MAX_MASK_LENGTH = 18; //00.000.000/0001-00

export class CpfOrCnpj {
  protected readonly doc: string
  
  get value(): string {
    return this.doc 
  }

  private constructor(doc: string) {
    this.doc = doc;
  }

  static getNumbers(doc: string): string {
    return doc.replace(/\D/g, '')
  }

  static isCpf(doc: string) {
    return this.getNumbers(doc).length === 11
  }

  private static isCpfValid(cpfOnlyNumbers: string): boolean {
    
    let soma = 0;
    let resto;
  
    if ([ '00000000000', '11111111111', '22222222222',
          '33333333333', '44444444444', '55555555555',
          '66666666666', '77777777777', '88888888888',
          '99999999999',
      ].indexOf(cpfOnlyNumbers) !== -1)
      return false
  
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(cpfOnlyNumbers.substring(i-1, i)) * (11 - i);
    
    resto = (soma * 10) % 11
  
    if ((resto == 10) || (resto == 11)) 
      resto = 0
  
    if (resto != parseInt(cpfOnlyNumbers.substring(9, 10)) )
      return false
  
    soma = 0
  
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(cpfOnlyNumbers.substring(i-1, i)) * (12 - i)
  
    resto = (soma * 10) % 11
  
    if ((resto == 10) || (resto == 11)) 
      resto = 0
  
    if (resto != parseInt(cpfOnlyNumbers.substring(10, 11) ) )
      return false
  
    return true
  }

  private static isCnpjValid(cnpjOnlyNumbers: string): boolean {
    let b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    
    for (var i = 0, n = 0; i < 12; n += Number(cnpjOnlyNumbers[i]) * b[++i]);
    if (Number(cnpjOnlyNumbers[12]) !== Number((n %= 11) < 2) ? 0 : 11 - n)
        return false

    for (var i = 0, n = 0; i <= 12; n += Number(cnpjOnlyNumbers[i]) * b[i++]);
    if (Number(cnpjOnlyNumbers[13]) != Number(((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
  }

  static validate(doc: string): boolean {
    if (!doc || doc.length > MAX_MASK_LENGTH) return false
    
    const numbers = this.getNumbers(doc)
    if (numbers.length < 11 || numbers.length > 14) return false

    if (this.isCpf(doc)) {
      return this.isCpfValid(numbers)
    } 
    
    return this.isCnpjValid(numbers)
  }

  static create(documentNumber: string): Either<InvalidCpfCnpjError, CpfOrCnpj> {
    if (!this.validate(documentNumber)) {
      return left(new InvalidCpfCnpjError(documentNumber))
    }

    return right(new CpfOrCnpj( this.getNumbers(documentNumber) ))
  }
}
