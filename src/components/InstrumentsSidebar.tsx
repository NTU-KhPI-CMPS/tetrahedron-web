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

  const buttons = buttonsData.map((item, index) => (
    <Tooltip key={item.tooltip}>
      <TooltipTrigger
        onClick={() => buttonClickHandler(item, index)}
        className={cn(
          'flex size-10 items-center justify-center rounded-full text-2xl duration-150 hover:bg-[#1E0094] hover:text-white',
          {
            'bg-[#130452] text-white': index === activeButtonIndex
          }
        )}
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
      <div className="peer absolute left-[15px] z-10 flex min-h-[324px] w-[76px] flex-col overflow-visible rounded-xl px-6 py-8 shadow-md backdrop-blur-sm">
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          <div className="left-0 top-0 flex h-full w-full justify-center" />

          <div className="absolute flex flex-col gap-[10px]">{buttons}</div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default InstrumentsSidebar
