import ModelViewPage from '@/pages/ModelViewPage'
import { ModalProvider } from '@/providers/ModalProvider'
import { initialState, default as model, setFaces, setVertices } from '@/redux/slices/modelSlice'
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

const faces = [{ index: 1, vertex1: 12, vertex2: 14, vertex3: 10, vertex4: 15 }]
const vertices = [{ index: 1, x: 0, y: 1, z: 0 }]

const facesFileName = 'faces.txt'
const verticesFileName = 'vertices.txt'

const facesFile = new File(['1 12 14 10 15'], 'faces.txt', { type: 'text/plain' })
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

  it('should dispatch setFaces when faces are loaded', () => {
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

    const facesDropZone = screen.getByText('filesUploader.facesFile')
    fireEvent.drop(facesDropZone, {
      dataTransfer: {
        files: [facesFile]
      }
    })

    const onFacesLoad = (faces: VertexIndices[], fileName: string) => {
      store.dispatch(setFaces({ faces, fileName }))
    }

    onFacesLoad(faces, facesFileName)

    expect(store.dispatch).toHaveBeenCalledWith(setFaces({ faces, fileName: facesFileName }))
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
