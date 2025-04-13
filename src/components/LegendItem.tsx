import { useAppSelector } from '@/hooks/use-redux'
import useConvertColor from '@/hooks/useConvertColor'
import { LegendType } from '@/types/ModelCommonTypes'
import { FC } from 'react'

const LegendItem: FC<LegendType> = ({ color, rangeStart, rangeEnd }) => {
  const rgbColor = useConvertColor(color)
  const max = useAppSelector((store) => store.legend.max)
  const lastValue = max === rangeEnd

  return (
    <div className="relative flex flex-col">
      <div className="h-9 border-y border-black" style={{ backgroundColor: rgbColor }} />
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
