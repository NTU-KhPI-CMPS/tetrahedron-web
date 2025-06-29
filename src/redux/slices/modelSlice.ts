import { generateColorArray } from '@/lib/colorUtils'
import { ElementIndices, ModelPhysicalQuantity, Stress, StressType, VertexCoordinate } from '@/types/ModelCommonTypes'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ModelDisplayVariants = 'displacement' | 'otherCharacteristic' | 'stress' | 'none'
export type StressDisplayVariants = 'mises' | 'qx' | 'qy' | 'qz' | 'txy' | 'tyz' | 'tzx' | 'none'
export type AxisComponent = 'x' | 'y' | 'z'

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
  displacementComponents: AxisComponent[]

  stressValues: Stress[]
  stress: StressType | null
  stressFileName: string | null
  stressLoaded: boolean
  componentDisplay: StressDisplayVariants

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
  displacementComponents: ['x', 'y', 'z'],

  stressValues: [],
  stress: null,
  stressFileName: null,
  stressLoaded: false,

  componentDisplay: 'none',

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
    setCoorinatesMatrix: (
      state,
      action: PayloadAction<{
        coorinatesMatrix: VertexCoordinate[]
        fileName: string
      }>
    ) => {
      const { coorinatesMatrix, fileName } = action.payload
      state.coorinatesMatrix = coorinatesMatrix
      state.coorinatesMatrixFileName = fileName
      state.coorinatesMatrixLoaded = true
    },
    setStress: (state, action: PayloadAction<{ stress: StressType; fileName: string }>) => {
      const { stress, fileName } = action.payload
      state.stress = stress
      state.stressFileName = fileName
      state.stressLoaded = true
      state.display = 'stress'
      state.componentDisplay = 'mises'
    },
    setStressComponentToDisplay: (state, action: PayloadAction<StressDisplayVariants>) => {
      state.componentDisplay = action.payload
    },
    displayDataOnModel: (state, action: PayloadAction<{ data: ModelPhysicalQuantity; colorsCount: number }>) => {
      const data = action.payload.data
      const colorsCount = action.payload.colorsCount
      state.colors = generateColorArray(data.values, data.min, data.max, colorsCount)
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
    },
    setDisplacementComponents: (state, action: PayloadAction<AxisComponent[]>) => {
      state.displacementComponents = action.payload
    }
  }
})

export const {
  setIndicesMatrix,
  setCoorinatesMatrix,
  resetModel,
  setReady,
  displayDataOnModel,

  setStress,
  setStressComponentToDisplay,

  setCharacteristic,
  setDisplacement,
  setDisplay,
  setDisplacementScale,
  setDisplacementComponents
} = modelSlice.actions

export default modelSlice.reducer
