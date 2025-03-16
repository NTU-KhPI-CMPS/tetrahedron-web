import FilesUploader from '@/components/FilesUploader'
import InstrumentsSidebar from '@/components/InstrumentsSidebar'
import Legend from '@/components/Legend'
import Scene from '@/components/Scene'
import Toolbar from '@/components/Toolbar'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { loadCharacteristic, loadStress } from '@/lib/utils'
import { setFaces, setReady, setVertices } from '@/redux/slices/modelSlice'
import { Face } from '@/types/Face'
import { Vertex } from '@/types/Vertex'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GrPowerReset } from 'react-icons/gr'
import { IoMove } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { PiCopySimpleLight, PiCursorFill, PiResize } from 'react-icons/pi'

const ModelViewPage = () => {
  const { isReady, facesFileName, verticesFileName, faces, vertices, verticesLoaded, facesLoaded } = useAppSelector(
    (store) => store.model
  )
  const [filesUploaderOpen, setFilesUploaderOpen] = useState(!isReady)
  const dispatch = useAppDispatch()

  const onFacesLoad = (faces: Face[], fileName: string) => {
    dispatch(setFaces({ faces, fileName }))
  }

  const onVerticesLoad = (vertices: Vertex[], fileName: string) => {
    dispatch(setVertices({ vertices, fileName }))
  }

  const closeModal = () => {
    dispatch(setReady(faces.length > 0 && vertices.length > 0))
    setFilesUploaderOpen(false)
  }

  const { t } = useTranslation()

  const buttonsData = [
    { tooltip: t('instrumentsSidebar.sidebarHints.select'), icon: <PiCursorFill /> },
    { tooltip: t('instrumentsSidebar.sidebarHints.move'), icon: <IoMove /> },
    { tooltip: t('instrumentsSidebar.sidebarHints.rotate'), icon: <GrPowerReset /> },
    { tooltip: t('instrumentsSidebar.sidebarHints.scale'), icon: <PiResize /> },
    { tooltip: t('instrumentsSidebar.sidebarHints.copy'), icon: <PiCopySimpleLight /> },
    { tooltip: t('instrumentsSidebar.sidebarHints.delete'), icon: <MdDelete /> }
  ]

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

        <Toolbar loadStress={loadStress} loadCharacteristic={loadCharacteristic} />
      </div>

      {filesUploaderOpen && (
        <FilesUploader
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
      )}
    </>
  )
}

export default ModelViewPage
