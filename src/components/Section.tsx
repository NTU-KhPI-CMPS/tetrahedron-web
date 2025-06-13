interface SectionProps {
  sectionNumber: number | string
  header: string
  body: string
}

const Section = ({ sectionNumber, header, body }: SectionProps) => {
  return (
    <div className="relative flex h-[300px] w-[399px] flex-1 justify-center rounded-[40px] border-[0.5px] border-app-blue bg-white md:aspect-square">
      <div className="absolute left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-app-blue text-white">
        {sectionNumber}
      </div>
      <div className="flex flex-col justify-center gap-5">
        <h3 className="px-12 pt-11 text-center text-lg font-semibold">{header}</h3>
        <p className="px-12 pb-11 text-center text-md font-light leading-[100%]">{body}</p>
      </div>
    </div>
  )
}

export default Section
