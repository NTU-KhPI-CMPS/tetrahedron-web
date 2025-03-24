import { generateColorArray } from '@/lib/colorUtils'
import { Face } from '@/types/Face'
import { ModelPhysicalQuantity } from '@/types/ModelPhysicalQuantity.ts'
import { Vertex } from '@/types/Vertex'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type ModelDisplayVariants = 'stress' | 'displacement' | 'otherCharacteristic' | 'none'

export interface ModelState {
  faces: Face[]
  facesLoaded: boolean
  facesFileName: string
  vertices: Vertex[]
  verticesLoaded: boolean
  verticesFileName: string
  isReady: boolean

  display: ModelDisplayVariants

  displacement: Vertex[]
  displacementLoaded: boolean
  displacementFileName: string | null

  displayNodeIndices: boolean

  stress: ModelPhysicalQuantity | null
  stressFileName: string | null

  otherCharacteristicFileName: string | null
  otherCharacteristic: ModelPhysicalQuantity | null
  colors: number[] | null
}

export const initialState: ModelState = {
  faces: [],
  facesLoaded: false,
  facesFileName: '',
  vertices: [],
  verticesLoaded: false,
  verticesFileName: '',
  isReady: false,

  display: 'none',

  displacement: [],
  displacementLoaded: false,
  displacementFileName: null,

  displayNodeIndices: false,

  stress: null,
  stressFileName: null,

  otherCharacteristicFileName: null,
  otherCharacteristic: null,
  colors: []
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setFaces: (state, action: PayloadAction<{ faces: Face[]; fileName: string }>) => {
      const { faces, fileName } = action.payload
      state.faces = faces
      state.facesFileName = fileName
      state.facesLoaded = true
    },
    setVertices: (state, action: PayloadAction<{ vertices: Vertex[]; fileName: string }>) => {
      const { vertices, fileName } = action.payload
      state.vertices = vertices
      state.verticesFileName = fileName
      state.verticesLoaded = true
    },
    setStress: (state, action: PayloadAction<{ stress: ModelPhysicalQuantity; fileName: string }>) => {
      const { stress, fileName } = action.payload
      state.stress = stress
      state.stressFileName = fileName
      state.colors = generateColorArray(stress.values, stress.min, stress.max)
      state.display = 'stress'
    },
    resetModel: () => initialState,
    setReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload
    },
    setDisplayNodeIndices: (state, action: PayloadAction<boolean>) => {
      state.displayNodeIndices = action.payload
    },
    setCharacteristic: (
      state,
      action: PayloadAction<{ otherCharacteristic: ModelPhysicalQuantity; fileName: string }>
    ) => {
      const { otherCharacteristic, fileName } = action.payload
      state.otherCharacteristic = otherCharacteristic
      state.otherCharacteristicFileName = fileName
      state.colors = generateColorArray(otherCharacteristic.values, otherCharacteristic.min, otherCharacteristic.max)
      state.display = 'otherCharacteristic'
    },
    setDisplacement: (state, action: PayloadAction<{ displacement: Vertex[]; displacementFileName: string }>) => {
      const { displacement, displacementFileName } = action.payload
      state.displacement = displacement
      state.displacementLoaded = true
      state.displacementFileName = displacementFileName
      state.display = 'displacement'
    },
    setDisplay: (state, action: PayloadAction<ModelDisplayVariants>) => {
      state.display = action.payload
    }
  }
})

export const {
  setFaces,
  setVertices,
  resetModel,
  setReady,
  setDisplayNodeIndices,
  setStress,
  setCharacteristic,
  setDisplacement,
  setDisplay
} = modelSlice.actions

export default modelSlice.reducer
