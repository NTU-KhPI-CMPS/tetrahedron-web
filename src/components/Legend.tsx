import LegendItem from '@/components/LegendItem'
import { useAppSelector } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'

const Legend = () => {
  const legendColors = useAppSelector((store) => store.legend?.legend)
  const { display, componentDisplay } = useAppSelector((store) => store.model, shallowEqual)
  const canDisplayLegend = display === 'otherCharacteristic' || componentDisplay !== 'none'

  if (!legendColors || !canDisplayLegend) {
    return
  }

  return (
    <div className="absolute z-10 ml-44 flex flex-col justify-center bg-red-500">
      {legendColors.map((item) => (
        <LegendItem color={item.color} rangeStart={item.rangeStart} rangeEnd={item.rangeEnd} key={item.rangeStart} />
      ))}
    </div>
  )
}

export default Legend
