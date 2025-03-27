import ErrorModal from '@/components/ErrorModal'
import FilesUploader from '@/components/FilesUploader'
import InstrumentsSidebar from '@/components/InstrumentsSidebar'
import Legend from '@/components/Legend'
import Scene from '@/components/Scene'
import Toolbar from '@/components/Toolbar'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { useModal } from '@/hooks/useModal'
import { parseVertices } from '@/lib/parser.ts'
import { loadCharacteristic, loadStress } from '@/lib/utils'
import { resetLegend } from '@/redux/slices/legendSlice'
import { resetModel, setDisplayNodeIndices, setFaces, setReady, setVertices } from '@/redux/slices/modelSlice'
import { setDisplacement, setDisplay } from '@/redux/slices/modelSlice.ts'
import { Face } from '@/types/Face'
import { Vertex } from '@/types/Vertex'
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
    facesFileName,
    verticesFileName,
    faces,
    vertices,
    verticesLoaded,
    facesLoaded,
    displayNodeIndices,
    displacementLoaded,
    displacementFileName,
    stress,
    stressFileName,
    otherCharacteristicFileName,
    otherCharacteristic,
    display
  } = useAppSelector((store) => store.model, shallowEqual)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { openModal } = useModal()

  const [filesUploaderOpen, setFilesUploaderOpen] = useState(!isReady)

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

  const onFacesLoad = useCallback(
    (faces: Face[], fileName: string) => {
      dispatch(setFaces({ faces, fileName }))
    },
    [dispatch]
  )

  const onVerticesLoad = useCallback(
    (vertices: Vertex[], fileName: string) => {
      dispatch(setVertices({ vertices, fileName }))
    },
    [dispatch]
  )

  const closeModal = useCallback(() => {
    dispatch(setReady(faces.length > 0 && vertices.length > 0))
    setFilesUploaderOpen(false)
  }, [dispatch, faces, vertices])

  const loadDisplacement = useCallback(
    async (file: File) => {
      const input = await file.text()
      const displacement = parseVertices(input)
      const isDisplacementValid = displacement.length === vertices.length

      if (!isDisplacementValid) {
        openModal({
          buttons: 'ok',
          title: t('errorModal.errorExclamationMark'),
          message: t('errorModal.invalidDisplacementValuesMessage'),
          onOkClick: () => {
            console.log('ok')
          }
        })
        return
      }

      dispatch(setDisplacement({ displacement, displacementFileName: file.name }))
      dispatch(setDisplay('displacement'))
    },
    [vertices, t, dispatch, openModal]
  )

  const onDisplacementSwitchClick = useCallback(() => {
    dispatch(setDisplay(display === 'displacement' ? 'none' : 'displacement'))
  }, [dispatch, display])

  const onNodeIndicesSwitchClick = useCallback(() => {
    dispatch(setDisplayNodeIndices(!displayNodeIndices))
  }, [dispatch, displayNodeIndices])

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
          displayNodeIndices={displayNodeIndices}
          displacementLoaded={displacementLoaded}
          useDisplacement={display === 'displacement'}
          displacementFileName={displacementFileName ?? ''}
          stressFileName={stressFileName ?? ''}
          stressLoaded={stress !== null}
          otherCharacteristicFileName={otherCharacteristicFileName ?? ''}
          otherCharacteristicLoaded={otherCharacteristic !== null}
          onNodeIndicesSwitchClick={onNodeIndicesSwitchClick}
          onDisplacementSwitchClick={onDisplacementSwitchClick}
          loadStress={loadStress}
          loadCharacteristic={loadCharacteristic}
          loadDisplacement={loadDisplacement}
        />
      </div>
      <FilesUploader
        showFilesUploader={filesUploaderOpen}
        verticesValid={!verticesLoaded || vertices.length > 1}
        verticesFileName={verticesFileName}
        facesFileName={facesFileName}
        facesValid={!facesLoaded || faces.length > 1}
        disableCreateModelButton={!vertices.length || !faces.length}
        closeModal={closeModal}
        onFacesLoad={onFacesLoad}
        onVerticesLoad={onVerticesLoad}
        onCreateModelClick={closeModal}
      />
      <ErrorModal />
    </>
  )
}

export default ModelViewPage
