import { Either, left, right } from '@core/logic/Either'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { getUserResponseDto } from '@modules/accounts/dto/user.dto'
import { RecordNotFountError } from '@core/domain/errors/RecordNotFoundError'
import { UserMapper } from '@modules/accounts/persistence/mappers/UserMapper'

type GetUserResponse = Either<RecordNotFountError, getUserResponseDto>

export class GetUser {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<GetUserResponse> {

    const user = await this.usersRepository.findById(id)
    if (!user) return left(new RecordNotFountError(id))

    const userResponse = await UserMapper.toPersistence(user)  
    
    return right(userResponse as getUserResponseDto)
  }
}
