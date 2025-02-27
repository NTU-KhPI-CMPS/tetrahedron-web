import reducer, { initialState } from '@/redux/slices/legendSlice'
import { setCharacteristic, setStress } from '@/redux/slices/modelSlice'
import { describe, expect, it } from 'vitest'

const stressMock = {
  values: [1, 2, 3, 4],
  min: 1,
  max: 4
}

const otherCharacteristicMock = {
  values: [2, 4, 6, 8],
  min: 2,
  max: 8
}

const stressFileMock = 'stress.txt'
const otherCharacteristicFileMock = 'other.txt'

describe('legendSlice', () => {
  it('should set isLoaded correctrly with setStress', () => {
    const action = setStress({ stress: stressMock, fileName: stressFileMock })
    const state = reducer(initialState, action)

    expect(state.isLoaded).toEqual(true)
  })

  it('should set isLoaded correctrly with setCharacteristic', () => {
    const action = setCharacteristic({
      otherCharacteristic: otherCharacteristicMock,
      fileName: otherCharacteristicFileMock
    })
    const state = reducer(initialState, action)

    expect(state.isLoaded).toEqual(true)
  })
})
