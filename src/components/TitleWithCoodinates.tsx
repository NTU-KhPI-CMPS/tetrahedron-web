interface TitleWithCoodinatesProps {
  title: string
  x?: number | string
  y?: number | string
  z?: number | string
}

const TitleWithCoodinates = ({ title, x = 0, y = 0, z = 0 }: TitleWithCoodinatesProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p>{title}</p>
      <div className="flex items-center gap-2">
        <p className="flex flex-1 justify-center gap-1 rounded-full bg-[#EAF4FF] px-2">
          <span className="text-app-blue">X</span>
          <span>{x}</span>
        </p>
        <p className="flex flex-1 justify-center gap-1 rounded-full bg-[#EAF4FF] px-2">
          <span className="text-app-blue">Y</span>
          <span>{y}</span>
        </p>
        <p className="flex flex-1 justify-center gap-1 rounded-full bg-[#EAF4FF] px-2">
          <span className="text-app-blue">Z</span>
          <span>{z}</span>
        </p>
      </div>
    </div>
  )
}

export default TitleWithCoodinates
