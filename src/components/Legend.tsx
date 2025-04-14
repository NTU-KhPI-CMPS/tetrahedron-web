import LegendItem from '@/components/LegendItem'
import { useAppSelector } from '@/hooks/use-redux'

const Legend = () => {
  const legendColors = useAppSelector((store) => store.legend?.legend)
  const display = useAppSelector((store) => store.model.display)
  const canDisplayLegend = display === 'otherCharacteristic' || display === 'stress'

  if (!legendColors || !canDisplayLegend) {
    return
  }

  return (
    <div className="relative z-10">
      {legendColors.map((item) => (
        <LegendItem color={item.color} rangeStart={item.rangeStart} rangeEnd={item.rangeEnd} key={item.rangeStart} />
      ))}
    </div>
  )
}

export default Legend
