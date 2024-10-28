import { Either, left, right } from '@core/logic/Either'
import { InvalidNameError } from '../../../../core/domain/valuedObjects/errors/InvalidNameError'
import { UserName } from '@modules/accounts/domain/user/userName' 
import { User } from '../../domain/user/user'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { AddressDescription } from '@core/domain/valuedObjects/AddressDescription'
import { BrazilianShortState, ValidBrazilianShortState } from '@core/domain/valuedObjects/brazilianShortState'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'
import { AddressNumber } from '@core/domain/valuedObjects/AddressNumber'
import { BrazilianZipCode } from '@core/domain/valuedObjects/brazilianZipCode'
import { UpdateUserRequestDto } from '@modules/accounts/dto/user.dto'
import { AccountStatus, ValidAccountStatus } from '@modules/accounts/domain/user/accountStatus'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'

type UpdateUserResponse = Either<InvalidNameError | RecordNotFountError, User>

export class UpdateUser {
  constructor(
    private usersRepository: IUsersRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute(data: UpdateUserRequestDto): Promise<UpdateUserResponse> {

    const user = await this.usersRepository.findById(data.id)
    if (!user) return left(new RecordNotFountError(data.id))
    
    const currentDate = this.dateProvider.getCurrentDate()

    const name = UserName.create(data.name)
    const status = AccountStatus.create(data.status as ValidAccountStatus)
    const street = AddressDescription.create(data.street)
    const number = AddressNumber.create(data.number)
    const neighborhood = AddressDescription.create(data.neighborhood)
    const reference = AddressDescription.create(data.reference)
    const city = AddressDescription.create(data.city)
    const state = BrazilianShortState.create(data.state as ValidBrazilianShortState)
    const zipCode = BrazilianZipCode.create(data.zipCode)
    
    if (name.isLeft()) return left(name.value)
    if (status.isLeft()) return left(status.value)
    if (street.isLeft()) return left(street.value)
    if (number.isLeft()) return left(number.value)
    if (neighborhood.isLeft()) return left(neighborhood.value)
    if (reference.isLeft()) return left(reference.value)
    if (city.isLeft()) return left(city.value)
    if (state.isLeft()) return left(state.value)
    if (zipCode.isLeft()) return left(zipCode.value)

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

    const userUpdated = User.create({
      ...user,
      name: name.value,
      email: user.email,
      password: user.password,
      status: status.value,
      cpf: user.cpf,
      bornDate: data.bornDate,
      address: address.value,
      createdAt: user.createdAt,
      updatedAt: currentDate,
      updatedBy: data.updatedBy ? data.updatedBy : null
    }, data.id)  

    await this.usersRepository.save(userUpdated)
    
    return right(userUpdated)
  }
}
