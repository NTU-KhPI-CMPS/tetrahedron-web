import { filterByLength, hasValidLineFormat, ParsedResult, parseLinesWithNumbers } from '@/lib/parserUtils'
import { ElementIndices } from '@/types/ModelCommonTypes'

export function parseDefaultIndicesMatrix(input: string): ElementIndices[] {
  return filterByLength(parseLinesWithNumbers(input), 5).map(([index, vertex1, vertex2, vertex3, vertex4]) => ({
    index: Number(index),
    vertex1: Number(vertex1),
    vertex2: Number(vertex2),
    vertex3: Number(vertex3),
    vertex4: Number(vertex4)
  }))
}

export function parseAnsysIndicesMatrix(input: string): ElementIndices[] {
  const ansysIndicesMatrixFields = { index: 0, vertex1: 6, vertex2: 7, vertex3: 8, vertex4: 10 }
  return filterByLength(parseLinesWithNumbers(input), 14).map((line) => {
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

export function parseIndicesMatrixWithNoIndex(input: string): ElementIndices[] {
  return filterByLength(parseLinesWithNumbers(input), 4).map(([vertex1, vertex2, vertex3, vertex4], index) => ({
    index: index + 1,
    vertex1: Number(vertex1),
    vertex2: Number(vertex2),
    vertex3: Number(vertex3),
    vertex4: Number(vertex4)
  }))
}

export function parseIndicesMatrix(input: string): ParsedResult<ElementIndices[]> {
  const isDefaultIndicesMatrix = hasValidLineFormat(input, 5)
  const isAnsysIndicesMatrix = hasValidLineFormat(input, 14)
  const isIndicesMatrixWithNoIndex = hasValidLineFormat(input, 4)

  console.log({
    isDefaultIndicesMatrix,
    isAnsysIndicesMatrix,
    isIndicesMatrixWithNoIndex
  })

  if (isDefaultIndicesMatrix) return { data: parseDefaultIndicesMatrix(input) }
  if (isAnsysIndicesMatrix) return { data: parseAnsysIndicesMatrix(input) }
  if (isIndicesMatrixWithNoIndex) return { data: parseIndicesMatrixWithNoIndex(input) }

  return { error: { message: 'validation.cannotReadIndicesMatrix' } }
}
