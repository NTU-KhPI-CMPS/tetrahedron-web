import LegendItem from '@/components/LegendItem'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useAppSelector } from '@/hooks/use-redux'

const Legend = () => {
  const legendColors = useAppSelector((store) => store.legend?.legend)
  const display = useAppSelector((store) => store.model.display)
  const canDisplayLegend = display === 'otherCharacteristic' || display === 'stress'

  if (!legendColors || !canDisplayLegend) {
    return
  }

  return (
    <ResizablePanelGroup autoSaveId="legend" direction="horizontal" className="absolute z-10 pl-44">
      <ResizablePanel defaultSize={10} className="flex flex-col justify-center">
        {legendColors.map((item) => (
          <LegendItem color={item.color} rangeStart={item.rangeStart} rangeEnd={item.rangeEnd} key={item.rangeStart} />
        ))}
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-transparent" />
      <ResizablePanel />
    </ResizablePanelGroup>
  )
}

export default Legend
