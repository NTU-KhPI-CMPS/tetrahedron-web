import { parseDefaultPhysicalQuantity, parseStress } from '@/lib/parser'
import { buildPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { setCharacteristic, setStress } from '@/redux/slices/modelSlice'
import { store } from '@/redux/store'
import { Face, Vertex } from '@/types/ModelCommonTypes'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFaceIndexArray(data: Face[]) {
  return new Uint16Array(
    data.flatMap((face) => [
      face.vertex2 - 1,
      face.vertex1 - 1,
      face.vertex3 - 1,

      face.vertex1 - 1,
      face.vertex2 - 1,
      face.vertex4 - 1,

      face.vertex2 - 1,
      face.vertex3 - 1,
      face.vertex4 - 1,

      face.vertex3 - 1,
      face.vertex1 - 1,
      face.vertex4 - 1
    ])
  )
}

export function generateVertexPositions(data: Vertex[]) {
  const positions = new Float32Array(data.flatMap((vertex) => [vertex.x, vertex.y, vertex.z]))
  return positions
}

export const loadStress = async (file: File) => {
  const input = await file.text()
  const parsedStress = parseStress(input)

  const calculatedMises = calculateMisesStress(parsedStress)

  const stress = buildPhysicalQuantity(calculatedMises)

  store.dispatch(setStress({ stress, fileName: file.name }))
}

export const loadCharacteristic = async (file: File) => {
  const input = await file.text()
  const otherCharacteristic = parseDefaultPhysicalQuantity(input)
  store.dispatch(setCharacteristic({ otherCharacteristic, fileName: file.name }))
}

export function calculateVerticesDisplacement(vertices: Vertex[], displacement: Vertex[], scale: number) {
  return vertices.map((vertex, index) => {
    return {
      index: vertex.index,
      x: vertex.x + displacement[index].x * scale,
      y: vertex.y + displacement[index].y * scale,
      z: vertex.z + displacement[index].z * scale
    }
  })
}
