import { configureStore } from '@reduxjs/toolkit'
import colorSlice from './slices/colorSlice'
import legend from './slices/legendSlice'
import model from './slices/modelSlice'
import modelViewSetting from './slices/modelViewSettingSlice'

export const store = configureStore({
  reducer: { model, modelViewSetting, legend, colorSlice }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
