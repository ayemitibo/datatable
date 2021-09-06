import { isDef, isArray, isDate } from '/@src/utils'

describe('isDef', () => {
  it('returns false if the argument is undefined or null', () => {
    [undefined, null].forEach((x) => {
      expect(isDef(x)).toBe(false)
    })
  })

  it('returns true if the argument is neither undefined nor null', () => {
    ['', 0, {}, [], new Date()].forEach(x => {
      expect(isDef(x)).toBe(true)
    })
  })
})

describe('isArray', () => {
  it('returns false if the argument is not an array', () => {
    [undefined, null, '', 0, {}, new Date()].forEach(x => {
      expect(isArray(x)).toBe(false)
    })
  })

  it('returns true if the argument is an array', () => {
    expect(isArray([])).toBe(true)
  })
})

describe('isDate', () => {
  it('returns false if the argument is not a date', () => {
    [undefined, null, '', 0, [], {}].forEach(x => {
      expect(isDate(x)).toBe(false)
    })
  })

  it('returns true if the argument is a date', () => {
    expect(isDate(new Date())).toBe(true)
  })
})
