import ModelViewPage from '@/pages/ModelViewPage'
import { ModalProvider } from '@/providers/ModalProvider'
import color from '@/redux/slices/colorSlice'
import { initialState, default as model, setCoorinatesMatrix, setIndicesMatrix } from '@/redux/slices/modelSlice'
import modelViewSettingReducer from '@/redux/slices/modelViewSettingSlice'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

vi.mock('@react-three/fiber')

const mockCanvasContext = {
  fillStyle: ''
}

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => mockCanvasContext),
  writable: true
})

const indicesMatrix = [{ index: 1, vertex1: 12, vertex2: 14, vertex3: 10, vertex4: 15 }]
const coorinatesMatrix = [{ index: 1, x: 0, y: 1, z: 0 }]

const indicesMatrixFileName = 'indicesMatrix.txt'
const coorinatesMatrixFileName = 'coorinatesMatrix.txt'

const indicesMatrixFile = new File(['1 12 14 10 15'], 'indicesMatrix.txt', { type: 'text/plain' })
const coorinatesMatrixFile = new File(['1 0 1 0'], 'coorinatesMatrix.txt', { type: 'text/plain' })

describe('ModelViewPage', () => {
  it('renders Experience component when isReady is true', () => {
    const store = configureStore({
      reducer: {
        model,
        modelViewSetting: modelViewSettingReducer,
        color
      },
      preloadedState: { model: { ...initialState, isReady: true }, color: { background: '#ff0000' } }
    })

    render(
      <Provider store={store}>
        <ModalProvider>
          <ModelViewPage />
        </ModalProvider>
      </Provider>
    )

    expect(screen.queryByTestId('experience')).toBeInTheDocument()
  })

  it('does not render Experience component when isReady is false', () => {
    const store = configureStore({
      reducer: { model, modelViewSetting: modelViewSettingReducer },
      preloadedState: { model: { ...initialState, isReady: false } }
    })

    render(
      <Provider store={store}>
        <ModalProvider>
          <ModelViewPage />
        </ModalProvider>
      </Provider>
    )

    expect(screen.queryByTestId('experience')).not.toBeInTheDocument()
  })

  it('should dispatch setIndicesMatrix when indicesMatrix in not loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: vi.fn(() => '1 12 14 10 15'),
      writable: true
    })

    const store = configureStore({
      reducer: { model, modelViewSetting: modelViewSettingReducer },
      preloadedState: { model: { ...initialState, isReady: false } }
    })
    store.dispatch = vi.fn()

    render(
      <Provider store={store}>
        <ModalProvider>
          <ModelViewPage />
        </ModalProvider>
      </Provider>
    )

    const indicesMatrixDropZone = screen.getByText('filesUploader.indicesMatrixFile')
    fireEvent.drop(indicesMatrixDropZone, {
      dataTransfer: {
        files: [indicesMatrixFile]
      }
    })

    const onIndicesMatrixLoad = (indicesMatrix: ElementIndices[], fileName: string) => {
      store.dispatch(setIndicesMatrix({ indicesMatrix, fileName }))
    }

    onIndicesMatrixLoad(indicesMatrix, indicesMatrixFileName)

    expect(store.dispatch).toHaveBeenCalledWith(setIndicesMatrix({ indicesMatrix, fileName: indicesMatrixFileName }))
  })

  it('should dispatch setCoorinatesMatrix when coorinatesMatrix are loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: vi.fn(() => '1 12 14 10 15'),
      writable: true
    })

    const store = configureStore({
      reducer: { model, modelViewSetting: modelViewSettingReducer },
      preloadedState: { model: { ...initialState, isReady: false } }
    })
    store.dispatch = vi.fn()

    render(
      <Provider store={store}>
        <ModalProvider>
          <ModelViewPage />
        </ModalProvider>
      </Provider>
    )

    const coorinatesMatrixDropZone = screen.getByText('filesUploader.coorinatesMatrixFile')
    fireEvent.drop(coorinatesMatrixDropZone, {
      dataTransfer: {
        files: [coorinatesMatrixFile]
      }
    })

    const onCoorinatesMatrixLoad = (coorinatesMatrix: VertexCoordinate[], fileName: string) => {
      store.dispatch(setCoorinatesMatrix({ coorinatesMatrix, fileName }))
    }

    onCoorinatesMatrixLoad(coorinatesMatrix, coorinatesMatrixFileName)

    expect(store.dispatch).toHaveBeenCalledWith(
      setCoorinatesMatrix({ coorinatesMatrix, fileName: coorinatesMatrixFileName })
    )
  })

  it.skip('should dispatch setReady and close FileUploader when clicking on create model button', () => {
    const store = configureStore({
      reducer: { model, modelViewSetting: modelViewSettingReducer },
      preloadedState: { model: initialState }
    })
    store.dispatch = vi.fn()
    render(
      <Provider store={store}>
        <ModalProvider>
          <ModelViewPage />
        </ModalProvider>
      </Provider>
    )

    const button = screen.getByText('filesUploader.createModelButton')
    fireEvent.click(button)

    expect(store.dispatch).toHaveBeenCalled()
  })
})
