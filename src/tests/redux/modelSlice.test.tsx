import { generateColorArray } from '@/lib/colorUtils'
import reducer, {
  initialState,
  resetModel,
  setCharacteristic,
  setCoorinatesMatrix,
  setDisplacement,
  setDisplay,
  setDisplayNodeIndices,
  setIndicesMatrix,
  setReady,
  setStress
} from '@/redux/slices/modelSlice'
import { describe, expect, it } from 'vitest'

vi.mock('@/lib/colorUtils', () => ({
  generateColorArray: vi.fn()
}))

const indicesMatrixFileNameMock = 'indicesMatrix.txt'
const coorinatesMatrixFileNameMock = 'coorinatesMatrix.txt'
const stressFileMock = 'stress.txt'
const otherCharacteristicFileMock = 'other.txt'
const displacementFileNameMock = 'displacement.txt'

const indicesMatrixMock = [
  { index: 1, vertex1: 1, vertex2: 2, vertex3: 3, vertex4: 4 },
  { index: 2, vertex1: 5, vertex2: 6, vertex3: 7, vertex4: 8 }
]

const coorinatesMatrixMock = [
  { index: 1, x: 1, y: 2, z: 3 },
  { index: 2, x: 5, y: 6, z: 7 }
]

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

const displacementMock = [
  { index: 1, x: 1.5, y: 2.5, z: 3.5 },
  { index: 2, x: 5.5, y: 6.5, z: 7.5 }
]

describe('modelSlice', () => {
  it('should set indicesMatrix correctly with setIndicesMatrix', () => {
    const action = setIndicesMatrix({ indicesMatrix: indicesMatrixMock, fileName: indicesMatrixFileNameMock })
    const state = reducer(initialState, action)

    expect(state.indicesMatrix).toMatchObject(indicesMatrixMock)
    expect(state.indicesMatrixFileName).toEqual(indicesMatrixFileNameMock)
  })

  it('should set coorinatesMatrix correctly with setCoorinatesMatrix', () => {
    const action = setCoorinatesMatrix({
      coorinatesMatrix: coorinatesMatrixMock,
      fileName: coorinatesMatrixFileNameMock
    })
    const state = reducer(initialState, action)

    expect(state.coorinatesMatrix).toMatchObject(coorinatesMatrixMock)
    expect(state.coorinatesMatrixFileName).toEqual(coorinatesMatrixFileNameMock)
  })

  it('should reset model to the initial state with resetModel', () => {
    const action = resetModel()
    const state = reducer(initialState, action)

    expect(state).toMatchObject(initialState)
  })

  it('should set isReady correctly with setReady', () => {
    const action = setReady(true)
    const state = reducer(initialState, action)

    expect(state.isReady).toEqual(true)
  })

  it('should set displayNodeIndices correctly with setDisplayNodeIndices', () => {
    const action = setDisplayNodeIndices(true)
    const state = reducer(initialState, action)

    expect(state.displayNodeIndices).toEqual(true)
  })

  it('should set stress & colors correctly with setStress', () => {
    const action = setStress({ stress: stressMock, fileName: stressFileMock })
    const state = reducer(initialState, action)

    expect(state.stress).toMatchObject(stressMock)
    expect(state.stressFileName).toEqual('stress.txt')
    expect(generateColorArray).toHaveBeenCalledWith(stressMock.values, stressMock.min, stressMock.max)
  })

  it('should set otherCharacteristic & colors correctly with setCharacteristic', () => {
    const action = setCharacteristic({
      otherCharacteristic: otherCharacteristicMock,
      fileName: otherCharacteristicFileMock
    })
    const state = reducer(initialState, action)

    expect(state.otherCharacteristic).toMatchObject(otherCharacteristicMock)
    expect(state.otherCharacteristicFileName).toEqual('other.txt')
    expect(generateColorArray).toHaveBeenCalledWith(
      otherCharacteristicMock.values,
      otherCharacteristicMock.min,
      otherCharacteristicMock.max
    )
  })

  it('should set displacement correctly with setDisplacement', () => {
    const action = setDisplacement({ displacement: displacementMock, displacementFileName: displacementFileNameMock })
    const state = reducer(initialState, action)

    expect(state.displacement).toMatchObject(displacementMock)
    expect(state.displacementFileName).toEqual(displacementFileNameMock)
  })

  it('should set display correctly to displacement', () => {
    const action = setDisplay('displacement')
    const state = reducer(initialState, action)

    expect(state.display).toEqual('displacement')
  })
})
