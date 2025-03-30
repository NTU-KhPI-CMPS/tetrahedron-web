import { filterByLength, hasValidLineFormat, ParsedResult, parseLinesWithNumbers } from '@/lib/parserUtils'
import { VertexCoordinate } from '@/types/ModelCommonTypes'

export function parseDefaultCoorinatesMatrix(input: string): VertexCoordinate[] {
  return filterByLength(parseLinesWithNumbers(input), 4).map(([index, x, y, z]) => ({
    index: Number(index),
    x: Number(x),
    y: Number(y),
    z: Number(z)
  }))
}

export function parseCoorinatesMatrixWithNoIndex(input: string): VertexCoordinate[] {
  return filterByLength(parseLinesWithNumbers(input), 3).map(([x, y, z], index) => ({
    index: index + 1,
    x: Number(x),
    y: Number(y),
    z: Number(z)
  }))
}

export function parseCoorinatesMatrix(input: string, parseDisplacement = false): ParsedResult<VertexCoordinate[]> {
  const isDefaultCoorinatesMatrix = hasValidLineFormat(input, 4)
  const isCoorinatesMatrixWithNoIndex = hasValidLineFormat(input, 3)

  if (isDefaultCoorinatesMatrix) return { data: parseDefaultCoorinatesMatrix(input) }
  if (isCoorinatesMatrixWithNoIndex) return { data: parseCoorinatesMatrixWithNoIndex(input) }

  return {
    error: {
      message: parseDisplacement
        ? 'validation.displacementInvalidNumbersCount'
        : 'validation.cannotReadCoorinatesMatrix'
    }
  }
}
