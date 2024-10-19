import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('Name validation function', () => {
  it('should return true for valid name', () => {
    const result = nameIsValid('bun')
    expect(result).toEqual(true)
  })

  it('should return false for name with incorrect type', () => {
    const result = nameIsValid(123)
    expect(result).toEqual(false)
  })

  it('should return false for name with insufficient length', () => {
    const result = nameIsValid('s')
    expect(result).toEqual(false)
  })

  it('should return false for name not matching regular expression', () => {
    const result = nameIsValid('bun!')
    expect(result).toEqual(false)
  })
})

describe('Full trim function', () => {
  it('should return text without space in the beginning', () => {
    const result = fullTrim(' bun')
    expect(result).toEqual('bun')
  })

  it('should return text without space in the end', () => {
    const result = fullTrim('bun ')
    expect(result).toEqual('bun')
  })

  it('should return text without space in the beginning and in the end', () => {
    const result = fullTrim(' bun ')
    expect(result).toEqual('bun')
  })

  it('should return text as original when there are no spaces', () => {
    const result = fullTrim('bun!')
    expect(result).toEqual('bun!')
  })
})

describe('Get total function', () => {
  const validDiscount = [
    {
      name: 'discount 99%',
      items: [{ price: 10, quantity: 10 }],
      discount: 99,
      expected: 1
    },
    {
      name: 'discount 1% for 2 items',
      items: [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 }
      ],
      discount: 1,
      expected: 99
    },
    {
      name: 'no discount',
      items: [{ price: 10, quantity: 10 }],
      discount: 0,
      expected: 100
    }
  ]

  test.each(validDiscount)('$name', ({ items, discount, expected }) => {
    const result = getTotal(items, discount)
    expect(result).toBeCloseTo(expected, 1)
  })

  const invalidDiscount = [
    {
      name: 'discount 100%',
      items: [{ price: 10, quantity: 10 }],
      discount: 100,
      expectedError: 'Процент скидки должен быть от 0 до 99'
    },
    {
      name: 'discount -1%',
      items: [{ price: 10, quantity: 1 }],
      discount: -1,
      expectedError: 'Процент скидки должен быть от 0 до 99'
    },
    {
      name: 'discount is string',
      items: [{ price: 10, quantity: 10 }],
      discount: 'one',
      expectedError: 'Скидка должна быть числом'
    }
  ]

  test.each(invalidDiscount)('$name', ({ items, discount, expectedError }) => {
    expect(() => getTotal(items, discount)).toThrow(expectedError)
  })
})
