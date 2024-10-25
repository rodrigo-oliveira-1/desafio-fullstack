import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidCpfCnpjError extends Error implements DomainError {
  constructor(value: string) {
    super(`The cpf/cnpj number "${value}" is invalid.`)
    this.name = 'InvalidCpfCnpjError'
  }
}
