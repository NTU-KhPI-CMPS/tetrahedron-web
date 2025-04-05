import { generateColorArray } from '@/lib/colorUtils'
import { ElementIndices, ModelPhysicalQuantity, VertexCoordinate } from '@/types/ModelCommonTypes'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type ModelDisplayVariants = 'stress' | 'displacement' | 'otherCharacteristic' | 'none'

export interface ModelState {
  indicesMatrix: ElementIndices[]
  indicesMatrixLoaded: boolean
  indicesMatrixFileName: string

  coorinatesMatrix: VertexCoordinate[]
  coorinatesMatrixLoaded: boolean
  coorinatesMatrixFileName: string
  isReady: boolean

  display: ModelDisplayVariants

  displacement: VertexCoordinate[]
  displacementScale: number
  displacementLoaded: boolean
  displacementFileName: string | null

  stress: ModelPhysicalQuantity | null
  stressFileName: string | null

  otherCharacteristicFileName: string | null
  otherCharacteristic: ModelPhysicalQuantity | null
  colors: number[] | null
}

export const initialState: ModelState = {
  indicesMatrix: [],
  indicesMatrixLoaded: false,
  indicesMatrixFileName: '',

  coorinatesMatrix: [],
  coorinatesMatrixLoaded: false,
  coorinatesMatrixFileName: '',
  isReady: false,

  display: 'none',

  displacement: [],
  displacementScale: 1,
  displacementLoaded: false,
  displacementFileName: null,

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
    setIndicesMatrix: (state, action: PayloadAction<{ indicesMatrix: ElementIndices[]; fileName: string }>) => {
      const { indicesMatrix, fileName } = action.payload
      state.indicesMatrix = indicesMatrix
      state.indicesMatrixFileName = fileName
      state.indicesMatrixLoaded = true
    },
    setCoorinatesMatrix: (state, action: PayloadAction<{ coorinatesMatrix: VertexCoordinate[]; fileName: string }>) => {
      const { coorinatesMatrix, fileName } = action.payload
      state.coorinatesMatrix = coorinatesMatrix
      state.coorinatesMatrixFileName = fileName
      state.coorinatesMatrixLoaded = true
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
    setDisplacement: (
      state,
      action: PayloadAction<{ displacement: VertexCoordinate[]; displacementFileName: string }>
    ) => {
      const { displacement, displacementFileName } = action.payload
      state.displacement = displacement
      state.displacementLoaded = true
      state.displacementFileName = displacementFileName
      state.display = 'displacement'
    },
    setDisplay: (state, action: PayloadAction<ModelDisplayVariants>) => {
      state.display = action.payload
    },
    setDisplacementScale: (state, action: PayloadAction<number>) => {
      state.displacementScale = action.payload
    }
  }
})

export const {
  setIndicesMatrix,
  setCoorinatesMatrix,
  resetModel,
  setReady,
  setStress,
  setCharacteristic,
  setDisplacement,
  setDisplay,
  setDisplacementScale
} = modelSlice.actions

export default modelSlice.reducer
