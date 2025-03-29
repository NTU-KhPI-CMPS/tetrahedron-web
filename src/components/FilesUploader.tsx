import { useTranslation } from 'react-i18next'

import DragAndDrop from '@/components/DragAndDrop'
import OutsideClickHandler from '@/components/OutsideClickHandler'
import { Button } from '@/components/ui/button'
import { parseCoorinatesMatrix, parseIndicesMatrix } from '@/lib/parser'
import { cn } from '@/lib/utils'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'

interface FilesUploaderProps {
  coorinatesMatrixFileName: string
  coorinatesMatrixValid: boolean
  indicesMatrixFileName: string
  indicesMatrixValid: boolean
  disableCreateModelButton: boolean
  showFilesUploader?: boolean
  closeModal: () => void
  onIndicesMatrixLoad: (indicesMatrix: ElementIndices[], fileName: string) => void
  onCoorinatesMatrixLoad: (coorinatesMatrix: VertexCoordinate[], fileName: string) => void
  onCreateModelClick: () => void
}

const FilesUploader = ({
  coorinatesMatrixFileName,
  coorinatesMatrixValid,
  indicesMatrixFileName,
  indicesMatrixValid,
  disableCreateModelButton,
  showFilesUploader = true,
  closeModal,
  onIndicesMatrixLoad,
  onCoorinatesMatrixLoad,
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
    const indicesMatrix = await parseText(files[0], parseIndicesMatrix)
    onIndicesMatrixLoad(indicesMatrix, file.name)
  }

  const onCoorinatesMatrixLoadHandler = async (files: File[]) => {
    const file = files[0]
    const coorinatesMatrix = await parseText(file, parseCoorinatesMatrix)
    onCoorinatesMatrixLoad(coorinatesMatrix, file.name)
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
              hint={coorinatesMatrixValid ? coorinatesMatrixHint : 'Неможливо зчитати таблицю координат'}
              onFilesLoad={onCoorinatesMatrixLoadHandler}
              title={t('filesUploader.coorinatesMatrixFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': !coorinatesMatrixValid
              })}
              buttonClassName={cn({ 'bg-black text-white': !coorinatesMatrixValid })}
            />
            <DragAndDrop
              hint={indicesMatrixValid ? indicesMatrixHint : 'Неможливо зчитати матрицю індексів'}
              onFilesLoad={onIndicesMatrixLoadHandler}
              title={t('filesUploader.indicesMatrixFile')}
              className={cn('aspect-square w-64 border border-transparent p-5', {
                'border-red-500 bg-red-200': !indicesMatrixValid
              })}
              buttonClassName={cn({ 'bg-black text-white': !indicesMatrixValid })}
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
