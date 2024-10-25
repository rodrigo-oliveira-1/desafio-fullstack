import { Either, left, right } from '@core/logic/Either'

import { InvalidBrazilianShortState } from './errors/InvalidBrazilianShortStateError'   

export const validBrazilianShortState = [
  "SC",
  "PR",
  "RS",
  "MG",
  "RJ",
  "SP",
  "AC",
  "CE",
  "ES",
  "GO",
  "MT",
  "MS",
  "PA",
  "PI",
  "RR",
  "RO",
  "AM",
  "AP",
  "BA",
  "DF",
  "MA",
  "PB",
  "PE",
  "RN",
  "SE",
  "TO",
  "AL",
] as const

export type ValidBrazilianShortState = typeof validBrazilianShortState[number]

export class BrazilianShortState {
  private readonly type: ValidBrazilianShortState

  get value(): ValidBrazilianShortState {
    return this.type
  }

  private constructor(type: ValidBrazilianShortState) {
    this.type = type
  }

  static validate(type: ValidBrazilianShortState): boolean {
    if (!validBrazilianShortState.includes(type)) {
      return false
    }

    return true
  }

  static create(type: ValidBrazilianShortState): Either<InvalidBrazilianShortState, BrazilianShortState> {
    if (!this.validate(type)) {
      return left(new InvalidBrazilianShortState(type))
    }

    return right(new BrazilianShortState(type))
  }
}
