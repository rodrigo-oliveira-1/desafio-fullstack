import bcrypt from 'bcryptjs'
import { IPasswordHasher } from "@infra/providers/IPasswordHasherProvider";

export class BcryptPasswordHasher implements IPasswordHasher {

    private readonly saltRounds: number;

    constructor(saltRounds: number = 12) {
        this.saltRounds = saltRounds;
    }
    
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword)
    }

}