import ErrorModal from '@/components/ErrorModal'
import FilesUploader from '@/components/FilesUploader'
import InstrumentsSidebar from '@/components/InstrumentsSidebar'
import Legend from '@/components/Legend'
import Scene from '@/components/Scene'
import Toolbar from '@/components/Toolbar'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { useModal } from '@/hooks/useModal'
import { parseCoorinatesMatrix } from '@/lib/coorinatesMatrixParser'
import { parseOtherCharacteristics } from '@/lib/otherCharacteristicsParser'
import { parseStress } from '@/lib/stressParser'
import { buildMisesPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { resetLegend } from '@/redux/slices/legendSlice'
import {
  resetModel,
  setCharacteristic,
  setCoorinatesMatrix,
  setDisplacement,
  setDisplay,
  setIndicesMatrix,
  setReady,
  setStress
} from '@/redux/slices/modelSlice'
import { ElementIndices, VertexCoordinate } from '@/types/ModelCommonTypes'
import { Canvas } from '@react-three/fiber'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CiImageOn } from 'react-icons/ci'
import { IoColorFillOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { PiArrowsDownUp, PiArrowsLeftRight, PiCursorFill } from 'react-icons/pi'
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
    stress,
    stressFileName,
    otherCharacteristicFileName,
    otherCharacteristic,
    stressValues
  } = useAppSelector((store) => store.model, shallowEqual)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [filesUploaderOpen, setFilesUploaderOpen] = useState(!isReady)
  const [coorinatesMatrixError, setCoorinatesMatrixError] = useState<undefined | string>()
  const [indicesMatrixError, setIndicesMatrixError] = useState<undefined | string>()

  const { openModal } = useModal()

  const onModelDelete = useCallback(() => {
    dispatch(resetModel())
    dispatch(resetLegend())
    setFilesUploaderOpen(true)
  }, [dispatch])

  const buttonsData = useMemo(
    () => [
      { tooltip: t('instrumentsSidebar.sidebarHints.select'), icon: <PiCursorFill /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.move'), icon: <PiArrowsLeftRight /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.'), icon: <PiArrowsDownUp /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.'), icon: <CiImageOn /> },
      { tooltip: t('instrumentsSidebar.sidebarHints.'), icon: <IoColorFillOutline /> },
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

  const loadCharacteristic = useCallback(
    async (file: File) => {
      const input = await file.text()
      const { data: otherCharacteristic, error } = parseOtherCharacteristics(input)

      if (error) {
        openModal({
          title: t('validation.error'),
          message: t(error.message),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }

      if (otherCharacteristic.values.length !== indicesMatrix.length) {
        openModal({
          title: t('validation.error'),
          message: t('validation.otherCharacteristicIsNotTheSameAsElementsCount', {
            valueCount: otherCharacteristic.values.length,
            elementsCount: indicesMatrix.length
          }),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }

      dispatch(setCharacteristic({ otherCharacteristic, fileName: file.name }))
    },
    [indicesMatrix, t, dispatch, openModal]
  )

  const loadStress = useCallback(
    async (file: File) => {
      const input = await file.text()
      const { data: parsedStress, error } = parseStress(input)

      if (error) {
        openModal({
          title: t('validation.error'),
          message: t(error.message),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }
      if (parsedStress.values.length !== stressValues.length) {
        openModal({
          title: t('validation.error'),
          message: t('validation.stressIsNotTheSameAsNodesCount', {
            stressCount: parsedStress.length,
            elementsCount: stressValues.length
          }),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })

        return
      }

      const calculatedMises = calculateMisesStress(parsedStress)

      const stress = buildMisesPhysicalQuantity(calculatedMises)

      dispatch(setStress({ stress, fileName: file.name }))
      dispatch(setDisplay('stress'))
    },
    [dispatch, t, openModal, stressValues]
  )

  const loadDisplacement = useCallback(
    async (file: File) => {
      const input = await file.text()
      const { data: displacement, error } = parseCoorinatesMatrix(input, 'validation.displacementInvalidNumbersCount')

      if (error) {
        openModal({
          title: t('validation.error'),
          message: t(error.message),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }

      if (displacement.length !== coorinatesMatrix.length) {
        openModal({
          title: t('validation.error'),
          message: t('validation.displacementIsNotTheSameAsNodesCount', {
            displacementCount: displacement.length,
            nodesCount: coorinatesMatrix.length
          }),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }

      dispatch(setDisplacement({ displacement, displacementFileName: file.name }))
      dispatch(setDisplay('displacement'))
    },
    [coorinatesMatrix, t, dispatch, openModal]
  )

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
          stressLoaded={stress !== null}
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
