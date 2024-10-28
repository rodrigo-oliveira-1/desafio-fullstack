import { User } from '../../../domain/user/user'
import { IUsersRepository } from '../IUsersRepository'
import { DBContext } from '@infra/database/sequelize/connection'
import { UserMapper } from '@modules/accounts/persistence/mappers/UserMapper'

export class SequelizeUsersRepository implements IUsersRepository {
    async findAll(): Promise<User[]> {
        const users: any = await DBContext.Users.findAll(
            { 
                where: {
                    deletedAt: null
                },
                raw: true 
            })
        
        if (users) {
            return users.map(user => UserMapper.toDomain(user).value as User)
        } 

        return []
    }

    async findById(id: string): Promise<User> {
        const user: any = await DBContext.Users.findOne({
            where: {
                id
            },
            raw: true       
        })

        if (user) return UserMapper.toDomain(user).value as User

        return null
    }
    
    async delete(userId: string): Promise<void> {
        await DBContext.Users.destroy({
            where: {
                id: userId
            }       
        })
    }
    
    async exists(fieldKey: string, fieldValue: string): Promise<boolean> {
        const user = await DBContext.Users.findOne({
            where: {
                [fieldKey]: fieldValue
            }       
        })

        return !!user
    }
    
    async findByEmail(email: string): Promise<User> {
        
        const user:any = await DBContext.Users.findOne({
            where: {
                email
            },
            raw: true       
        })

        if (user) return UserMapper.toDomain(user).value as User

        return null
    }

    async save(user: User): Promise<void> {
        const data = await UserMapper.toPersistence(user)
        console.log(data)
        await DBContext.Users.update(data, {
            where: {
                id: data.id
            }
        })
    }
    
    async create(user: User): Promise<void> {
        const data = await UserMapper.toPersistence(user)
        
        await DBContext.Users.create(data)
    }

}