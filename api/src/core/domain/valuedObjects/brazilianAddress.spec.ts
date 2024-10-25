import { AddressDescription } from "./AddressDescription"
import { AddressNumber } from "./AddressNumber";
import { IBGECityCode } from "./IbgeCityCode";
import { BrazilianAddress } from "./brazilianAddress"
import { BrazilianZipCode } from "./brazilianZipCode";
import { BrazilianShortState } from "./brazilianShortState";

const street = AddressDescription.create('Rua principal').value as AddressDescription;
const number = AddressNumber.create('1234').value as AddressNumber;
const reference = AddressDescription.create('Prox. ao shopping').value as AddressDescription;
const neighborhood = AddressDescription.create('Centro').value as AddressDescription;
const city = AddressDescription.create('Teixeira de Freitas').value as AddressDescription;
const zipCode = BrazilianZipCode.create(45900000).value as BrazilianZipCode;
const state = BrazilianShortState.create('BA').value as BrazilianShortState;
const cityIBGECode = IBGECityCode.create(5217203).value as IBGECityCode;


describe('Brazilian address valued object', () => {
  it('should be able to create new address', () => {
    const addresssOrError = BrazilianAddress.create({
      street,
      number,
      neighborhood,
      reference,
      city,
      cityIBGECode,
      state,
      zipCode
    })

    expect(addresssOrError.isRight()).toBeTruthy()
  })
})
