import { useTranslation } from 'react-i18next'

export default function Headers() {
  const { t } = useTranslation()

  return (
    <div className="font-craftwork max-w-[50rem] space-y-4">
      <div>
        <h1 className="text-center text-2xl">{t('mainPage.headerPart1')}</h1>
        <h1 className="text-center text-2xl">{t('mainPage.headerPart2')}</h1>
      </div>
      <h3 className="mx-auto w-[85%] text-center text-md font-light">{t('mainPage.subHeader')}</h3>
    </div>
  )
}
