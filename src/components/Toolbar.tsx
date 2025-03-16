import FileUploadButton from '@/components/FileUploadButton.tsx'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.ts'
import { parseDefaultPhysicalQuantity, parseVertices } from '@/lib/parser.ts'
import {
  setCharacteristic,
  setDisplacement,
  setDisplayNodeIndices,
  setStress,
  setUseDisplacement
} from '@/redux/slices/modelSlice.ts'
import { useTranslation } from 'react-i18next'

const Toolbar = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { displayNodeIndices, useDisplacement, displacement, displacementFileName, vertices } = useAppSelector(
    (store) => store.model
  )
  const displacementLoaded = displacement.length > 0

  const loadStress = async (file: File) => {
    const input = await file.text()
    const stress = parseDefaultPhysicalQuantity(input)
    dispatch(setStress({ stress, fileName: file.name }))
  }

  const loadCharacteristic = async (file: File) => {
    const input = await file.text()
    const otherCharacteristic = parseDefaultPhysicalQuantity(input)
    dispatch(setCharacteristic({ otherCharacteristic, fileName: file.name }))
  }

  const loadDisplacement = async (file: File) => {
    const input = await file.text()
    const displacement = parseVertices(input)
    const isDisplacementValid = displacement.length === vertices.length

    if (!isDisplacementValid) {
      console.error('Invalid displacement values')
      return
    }
    dispatch(setDisplacement({ displacement, displacementFileName: file.name }))
    dispatch(setUseDisplacement(true))
  }

  return (
    <div className="absolute right-14 z-10 flex max-h-full w-52 select-none flex-col gap-3 overflow-y-auto rounded-3xl p-3 py-10 shadow-md backdrop-blur-sm">
      <SwitchWithTitle
        disabled={!displacementLoaded}
        checked={useDisplacement}
        labelStyles={!displacementLoaded ? 'cursor-not-allowed' : ''}
        label={t('toolbar.toolbarSections.switchSection.displacement')}
        id="displacement"
        onClick={() => dispatch(setUseDisplacement(!useDisplacement))}
      />
      <SwitchWithTitle
        checked={displayNodeIndices}
        label={t('toolbar.toolbarSections.switchSection.nodes')}
        id="face-numbers"
        onClick={() => dispatch(setDisplayNodeIndices(!displayNodeIndices))}
      />
      <FileUploadButton
        title={t('toolbar.toolbarSections.buttonsSection.nodeStress')}
        buttonText={t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadStress}
      />
      <FileUploadButton
        title={t('toolbar.toolbarSections.buttonsSection.otherCharacteristic')}
        buttonText={t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadCharacteristic}
      />
      <FileUploadButton
        variant={displacementLoaded ? 'ghost' : 'default'}
        title={t('toolbar.toolbarSections.buttonsSection.nodeDisplacement')}
        buttonText={
          displacementLoaded ? (displacementFileName ?? '') : t('toolbar.toolbarSections.buttonsSection.fileUpload')
        }
        onFileSelect={loadDisplacement}
      />
    </div>
  )
}

export default Toolbar
