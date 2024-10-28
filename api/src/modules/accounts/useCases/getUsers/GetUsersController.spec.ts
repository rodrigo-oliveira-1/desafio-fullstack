import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

let token = null;

const userEmail = 'johndoe@doe3.com'
describe('Get users (e2e)', () => {
  
  beforeAll(async () => {
    try {
      const { accessToken } = await createAndAuthenticateUser()
      token = accessToken;
      await DBContext.Users.create({
        id: 'test-123456789',
        name: 'John Doe',
        email: userEmail,
        status: 'ACTIVE',
        cpf: '542.401.590-59',
        password: '123456',
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
      .get('/users')
      .set('x-access-token', token)
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toBeDefined()
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })  
})
