 
import { User } from '../../domain/user/user'
import { IUsersRepository } from '../../persistence/repositories/IUsersRepository'
import { IDateProvider } from '@infra/providers/IDateProvider'
import { UserMapper } from '@modules/accounts/persistence/mappers/UserMapper'

type RemoveUserRequestDto = { id: string, userId: string }
export class RemoveUser {
  constructor(
    private usersRepository: IUsersRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute(data: RemoveUserRequestDto): Promise<void> {

    const user = await this.usersRepository.findById(data.id)
    if (!user) return 
    
    const currentDate = this.dateProvider.getCurrentDate()
    
    const userUpdated = User.create({
      ...user,
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
      cpf: user.cpf,
      bornDate: user.bornDate,
      address: user.address,
      //createdAt: user.createdAt,
      //createdBy: user.createdBy,
      //updatedAt: user.updatedAt,
      //updatedBy: user.updatedBy,
      deletedAt: currentDate,
      deletedBy: data.userId || null
    }, data.id)  

    console.log(userUpdated.props)
    
    await this.usersRepository.save(userUpdated)
  }
}
