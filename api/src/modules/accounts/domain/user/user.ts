import { Entity } from '@core/domain/Entity'
import { Email } from '@core/domain/valuedObjects/email'
import { UserName } from './userName' 
import { Password } from '@core/domain/valuedObjects/password'
import { DefaultModel, WithOptional } from '@core/domain/DefaultModel'
import { CpfOrCnpj } from '@core/domain/valuedObjects/cpfCnpj'
import { BrazilianAddress } from '@core/domain/valuedObjects/brazilianAddress'
import { AccountStatus } from './accountStatus'

export class UserProps extends DefaultModel {
  name: UserName;
  email: Email;
  password: Password;
  status: AccountStatus;
  cpf: CpfOrCnpj;
  bornDate: Date;
  address: BrazilianAddress;
}

type CreateUserInput = WithOptional<UserProps, 'createdAt' | 'createdBy' | 'updatedAt'| 'updatedBy'| 'deletedAt'| 'deletedBy'>


export class User extends Entity<UserProps> {
  
  get name(): UserName {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  get password(): Password {
    return this.props.password
  }

  get status(): AccountStatus {
    return this.props.status
  }

  get cpf(): CpfOrCnpj {
    return this.props.cpf
  }

  get bornDate(): Date {
    return this.props.bornDate
  }

  get address(): BrazilianAddress {
    return this.props.address
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get createdBy(): string {
    return this.props.createdBy
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get updatedBy(): string {
    return this.props.updatedBy
  }

  get deletedAt(): Date {
    return this.props.deletedAt
  }

  get deletedBy(): string {
    return this.props.deletedBy
  }
  
  get isActive(): boolean {
    return this.props.status.value === 'ACTIVE'
  }

  get isDeactiveted(): boolean {
    return this.props.status.value !== 'ACTIVE'
  }

  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static create(data: CreateUserInput, id?: string): User {
    
    return new User({
      ...data,
      createdAt: data.createdAt ? data.createdAt : new Date(),
      createdBy: data.createdBy ? data.createdBy : null,
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
      updatedBy: data.updatedBy ? data.updatedBy : null,
      deletedAt: data.deletedAt ? data.deletedAt : null,
      deletedBy: data.deletedBy ? data.deletedBy : null
    }, id)
    
  }
}
