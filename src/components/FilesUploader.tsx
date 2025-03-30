import { useTranslation } from 'react-i18next'

import DragAndDrop from '@/components/DragAndDrop'
import OutsideClickHandler from '@/components/OutsideClickHandler'
import { Button } from '@/components/ui/button'
import { parseCoorinatesMatrix } from '@/lib/coorinatesMatrixParser'
import { parseIndicesMatrix } from '@/lib/indicesMatrixParser'
import { cn } from '@/lib/utils'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'

interface FilesUploaderProps {
  coorinatesMatrixFileName: string
  coorinatesMatrixError?: string
  indicesMatrixFileName: string
  indicesMatrixError?: string
  disableCreateModelButton: boolean
  showFilesUploader?: boolean
  closeModal: () => void
  onIndicesMatrixLoad: (indicesMatrix: ElementIndices[], fileName: string) => void
  onIndicesMatrixError: (errorMessage: string | undefined) => void
  onCoorinatesMatrixLoad: (coorinatesMatrix: VertexCoordinate[], fileName: string) => void
  onCoorinatesMatrixError: (errorMessage: string | undefined) => void
  onCreateModelClick: () => void
}

const FilesUploader = ({
  coorinatesMatrixFileName,
  coorinatesMatrixError,
  indicesMatrixFileName,
  indicesMatrixError,
  disableCreateModelButton,
  showFilesUploader = true,
  closeModal,
  onIndicesMatrixLoad,
  onIndicesMatrixError,
  onCoorinatesMatrixLoad,
  onCoorinatesMatrixError,
  onCreateModelClick
}: FilesUploaderProps) => {
  const { t } = useTranslation()

  const coorinatesMatrixHint =
    coorinatesMatrixFileName === ''
      ? t('filesUploader.hintCoordinates')
      : t('filesUploader.selectedFile') + coorinatesMatrixFileName
  const indicesMatrixHint =
    indicesMatrixFileName === ''
      ? t('filesUploader.hintIndices')
      : t('filesUploader.selectedFile') + indicesMatrixFileName

  const outsideClickHandler = () => {
    closeModal()
  }

  async function parseText<T>(file: File, parser: (input: string) => T) {
    const input = await file.text()
    return parser(input)
  }

  const onIndicesMatrixLoadHandler = async (files: File[]) => {
    const file = files[0]
    const { data: indicesMatrix, error } = await parseText(files[0], parseIndicesMatrix)

    if (error) {
      onIndicesMatrixError(error.message)
      return
    }

    onIndicesMatrixLoad(indicesMatrix, file.name)
    onIndicesMatrixError(undefined)
  }

  const onCoorinatesMatrixLoadHandler = async (files: File[]) => {
    const file = files[0]
    const { data: coorinatesMatrix, error } = await parseText(file, parseCoorinatesMatrix)

    if (error) {
      onCoorinatesMatrixError(error.message)
      return
    }

    onCoorinatesMatrixLoad(coorinatesMatrix, file.name)
    onCoorinatesMatrixError(undefined)
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
              hint={coorinatesMatrixError ? t(coorinatesMatrixError) : coorinatesMatrixHint}
              onFilesLoad={onCoorinatesMatrixLoadHandler}
              title={t('filesUploader.coorinatesMatrixFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': coorinatesMatrixError
              })}
              buttonClassName={cn({ 'bg-black text-white': coorinatesMatrixError })}
            />
            <DragAndDrop
              hint={indicesMatrixError ? t(indicesMatrixError) : indicesMatrixHint}
              onFilesLoad={onIndicesMatrixLoadHandler}
              title={t('filesUploader.indicesMatrixFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': indicesMatrixError
              })}
              buttonClassName={cn({ 'bg-black text-white': indicesMatrixError })}
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
