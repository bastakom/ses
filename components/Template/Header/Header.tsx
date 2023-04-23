import Logo from 'assets/svg/logo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { mainMenu } from 'theme'
import { motion } from 'framer-motion'

const Header = ({ ThemeSettings, newMenu }) => {
  const {
    locale: activeLocale,
    locales,
    asPath,
    locale
  } = useRouter()
  const router = useRouter()
  const availableLocales = locales.filter(
    (locale) => locale !== activeLocale
  )

  const menuToMap =
    locale === 'en' ? newMenu.menu__english_ : newMenu.menu_items

  return (
    <div className="items-center justify-between flex w-full pr-10 pl-10">
      <Link href="/">
        {ThemeSettings?.logotype ? (
          <div>
            <Image
              src={ThemeSettings.logotype?.sourceUrl}
              height="120"
              width="80"
              alt=""
            />
          </div>
        ) : (
          <div>
            <Logo />
          </div>
        )}
      </Link>
      <div className="flex z-50 items-center">
        {menuToMap?.map((items, index) => {
          const {
            menu_item: {
              url: { url, target },
              label
            }
          } = items

          return (
            <div key={index}>
              <Link
                href={url}
                style={{ color: mainMenu.textColor }}
                target={target}
              >
                <span className="px-2">{label}</span>
              </Link>
            </div>
          )
        })}
      </div>
      <div>
        <ul>
          {availableLocales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={asPath} locale={locale}>
                  {locale}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header
