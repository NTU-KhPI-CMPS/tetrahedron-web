import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ColorState {
  background: string
}

export const initialState: ColorState = {
  background: '#E6F3FF'
}

export const colorSlice = createSlice({
  name: 'colorSlice',
  initialState,
  reducers: {
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.background = action.payload
    }
  }
})

export const { setBackgroundColor } = colorSlice.actions

export default colorSlice.reducer
