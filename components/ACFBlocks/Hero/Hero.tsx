import Image from 'next/image'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './hero.module.scss'
import Link from 'next/link'

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
  headTitle
}) => {
  const textAlign =
    justify === 'start'
      ? 'left'
      : justify === 'end'
      ? 'right'
      : 'center'
      ? 'center'
      : null

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
            height: `${height}vh`,
            width: '100%',
            position: 'relative'
          }}
        >
          <Image src={image} fill alt="" quality="100" />
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
              <Link href={`${firstBtn.url}`}>{firstBtn.title}</Link>
            ) : null}
            {secBtn ? <Link href={`${secBtn.url}`}>{secBtn.title}</Link> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Hero
