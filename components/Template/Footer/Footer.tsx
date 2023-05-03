import Link from 'next/link'
import Socials from './Socials'
import styles from './footer.module.scss'
import Logo from 'assets/svg/logo'
import { useRouter } from 'next/router'

const Footer = ({ options }) => {
  const {
    contact_info: {
      president: {
        email: presidentEmail,
        name: presidentName,
        phone: presidentPhone
      },
      technical_information: { email, name, phone }
    }
  } = options

  const { locale } = useRouter()

  return (
    <footer className={`${styles.footer} pt-7`}>
      <div className={` w-full flex flex-col justify-around`}>
        <div className="flex justify-around text-white gap-10 w-full p-10 flex-col items-center">
          <div className={styles.header__line}>
            <div className={styles.line} />
            <h3 className="text-black md:pl-3 md:pr-3">
              SAFETY IS OUR CAPABILITY.
            </h3>
            <div className={styles.line} />
          </div>
          <Logo width="55" height="55" />
          <h2 className="">{options?.site__title || null}</h2>
          {locale === 'sv' ? (
            <div className={`${styles.navigator}`}>
              {options?.menu.menu.map((item, index) => {
                const {
                  menu_item: { title, url, target }
                } = item

                return (
                  <Link href={url} target={target} key={index}>
                    {title}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className={`${styles.navigator}`}>
              {options?.menu.menu_english.map((item, index) => {
                const {
                  menu_item: { title, url, target }
                } = item

                return (
                  <Link href={url} target={target} key={index}>
                    {title}
                  </Link>
                )
              })}
            </div>
          )}
          {options.contact_info.Socials.linkedin && (
            <div className={`${styles.socials} flex gap-2`}>
              <p>Följ oss</p>
              <Socials socials={options.contact_info} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-5 md:gap-20 md:h-32">
          <div
            className={`${styles.footer__info} flex justify-center flex-col items-center`}
          >
            <h2 className="pb-2">TECHNICAL INFORMATION</h2>
            <div className={`${styles.contanct__info} flex gap-2`}>
              <h3>{email}</h3>
              <h3>{name}</h3>
              <h3>{phone}</h3>
            </div>
          </div>
          <div
            className={`${styles.footer__info} flex justify-center flex-col items-center `}
          >
            <h2 className="pb-2">PRESIDENT</h2>
            <div className={`${styles.contanct__info} flex gap-2`}>
              <h3>{presidentEmail}</h3>
              <h3>{presidentName}</h3>
              <h3>{presidentPhone}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex md:justify-end items-center justify-center`}>
        <p className={`${styles.copywrite__}`}>
          © 2023 SES PROTECTION/SES GROUP
        </p>
      </div>
    </footer>
  )
}

export default Footer
