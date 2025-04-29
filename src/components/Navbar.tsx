import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { LanguageSelector } from './LanguageSelector'
import Logo from './ui/Logo'

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const displayMenuTitles = location.pathname !== '/model'

  const menuTitles = [
    t('navbar.menuTitles.home'),
    t('navbar.menuTitles.programFeatures'),
    t('navbar.menuTitles.team'),
    t('navbar.menuTitles.portfolio'),
    t('navbar.menuTitles.faq'),
    t('navbar.menuTitles.contacts')
  ]

  const menuItems = menuTitles.map((item) => (
    <Link key={item} to={'#'} className="cursor-pointer select-none hover:underline">
      {item}
    </Link>
  ))

  return (
    <div className="font-geologica relative z-10 mx-auto hidden w-full max-w-7xl flex-shrink-0 items-center justify-between pt-8 md:flex">
      <Link to={'/'} className="flex cursor-pointer flex-col items-center justify-center pl-3 text-app-blue">
        <Logo />
        <p className="uppercase">tetrahedron</p>
      </Link>
      {displayMenuTitles && <div className="flex items-center justify-center gap-7">{menuItems}</div>}
      <LanguageSelector />
    </div>
  )
}

export default Navbar
