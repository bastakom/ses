import Image from 'next/image'
import Link from 'next/link'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './image.module.scss'

const ImageACF = ({
  sourceUrl,
  alt,
  content,
  title,
  rowReverse,
  button
}) => {
  const arr = rowReverse ? 'flex-row-reverse' : 'flex-row'
  return (
    <>
      <div
        className={`${styles.__image__content} md:flex items-center gap-5 mt-10 mb-10 ${rowReverse}`}
      >
        <div className={`md:w-1/2 ${styles.__image__}`}>
          <Image
            src={sourceUrl}
            width={700}
            height={500}
            alt={alt || 'image'}
          />
        </div>
        <div className={`${styles.__content} md:w-1/2`}>
          <h2>{title}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: ToAbsoluteUrl(content)
            }}
            className={styles.content}
          />
          {button && (
            <div className={`mt-10 button`}>
              <Link href={button.url}>{button.title}</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ImageACF
