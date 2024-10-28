import { Either, left, right } from '@core/logic/Either'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { getUserResponseDto } from '@modules/accounts/dto/user.dto'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'
import { UserMapper } from '@modules/accounts/persistence/mappers/UserMapper'
import { User } from '@modules/accounts/domain/user/user'

type GetUserResponse = Either<RecordNotFountError, getUserResponseDto[]>

export class GetUsers {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<GetUserResponse> {

    const users = await this.usersRepository.findAll()
    
    const result: getUserResponseDto[] = []
    for (const user of users) {
      const userDto = await UserMapper.toPersistence(user) as getUserResponseDto
      result.push(userDto)
    }
    
    return right(result)
  }
}
