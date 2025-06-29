import reducer, { initialState, updateColorsCount, updateLegend } from '@/redux/slices/legendSlice'
import { describe, expect, it } from 'vitest'

const dataMock = {
  values: [2, 4, 6, 8],
  min: 2,
  max: 8
}

describe('legendSlice', () => {
  it('generate legend with default colors count (7)', () => {
    const action = updateLegend({ data: dataMock, colorsCount: 7 })
    const state = reducer(initialState, action)

    expect(state.min).toEqual(dataMock.min)
    expect(state.max).toEqual(dataMock.max)
    expect(state.isLoaded).toEqual(true)
    expect(state.legend).length(7)
  })

  it('updates colors count in legend', () => {
    const action = updateColorsCount(10)
    const state = reducer(initialState, action)

    expect(state.colorsCount).toEqual(10)
  })
})
