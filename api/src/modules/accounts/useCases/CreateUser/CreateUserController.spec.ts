import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

let token = null;
const userEmail = 'johndoe@doe.com'

describe('Create user (e2e)', () => {
  
  beforeAll(async () => {
    const { accessToken } = await createAndAuthenticateUser()
    token = accessToken;
  })

  afterAll(async () => {
    try {
      
      await DBContext.Users.destroy({ where: { email: userEmail }})
      await DBConnection.close()
    } catch (error) {
      console.log(error)
    }
  })
  
  it('should be able to register new account', async () => {
    const response = await request(app)
      .post('/users')
      .set('x-access-token', token)
      .send({
        name: 'John Doe',
        email: userEmail,
        cpf: '357.785.940-70',
        password: '123456',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000,
        createdBy: 'test-123456'
      })

    console.log(response.error)
    expect(response.status).toBe(201)

    const userInDatabase = await DBContext.Users.findOne({
      where: { email: userEmail },
    })

    expect(userInDatabase).toBeDefined()
  })

  it('should return an error if validation fails', async () => {
    const response = await request(app)
      .post('/users')
      .set('x-access-token', token)
      .send({
        name: 'John Doe',
        email: userEmail,
        //cpf: '357.785.940-70', without cpf
        password: '123456',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000,
        createdBy: 'test-123456'
      })

    expect(response.status).toBe(400)
  })
})
