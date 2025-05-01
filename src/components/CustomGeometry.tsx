import NodeDisplay from '@/components/NodeDisplay'
import { useAppSelector } from '@/hooks/use-redux'
import { calculateCoorinatesMatrixDisplacement, generateCoorinatesMatrix, generateIndicesMatrix } from '@/lib/utils'
import { Wireframe } from '@react-three/drei'
import { FC, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import * as THREE from 'three'

const CustomGeometry: FC = () => {
  const { coorinatesMatrix, indicesMatrix, colors, displacement, display, displacementScale, componentDisplay } =
    useAppSelector((store) => store.model, shallowEqual)

  const displayNodeIndices = useAppSelector((store) => store.modelViewSetting.displayNodeIndices)

  const meshRef = useRef<THREE.Mesh>(null)

  const size = meshRef.current
    ? new THREE.Box3().setFromObject(meshRef.current).getSize(new THREE.Vector3())
    : new THREE.Vector3(0, 0, 0)

  const coorinatesMatrixToUse =
    display === 'displacement'
      ? calculateCoorinatesMatrixDisplacement(coorinatesMatrix, displacement, displacementScale)
      : coorinatesMatrix
  const position = generateCoorinatesMatrix(coorinatesMatrixToUse)
  const indexArray = generateIndicesMatrix(indicesMatrix)

  const colorArray = colors ? new Float32Array(colors) : new Float32Array([])
  const canUseColors = display === 'otherCharacteristic' || componentDisplay !== 'none'
  const colorsCheck = canUseColors && !!colors && colors.length > 0
  const colorsCount = 3 // R + G + B

  const coorinatesMatrixKey = coorinatesMatrixToUse.reduce((result, { index, x, y, z }) => {
    return `${result}${index}${x}${y}${z}`
  }, '')

  return (
    <>
      <mesh ref={meshRef} key={coorinatesMatrixKey}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={position} itemSize={3} count={position.length / 3} />
          <bufferAttribute attach="index" array={indexArray} itemSize={1} count={indexArray.length} />
          <bufferAttribute attach="attributes-color" args={[colorArray, colorsCount]} />
        </bufferGeometry>

        <meshBasicMaterial vertexColors={colorsCheck} />

        <Wireframe thickness={0.01} stroke={'black'} />
      </mesh>

      {displayNodeIndices && <NodeDisplay positions={position} meshSize={size.y} />}
    </>
  )
}

export default CustomGeometry
