import { parseDefaultPhysicalQuantity, parseStress } from '@/lib/parser'
import { buildMisesPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { setCharacteristic, setStress } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { VertexCoordinate, VertexIndices } from '@/types/ModelCommonTypes'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateIndicesMatrix(data: VertexIndices[]) {
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
  const parsedStress = parseStress(input)

  const calculatedMises = calculateMisesStress(parsedStress)

  const stress = buildMisesPhysicalQuantity(calculatedMises)

  store.dispatch(setStress({ stress, fileName: file.name }))
}

export const loadCharacteristic = async (file: File) => {
  const input = await file.text()
  const otherCharacteristic = parseDefaultPhysicalQuantity(input)
  store.dispatch(setCharacteristic({ otherCharacteristic, fileName: file.name }))
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
