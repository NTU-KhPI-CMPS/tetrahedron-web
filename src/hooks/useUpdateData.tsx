import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { displayDataOnModel, setColorArraySizeData } from '@/redux/slices/modelSlice'
import { ModelPhysicalQuantity } from '@/types/ModelCommonTypes'
import { useCallback, useState } from 'react'

export function useUpdateData() {
  const colorArraySize = useAppSelector((store) => store.model.colorArraySize)

  const dispatch = useAppDispatch()
  const [arraySize, setColorArraySize] = useState(colorArraySize)

  const displayData = useCallback(
    (data: ModelPhysicalQuantity) => {
      if (data !== null) {
        dispatch(displayDataOnModel({ quantity: data, colorArraySize }))
      }
    },
    [dispatch, colorArraySize]
  )

  const updateArraySize = useCallback(
    (size: number) => {
      if (size !== 0) {
        setColorArraySize(size)
        dispatch(setColorArraySizeData(size))
      }
    },
    [dispatch]
  )

  return { colorArraySize: arraySize, displayData, updateArraySize }
}
