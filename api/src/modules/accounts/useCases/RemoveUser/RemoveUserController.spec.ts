import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

let token = null;

const userEmail = 'johndoe@remove.com'
const userId = 'test-11111111';
describe('Remove user (e2e)', () => {
  
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
  
  it('should be able to remove an user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('x-access-token', token)
      .send({ id: userId })

    expect(response.status).toBe(200)

    const userInDatabase: any = await DBContext.Users.findOne({
      where: { id: userId },
    })

    expect(userInDatabase).toBeDefined()
    expect(userInDatabase.deletedAt).toBeDefined()
    expect(userInDatabase.deletedBy).toBeDefined()
  })  
})
