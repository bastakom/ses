import Image from 'next/image'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './hero.module.scss'

const Hero = ({
  image,
  content,
  title,
  subtitle,
  video,
  height,
  justify,
  noContent,
  imageVideo
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
    <div className={`${styles.cover} justify-${justify}`}>
      {!imageVideo ? (
        <div
          style={{
            height: `${height}vh`,
            width: '100vw',
            position: 'relative'
          }}
        >
          <Image src={image} fill alt="" quality="100" />
          <div className={styles.__overlay} />
        </div>
      ) : (
        <div className="container mx-auto ">
          <video controls muted className="w-full">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      {noContent ? (
        <div
          className={`absolute z-10 ${styles.image__info} text-${textAlign}`}
        >
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
        </div>
      ) : null}
    </div>
  )
}

export default Hero
