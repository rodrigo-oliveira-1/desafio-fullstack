import { UUID_v4 } from "./uuidv4"


describe('UUID V4 value object', () => {
  
  it('should accept valid UUID v4', () => {
    const uuidOrError = UUID_v4.create('1b560ba5-dca6-41c5-9558-1a4704f62281')

    expect(uuidOrError.isRight()).toBeTruthy()
  })

  it('should reject UUID V4 with less than 36 characters', () => {
    const uuidOrError = UUID_v4.create('1b560ba5-dca6-41c5-9558-1a4704f622')

    expect(uuidOrError.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 36 characters', () => {
    const uuidOrError = UUID_v4.create('1b560ba5-dca6-41c5-9558-1a4704f6228123')

    expect(uuidOrError.isLeft()).toBeTruthy()
  })
  
})
