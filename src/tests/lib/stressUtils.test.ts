import { buildPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { describe, expect, it } from 'vitest'

describe('buildPhysicalQuantity', () => {
  it('builds default physical quantity', () => {
    const input = [0.003, 1.8901]
    const expected = { values: [0.003, 1.8901], min: 0.003, max: 1.8901 }
    expect(buildPhysicalQuantity(input)).toEqual(expected)
  })
})

describe('calculateMisesStress', () => {
  it('calculates average value', () => {
    const input = [
      { index: 1, qx: 2, txy: 4, tzx: -5, qy: 6, tyz: 4, qz: -1 },
      { index: 2, qx: 3, txy: -4, tzx: 1, qy: -2, tyz: -5, qz: 9 }
    ]
    const expected = [14.422205101855955, 14.730919862656235]
    expect(calculateMisesStress(input)).toEqual(expected)
  })
})
