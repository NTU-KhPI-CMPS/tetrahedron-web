import { filterByLength, hasValidLineFormat, ParsedResult, parseLinesWithNumbers } from '@/lib/parserUtils'
import { Stress } from '@/types/ModelCommonTypes'

export function parseDefaultStress(input: string): Stress[] {
  return filterByLength(parseLinesWithNumbers(input), 7).map(([index, qx, txy, tzx, qy, tyz, qz]) => ({
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
  return filterByLength(parseLinesWithNumbers(input), 6).map(([qx, txy, tzx, qy, tyz, qz], index) => ({
    index: index + 1,
    qx: Number(qx),
    txy: Number(txy),
    tzx: Number(tzx),
    qy: Number(qy),
    tyz: Number(tyz),
    qz: Number(qz)
  }))
}

export function parseStress(
  input: string,
  errorMessage = 'validation.stressInvalidNumbersCount'
): ParsedResult<Stress[]> {
  const isMisesStress = hasValidLineFormat(input, 7)
  const isStressWithoutIndices = hasValidLineFormat(input, 6)

  if (isMisesStress) return { data: parseDefaultStress(input) }
  if (isStressWithoutIndices) return { data: parseStressWithNoIndex(input) }

  return { error: { message: errorMessage } }
}
