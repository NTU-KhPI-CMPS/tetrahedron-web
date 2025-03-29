import FilesUploader from '@/components/FilesUploader'
import { fireEvent, render, screen } from '@testing-library/react'

const propsMock = {
  verticesValid: true,
  indicesMatrixValid: true,
  verticesFileName: 'vertices.txt',
  indicesMatrixFileName: 'indicesMatrix.txt',
  disableCreateModelButton: true,
  closeModal: vi.fn(),
  onIndicesMatrixLoad: vi.fn(() => '1 12 14 10 15'),
  onVerticesLoad: vi.fn(() => '1 2 3'),
  onCreateModelClick: vi.fn()
}

const verticesFile = new File(['1 0 1 0'], 'vertices.txt', { type: 'text/plain' })
const indicesMatrixFile = new File(['1 12 14 10 15'], 'indicesMatrix.txt', { type: 'text/plain' })

describe('FilesUploader', () => {
  it('should call closeModal callback when clicked outside', () => {
    render(
      <div>
        <FilesUploader {...propsMock} />
        <div>outside</div>
      </div>
    )

    const outsideContent = screen.getByText('outside')
    fireEvent.mouseDown(outsideContent)

    expect(propsMock.closeModal).toHaveBeenCalled()
  })

  it('should render default hints if the fileName is not provided for vertices or indicesMatrix', () => {
    const props = { ...propsMock, verticesFileName: '', indicesMatrixFileName: '' }
    render(<FilesUploader {...props} />)

    const defaulHints = screen.getAllByText('filesUploader.hint')

    expect(defaulHints.length).toEqual(2)
  })

  it('should call onVerticesLoad when vertices file is loaded', async () => {
    Object.defineProperty(File.prototype, 'text', {
      value: propsMock.onVerticesLoad,
      writable: true
    })

    render(<FilesUploader {...propsMock} />)
    const verticesDropZone = screen.getByText('filesUploader.verticesFile')

    fireEvent.drop(verticesDropZone, {
      dataTransfer: {
        files: [verticesFile]
      }
    })

    expect(propsMock.onVerticesLoad).toHaveBeenCalled()
  })

  it('should call onIndicesMatrixLoad when indicesMatrix file is loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: propsMock.onIndicesMatrixLoad,
      writable: true
    })

    render(<FilesUploader {...propsMock} />)
    const indicesMatrixDropZone = screen.getByText('filesUploader.indicesMatrixFile')

    fireEvent.drop(indicesMatrixDropZone, {
      dataTransfer: {
        files: [indicesMatrixFile]
      }
    })

    expect(propsMock.onIndicesMatrixLoad).toHaveBeenCalled()
  })
})
