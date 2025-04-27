import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ua', name: 'Українська' }
] as const

const languageItems = LANGUAGES.map(({ code }) => (
  <SelectItem key={code} value={code}>
    {code}
  </SelectItem>
))

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useLocalStorage<string>('currentLanguage', 'en')

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  }

  return (
    <Select data-testid="languageSelector" onValueChange={changeLanguage}>
      <SelectTrigger className="w-16 border-transparent bg-background font-semibold uppercase hover:border-input">
        <SelectValue placeholder={currentLanguage} />
      </SelectTrigger>
      <SelectContent position="popper" className="min-w-10 bg-background font-semibold uppercase">
        {languageItems}
      </SelectContent>
    </Select>
  )
}
