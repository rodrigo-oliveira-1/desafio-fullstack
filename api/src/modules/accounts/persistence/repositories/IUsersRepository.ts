import { User } from '../../domain/user/user'

export interface IUsersRepository {
  exists(fieldKey: string, fieldValue: string): Promise<boolean>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findAll(): Promise<User[]>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
  delete(userId: string): Promise<void>
}
