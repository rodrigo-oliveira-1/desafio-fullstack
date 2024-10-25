import { Either, left, right } from '@core/logic/Either'
import { Email } from '../../../../core/domain/valuedObjects/email'
import { InvalidEmailError } from '../../../../core/domain/valuedObjects/errors/InvalidEmailError'
import { InvalidNameError } from '../../../../core/domain/valuedObjects/errors/InvalidNameError'
import { InvalidPasswordLengthError } from '../../../../core/domain/valuedObjects/errors/InvalidPasswordLengthError'
import { UserName } from '@modules/accounts/domain/user/userName' 
import { Password } from '../../../../core/domain/valuedObjects/password'
import { User } from '../../domain/user/user'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError'
import { IPasswordHasher } from '@infra/providers/IPasswordHasherProvider'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { CpfOrCnpj } from '@core/domain/valuedObjects/cpfCnpj'
import { AddressDescription } from '@core/domain/valuedObjects/AddressDescription'
import { BrazilianShortState, ValidBrazilianShortState } from '@core/domain/valuedObjects/brazilianShortState'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'
import { AddressNumber } from '@core/domain/valuedObjects/AddressNumber'
import { InvalidCpfCnpjError } from '@core/domain/valuedObjects/errors/InvalidCpfCnpj'
import { BrazilianZipCode } from '@core/domain/valuedObjects/brazilianZipCode'
import { createUserRequestDto } from '@modules/accounts/dto/user.dto'
import { AccountStatus, ValidAccountStatus } from '@modules/accounts/domain/user/accountStatus'

type CreateUserResponse = Either<
  | AccountAlreadyExistsError
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidCpfCnpjError,
  User
>

export class CreateUser {
  constructor(
    private usersRepository: IUsersRepository,
    private passHasher : IPasswordHasher,
    private dateProvider: IDateProvider
  ) {}

  async execute(data: createUserRequestDto): Promise<CreateUserResponse> {

    const currentDate = this.dateProvider.getCurrentDate()

    const name = UserName.create(data.name)
    const cpf = CpfOrCnpj.create(data.cpf)
    const email = Email.create(data.email)
    const status = AccountStatus.create('ACTIVE' as ValidAccountStatus)
    const street = AddressDescription.create(data.street)
    const number = AddressNumber.create(data.number)
    const neighborhood = AddressDescription.create(data.neighborhood)
    const reference = AddressDescription.create(data.reference)
    const city = AddressDescription.create(data.city)
    const state = BrazilianShortState.create(data.state as ValidBrazilianShortState)
    const zipCode = BrazilianZipCode.create(data.zipCode)
    const password = Password.create(this.passHasher, data.password)

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
      createdAt: currentDate
    })
    
    let userAlreadyExists = await this.usersRepository.exists('email', user.email.value)
    if (userAlreadyExists) return left(new AccountAlreadyExistsError(user.email.value))
    
    userAlreadyExists = await this.usersRepository.exists('cpf', user.cpf.value)
    if (userAlreadyExists) return left(new AccountAlreadyExistsError(user.cpf.value))

    await this.usersRepository.create(user)
    
    return right(user)
  }
}
