import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { useModal } from '@/hooks/useModal'
import { parseCoorinatesMatrix } from '@/lib/coorinatesMatrixParser'
import { parseOtherCharacteristics } from '@/lib/otherCharacteristicsParser'
import { parseStress } from '@/lib/stressParser'
import { buildMisesPhysicalQuantity, calculateMisesStress } from '@/lib/stressUtils'
import { setCharacteristic, setDisplacement, setDisplay, setStress } from '@/redux/slices/modelSlice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'

export default function useLoadHandler() {
  const { indicesMatrix, coorinatesMatrix, stress } = useAppSelector((store) => store.model, shallowEqual)

  const { openModal } = useModal()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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
      const { data: parsedStress, error } = parseStress(input, 'validation.stressInvalidNumbersCount')

      if (error) {
        openModal({
          title: t('validation.error'),
          message: t(error.message),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })
        return
      }
      if (parsedStress.values.length !== stress.length) {
        openModal({
          title: t('validation.error'),
          message: t('validation.displacementIsNotTheSameAsNodesCount', {
            parsedStressCount: parsedStress.length,
            itemsCount: stress.length
          }),
          confirmation: t('validation.checkDataAndTryAgain'),
          buttons: 'ok'
        })

        return
      }

      const calculatedMises = calculateMisesStress(parsedStress)

      const stressMises = buildMisesPhysicalQuantity(calculatedMises)

      dispatch(setStress({ stressMises, fileName: file.name }))
      dispatch(setDisplay('stress'))
    },
    [dispatch, t, openModal]
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

  return { loadCharacteristic, loadStress, loadDisplacement }
}
