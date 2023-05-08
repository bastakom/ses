import Logo from 'assets/svg/logo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Drawer } from '@mantine/core'
import styles from './header.module.scss'
import english from '@/assets/images/englishx.png'
import sweden from '@/assets/images/swedenx.png'
import { useState } from 'react'

const DrawerHeader = ({ options, newMenu }) => {
  const { locale: activeLocale, locales, asPath, locale } = useRouter()
  const availableLocales = locales.filter((locale) => locale !== activeLocale)

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const menuToMap =
    locale === 'en' ? newMenu.menu__english_ : newMenu.menu_items

  return (
    <>
      <Drawer
        withCloseButton={false}
        onClose={handleClick}
        opened={isOpen}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="right"
      >
        <div className={`${styles.navigation} pt-6`}>
          <div
            className={`items-center justify-between flex w-full pr-5 pl-5 ${styles.navigator}`}
          >
            <Link href="/" onClick={handleClick}>
              <div
                className={`p-1 flex justify-center items-center ${styles.logo__type}`}
              >
                <Logo height="45" />
                <h3 className="ml-2">{options.site__title || ''}</h3>
              </div>
            </Link>
            <div className={`flex z-50 items-center ${styles.items}`}>
              {menuToMap?.map((items, index) => {
                const {
                  menu_item: {
                    url: { url, target },
                    icon,
                    label
                  }
                } = items

                return (
                  <div key={index}>
                    <Link
                      href={url || `/`}
                      target={target}
                      className={`flex ${styles.header__url}`}
                      onClick={handleClick}
                    >
                      <span
                        className={`px-2 align-middle items-center flex ${styles.href}`}
                      >
                        {label}
                        {icon === '1' ? (
                          <span className="text-2xl"></span>
                        ) : null}
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
                      onClick={handleClick}
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
      </Drawer>

      <div className={styles.mobile__container}>
        <Link href="/">
          <div
            className={`p-1 flex justify-center items-center ${styles.logo__type}`}
          >
            <Logo height="45" />
            <h3 className="ml-2">{options.site__title || ''}</h3>
          </div>
        </Link>

        <Button
          name="menu"
          variant="link"
          onClick={handleClick}
          className={styles.menu_icon}
        >
          <>
            <div
              className={`${styles.line} ${
                isOpen ? `${styles.line_rotate_1}` : ''
              }`}
            />
            <div
              className={`${styles.line} ${
                isOpen ? `${styles.line_scale}` : ''
              }`}
            />
            <div
              className={`${styles.line} ${
                isOpen ? `${styles.line_rotate_2}` : ''
              }`}
            />
            <div
              className={`${styles.line} ${
                !isOpen ? `${styles.line_top}` : `${styles.none}`
              }`}
            />
            <div
              className={`${styles.line} ${
                !isOpen ? `${styles.line_bottom}` : `${styles.none}`
              }`}
            />
          </>
        </Button>
      </div>
    </>
  )
}

export default DrawerHeader
