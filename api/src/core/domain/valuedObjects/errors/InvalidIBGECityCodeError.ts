import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidIBGECityCodeError extends Error implements DomainError {
  constructor(code: number) {
    super(`The IBGE city code "${code}" is invalid, it must be between "1100015" and "5300108".`)
    this.name = 'InvalidIBGECityCodeError'
  }
}
