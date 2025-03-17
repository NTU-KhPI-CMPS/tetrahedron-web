import FileUploadButton from '@/components/FileUploadButton.tsx'
import SwitchWithTitle from '@/components/SwitchWithTitle'
import { useTranslation } from 'react-i18next'

interface ToolbarProps {
  displayNodeIndices: boolean
  displacementLoaded: boolean
  stressLoaded: boolean
  stressFileName: string
  otherCharacteristicLoaded: boolean
  otherCharacteristicFileName: string
  useDisplacement: boolean
  displacementFileName: string
  onNodeIndicesSwitchClick: () => void
  onDisplacementSwitchClick: () => void
  loadStress: (file: File) => void
  loadCharacteristic: (file: File) => void
  loadDisplacement: (file: File) => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  displayNodeIndices,
  displacementLoaded,
  stressLoaded,
  stressFileName,
  otherCharacteristicLoaded,
  otherCharacteristicFileName,
  useDisplacement,
  displacementFileName,
  onNodeIndicesSwitchClick,
  onDisplacementSwitchClick,
  loadStress,
  loadCharacteristic,
  loadDisplacement
}) => {
  const { t } = useTranslation()

  return (
    <div className="absolute right-14 z-10 flex max-h-full w-52 select-none flex-col gap-3 overflow-y-auto rounded-3xl p-3 py-10 shadow-md backdrop-blur-sm">
      <SwitchWithTitle
        disabled={!displacementLoaded}
        checked={useDisplacement}
        label={t('toolbar.toolbarSections.switchSection.displacement')}
        id="displacement"
        onClick={onDisplacementSwitchClick}
      />
      <SwitchWithTitle
        checked={displayNodeIndices}
        label={t('toolbar.toolbarSections.switchSection.nodes')}
        id="face-numbers"
        onClick={onNodeIndicesSwitchClick}
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
        buttonText={displacementLoaded ? displacementFileName : t('toolbar.toolbarSections.buttonsSection.fileUpload')}
        onFileSelect={loadDisplacement}
      />
    </div>
  )
}

export default Toolbar
