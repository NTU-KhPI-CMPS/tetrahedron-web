import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'

type ButtonData = {
  tooltip: string
  icon: ReactNode
  action?: () => void
}

interface InstrumentsSidebarProps {
  buttonsData: ButtonData[]
}

const InstrumentsSidebar = ({ buttonsData }: InstrumentsSidebarProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)

  const buttonClickHandler = (item: ButtonData, buttonIndex: number) => {
    setActiveButtonIndex(buttonIndex)
    item.action?.()
  }

  const circlePosition = {
    transform: `translateY(${activeButtonIndex * 48 + activeButtonIndex * 12}px)`
  }

  const buttons = buttonsData.map((item, index) => (
    <Tooltip key={item.tooltip}>
      <TooltipTrigger
        onClick={() => buttonClickHandler(item, index)}
        className={cn('flex size-12 items-center justify-center rounded-full text-2xl duration-150 hover:bg-white/80', {
          'text-white hover:bg-transparent hover:text-white': index === activeButtonIndex
        })}
      >
        {item.icon}
      </TooltipTrigger>
      <TooltipContent side="right" className="select-none capitalize">
        {item.tooltip}
      </TooltipContent>
    </Tooltip>
  ))

  return (
    <TooltipProvider>
      <div className="absolute left-14 z-10 flex h-[372px] w-[72px] flex-col gap-3 rounded-3xl p-3 shadow-md backdrop-blur-sm">
        <div className="absolute left-0 z-10 flex h-full w-full flex-col items-center gap-3">{buttons}</div>
        <div className="absolute left-0 top-0 h-full w-full p-3">
          <div style={circlePosition} className="size-12 translate-y-5 rounded-full bg-app-blue duration-150" />
        </div>
      </div>
    </TooltipProvider>
  )
}

export default InstrumentsSidebar
