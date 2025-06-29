import useConvertColor from '@/hooks/useConvertColor'
import { LegendItem as LegendItemType } from '@/types/ModelCommonTypes'
import { FC } from 'react'

const LegendItem: FC<LegendItemType> = ({ color, rangeStart, rangeEnd, lastValue }) => {
  const rgbColor = useConvertColor(color)

  return (
    <div data-testid="legendItem" className="relative flex flex-col">
      <div className="h-9 w-24 border-y border-black" style={{ backgroundColor: rgbColor }}></div>
      <div className="absolute left-1/2 top-1/2 flex h-5 w-16 -translate-x-1/2 -translate-y-7 items-center justify-center border border-black bg-white">
        <div className="text-center text-xs">
          {rangeStart.toExponential(2)}
          {lastValue && (
            <div className="absolute left-1/2 top-1/2 flex h-5 w-16 -translate-x-1/2 translate-y-6 items-center justify-center border border-black bg-white text-center text-xs">
              {rangeEnd.toExponential(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LegendItem
