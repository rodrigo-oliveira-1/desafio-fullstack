

import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'
import { User } from '../../domain/user/user'
import { Either, right, left } from '@core/logic/Either'
import { Email } from '@core/domain/valuedObjects/email'
import { InvalidEmailError } from '@core/domain/valuedObjects/errors/InvalidEmailError'
import { InvalidNameError } from '@core/domain/valuedObjects/errors/InvalidNameError'
import { InvalidPasswordLengthError } from '@core/domain/valuedObjects/errors/InvalidPasswordLengthError'
import { UserName } from '../../domain/user/userName' 
import { Password } from '@core/domain/valuedObjects/password'
import { CpfOrCnpj } from '@core/domain/valuedObjects/cpfCnpj'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'
import { AddressDescription } from '@core/domain/valuedObjects/AddressDescription'
import { AccountStatus, ValidAccountStatus } from '../../domain/user/accountStatus'
import { InvalidAccountStatusError } from '../../domain/user/errors/InvalidAccountStatusError'
import { BrazilianShortState, ValidBrazilianShortState } from '@core/domain/valuedObjects/brazilianShortState'
import { BrazilianZipCode } from '@core/domain/valuedObjects/brazilianZipCode'
import { AddressNumber } from '@core/domain/valuedObjects/AddressNumber'
import { UserPlainDto } from '../../dto/user.dto'
import { InvalidCpfCnpjError } from '@core/domain/valuedObjects/errors/InvalidCpfCnpj'

type CreateUserError = Either<
    InvalidNameError
  | InvalidAccountStatusError  
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidCpfCnpjError,
  User
>

export class UserMapper {
  static toDomain(data: UserPlainDto): CreateUserError {
    const passHasher = new BcryptPasswordHasher()

    const name = UserName.create(data.name)
    const cpf = CpfOrCnpj.create(data.cpf)
    const email = Email.create(data.email)
    const status = AccountStatus.create(data.status as ValidAccountStatus)
    const street = AddressDescription.create(data.street)
    const number = AddressNumber.create(data.number)
    const neighborhood = AddressDescription.create(data.neighborhood)
    const reference = AddressDescription.create(data.reference)
    const city = AddressDescription.create(data.city)
    const state = BrazilianShortState.create(data.state as ValidBrazilianShortState)
    const zipCode = BrazilianZipCode.create(data.zipCode)
    const password = Password.create(passHasher, data.password, true)

    if (name.isLeft()) return left(name.value)
    if (cpf.isLeft()) return left(cpf.value)
    if (email.isLeft()) return left(email.value)
    if (status.isLeft()) return left(status.value)
    if (street.isLeft()) return left(street.value)
    if (number.isLeft()) return left(number.value)
    if (neighborhood.isLeft()) return left(neighborhood.value)
    if (reference.isLeft()) return left(reference.value)
    if (city.isLeft()) return left(city.value)
    if (state.isLeft()) return left(state.value)
    if (zipCode.isLeft()) return left(zipCode.value)
    if (password.isLeft()) return left(password.value)

    const address = BrazilianAddress.create({
      street: street.value,
      number: number.value,
      neighborhood: neighborhood.value,
      reference: reference.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value
    });
    
    if (address.isLeft()) return left(address.value)

    const user = User.create({
      name: name.value,
      email: email.value,
      password: password.value,
      status: status.value,
      cpf: cpf.value,
      bornDate: data.bornDate,
      address: address.value,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
      deletedAt: data.deletedAt,
      deletedBy: data.deletedBy
    })

    return right(user) 
  }

  static async toPersistence(user: User): Promise<UserPlainDto> {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
      status: user.status.value,
      cpf: user.cpf.value,
      bornDate: user.bornDate,
      street: user.address.street.value,
      number: user.address.number.value,
      neighborhood: user.address.neighborhood.value,
      reference: user.address.reference.value,
      city: user.address.city.value,
      state: user.address.state.value,
      zipCode: user.address.zipCode.value,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt,
      deletedBy: user.deletedBy
    }    
  }
}
