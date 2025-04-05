import DisplacementModal from '@/components/DisplacementModal'
import FileUploadButton from '@/components/FileUploadButton'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { setDisplayCoordinateAxes, setDisplayNodeIndices } from '@/redux/slices/modelViewSettingSlice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'

interface ToolbarProps {
  displacementLoaded: boolean
  stressLoaded: boolean
  stressFileName: string
  otherCharacteristicLoaded: boolean
  otherCharacteristicFileName: string
  displacementFileName: string
  loadStress: (file: File) => void
  loadCharacteristic: (file: File) => void
  loadDisplacement: (file: File) => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  displacementLoaded,
  stressLoaded,
  stressFileName,
  otherCharacteristicLoaded,
  otherCharacteristicFileName,
  displacementFileName,
  loadStress,
  loadCharacteristic,
  loadDisplacement
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { displayNodeIndices, displayCoordinateAxes } = useAppSelector((store) => store.modelViewSetting, shallowEqual)

  const onNodeIndicesSwitchClick = useCallback(() => {
    dispatch(setDisplayNodeIndices(!displayNodeIndices))
  }, [dispatch, displayNodeIndices])

  const onCoordinateAxesSwitchClick = useCallback(() => {
    dispatch(setDisplayCoordinateAxes(!displayCoordinateAxes))
  }, [dispatch, displayCoordinateAxes])

  return (
    <div className="absolute right-14 z-10 flex max-h-full w-52 select-none flex-col gap-3 overflow-y-auto rounded-3xl p-3 py-10 shadow-md backdrop-blur-sm">
      <SwitchWithTitle
        checked={displayNodeIndices}
        label={t('toolbar.toolbarSections.switchSection.nodes')}
        id="face-numbers"
        onClick={onNodeIndicesSwitchClick}
      />
      <SwitchWithTitle
        checked={displayCoordinateAxes}
        label={t('toolbar.toolbarSections.switchSection.coordinateAxes')}
        id="coordinate-axes"
        onClick={onCoordinateAxesSwitchClick}
      />
      <FileUploadButton
        variant={stressLoaded ? 'ghost' : 'default'}
        title={t('toolbar.toolbarSections.buttonsSection.nodeStress')}
        buttonText={stressLoaded ? stressFileName : t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadStress}
      />
      <FileUploadButton
        title={t('toolbar.toolbarSections.buttonsSection.otherCharacteristic')}
        variant={otherCharacteristicLoaded ? 'ghost' : 'default'}
        buttonText={
          otherCharacteristicLoaded
            ? otherCharacteristicFileName
            : t('toolbar.toolbarSections.buttonsSection.fileUpload')
        }
        onFileSelect={loadCharacteristic}
      />
      <FileUploadButton
        variant={displacementLoaded ? 'ghost' : 'default'}
        title={t('toolbar.toolbarSections.buttonsSection.nodeDisplacement')}
        modal={<DisplacementModal />}
        disableModal={!displacementLoaded}
        buttonText={displacementLoaded ? displacementFileName : t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadDisplacement}
      />
    </div>
  )
}

export default Toolbar
