import { parseAnsysIndicesMatrix, parseDefaultIndicesMatrix, parseIndicesMatrix } from '@/lib/indicesMatrixParser'
import { describe, expect, it } from 'vitest'

describe('parseDefaultIndicesMatrix', () => {
  it('parses valid input correctly', () => {
    const input = '1 24 25 43 26\n2 42 46 41 32\n3 16 43 46 42'
    const expected = [
      { index: 1, vertex1: 24, vertex2: 25, vertex3: 43, vertex4: 26 },
      { index: 2, vertex1: 42, vertex2: 46, vertex3: 41, vertex4: 32 },
      { index: 3, vertex1: 16, vertex2: 43, vertex3: 46, vertex4: 42 }
    ]
    expect(parseDefaultIndicesMatrix(input)).toEqual(expected)
  })

  it('ignores lines with less than 5 elements', () => {
    const input = '24 25 43 26\n42 46 41 32\n3 16 43 46 42'
    const expected = [{ index: 3, vertex1: 16, vertex2: 43, vertex3: 46, vertex4: 42 }]
    expect(parseDefaultIndicesMatrix(input)).toEqual(expected)
  })

  it('handles empty input', () => {
    expect(parseDefaultIndicesMatrix('')).toEqual([])
  })

  it('trims spaces and parses correctly', () => {
    const input = ' 10  43   35  19 36 \n   11 8 44 6  7   \n12  41  45  44  39  '
    const expected = [
      { index: 10, vertex1: 43, vertex2: 35, vertex3: 19, vertex4: 36 },
      { index: 11, vertex1: 8, vertex2: 44, vertex3: 6, vertex4: 7 },
      { index: 12, vertex1: 41, vertex2: 45, vertex3: 44, vertex4: 39 }
    ]
    expect(parseDefaultIndicesMatrix(input)).toEqual(expected)
  })

  it('parses negative numbers correctly', () => {
    const input = '16 41 39 -30 38\n17 -45 -14 -4 -18'
    const expected = [
      { index: 16, vertex1: 41, vertex2: 39, vertex3: -30, vertex4: 38 },
      { index: 17, vertex1: -45, vertex2: -14, vertex3: -4, vertex4: -18 }
    ]
    expect(parseDefaultIndicesMatrix(input)).toEqual(expected)
  })

  it('returns empty array if no lines have exactly 5 elements', () => {
    const input = '41 46 15 38\n24 28 36 46 37 37 37\n17 36 12 46'
    expect(parseDefaultIndicesMatrix(input)).toEqual([])
  })
})

describe('parseAnsysIndicesMatrix', () => {
  it('parses valid input correctly', () => {
    const input = `1 1 1 1 0 1 224 225 226 226 227 227 227 227\n
      2 1 1 1 0 1 224 225 227 227 53 53 53 53\n
      3 1 1 1 0 1 195 16 54 54 224 224 224 224`
    const expected = [
      { index: 1, vertex1: 224, vertex2: 225, vertex3: 226, vertex4: 227 },
      { index: 2, vertex1: 224, vertex2: 225, vertex3: 227, vertex4: 53 },
      { index: 3, vertex1: 195, vertex2: 16, vertex3: 54, vertex4: 224 }
    ]
    expect(parseAnsysIndicesMatrix(input)).toEqual(expected)
  })

  it('ignores lines with less than 5 elements', () => {
    const input = '1 1 1 1 0\n2 1 1 1 0 1 224 225 227 227 53 53 53 53'
    const expected = [{ index: 2, vertex1: 224, vertex2: 225, vertex3: 227, vertex4: 53 }]
    expect(parseAnsysIndicesMatrix(input)).toEqual(expected)
  })

  it('handles empty input', () => {
    expect(parseAnsysIndicesMatrix('')).toEqual([])
  })

  it('trims spaces and parses correctly', () => {
    const input = `  1 1  1 1  0 1 224 225 226   226 227 227 227 227\n
      2 1 1 1 0 1 224 225   227 227 53 53 53 53  `
    const expected = [
      { index: 1, vertex1: 224, vertex2: 225, vertex3: 226, vertex4: 227 },
      { index: 2, vertex1: 224, vertex2: 225, vertex3: 227, vertex4: 53 }
    ]
    expect(parseAnsysIndicesMatrix(input)).toEqual(expected)
  })

  it('returns empty array if no lines have exactly 5 elements', () => {
    const input = `  1 1  1 1   226   226 227 227 227 227\n
      2 1 1 1 0 1 224 225   227  53 53  `
    expect(parseAnsysIndicesMatrix(input)).toEqual([])
  })
})

describe('parseIndicesMatrix', () => {
  it('parses default indicesMatrix', () => {
    const input = '2 42 46 41 32'
    const expected = [{ index: 2, vertex1: 42, vertex2: 46, vertex3: 41, vertex4: 32 }]
    expect(parseIndicesMatrix(input).data).toEqual(expected)
  })

  it('parses ansys indicesMatrix', () => {
    const input = '1 1 1 1 0 1 224 225 226 226 227 227 227 227'
    const expected = [{ index: 1, vertex1: 224, vertex2: 225, vertex3: 226, vertex4: 227 }]
    expect(parseIndicesMatrix(input).data).toEqual(expected)
  })

  it('parses indicesMatrix with no index', () => {
    const input = '1 2 3 4\n5 2 1 4'
    const expected = [
      { index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 },
      { index: 2, vertex1: 5, vertex2: 2, vertex3: 1, vertex4: 4 }
    ]
    expect(parseIndicesMatrix(input).data).toEqual(expected)
  })

  it('return an error if no parser is matching', () => {
    const input = '98746554321'
    const expected = 'validation.cannotReadIndicesMatrix'
    expect(parseIndicesMatrix(input).error?.message).toEqual(expected)
  })
})
