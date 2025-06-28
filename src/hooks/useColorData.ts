import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.ts'
import { updateLegend } from '@/redux/slices/legendSlice.ts'
import { displayDataOnModel, StressDisplayVariants } from '@/redux/slices/modelSlice.ts'
import { ModelPhysicalQuantity, StressType } from '@/types/ModelCommonTypes.ts'

/**
 * Connects data represented in colors on a model and legend.
 * Defines what data should be displayed on a model (provided in method params or in model store) and display them.
 * Generate new legend based on colors count in method params or legend store.
 */
export default function useColorData() {
  const dispatch = useAppDispatch()

  const display = useAppSelector((store) => store.model.display)

  const otherCharacteristic = useAppSelector((store) => store.model.otherCharacteristic)
  const stress = useAppSelector<StressType | null>((store) => store.model.stress)
  const stressComponent = useAppSelector<StressDisplayVariants>((store) => store.model.componentDisplay)

  const colorsCount = useAppSelector((store) => store.legend.colorsCount)

  const getDataToDisplay = () => {
    switch (display) {
      case 'otherCharacteristic':
        if (!otherCharacteristic) {
          return
        }
        return otherCharacteristic
      case 'stress':
        if (!stress || stressComponent === 'none') {
          return
        }
        return stress[stressComponent]
      default:
        return
    }
  }

  /**
   * Generates new legend with provided colors count and display it.
   * Updates data currently displayed on a model to match a new legend.
   *
   * @param colorsCount - colors count in a legend
   */
  const updateLegendColorsCount = (colorsCount: number) => {
    const dataToDisplay = getDataToDisplay()
    if (!dataToDisplay) {
      return
    }

    dispatch(updateLegend({ data: dataToDisplay, colorsCount }))
    dispatch(displayDataOnModel({ data: dataToDisplay, colorsCount }))
  }

  /**
   * Displays provided data and update legend accordingly.
   * Gets colors count in legend store.
   *
   * @param dataToDisplay - data to display in colors
   */
  const displayData = (dataToDisplay: ModelPhysicalQuantity) => {
    dispatch(updateLegend({ data: dataToDisplay, colorsCount }))
    dispatch(displayDataOnModel({ data: dataToDisplay, colorsCount }))
  }

  return { updateLegendColorsCount, displayData }
}
