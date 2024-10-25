import { UseCaseError } from './UseCaseError'

export class RecordNotFountError extends Error implements UseCaseError {
  constructor(key : string) {
    super(
      `The record with key ${key} was not founded.`
    )

    this.name = 'RecordNotFountError'
  }
}
