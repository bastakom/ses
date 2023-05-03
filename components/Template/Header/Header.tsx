import Logo from 'assets/svg/logo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import sweden from '@/assets/images/swedenx.png'
import english from '@/assets/images/englishx.png'

import styles from './header.module.scss'
import { useEffect, useState } from 'react'

const Header = ({ options, newMenu }) => {
  const [navbar, setNavbar] = useState(false)
  const { locale: activeLocale, locales, asPath, locale } = useRouter()
  const availableLocales = locales.filter((locale) => locale !== activeLocale)
  const router = useRouter()

  const menuToMap =
    locale === 'en' ? newMenu.menu__english_ : newMenu.menu_items

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  document.addEventListener('wheel', function (event) {
    const header = document.getElementById('header')
    if (event.deltaY > 0) {
      header.style.top = '-100px'
    } else {
      header.style.top = '0px'
    }
  })

  useEffect(() => {
    changeBackground()
    window.addEventListener('scroll', changeBackground)
  })

  return (
    <div style={{ background: 'white' }} className={`py-10`}>
      <div
        className={`${styles.navigation} ${navbar ? 'nav activated' : 'nav'}`}
        style={{ transition: 'top 0.2s' }}
        id="header"
      >
        <div
          className={`items-center justify-between flex w-full pr-5 pl-5 ${styles.navigator}`}
        >
          <Link href="/">
            <div
              className={`p-1 flex justify-center items-center ${styles.logo__type}`}
            >
              <Logo height="45" />
              <h3 className="ml-2">{options.site__title || ''}</h3>
            </div>
          </Link>
          <div className={`flex z-50 items-center`}>
            {menuToMap?.map((items, index) => {
              const {
                menu_item: {
                  url: { url, target },
                  label
                }
              } = items

              const isActive =
                router.asPath.replace(/\/$/, '') === url.replace(/\/$/, '')

              return (
                <div key={index}>
                  <Link href={url || `/`} target={target} className={`flex`}>
                    <span
                      className={`px-2 align-middle items-center flex ${
                        styles.href
                      } ${isActive ? styles.active : ''}`}
                    >
                      {label}
                    </span>
                  </Link>
                </div>
              )
            })}
            <div
              className={`${styles.image__lang} flex items-center justify-center`}
            >
              {availableLocales.map((locale, index) => {
                return (
                  <Link
                    key={index}
                    href={asPath}
                    locale={locale}
                    className={styles.lang}
                  >
                    <div className={`flex `}>
                      {locale === 'en' ? (
                        <div>
                          <Image
                            src={sweden}
                            width="35"
                            height="35"
                            alt="sweden"
                          />
                        </div>
                      ) : (
                        <div>
                          <Image
                            src={english}
                            width="35"
                            height="35"
                            alt="english"
                          />
                        </div>
                      )}
                      {locale === 'en' ? 'SV' : 'EN'}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
