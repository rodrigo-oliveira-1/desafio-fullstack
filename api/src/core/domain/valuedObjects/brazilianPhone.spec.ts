import { BrazilianPhone } from "./brazilianPhone"

describe('Phone number value object', () => {
  
  it('should extract only numbers from a phone input', () => {
    const onlyNumbers = BrazilianPhone.getNumbers('(73) 9 9988-1231')
    expect(onlyNumbers).toBeTruthy()
    expect(onlyNumbers.length).toBeGreaterThanOrEqual(10)
    expect(onlyNumbers.length).toBeLessThanOrEqual(11)
    expect(/^\d+$/.test(onlyNumbers)).toBeTruthy()
  })
  
  it('should accept valid cell phone', () => {
    const phoneOrError = BrazilianPhone.create('(73) 9 9988-1231')
    expect(phoneOrError.isRight()).toBeTruthy()
  })

  it('should accept a cell phone number with only numbers', () => {
    const phoneOrError = BrazilianPhone.create('73999881231')
    expect(phoneOrError.isRight()).toBeTruthy()
  })

  it('should accept valid phone', () => {
    const phoneOrError = BrazilianPhone.create('(73) 3226-1544')
    expect(phoneOrError.isRight()).toBeTruthy()
  })

  it('should accept a phone number with only numbers', () => {
    const phoneOrError = BrazilianPhone.create('7332261231')
    expect(phoneOrError.isRight()).toBeTruthy()
  })

  it('shouldn\'t accept a phone number with more than 20 characters', () => {
    const phoneOrError = BrazilianPhone.create('+55 (73) 9 9955-4444--')
    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  it('shouldn\'t accept a phone number with less than 10 numbers', () => {
    const phoneOrError = BrazilianPhone.create('73 955-4444')
    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  it('shouldn\'t accept a phone number with more than 11 numbers', () => {
    const phoneOrError = BrazilianPhone.create('55 73 9 9955-4444')
    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  
})
