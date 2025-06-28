import { generateLegend } from '@/lib/colorUtils'
import { LegendItem, ModelPhysicalQuantity } from '@/types/ModelCommonTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LegendState {
  legend: LegendItem[]
  min?: number | null
  max?: number | null
  isLoaded: boolean
  colorsCount: number
}

export const initialState: LegendState = {
  legend: [],
  min: null,
  max: null,
  isLoaded: false,
  colorsCount: 7
}

export const legendSlice = createSlice({
  name: 'legend',
  initialState,
  reducers: {
    updateLegend: (state, action: PayloadAction<{ data: ModelPhysicalQuantity; colorsCount: number }>) => {
      state.max = action.payload.data.max
      state.min = action.payload.data.min
      state.legend = generateLegend(state.min, state.max, action.payload.colorsCount)
      state.isLoaded = true
    },
    updateColorsCount: (state, action: PayloadAction<number>) => {
      state.colorsCount = action.payload
    },
    resetLegend: () => initialState
  }
})

export const { resetLegend, updateLegend, updateColorsCount } = legendSlice.actions

export default legendSlice.reducer
