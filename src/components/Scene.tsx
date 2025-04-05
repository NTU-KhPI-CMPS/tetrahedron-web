import { useAppSelector } from '@/hooks/use-redux'
import { Center, GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei'
import { shallowEqual } from 'react-redux'
import CustomGeometry from './CustomGeometry'

const Scene = () => {
  const { displayCoordinateAxes } = useAppSelector((store) => store.modelViewSetting, shallowEqual)

  return (
    <>
      <OrbitControls enablePan={true} />

      <Center>
        <CustomGeometry />
      </Center>

      {displayCoordinateAxes && (
        <GizmoHelper alignment="bottom-center" margin={[80, 80]}>
          <GizmoViewport axisColors={['red', '#94D82D', 'blue']} labelColor="black" />
        </GizmoHelper>
      )}
    </>
  )
}

export default Scene
