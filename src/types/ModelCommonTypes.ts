export type VertexCoordinate = {
  index: number
  x: number
  y: number
  z: number
}

export type ElementIndices = {
  index: number
  vertex1: number
  vertex2: number
  vertex3: number
  vertex4: number
}

export type LegendType = {
  rangeStart: number
  rangeEnd: number
  color: number[]
}

export type ModelPhysicalQuantity = {
  values: number[]
  min: number
  max: number
}

export type Stress = {
  index: number
  qx: number
  txy: number
  tzx: number
  qy: number
  tyz: number
  qz: number
}

export type StressType = {
  mises: ModelPhysicalQuantity
  qx: ModelPhysicalQuantity
  qy: ModelPhysicalQuantity
  qz: ModelPhysicalQuantity
  txy: ModelPhysicalQuantity
  tyz: ModelPhysicalQuantity
  tzx: ModelPhysicalQuantity
}
