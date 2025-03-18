import { useTranslation } from 'react-i18next'

import Headers from '@/components/main-page/Headers'
import Images from '@/components/main-page/Images'
import ProgramFeatures from '@/components/main-page/ProgramFeatures'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/use-redux'
import { resetLegend } from '@/redux/slices/legendSlice'
import { resetModel } from '@/redux/slices/modelSlice'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onCreateModelButtonClick = () => {
    dispatch(resetModel())
    dispatch(resetLegend())
    navigate('/model')
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center pt-10 md:pt-16">
      <Headers />

      <Button data-testid="createModelButton" onClick={onCreateModelButtonClick} className="mt-10 rounded-3xl px-5">
        {t('mainPage.createModelButton')}
      </Button>

      <Images />

      <ProgramFeatures />
    </div>
  )
}

export default MainPage
