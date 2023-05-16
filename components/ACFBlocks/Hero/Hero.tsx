import Image from 'next/image'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './hero.module.scss'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

const Hero = ({
  image,
  content,
  title,
  subtitle,
  video,
  height,
  justify,
  noContent,
  imageVideo,
  padding,
  firstBtn,
  secBtn,
  headTitle,
  firstBtn_engelska,
  secondBtn_engelska,
  locale
}) => {
  const textAlign =
    justify === 'start'
      ? 'left'
      : justify === 'end'
      ? 'right'
      : 'center'
      ? 'center'
      : null

  const matches = useMediaQuery('(min-width: 375px)')

  return (
    <div
      className={`${styles.cover} justify-${justify}`}
      id={imageVideo === '1' && 'video'}
      style={{
        paddingLeft: `${padding.p_left}px`,
        paddingRight: `${padding.p_right}px`,
        paddingTop: `${padding.p_top}px`
      }}
    >
      {imageVideo === '0' ? (
        <div
          className={styles.hero__container}
          style={{
            height: `${!matches ? '100' : height}vh`,
            width: '100%',
            position: 'relative'
          }}
        >
          <Image
            src={image}
            fill
            alt=""
            loading="eager"
            priority={true}
            quality={100}
          />
          <div className={styles.__overlay} />
        </div>
      ) : (
        <div className="container mx-auto">
          <video controls muted className="w-full">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      {noContent ? (
        <div
          className={`absolute z-10 ${styles.image__info} text-${textAlign}`}
        >
          <h3>{headTitle}</h3>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          {content ? (
            <p
              dangerouslySetInnerHTML={{
                __html: ToAbsoluteUrl(content)
              }}
              className={styles.content}
            />
          ) : null}
          <div className={styles.buttons}>
            {firstBtn ? (
              <Link href={`${firstBtn.url}`}>
                {locale === 'sv'
                  ? firstBtn.title
                  : firstBtn_engelska || firstBtn.title}
              </Link>
            ) : null}
            {secBtn ? (
              <Link href={`${secBtn.url}`}>
                {locale === 'sv'
                  ? secBtn.title
                  : secondBtn_engelska || secBtn.title}
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Hero
