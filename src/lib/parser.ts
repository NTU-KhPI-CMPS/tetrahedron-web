import { ModelPhysicalQuantity, Stress, Vertex, VertexIndices } from '@/types/ModelCommonTypes'

type ParsedLine = string[]

function parseLines(input: string): ParsedLine[] {
  return input
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim().split(' '))
    .filter((line) => line.every((field) => !isNaN(parseFloat(field))))
}

function filterByLength(parsedLines: ParsedLine[], length: number): ParsedLine[] {
  return parsedLines.filter((params) => params.length === length)
}

function hasValidLineFormat(input: string, expectedLength: number): boolean {
  return filterByLength(parseLines(input), expectedLength).length > 0
}

export function parseIndicesMatrix(input: string): VertexIndices[] {
  if (isDefaultIndicesMatrix(input)) return parseDefaultIndicesMatrix(input)
  if (isAnsysIndicesMatrix(input)) return parseAnsysIndicesMatrix(input)
  if (isIndicesMatrixWithNoIndex(input)) return parseIndicesMatrixWithNoIndex(input)
  return []
}

export function parseVertices(input: string): Vertex[] {
  if (isDefaultVertices(input)) return parseDefaultVertices(input)
  if (isVerticesWithNoIndex(input)) return parseVerticesWithNoIndex(input)
  return []
}

export function parseDefaultVertices(input: string): Vertex[] {
  return filterByLength(parseLines(input), 4).map(([index, x, y, z]) => ({
    index: Number(index),
    x: Number(x),
    y: Number(y),
    z: Number(z)
  }))
}

export function parseVerticesWithNoIndex(input: string): Vertex[] {
  return filterByLength(parseLines(input), 3).map(([x, y, z], index) => ({
    index: index + 1,
    x: Number(x),
    y: Number(y),
    z: Number(z)
  }))
}

export function parseDefaultIndicesMatrix(input: string): VertexIndices[] {
  return filterByLength(parseLines(input), 5).map(([index, vertex1, vertex2, vertex3, vertex4]) => ({
    index: Number(index),
    vertex1: Number(vertex1),
    vertex2: Number(vertex2),
    vertex3: Number(vertex3),
    vertex4: Number(vertex4)
  }))
}

export function parseIndicesMatrixWithNoIndex(input: string): VertexIndices[] {
  return filterByLength(parseLines(input), 4).map(([vertex1, vertex2, vertex3, vertex4], index) => ({
    index: index + 1,
    vertex1: Number(vertex1),
    vertex2: Number(vertex2),
    vertex3: Number(vertex3),
    vertex4: Number(vertex4)
  }))
}

export function parseDefaultStress(input: string): Stress[] {
  return filterByLength(parseLines(input), 7).map(([index, qx, txy, tzx, qy, tyz, qz]) => ({
    index: Number(index),
    qx: Number(qx),
    txy: Number(txy),
    tzx: Number(tzx),
    qy: Number(qy),
    tyz: Number(tyz),
    qz: Number(qz)
  }))
}

export function parseStressWithNoIndex(input: string): Stress[] {
  return filterByLength(parseLines(input), 6).map(([qx, txy, tzx, qy, tyz, qz], index) => ({
    index: index + 1,
    qx: Number(qx),
    txy: Number(txy),
    tzx: Number(tzx),
    qy: Number(qy),
    tyz: Number(tyz),
    qz: Number(qz)
  }))
}

export function parseStress(input: string): Stress[] {
  if (isMisesStress(input)) return parseDefaultStress(input)
  if (isStressWithoutIndices(input)) return parseStressWithNoIndex(input)
  return []
}

export function parseAnsysIndicesMatrix(input: string): VertexIndices[] {
  const ansysIndicesMatrixFields = { index: 0, vertex1: 6, vertex2: 7, vertex3: 8, vertex4: 10 }
  return filterByLength(parseLines(input), 14).map((line) => {
    const { index, vertex1, vertex2, vertex3, vertex4 } = ansysIndicesMatrixFields
    return {
      index: Number(line[index]),
      vertex1: Number(line[vertex1]),
      vertex2: Number(line[vertex2]),
      vertex3: Number(line[vertex3]),
      vertex4: Number(line[vertex4])
    }
  })
}

export function isDefaultVertices(input: string): boolean {
  return hasValidLineFormat(input, 4)
}

export function isVerticesWithNoIndex(input: string): boolean {
  return hasValidLineFormat(input, 3)
}

export function isDefaultIndicesMatrix(input: string): boolean {
  return hasValidLineFormat(input, 5)
}

export function isIndicesMatrixWithNoIndex(input: string): boolean {
  return hasValidLineFormat(input, 4)
}

export function isAnsysIndicesMatrix(input: string): boolean {
  return hasValidLineFormat(input, 14)
}

export function isMisesStress(input: string): boolean {
  return hasValidLineFormat(input, 7)
}

export function isStressWithoutIndices(input: string): boolean {
  return hasValidLineFormat(input, 6)
}

export function parseDefaultPhysicalQuantity(input: string): ModelPhysicalQuantity {
  let minValue = Number.MAX_VALUE
  let maxValue = Number.MIN_VALUE

  const values = filterByLength(parseLines(input), 1)
    .map(([value]): number => Number(value))
    .map((value) => {
      if (minValue > value) {
        minValue = value
      }
      if (maxValue < value) {
        maxValue = value
      }
      return value
    })

  return {
    values: values,
    min: minValue,
    max: maxValue
  }
}
