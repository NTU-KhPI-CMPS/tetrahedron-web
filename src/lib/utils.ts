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
