import { parseCoorinatesMatrix, parseDefaultCoorinatesMatrix } from '@/lib/coorinatesMatrixParser'
import { describe, expect, it } from 'vitest'

describe('parseDefaultCoorinatesMatrix', () => {
  it('parses valid input correctly', () => {
    const input = '1 1 1 1\n2 2 2 2\n3 3 3 3'
    const expected = [
      { index: 1, x: 1, y: 1, z: 1 },
      { index: 2, x: 2, y: 2, z: 2 },
      { index: 3, x: 3, y: 3, z: 3 }
    ]
    expect(parseDefaultCoorinatesMatrix(input)).toEqual(expected)
  })

  it('should ignore lines with less than 4 elements', () => {
    const input = '1 10 20\n22 22 22 22\n3 70 80'
    const expected = [{ index: 22, x: 22, y: 22, z: 22 }]
    expect(parseDefaultCoorinatesMatrix(input)).toEqual(expected)
  })

  it('handles empty input', () => {
    expect(parseDefaultCoorinatesMatrix('')).toEqual([])
  })

  it('trims spaces and parses correctly', () => {
    const input = ' 11  11   11  11 \n   22 22 22 22   \n33  33  33  33  '
    const expected = [
      { index: 11, x: 11, y: 11, z: 11 },
      { index: 22, x: 22, y: 22, z: 22 },
      { index: 33, x: 33, y: 33, z: 33 }
    ]
    expect(parseDefaultCoorinatesMatrix(input)).toEqual(expected)
  })

  it('parses negative numbers correctly', () => {
    const input = '1 -10 20 -30\n2 -40 -50 60'
    const expected = [
      { index: 1, x: -10, y: 20, z: -30 },
      { index: 2, x: -40, y: -50, z: 60 }
    ]
    expect(parseDefaultCoorinatesMatrix(input)).toEqual(expected)
  })

  it('returns empty array if no lines have exactly 4 elements', () => {
    const input = '4 4 4\n5 5 5\n6 6 6'
    expect(parseDefaultCoorinatesMatrix(input)).toEqual([])
  })
})

describe('parseCoorinatesMatrix', () => {
  it('parses default coorinatesMatrix', () => {
    const input = '1 1 1 1'
    const expected = [{ index: 1, x: 1, y: 1, z: 1 }]
    expect(parseCoorinatesMatrix(input).data).toEqual(expected)
  })

  it('parses coorinatesMatrix with no index', () => {
    const input = '1 1 0\n2 5 0\n5 3 0\n'
    const expected = [
      { index: 1, x: 1, y: 1, z: 0 },
      { index: 2, x: 2, y: 5, z: 0 },
      { index: 3, x: 5, y: 3, z: 0 }
    ]
    expect(parseCoorinatesMatrix(input).data).toEqual(expected)
  })

  it('return an error if no parser is matching', () => {
    const input = '123456789'
    const expected = 'validation.cannotReadCoorinatesMatrix'
    expect(parseCoorinatesMatrix(input).error?.message).toEqual(expected)
  })
})
