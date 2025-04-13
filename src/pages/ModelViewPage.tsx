import ErrorModal from '@/components/ErrorModal'
import FilesUploader from '@/components/FilesUploader'
import InstrumentsSidebar from '@/components/InstrumentsSidebar'
import Legend from '@/components/Legend'
import Scene from '@/components/Scene'
import Toolbar from '@/components/Toolbar'
import useLoadHandler from '@/components/useLoadHandler'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { resetLegend } from '@/redux/slices/legendSlice'
import { resetModel, setCoorinatesMatrix, setIndicesMatrix, setReady } from '@/redux/slices/modelSlice'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'
import { Canvas } from '@react-three/fiber'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GrPowerReset } from 'react-icons/gr'
import { IoMove } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { PiCopySimpleLight, PiCursorFill, PiResize } from 'react-icons/pi'
import { shallowEqual } from 'react-redux'

const ModelViewPage = () => {
  const {
    isReady,
    indicesMatrixFileName,
    coorinatesMatrixFileName,
    indicesMatrix,
    coorinatesMatrix,
    displacementLoaded,
    displacementFileName,
    stressMises,
    stressFileName,
    otherCharacteristicFileName,
    otherCharacteristic
  } = useAppSelector((store) => store.model, shallowEqual)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [filesUploaderOpen, setFilesUploaderOpen] = useState(!isReady)
  const [coorinatesMatrixError, setCoorinatesMatrixError] = useState<undefined | string>()
  const [indicesMatrixError, setIndicesMatrixError] = useState<undefined | string>()

  const onModelDelete = useCallback(() => {
    dispatch(resetModel())
    dispatch(resetLegend())
    setFilesUploaderOpen(true)
  }, [dispatch])

  const buttonsData = useMemo(
    () => [
      { tooltip: t('instrumentsSidebar.sidebarHints.select'), icon: <PiCursorFill /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.move'), icon: <IoMove /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.rotate'), icon: <GrPowerReset /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.scale'), icon: <PiResize /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.copy'), icon: <PiCopySimpleLight /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.delete'), icon: <MdDelete />, action: () => onModelDelete() }
    ],
    [t, onModelDelete]
  )

  const onIndicesMatrixLoad = useCallback(
    (indicesMatrix: ElementIndices[], fileName: string) => {
      dispatch(setIndicesMatrix({ indicesMatrix, fileName }))
      setIndicesMatrixError(undefined)
    },
    [dispatch]
  )

  const onCoorinatesMatrixLoad = useCallback(
    (coorinatesMatrix: VertexCoordinate[], fileName: string) => {
      dispatch(setCoorinatesMatrix({ coorinatesMatrix, fileName }))
      setCoorinatesMatrixError(undefined)
    },
    [dispatch]
  )

  const closeModal = useCallback(() => {
    dispatch(setReady(indicesMatrix.length > 0 && coorinatesMatrix.length > 0))
    setFilesUploaderOpen(false)
  }, [dispatch, indicesMatrix, coorinatesMatrix])

  const { loadCharacteristic, loadStress, loadDisplacement } = useLoadHandler()

  return (
    <>
      <div className="relative flex items-center justify-between">
        <InstrumentsSidebar buttonsData={buttonsData} />
        <Legend />
        {isReady && (
          <div data-testid="experience" className="fixed left-0 top-0 z-0 h-dvh w-full overflow-hidden">
            <Canvas
              camera={{
                fov: 45,
                near: 0.001,
                far: 10000,
                position: [3, 3, 3]
              }}
            >
              <Scene />
            </Canvas>
          </div>
        )}
        <Toolbar
          displacementLoaded={displacementLoaded}
          displacementFileName={displacementFileName ?? ''}
          stressFileName={stressFileName ?? ''}
          stressLoaded={stressMises !== null}
          otherCharacteristicFileName={otherCharacteristicFileName ?? ''}
          otherCharacteristicLoaded={otherCharacteristic !== null}
          loadStress={loadStress}
          loadCharacteristic={loadCharacteristic}
          loadDisplacement={loadDisplacement}
        />
      </div>
      <FilesUploader
        showFilesUploader={filesUploaderOpen}
        coorinatesMatrixError={coorinatesMatrixError}
        coorinatesMatrixFileName={coorinatesMatrixFileName}
        indicesMatrixFileName={indicesMatrixFileName}
        indicesMatrixError={indicesMatrixError}
        disableCreateModelButton={!coorinatesMatrix.length || !indicesMatrix.length}
        closeModal={closeModal}
        onIndicesMatrixLoad={onIndicesMatrixLoad}
        onIndicesMatrixError={(errorMessage) => setIndicesMatrixError(errorMessage)}
        onCoorinatesMatrixLoad={onCoorinatesMatrixLoad}
        onCoorinatesMatrixError={(errorMessage) => setCoorinatesMatrixError(errorMessage)}
        onCreateModelClick={closeModal}
      />
      <ErrorModal />
    </>
  )
}

export default ModelViewPage
