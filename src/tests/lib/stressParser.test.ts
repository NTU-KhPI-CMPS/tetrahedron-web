import { parseDefaultPhysicalQuantity } from '@/lib/otherCharacteristicsParser'
import { parseDefaultStress, parseStress } from '@/lib/stressParser'
import { describe, expect, it } from 'vitest'

describe('parseDefaultStress', () => {
  it('parses valid input correctly', () => {
    const input = '1 5 3 3 -2 6 -3\n2 1 -7 3 1 8 -4\n3 6 4 3 1 8 -4'
    const expected = [
      { index: 1, qx: 5, txy: 3, tzx: 3, qy: -2, tyz: 6, qz: -3 },
      { index: 2, qx: 1, txy: -7, tzx: 3, qy: 1, tyz: 8, qz: -4 },
      { index: 3, qx: 6, txy: 4, tzx: 3, qy: 1, tyz: 8, qz: -4 }
    ]
    expect(parseDefaultStress(input)).toEqual(expected)
  })

  it('ignores lines with less than 7 elements', () => {
    const input = '5 3 3 -2 6 -3\n2 1 -7 3 1 8 -4\n6 4 3 1 8 -4'
    const expected = [{ index: 2, qx: 1, txy: -7, tzx: 3, qy: 1, tyz: 8, qz: -4 }]
    expect(parseDefaultStress(input)).toEqual(expected)
  })

  it('handles empty input', () => {
    expect(parseDefaultStress('')).toEqual([])
  })

  it('parses negative numbers correctly', () => {
    const input = '1 -8 -7 3 -1 5 6\n2 9 -7 5 -5 2 1\n3 3 -5 -6 -7 -4 -2'
    const expected = [
      { index: 1, qx: -8, txy: -7, tzx: 3, qy: -1, tyz: 5, qz: 6 },
      { index: 2, qx: 9, txy: -7, tzx: 5, qy: -5, tyz: 2, qz: 1 },
      { index: 3, qx: 3, txy: -5, tzx: -6, qy: -7, tyz: -4, qz: -2 }
    ]
    expect(parseDefaultStress(input)).toEqual(expected)
  })

  it('returns empty array if no lines have 7 elements', () => {
    const input = '-8 -7 3 -1 5 6\n 3 4 5 1 -2\n 1 6 34 3'
    expect(parseDefaultStress(input)).toEqual([])
  })
})

describe('parseStress', () => {
  it('parses default stress', () => {
    const input = '1 2 4 -5 6 4 -1'
    const expected = [{ index: 1, qx: 2, txy: 4, tzx: -5, qy: 6, tyz: 4, qz: -1 }]
    expect(parseStress(input).data).toEqual(expected)
  })

  it('parses stress with no index', () => {
    const input = '2 4 -5 6 4 -1\n 3 -4 1 -2 -5 9'
    const expected = [
      { index: 1, qx: 2, txy: 4, tzx: -5, qy: 6, tyz: 4, qz: -1 },
      { index: 2, qx: 3, txy: -4, tzx: 1, qy: -2, tyz: -5, qz: 9 }
    ]
    expect(parseStress(input).data).toEqual(expected)
  })

  it('return error if found mismatch', () => {
    const input = '1234567890'
    const expected = 'validation.stressInvalidNumbersCount'
    expect(parseStress(input).error?.message).toEqual(expected)
  })
})

describe('parseDefaultPhysicalQuantity', () => {
  it('parses default physical quantity', () => {
    const input = '0.123 \n 1.234'
    const expected = { values: [0.123, 1.234], min: 0.123, max: 1.234 }
    expect(parseDefaultPhysicalQuantity(input)).toEqual(expected)
  })
})
