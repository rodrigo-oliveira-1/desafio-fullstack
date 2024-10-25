import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidBrazilianShortState extends Error implements DomainError {
  constructor(UF: string) {
    super(
      `The brazilian UF ${UF} is not a valid state abreviattion.`
    )

    this.name = 'InvalidBrazilianShortState'
  }
}
