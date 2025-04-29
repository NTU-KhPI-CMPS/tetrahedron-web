import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ModelViewSetting {
  displayNodeIndices: boolean
  displayCoordinateAxes: boolean
  displayLight: boolean
}

export const initialState: ModelViewSetting = {
  displayNodeIndices: false,
  displayCoordinateAxes: true,
  displayLight: true
}

export const modelViewSettingSlice = createSlice({
  name: 'modelViewSetting',
  initialState,
  reducers: {
    setDisplayNodeIndices: (state, action: PayloadAction<boolean>) => {
      state.displayNodeIndices = action.payload
    },
    setDisplayCoordinateAxes: (state, action: PayloadAction<boolean>) => {
      state.displayCoordinateAxes = action.payload
    },
    setDisplayLight: (state, action: PayloadAction<boolean>) => {
      state.displayLight = action.payload
    }
  }
})

export const { setDisplayNodeIndices, setDisplayCoordinateAxes, setDisplayLight } = modelViewSettingSlice.actions

export default modelViewSettingSlice.reducer
