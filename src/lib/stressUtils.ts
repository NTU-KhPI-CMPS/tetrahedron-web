import { ModelPhysicalQuantity } from '@/types/ModelPhysicalQuantity'
import { Stress } from '@/types/Stress'

//Average value per row
export function calculateMisesStress(data: Stress[]) {
  return data.map(
    (component) =>
      (1 / Math.sqrt(2)) *
      Math.sqrt(
        Math.pow(component.qx - component.qy, 2) +
          Math.pow(component.qy - component.qz, 2) +
          Math.pow(component.qz - component.qx, 2) +
          6 * (Math.pow(component.txy, 2) + Math.pow(component.tyz, 2) + Math.pow(component.tzx, 2))
      )
  )
}

//MisesPhysicalQuantity
export function buildPhysicalQuantity(averageValue: number[]): ModelPhysicalQuantity {
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
