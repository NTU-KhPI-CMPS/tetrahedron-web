import { ModelPhysicalQuantity, Stress } from '@/types/ModelCommonTypes'

export function calculateMisesStress(data: Stress[]) {
  return data.map((component) => {
    const averageValue =
      (1 / Math.sqrt(2)) *
      Math.sqrt(
        Math.pow(component.qx - component.qy, 2) +
          Math.pow(component.qy - component.qz, 2) +
          Math.pow(component.qz - component.qx, 2) +
          6 * (Math.pow(component.txy, 2) + Math.pow(component.tyz, 2) + Math.pow(component.tzx, 2))
      )
    return averageValue
  })
}

export function buildMisesPhysicalQuantity(averageValue: number[]): ModelPhysicalQuantity {
  let minValue = Number.MAX_VALUE
  let maxValue = Number.MIN_VALUE

  const misesValue = averageValue.map((value) => {
    if (minValue > value) {
      minValue = value
    }
    if (maxValue < value) {
      maxValue = value
    }
    return value
  })

  return {
    values: misesValue,
    min: minValue,
    max: maxValue
  }
}

export type StressPhysicalQuantityType = {
  qx: ModelPhysicalQuantity
  qy: ModelPhysicalQuantity
  qz: ModelPhysicalQuantity
  txy: ModelPhysicalQuantity
  tyz: ModelPhysicalQuantity
  tzx: ModelPhysicalQuantity
}
