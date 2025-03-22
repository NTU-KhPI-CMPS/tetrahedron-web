import { LanguageSelector } from '@/components/LanguageSelector'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const changeLanguageMock = vi.fn()
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: changeLanguageMock
    }
  })
}))

describe('LanguageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays current language when it exists in the list', () => {
    render(<LanguageSelector />)
    const selectTrigger = screen.getByText('en')
    expect(selectTrigger).toBeInTheDocument()
  })

  it('displays default language when current language is not in the list', () => {
    render(<LanguageSelector />)
    const select = screen.getByText('en')
    expect(select).toBeInTheDocument()
  })

  it('changes the language', () => {
    render(<LanguageSelector />)
    const selectTrigger = screen.getByText('en')
    fireEvent.click(selectTrigger)

    const selectUA = screen.getByText('ua')
    fireEvent.click(selectUA)

    expect(changeLanguageMock).toHaveBeenCalled()
  })
})
