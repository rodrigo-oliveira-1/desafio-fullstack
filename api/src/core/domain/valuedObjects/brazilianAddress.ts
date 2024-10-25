import { Either, right } from '@core/logic/Either'

import { AddressDescription } from './AddressDescription'
import { AddressNumber } from './AddressNumber'
import { BrazilianShortState } from './brazilianShortState' 
import { IBGECityCode } from './IbgeCityCode'
import { BrazilianZipCode } from './brazilianZipCode'
import { InvalidNameError } from './errors/InvalidNameError'
import { InvalidIBGECityCodeError } from './errors/InvalidIBGECityCodeError'
import { InvalidBrazilianShortState } from './errors/InvalidBrazilianShortStateError'
import { InvalidBrazilianZipCodeError } from './errors/InvalidBrazilianZipCodeError'

interface IAddressProps {
  street?: AddressDescription
  number?: AddressNumber
  neighborhood?: AddressDescription
  reference?: AddressDescription
  city: AddressDescription
  cityIBGECode?: IBGECityCode
  state: BrazilianShortState
  zipCode?: BrazilianZipCode
}

type CreateBrazilianAddressError = InvalidNameError | InvalidIBGECityCodeError |
                                   InvalidBrazilianShortState | InvalidBrazilianZipCodeError;

export class BrazilianAddress {
  public readonly props: IAddressProps
  
  protected constructor(props: IAddressProps) {
    this.props = props;
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get reference() {
    return this.props.reference
  }

  get city() {
    return this.props.city
  }

  get cityIBGECode() {
    return this.props.cityIBGECode
  }

  get state() {
    return this.props.state
  }

  get zipCode() {
    return this.props.zipCode
  }

  static create(props: IAddressProps): Either<CreateBrazilianAddressError, BrazilianAddress> {
    
    const address = new BrazilianAddress(props)
    return right(address)
  }
}
