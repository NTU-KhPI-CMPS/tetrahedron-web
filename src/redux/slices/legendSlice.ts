import { generateLegend } from '@/lib/colorUtils'
import { displayDataOnModel, setCharacteristic } from '@/redux/slices/modelSlice'
import { LegendType, ModelPhysicalQuantity } from '@/types/ModelCommonTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LegendState {
  legend: LegendType[]
  min?: number | null
  max?: number | null
  isLoaded: boolean
}

export const initialState: LegendState = {
  legend: [],
  min: null,
  max: null,
  isLoaded: false
}

export const legendSlice = createSlice({
  name: 'legend',
  initialState,
  reducers: {
    resetLegend: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(
      setCharacteristic,
      (
        state,
        action: PayloadAction<{
          otherCharacteristic: ModelPhysicalQuantity
          fileName: string
        }>
      ) => {
        state.max = action.payload.otherCharacteristic.max
        state.min = action.payload.otherCharacteristic.min
        state.legend = generateLegend(state.min, state.max)
        state.isLoaded = true
      }
    )
    builder.addCase(displayDataOnModel, (state, action: PayloadAction<ModelPhysicalQuantity>) => {
      state.max = action.payload.max
      state.min = action.payload.min
      state.legend = generateLegend(state.min, state.max)
      state.isLoaded = true
    })
  }
})

export const { resetLegend } = legendSlice.actions

export default legendSlice.reducer
