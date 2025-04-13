import { parseStress } from '@/lib/stressParser'
import { buildMisesPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { AxisComponent, setStress } from '@/redux/slices/modelSlice'
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

  const stress = buildMisesPhysicalQuantity(calculatedMises)

  store.dispatch(setStress({ stress, fileName: file.name }))
}

export function calculateCoorinatesMatrixDisplacement(
  coorinatesMatrix: VertexCoordinate[],
  displacement: VertexCoordinate[],
  scale: number,
  displacementComponents: AxisComponent[]
) {
  return coorinatesMatrix.map((vertex, index) => {
    const useXDisplacement = displacementComponents.includes('x')
    const useYDisplacement = displacementComponents.includes('y')
    const useZDisplacement = displacementComponents.includes('z')
    return {
      index: vertex.index,
      x: useXDisplacement ? vertex.x + displacement[index].x * scale : vertex.x,
      y: useYDisplacement ? vertex.y + displacement[index].y * scale : vertex.y,
      z: useZDisplacement ? vertex.z + displacement[index].z * scale : vertex.z
    }
  })
}
