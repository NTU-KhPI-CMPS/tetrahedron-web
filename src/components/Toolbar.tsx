import DisplacementModal from '@/components/DisplacementModal'
import FileUploadButton from '@/components/FileUploadButton'
import StressModal from '@/components/stress-modal/StressModal'
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
    <div className="absolute right-14 z-10 flex max-h-[374px] w-[242px] select-none flex-col gap-[22px] rounded-xl p-5 py-8 shadow-md backdrop-blur-sm">
      <div className="flex-center flex max-h-[94px] w-[202px] flex-col gap-[10px]">
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
      </div>
      <div className="flex h-[194px] w-[202px] flex-col gap-[10px]">
        <div className="h-16 w-full">
          <FileUploadButton
            variant={stressLoaded ? 'ghost' : 'default'}
            title={t('toolbar.toolbarSections.buttonsSection.nodeStress')}
            modal={<StressModal />}
            disableModal={!stressLoaded}
            buttonText={stressLoaded ? stressFileName : t('toolbar.toolbarSections.buttonsSection.fileUpload')}
            onFileSelect={loadStress}
            subtitle={t('toolbar.toolbarSections.buttonsSection.stressSubtitle')}
          />
        </div>
        <div className="h-16 w-full">
          <FileUploadButton
            variant={displacementLoaded ? 'ghost' : 'default'}
            title={t('toolbar.toolbarSections.buttonsSection.nodeDisplacement')}
            modal={<DisplacementModal />}
            disableModal={!displacementLoaded}
            buttonText={
              displacementLoaded ? displacementFileName : t('toolbar.toolbarSections.buttonsSection.fileUpload')
            }
            onFileSelect={loadDisplacement}
            subtitle={t('toolbar.toolbarSections.buttonsSection.totalDisplacement')}
          />
        </div>
        <div className="h-[46px] w-full">
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
        </div>
      </div>
    </div>
  )
}

export default Toolbar
