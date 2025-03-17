import { Face } from '@/types/Face'
import { Vertex } from '@/types/Vertex'
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
