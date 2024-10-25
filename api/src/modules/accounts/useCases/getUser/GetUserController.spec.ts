import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'

//import { createAndAuthenticateUser } from '@test/factories/UserFactory'
//const { jwt: { token }, } = createAndAuthenticateUser()

const userEmail = 'johndoe@doe.com'
describe('Get user (e2e)', () => {
  
  beforeAll(async () => {
    try {
      await DBContext.Users.create({
        id: 'test-123456789',
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
      .get('/users/test-123456789')
      .set('x-access-token', 'todo_set_auth_token')
      .send()

    console.log(response.error)
    expect(response.status).toBe(200)

    expect(response.data).toBeDefined()
    expect(response.data.email).toEqual(userEmail)
  })

  it('should return an 404 error if send an inexisting id', async () => {
    const response = await request(app)
      .get('/users/132')
      .set('x-access-token', 'todo_set_auth_token')
      .send()

    expect(response.status).toBe(404)
  })
})
