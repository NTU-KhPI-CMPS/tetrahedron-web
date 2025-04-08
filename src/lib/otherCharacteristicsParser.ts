import { filterByLength, hasValidLineFormat, ParsedResult, parseLinesWithNumbers } from '@/lib/parserUtils'
import { ModelPhysicalQuantity } from '@/types/ModelCommonTypes'

export function parseDefaultPhysicalQuantity(input: string): ModelPhysicalQuantity {
  const values = filterByLength(parseLinesWithNumbers(input), 1).map(([value]) => Number(value))
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  return {
    values: values,
    min: minValue,
    max: maxValue
  }
}

export function parseDefaultPhysicalQuantityWithIndex(input: string): ModelPhysicalQuantity {
  const values = filterByLength(parseLinesWithNumbers(input), 2).map(([, value]) => Number(value))
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  return {
    values: values,
    min: minValue,
    max: maxValue
  }
}

export function parseOtherCharacteristics(input: string): ParsedResult<ModelPhysicalQuantity> {
  const isDefaultPhysicalQuantity = hasValidLineFormat(input, 1)
  const isDefaultPhysicalQuantityWithIndex = hasValidLineFormat(input, 2)

  if (isDefaultPhysicalQuantity) return { data: parseDefaultPhysicalQuantity(input) }
  if (isDefaultPhysicalQuantityWithIndex) return { data: parseDefaultPhysicalQuantityWithIndex(input) }

  return { error: { message: 'validation.otherCharacteristicInvalidNumbersCount' } }
}
