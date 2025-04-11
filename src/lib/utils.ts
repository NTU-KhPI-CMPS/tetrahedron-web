import { parseDefaultPhysicalQuantityWithIndex } from '@/lib/otherCharacteristicsParser'
import { parseStress } from '@/lib/stressParser'
import { buildMisesPhysicalQuantity, calculateMisesStress, StressPhysicalQuantityType } from '@/lib/stressUtils'
import { setCharacteristic, setStress } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateIndicesMatrix(data: ElementIndices[]) {
  return new Uint16Array(
    data.flatMap((indicesMatrix) => [
      indicesMatrix.vertex2 - 1,
      indicesMatrix.vertex1 - 1,
      indicesMatrix.vertex3 - 1,

      indicesMatrix.vertex1 - 1,
      indicesMatrix.vertex2 - 1,
      indicesMatrix.vertex4 - 1,

      indicesMatrix.vertex2 - 1,
      indicesMatrix.vertex3 - 1,
      indicesMatrix.vertex4 - 1,

      indicesMatrix.vertex3 - 1,
      indicesMatrix.vertex1 - 1,
      indicesMatrix.vertex4 - 1
    ])
  )
}

export function generateCoorinatesMatrix(data: VertexCoordinate[]) {
  const positions = new Float32Array(data.flatMap((vertex) => [vertex.x, vertex.y, vertex.z]))
  return positions
}

export const loadStress = async (file: File) => {
  const input = await file.text()
  const { data: parsedStress, error } = parseStress(input)

  if (error) {
    console.error(error.message)
    return
  }

  const calculatedMises = calculateMisesStress(parsedStress)

  const stressComponent = {
    qx: buildMisesPhysicalQuantity(parsedStress.map((item) => item.qx)),
    qy: buildMisesPhysicalQuantity(parsedStress.map((item) => item.qy)),
    qz: buildMisesPhysicalQuantity(parsedStress.map((item) => item.qz)),
    txy: buildMisesPhysicalQuantity(parsedStress.map((item) => item.txy)),
    tyz: buildMisesPhysicalQuantity(parsedStress.map((item) => item.tyz)),
    tzx: buildMisesPhysicalQuantity(parsedStress.map((item) => item.tzx))
  }

  const stress = buildMisesPhysicalQuantity(calculatedMises)

  store.dispatch(setStress({ stress, fileName: file.name, components: stressComponent }))
}

export const loadCharacteristic = async (file: File) => {
  const input = await file.text()
  const otherCharacteristic = parseDefaultPhysicalQuantityWithIndex(input)
  store.dispatch(setCharacteristic({ otherCharacteristic, fileName: file.name }))
}

export function getStressComponents(components: StressPhysicalQuantityType[]) {
  return components.map((component) => {
    return {
      x: component.qx,
      y: component.qy,
      z: component.qz,
      xy: component.txy,
      yz: component.tyz,
      xz: component.tzx
    }
  })
}

export function calculateCoorinatesMatrixDisplacement(
  coorinatesMatrix: VertexCoordinate[],
  displacement: VertexCoordinate[],
  scale: number
) {
  return coorinatesMatrix.map((vertex, index) => {
    return {
      index: vertex.index,
      x: vertex.x + displacement[index].x * scale,
      y: vertex.y + displacement[index].y * scale,
      z: vertex.z + displacement[index].z * scale
    }
  })
}
