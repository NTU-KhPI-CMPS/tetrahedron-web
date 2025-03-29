import ModelViewPage from '@/pages/ModelViewPage'
import { ModalProvider } from '@/providers/ModalProvider'
import { initialState, default as model, setIndicesMatrix, setVertices } from '@/redux/slices/modelSlice'
import { Vertex, VertexIndices } from '@/types/ModelCommonTypes'
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
const vertices = [{ index: 1, x: 0, y: 1, z: 0 }]

const indicesMatrixFileName = 'indicesMatrix.txt'
const verticesFileName = 'vertices.txt'

const indicesMatrixFile = new File(['1 12 14 10 15'], 'indicesMatrix.txt', { type: 'text/plain' })
const verticesFile = new File(['1 0 1 0'], 'vertices.txt', { type: 'text/plain' })

describe('ModelViewPage', () => {
  it('renders Experience component when isReady is true', () => {
    const store = configureStore({
      reducer: { model },
      preloadedState: { model: { ...initialState, isReady: true } }
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
      reducer: { model },
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
      reducer: { model },
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

    const onIndicesMatrixLoad = (indicesMatrix: VertexIndices[], fileName: string) => {
      store.dispatch(setIndicesMatrix({ indicesMatrix, fileName }))
    }

    onIndicesMatrixLoad(indicesMatrix, indicesMatrixFileName)

    expect(store.dispatch).toHaveBeenCalledWith(setIndicesMatrix({ indicesMatrix, fileName: indicesMatrixFileName }))
  })

  it('should dispatch setVertices when vertices are loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: vi.fn(() => '1 12 14 10 15'),
      writable: true
    })

    const store = configureStore({
      reducer: { model },
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

    const verticesDropZone = screen.getByText('filesUploader.verticesFile')
    fireEvent.drop(verticesDropZone, {
      dataTransfer: {
        files: [verticesFile]
      }
    })

    const onVerticesLoad = (vertices: Vertex[], fileName: string) => {
      store.dispatch(setVertices({ vertices, fileName }))
    }

    onVerticesLoad(vertices, verticesFileName)

    expect(store.dispatch).toHaveBeenCalledWith(setVertices({ vertices, fileName: verticesFileName }))
  })

  it.skip('should dispatch setReady and close FileUploader when clicking on create model button', () => {
    const store = configureStore({
      reducer: { model },
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
