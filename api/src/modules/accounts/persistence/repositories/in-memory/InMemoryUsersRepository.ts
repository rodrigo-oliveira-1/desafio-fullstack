import { User } from '../../../domain/user/user'
import { IUsersRepository } from '../IUsersRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public items: User[] = []) {}
  async findAll(): Promise<User[]> {
    return this.items
  }
  
  async findById(id: string): Promise<User> {
    return this.items.find(user => user.id === id)
  }
  
  async delete(userId: string): Promise<void> {
    const userIndex = this.items.findIndex(findUser => findUser.id === userId)

    this.items.splice(userIndex, 1)
  }

  async exists(fieldKey: string, fieldValue: string): Promise<boolean> {
    return this.items.some(user => user[fieldKey].value === fieldValue)
  }

  async findByEmail(email: string): Promise<User> {
    return this.items.find(user => user.email.value === email)
  }

  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex(findUser => findUser.id === user.id)

    this.items[userIndex] = user
  }

  async create(user: User): Promise<void> {
    console.log(user)
    this.items.push(user)
  }
}
