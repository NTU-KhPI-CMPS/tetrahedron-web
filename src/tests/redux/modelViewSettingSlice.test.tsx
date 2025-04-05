import reducer, {
  initialState,
  setDisplayCoordinateAxes,
  setDisplayNodeIndices
} from '@/redux/slices/modelViewSettingSlice.ts'
import { describe } from 'vitest'

describe('modelViewSettingSlice', () => {
  it('should set displayNodeIndices correctly with setDisplayNodeIndices', () => {
    const action = setDisplayNodeIndices(true)
    const state = reducer(initialState, action)

    expect(state.displayNodeIndices).toEqual(true)
  })

  it('should set displayCoordinateAxes correctly with setDisplayCoordinateAxes', () => {
    const action = setDisplayCoordinateAxes(false)
    const state = reducer(initialState, action)

    expect(state.displayCoordinateAxes).toEqual(false)
  })
})
