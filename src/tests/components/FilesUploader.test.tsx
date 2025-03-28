import FilesUploader from '@/components/FilesUploader'
import { fireEvent, render, screen } from '@testing-library/react'

const propsMock = {
  verticesValid: true,
  facesValid: true,
  verticesFileName: 'vertices.txt',
  facesFileName: 'faces.txt',
  disableCreateModelButton: true,
  closeModal: vi.fn(),
  onFacesLoad: vi.fn(() => '1 12 14 10 15'),
  onVerticesLoad: vi.fn(() => '1 2 3'),
  onCreateModelClick: vi.fn()
}

const verticesFile = new File(['1 0 1 0'], 'vertices.txt', { type: 'text/plain' })
const facesFile = new File(['1 12 14 10 15'], 'faces.txt', { type: 'text/plain' })

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

  it('should render default hints if the fileName is not provided for vertices or faces', () => {
    const props = { ...propsMock, verticesFileName: '', facesFileName: '' }
    render(<FilesUploader {...props} />)

    const hintCoordinates = screen.getAllByText('filesUploader.hintCoordinates')
    const hintIndices = screen.getAllByText('filesUploader.hintIndices')

    expect(hintCoordinates.length).toEqual(1)
    expect(hintIndices.length).toEqual(1)
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

  it('should call onFacesLoad when faces file is loaded', () => {
    Object.defineProperty(File.prototype, 'text', {
      value: propsMock.onFacesLoad,
      writable: true
    })

    render(<FilesUploader {...propsMock} />)
    const facesDropZone = screen.getByText('filesUploader.facesFile')

    fireEvent.drop(facesDropZone, {
      dataTransfer: {
        files: [facesFile]
      }
    })

    expect(propsMock.onFacesLoad).toHaveBeenCalled()
  })
})
