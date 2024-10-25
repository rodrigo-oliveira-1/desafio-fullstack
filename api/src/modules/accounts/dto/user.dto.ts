import { WithOptional } from "@core/domain/DefaultModel";

export type UserPlainDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  cpf: string;
  bornDate: Date;
  street: string;
  number: string;
  neighborhood: string;
  reference: string;
  city: string;
  state: string;
  zipCode: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string;
}

export type createUserRequestDto = Omit<
    UserPlainDto, 
    'id' | 'status' | 'createdAt' | 'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy'>

export type getUserResponseDto = Omit<UserPlainDto, 'password' | 'deletedAt' | 'deletedBy'>    

export type UpdateUserRequestDto = WithOptional<
    UserPlainDto, 
    'cpf' | 'email' | 'password' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy'>    