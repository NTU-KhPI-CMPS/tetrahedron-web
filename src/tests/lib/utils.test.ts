import { parseStress } from '@/lib/stressParser'
import { buildMisesPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { calculateCoorinatesMatrixDisplacement, generateCoorinatesMatrix, generateIndicesMatrix } from '@/lib/utils'
import { setStress } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'
import { describe, expect, it } from 'vitest'

vi.mock('@/hooks/use-redux', () => ({
  useAppDispatch: () => vi.fn()
}))

describe('generateIndicesMatrix', () => {
  it('generates correct index array for valid input', () => {
    const input = [
      { index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 },
      { index: 2, vertex1: 5, vertex2: 6, vertex3: 7, vertex4: 8 }
    ]

    const vertexIndices1 = [1, 0, 2, 0, 1, 3, 1, 2, 3, 2, 0, 3]
    const vertexIndices2 = [5, 4, 6, 4, 5, 7, 5, 6, 7, 6, 4, 7]

    const expected = new Uint16Array([...vertexIndices1, ...vertexIndices2])
    expect(generateIndicesMatrix(input)).toEqual(expected)
  })

  it('handles empty input gracefully', () => {
    const input: ElementIndices[] = []
    const expected = new Uint16Array([])
    expect(generateIndicesMatrix(input)).toEqual(expected)
  })

  it('handles indicesMatrix with vertex indices of 1', () => {
    const input = [{ index: 1, vertex1: 1, vertex2: 1, vertex3: 1, vertex4: 1 }]
    const expected = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(generateIndicesMatrix(input)).toEqual(expected)
  })

  it('generates correct index array for a single entry of vertexIndices', () => {
    const input = [{ index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 }]
    const expected = new Uint16Array([1, 0, 2, 0, 1, 3, 1, 2, 3, 2, 0, 3])
    expect(generateIndicesMatrix(input)).toEqual(expected)
  })
})

describe('generateVertexPositions', () => {
  it('should generate a Float32Array of vertex positions', () => {
    const data: VertexCoordinate[] = [
      { index: 1, x: 1, y: 2, z: 3 },
      { index: 2, x: 4, y: 5, z: 6 },
      { index: 3, x: 7, y: 8, z: 9 }
    ]
    const expected = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9])

    expect(generateCoorinatesMatrix(data)).toEqual(expected)
  })

  it('should return an empty Float32Array for empty input', () => {
    expect(generateCoorinatesMatrix([])).toEqual(new Float32Array())
  })

  it('should handle a single vertex', () => {
    const data: VertexCoordinate[] = [{ index: 1, x: 10, y: 20, z: 30 }]
    const expected = new Float32Array([10, 20, 30])

    expect(generateCoorinatesMatrix(data)).toEqual(expected)
  })
})

describe('loadStress', () => {
  it('should call parseStress', async () => {
    const input = '1 2 3 4 5 6 7\n 2 3 1 4 5 6 7\n 3 1 4 5 2 7 1'
    const expected = [
      { index: 1, qx: 2, txy: 3, tzx: 4, qy: 5, tyz: 6, qz: 7 },
      { index: 2, qx: 3, txy: 1, tzx: 4, qy: 5, tyz: 6, qz: 7 },
      { index: 3, qx: 1, txy: 4, tzx: 5, qy: 2, tyz: 7, qz: 1 }
    ]
    const { data } = parseStress(input)
    expect(data).toEqual(expected)
  })

  it('should call calculateMisesStress', () => {
    const input = [
      { index: 1, qx: 2, txy: 3, tzx: 4, qy: 5, tyz: 6, qz: 7 },
      { index: 2, qx: 3, txy: 1, tzx: 4, qy: 5, tyz: 6, qz: 7 },
      { index: 3, qx: 1, txy: 4, tzx: 5, qy: 2, tyz: 7, qz: 1 }
    ]
    const expected = [14.212670403551893, 13.07669683062202, 16.462077633154326]

    expect(calculateMisesStress(input)).toEqual(expected)
  })

  it('should call buildPhysicalQuantity', () => {
    const input = [14.212670403551893, 13.07669683062202, 16.462077633154326]
    const expected = {
      values: [14.212670403551893, 13.07669683062202, 16.462077633154326],
      min: 13.07669683062202,
      max: 16.462077633154326
    }

    expect(buildMisesPhysicalQuantity(input)).toEqual(expected)
  })

  it('should dispatch setStress with correct data', async () => {
    const stress = {
      values: [14.212670403551893, 13.07669683062202, 16.462077633154326],
      min: 13.07669683062202,
      max: 16.462077633154326
    }
    const fileName = 'test.txt'

    store.dispatch(setStress({ stress, fileName }))
  })
})

describe('calculateCoorinatesMatrixDisplacement', () => {
  it('should correctly calculate displacement', () => {
    const coorinatesMatrix = [
      { index: 0, x: 1, y: 2, z: 3 },
      { index: 1, x: 4, y: 5, z: 6 }
    ]

    const displacement = [
      { index: 1, x: 0.5, y: -0.5, z: 1 },
      { index: 2, x: -1, y: 2, z: -2 }
    ]

    const scale = 2

    const result = calculateCoorinatesMatrixDisplacement(coorinatesMatrix, displacement, scale, ['x', 'y', 'z'])

    expect(result).toEqual([
      { index: 0, x: 2, y: 1, z: 5 },
      { index: 1, x: 2, y: 9, z: 2 }
    ])
  })

  it('should return an empty array if input arrays are empty', () => {
    expect(calculateCoorinatesMatrixDisplacement([], [], 1, [])).toEqual([])
  })

  it('should correctly work when scale = 0', () => {
    const coorinatesMatrix = [{ index: 0, x: 1, y: 1, z: 1 }]
    const displacement = [{ index: 0, x: 10, y: 10, z: 10 }]
    const result = calculateCoorinatesMatrixDisplacement(coorinatesMatrix, displacement, 0, ['x', 'y', 'z'])
    expect(result).toEqual([{ index: 0, x: 1, y: 1, z: 1 }])
  })

  it('should add displacement for different components', () => {
    const coorinatesMatrix = [{ index: 0, x: 1, y: 1, z: 1 }]
    const displacement = [{ index: 0, x: 10, y: 10, z: 10 }]
    const result = calculateCoorinatesMatrixDisplacement(coorinatesMatrix, displacement, 1, ['x'])
    expect(result).toEqual([{ index: 0, x: 11, y: 1, z: 1 }])
  })
})
