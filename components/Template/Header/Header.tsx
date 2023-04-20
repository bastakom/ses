import Logo from 'assets/svg/logo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { mainMenu } from 'theme'
import { motion } from 'framer-motion'

const Header = ({ data, ThemeSettings }) => {
  const { locale: activeLocale, locales, asPath } = useRouter()
  const availableLocales = locales.filter(
    (locale) => locale !== activeLocale
  )
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
        {data?.map((items, index) => {
          const ifUrl = items.page ? `${items.page}` : `${items.url}`
          typeof ifUrl !== 'undefined' && null
          return (
            <motion.div
              key={index}
              initial={{ transform: 'translateY(-100px)' }}
              animate={{ transform: 'translateY(0)' }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Link
                href={`${ifUrl}`}
                style={{ color: mainMenu.textColor }}
              >
                <span className="px-2">{items.label}</span>
              </Link>
            </motion.div>
          )
        })}
      </div>
      <div>
        this is language
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
