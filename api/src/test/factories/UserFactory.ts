import { Email } from '@core/domain/valuedObjects/email'
import { UserName } from '@modules/accounts/domain/user/userName' 
import { Password } from '@core/domain/valuedObjects/password'
import { User } from '@modules/accounts/domain/user/user'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { CpfOrCnpj } from '@core/domain/valuedObjects/cpfCnpj'
import { AddressDescription } from '@core/domain/valuedObjects/AddressDescription'
import { AddressNumber } from '@core/domain/valuedObjects/AddressNumber'
import { BrazilianShortState, ValidBrazilianShortState } from '@core/domain/valuedObjects/brazilianShortState'
import { BrazilianZipCode } from '@core/domain/valuedObjects/brazilianZipCode'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'
import { AccountStatus, ValidAccountStatus } from '@modules/accounts/domain/user/accountStatus'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '@core/config/config'

type UserOverrides = {
  id?: string
  email?: string
  name?: string
  cpf?: string
  bornDate?: Date
  street?: string
  neighborhood?: string
  reference?: string
  city?: string
  pass?: string
}

const passHasher = new BcryptPasswordHasher()

export function createUserFactory(overrides?: UserOverrides) {
  
  const name = UserName.create(overrides?.name ?? 'John Doe').value as UserName
  const cpf = CpfOrCnpj.create(overrides?.cpf ?? '783.474.960-99').value as CpfOrCnpj
  const email = Email.create(overrides?.email ?? 'john@doe.com').value as Email
  const street = AddressDescription.create(overrides?.street ?? 'Street one').value as AddressDescription
  const number = AddressNumber.create('123').value as AddressNumber
  const neighborhood = AddressDescription.create(overrides?.neighborhood ?? 'center').value as AddressDescription
  const reference = AddressDescription.create(overrides?.reference ?? 'no reference').value as AddressDescription
  const city = AddressDescription.create(overrides?.city ?? 'Sao Paulo').value as AddressDescription
  const state = BrazilianShortState.create('SP' as ValidBrazilianShortState).value as BrazilianShortState
  const zipCode = BrazilianZipCode.create(11000000).value as BrazilianZipCode
  const password = Password.create(passHasher, '123456').value as Password
  const status = AccountStatus.create('ACTIVE' as ValidAccountStatus).value as AccountStatus

  const address = BrazilianAddress.create({
    street: street,
    number: number,
    neighborhood: neighborhood,
    reference: reference,
    city: city,
    state: state,
    zipCode: zipCode
  }).value as BrazilianAddress

  const user = User.create({
    name: name,
    email: email,
    password: password,
    status: status,
    cpf: cpf,
    bornDate: new Date(),
    address: address,
    createdAt: new Date()
  }, overrides?.id ?? 'test-123456')

  return user
}

export async function createAndAuthenticateUser(overrides?: UserOverrides) {
  const user = createUserFactory(overrides)
  const accessToken = await sign({ sub: user.id }, JWT_SECRET_KEY, { expiresIn: '2h' }) as string;
 
  return {
    user,
    accessToken,
  }
}
