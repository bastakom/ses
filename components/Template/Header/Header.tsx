import Logo from 'assets/svg/logo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import sweden from '@/assets/images/swedenx.png'
import english from '@/assets/images/englishx.png'

import styles from './header.module.scss'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

const Header = ({ options, newMenu }) => {
  const { locale: activeLocale, locales, asPath, locale } = useRouter()
  const availableLocales = locales.filter((locale) => locale !== activeLocale)
  const matches = useMediaQuery('(min-width: 56.25em)')
  const router = useRouter()

  const menuToMap =
    locale === 'en' ? newMenu.menu__english_ : newMenu.menu_items

  function handleWheelEvent(event) {
    const header = document.getElementById('header')
    if (header && event.deltaY > 10 && matches) {
      header.style.top = '-100px'
    } else if (header && event.deltaY < 0 && matches) {
      header.style.top = '0px'
    }
  }

  if (!matches) {
    window.removeEventListener('wheel', handleWheelEvent)
  } else {
    window.addEventListener('wheel', handleWheelEvent)
  }

  // To remove the event listener

  return (
    <div style={{ background: 'white' }} className={`py-10`}>
      <div
        className={`${styles.navigation} nav`}
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
                    scroll={false}
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
