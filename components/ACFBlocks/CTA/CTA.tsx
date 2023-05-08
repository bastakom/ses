import Link from 'next/link'
import styles from './cta.module.scss'
import Image from 'next/image'

const CTA = ({ repeater, title, subtitle, bg, center }) => {
  return (
    <div
      className={`h-screen flex flex-col justify-center bg-cover ${
        bg ? 'items-center' : `${styles.mixins}`
      } ${bg ? styles.with__background : styles.without__background}`}
      // style={{ backgroundImage: `url(${bg})` }}
    >
      {bg && (
        <div className={`${styles.imageContainer}`}>
          <Image src={bg} fill alt="" />
        </div>
      )}
      <div
        className={`z-10 ${bg ? 'max-w-7xl' : 'md:ml-10'} ${styles.content} ${
          center === '1' ? `${styles.content__center}` : null
        }`}
      >
        {subtitle && <h3>{subtitle}</h3>}
        {title && <h2>{title}</h2>}
        <div className={`flex gap-32 ${styles.repeater}`}>
          {repeater ? (
            <>
              {repeater.map((item, index) => {
                return (
                  <div className="mt-10 z-10" key={index}>
                    <h4>{item.title}</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.content
                      }}
                    />
                    {item.button && (
                      <div className={`mt-5 ${styles.url__link}`}>
                        <Link href={item.button.url}>{item.button.title}</Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CTA
