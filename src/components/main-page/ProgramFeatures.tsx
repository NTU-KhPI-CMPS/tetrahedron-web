import Section from '@/components/Section'
import { useTranslation } from 'react-i18next'

export default function ProgramFeatures() {
  const { t } = useTranslation()

  const sections = [...Array(3)].map((_, index) => (
    <Section
      key={t(`mainPage.section${index + 1}.number`)}
      sectionNumber={t(`mainPage.section${index + 1}.number`)}
      header={t(`mainPage.section${index + 1}.header`)}
      body={t(`mainPage.section${index + 1}.body`)}
    />
  ))

  return (
    <>
      <div className="max-w-[50rem] space-y-4 pt-20">
        <h1 className="text-center text-2xl">{t('mainPage.programFeaturesHeader')}</h1>
        <h3 className="mx-auto w-[85%] text-center text-lg font-light">{t('mainPage.programFeaturesSubHeader')}</h3>
      </div>
      <div className="flex w-full flex-col justify-between gap-10 p-10 pt-20 md:flex-row">{sections}</div>
    </>
  )
}
