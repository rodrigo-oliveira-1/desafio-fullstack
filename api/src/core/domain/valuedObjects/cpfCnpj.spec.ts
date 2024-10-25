import { CpfOrCnpj } from "./cpfCnpj" 

describe('Cpf or Cnpj value object', () => {
  
  it('should extract only numbers from a cpf/cnpj input', () => {
    const onlyNumbers = CpfOrCnpj.getNumbers('856.125.212-22')
    expect(onlyNumbers).toBeTruthy()
    expect(onlyNumbers.length).toEqual(11)
    expect(/^\d+$/.test(onlyNumbers)).toBeTruthy()
  })
  
  it('should accept valid CPF', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('573.518.480-68')
    expect(cpfCnpjOrError.isRight()).toBeTruthy()
  })

  it('should accept a valid CNPJ', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57.705.982/0001-34')
    expect(cpfCnpjOrError.isRight()).toBeTruthy()
  })

  it('should accept a CPF with only numbers', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57351848068')
    expect(cpfCnpjOrError.isRight()).toBeTruthy()
  })

  it('should accept a CNPJ with only numbers', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57705982000134')
    expect(cpfCnpjOrError.isRight()).toBeTruthy()
  })

  it('shouldn\'t accept a cpf/cnpj with more than 14 numbers', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57.705.982/0001-345')
    expect(cpfCnpjOrError.isLeft()).toBeTruthy()
  })

  it('shouldn\'t accept a cpf/cnpj with less than 11 numbers', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('1234567890')
    expect(cpfCnpjOrError.isLeft()).toBeTruthy()
  })

  it('shouldn\'t accept a cpf/cnpj with more than 20 characteres', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57.705.982/0001-3455-1234')
    expect(cpfCnpjOrError.isLeft()).toBeTruthy()
  })

  it('should reject a invalid cpf', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('09260077725')
    expect(cpfCnpjOrError.isLeft()).toBeTruthy()
  })

  it('should reject a invalid CNPJ', () => {
    const cpfCnpjOrError = CpfOrCnpj.create('57705982000133')
    expect(cpfCnpjOrError.isLeft()).toBeTruthy()
  })

  
})
