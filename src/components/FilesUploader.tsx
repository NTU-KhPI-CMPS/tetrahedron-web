import { useTranslation } from 'react-i18next'

import DragAndDrop from '@/components/DragAndDrop'
import OutsideClickHandler from '@/components/OutsideClickHandler'
import { Button } from '@/components/ui/button'
import { parseFaces, parseVertices } from '@/lib/parser'
import { cn } from '@/lib/utils'
import { Face } from '@/types/Face'
import { Vertex } from '@/types/Vertex'

interface FilesUploaderProps {
  verticesFileName: string
  verticesValid: boolean
  facesFileName: string
  facesValid: boolean
  disableCreateModelButton: boolean
  showFilesUploader?: boolean
  closeModal: () => void
  onFacesLoad: (faces: Face[], fileName: string) => void
  onVerticesLoad: (vertices: Vertex[], fileName: string) => void
  onCreateModelClick: () => void
}

const FilesUploader = ({
  verticesFileName,
  verticesValid,
  facesFileName,
  facesValid,
  disableCreateModelButton,
  showFilesUploader = true,
  closeModal,
  onFacesLoad,
  onVerticesLoad,
  onCreateModelClick
}: FilesUploaderProps) => {
  const { t } = useTranslation()

  const verticesHint =
    verticesFileName === '' ? t('filesUploader.hintCoordinates') : t('filesUploader.selectedFile') + verticesFileName
  const facesHint =
    facesFileName === '' ? t('filesUploader.hintIndices') : t('filesUploader.selectedFile') + facesFileName

  const outsideClickHandler = () => {
    closeModal()
  }

  async function parseText<T>(file: File, parser: (input: string) => T) {
    const input = await file.text()
    return parser(input)
  }

  const onFacesLoadHandler = async (files: File[]) => {
    const file = files[0]
    const faces = await parseText(files[0], parseFaces)
    onFacesLoad(faces, file.name)
  }

  const onVerticesLoadHandler = async (files: File[]) => {
    const file = files[0]
    const vertices = await parseText(file, parseVertices)
    onVerticesLoad(vertices, file.name)
  }

  if (!showFilesUploader) return null

  return (
    <div
      data-testid="wrapper"
      className="absolute left-0 top-0 z-50 flex size-96 h-dvh w-dvw items-center justify-center bg-black/50 p-5 md:p-10"
    >
      <OutsideClickHandler callback={outsideClickHandler}>
        <div className="grid aspect-video max-w-7xl grid-rows-[1fr,auto] gap-5 rounded-3xl bg-white p-5 md:gap-10 md:p-10">
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <DragAndDrop
              hint={verticesValid ? verticesHint : 'Неможливо зчитати таблицю координат'}
              onFilesLoad={onVerticesLoadHandler}
              title={t('filesUploader.verticesFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': !verticesValid
              })}
              buttonClassName={cn({ 'bg-black text-white': !verticesValid })}
            />
            <DragAndDrop
              hint={facesValid ? facesHint : 'Неможливо зчитати матрицю індексів'}
              onFilesLoad={onFacesLoadHandler}
              title={t('filesUploader.facesFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': !facesValid
              })}
              buttonClassName={cn({ 'bg-black text-white': !facesValid })}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button disabled={disableCreateModelButton} onClick={onCreateModelClick}>
              {t('filesUploader.createModelButton')}
            </Button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  )
}

export default FilesUploader
