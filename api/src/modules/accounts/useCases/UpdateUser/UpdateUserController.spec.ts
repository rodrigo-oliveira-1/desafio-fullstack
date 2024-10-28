import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

let token = null;

const userEmail = 'johndoes@doe.com'
const userId = 'test-1234567891';
describe('Update user (e2e)', () => {
  
  beforeAll(async () => {
    try {
      const { accessToken } = await createAndAuthenticateUser()
      token = accessToken;
      await DBContext.Users.create({
        id: userId,
        name: 'John Doe',
        email: userEmail,
        cpf: '299.180.610-90',
        password: '123456',
        bornDate: new Date(),
        status: 'ACTIVE',
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
      
      await DBContext.Users.destroy({ where: { id: userId }})
      await DBConnection.close()
    } catch (error) {
      console.log(error)
    }
  })
  
  it('should be able to update an user', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('x-access-token', token)
      .send({
        id: userId,
        name: 'Joana Doe',
        email: 'joanadoe@test.com',
        cpf: '999.353.630-07',
        password: '123456',
        status: 'ACTIVE',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000
      })

    expect(response.status).toBe(200)

    const userInDatabase: any = await DBContext.Users.findOne({
      where: { id: userId },
    })

    expect(userInDatabase).toBeDefined()
    expect(userInDatabase.cpf).toEqual('29918061090')//should dont update cpf
    expect(userInDatabase.name).toEqual('Joana Doe')
  })

  it('should return an error if validation fails', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('x-access-token', token)
      .send({
        id: userId,
        name: 'Joana Doe',
        email: 'joanadoe@test.com',
        cpf: '999.353.630-77',
        status: 'ACTIVE',
        password: '123456',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'XX', //invalid value for updatable field 
        zipCode: 12256000
      })

    expect(response.status).toBe(400)
  })
})
