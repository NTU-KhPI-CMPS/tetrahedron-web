import { calculateVerticesDisplacement, generateFaceIndexArray, generateVertexPositions } from '@/lib/utils'
import { Face } from '@/types/Face'
import { Vertex } from '@/types/Vertex'
import { describe, expect, it } from 'vitest'

describe('generateFaceIndexArray', () => {
  it('generates correct index array for valid input', () => {
    const input = [
      { index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 },
      { index: 2, vertex1: 5, vertex2: 6, vertex3: 7, vertex4: 8 }
    ]
    const expected = new Uint16Array([
      1,
      0,
      2, // face 1
      0,
      1,
      3,
      1,
      2,
      3,
      2,
      0,
      3,

      5,
      4,
      6, // face 2
      4,
      5,
      7,
      5,
      6,
      7,
      6,
      4,
      7
    ])
    expect(generateFaceIndexArray(input)).toEqual(expected)
  })

  it('handles empty input gracefully', () => {
    const input: Face[] = []
    const expected = new Uint16Array([])
    expect(generateFaceIndexArray(input)).toEqual(expected)
  })

  it('handles faces with vertex indices of 1', () => {
    const input = [{ index: 1, vertex1: 1, vertex2: 1, vertex3: 1, vertex4: 1 }]
    const expected = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(generateFaceIndexArray(input)).toEqual(expected)
  })

  it('generates correct index array for a single face', () => {
    const input = [{ index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 }]
    const expected = new Uint16Array([1, 0, 2, 0, 1, 3, 1, 2, 3, 2, 0, 3])
    expect(generateFaceIndexArray(input)).toEqual(expected)
  })
})

describe('generateVertexPositions', () => {
  it('should generate a Float32Array of vertex positions', () => {
    const data: Vertex[] = [
      { index: 1, x: 1, y: 2, z: 3 },
      { index: 2, x: 4, y: 5, z: 6 },
      { index: 3, x: 7, y: 8, z: 9 }
    ]
    const expected = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9])

    expect(generateVertexPositions(data)).toEqual(expected)
  })

  it('should return an empty Float32Array for empty input', () => {
    expect(generateVertexPositions([])).toEqual(new Float32Array())
  })

  it('should handle a single vertex', () => {
    const data: Vertex[] = [{ index: 1, x: 10, y: 20, z: 30 }]
    const expected = new Float32Array([10, 20, 30])

    expect(generateVertexPositions(data)).toEqual(expected)
  })
})

describe('calculateVerticesDisplacement', () => {
  it('should correctly calculate vertex displacement', () => {
    const vertices = [
      { index: 0, x: 1, y: 2, z: 3 },
      { index: 1, x: 4, y: 5, z: 6 }
    ]

    const displacement = [
      { index: 1, x: 0.5, y: -0.5, z: 1 },
      { index: 2, x: -1, y: 2, z: -2 }
    ]

    const scale = 2

    const result = calculateVerticesDisplacement(vertices, displacement, scale)

    expect(result).toEqual([
      { index: 0, x: 2, y: 1, z: 5 },
      { index: 1, x: 2, y: 9, z: 2 }
    ])
  })

  it('should return an empty array if input arrays are empty', () => {
    expect(calculateVerticesDisplacement([], [], 1)).toEqual([])
  })

  it('should correctly work when scale = 0', () => {
    const vertices = [{ index: 0, x: 1, y: 1, z: 1 }]
    const displacement = [{ index: 0, x: 10, y: 10, z: 10 }]
    const result = calculateVerticesDisplacement(vertices, displacement, 0)
    expect(result).toEqual([{ index: 0, x: 1, y: 1, z: 1 }])
  })
})
