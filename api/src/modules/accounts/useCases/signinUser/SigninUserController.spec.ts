import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'
import { AccountSigninNotFoundError } from './error/AccountSigninNotFoundError'
import { BcryptPasswordHasher } from '@infra/providers/implementations/BcryptPassordHasherProvider'

//import { createAndAuthenticateUser } from '@test/factories/UserFactory'
//const { jwt: { token }, } = createAndAuthenticateUser()

const userEmail = 'johndoe@signin.com'
const passHasher = new BcryptPasswordHasher()
let pass = ''
describe('Signin user (e2e)', () => {
  
  beforeAll(async () => {
    try {
      pass = await passHasher.hashPassword('123456')
      console.log(pass)

      await DBContext.Users.create({
        id: 'test-1234567890sigin',
        name: 'John Doe',
        email: userEmail,
        status: 'ACTIVE',
        cpf: '357.785.940-70',
        password: pass,
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000,
        createdAt: new Date(),
        createdBy: 'test-123456'  
      })
    } catch (error) {
      console.log(error)
    }
  })

  afterAll(async () => {
    try {
      
      await DBContext.Users.destroy({ where: { email: userEmail }})
      await DBConnection.close()
    } catch (error) {
      console.log(error)
    }
  })
  
  it('should be able to get an existing user', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        userEmail,
        userPass: '123456'
      })

    expect(response.status).toBe(200)

    expect(response.body).toBeDefined()
    expect(response.body.accessToken).toBeDefined()
  })

  it('should return an 400 error if send an inexisting account', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        userEmail: 'fakeemail@email.com',
        userPass: '123456'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toEqual(new AccountSigninNotFoundError().message)
  })

  it('should return an 400 error if send an invalid pass', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        userEmail,
        userPass: 'example'
      })
      
    expect(response.status).toBe(400)
    expect(response.body.error).toEqual(new AccountSigninNotFoundError().message)
  })
})
