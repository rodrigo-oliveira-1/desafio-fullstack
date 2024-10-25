import request from 'supertest'
import { app } from '@infra/http/app'
import { DBContext, DBConnection } from '@infra/database/sequelize/connection'

//import { createAndAuthenticateUser } from '@test/factories/UserFactory'
//const { jwt: { token }, } = createAndAuthenticateUser()

const userEmail = 'johndoe@doe.com'
describe('Update user (e2e)', () => {
  
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
  
  it('should be able to update an user', async () => {
    const response = await request(app)
      .put('/users/test-123456789')
      .set('x-access-token', 'todo_set_auth_token')
      .send({
        id: 'test-123456789',
        name: 'Joana Doe',
        email: 'joanadoe@test.com',
        cpf: '999.353.630-07',
        password: '123456',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000
      })

    console.log(response.error)
    expect(response.status).toBe(200)

    const userInDatabase: any = await DBContext.Users.findOne({
      where: { email: userEmail },
    })

    expect(userInDatabase).toBeDefined()
    expect(userInDatabase.cpf).toEqual('357.785.940-70')//should dont update cpf
    expect(userInDatabase.name).toEqual('Joana Doe')
  })

  it('should return an error if validation fails', async () => {
    const response = await request(app)
      .put('/users/test-123456789')
      .set('x-access-token', 'todo_set_auth_token')
      .send({
        id: 'test-123456789',
        name: 'Joana Doe',
        email: 'joanadoe@test.com',
        cpf: '999.353.630-77',//invalid cpf
        password: '123456',
        bornDate: new Date(),
        street: 'Street one',
        number: '1250',
        neighborhood: 'center',
        reference: 'center',
        city: 'Sao Paulo',
        state: 'SP',
        zipCode: 12256000
      })

    expect(response.status).toBe(400)
  })
})
