import { Email } from '../../../../core/domain/valuedObjects/email'
import { UserName } from './userName'
import { Password } from '../../../../core/domain/valuedObjects/password'
import { User } from './user'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { DayJsProvider } from '@infra/providers/implementations/DayJsProvider'
import { CpfOrCnpj } from '@core/domain/valuedObjects/cpfCnpj'
import { AccountStatus, ValidAccountStatus } from './accountStatus'
import { AddressDescription } from '@core/domain/valuedObjects/AddressDescription'
import { AddressNumber } from '@core/domain/valuedObjects/AddressNumber'
import { BrazilianShortState, ValidBrazilianShortState } from '@core/domain/valuedObjects/brazilianShortState'
import { BrazilianZipCode } from '@core/domain/valuedObjects/brazilianZipCode'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'

const passHasher = new BcryptPasswordHasher()
const dateProvider = new DayJsProvider()
const name = UserName.create('John Doe').value as UserName
const cpf = CpfOrCnpj.create('783.474.960-99').value as CpfOrCnpj
const email = Email.create('johndoe@test.com').value as Email
const status = AccountStatus.create('ACTIVE' as ValidAccountStatus).value as AccountStatus
const street = AddressDescription.create('Street one').value as AddressDescription
const number = AddressNumber.create('123').value as AddressNumber
const neighborhood = AddressDescription.create('center').value as AddressDescription
const reference = AddressDescription.create('no reference').value as AddressDescription
const city = AddressDescription.create('Sao Paulo').value as AddressDescription
const state = BrazilianShortState.create('SP' as ValidBrazilianShortState).value as BrazilianShortState
const zipCode = BrazilianZipCode.create(11000000).value as BrazilianZipCode
const password = Password.create(passHasher, '123456').value as Password

const address = BrazilianAddress.create({
  street,
  number,
  neighborhood,
  reference,
  city,
  state,
  zipCode
}).value as BrazilianAddress;

describe('User model', () => {
  it('should be able to create new user', () => {
    const userOrError = User.create({
      name,
      email,
      password,
      status,
      cpf,
      bornDate: dateProvider.getCurrentDate(),
      address,
      createdAt: dateProvider.getCurrentDate()
    })

    expect(userOrError).toBeTruthy()
  })
})
