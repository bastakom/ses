import Link from 'next/link'
import Socials from './Socials'
import styles from './footer.module.scss'
import Logo from 'assets/svg/logo'

const Footer = ({ options }) => {
  return (
    <footer className={`${styles.footer} pt-7`}>
      <div className={` w-full flex flex-col justify-around`}>
        <div className="flex justify-around text-white gap-10 w-full p-10 flex-col items-center">
          <div className={styles.header__line}>
            <div className={styles.line} />
            <h3 className="text-black pl-3 pr-3">
              SAFETY IS OUR CAPABILITY.
            </h3>
            <div className={styles.line} />
          </div>
          <Logo width="55" height="55" />
          <h2 className="">{options.site__title}</h2>
          <div className={`${styles.navigator}`}>
            {options.menu.map((item, index) => {
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
          <div className={`${styles.socials} flex gap-2`}>
            <p>Följ oss</p>
            <Socials socials={options.contact_info} />
          </div>
        </div>
      </div>

      <div className={`flex justify-end items-center`}>
        <p className={`${styles.copywrite__}`}>
          © 2023 SES PROTECTION/SES GROUP
        </p>
      </div>
    </footer>
  )
}

export default Footer
