import Image from 'next/image'
import Link from 'next/link'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './image.module.scss'
import LoadingSkeleton from '@/components/Template/LoadingSkeleton/LoadingSkeleton'

const ImageACF = ({
  sourceUrl,
  alt,
  content,
  title,
  rowReverse,
  button,
  subtitle,
  p_size,
  locale,
  english_text,
  button_eng
}) => {
  return (
    <>
      <div
        className={`${styles.__image__content}  md:flex items-center gap-10 md:pt-10 md:pb-10`}
        style={{
          flexDirection: rowReverse === '1' ? 'row-reverse' : 'row'
        }}
      >
        <div className={`md:w-1/2 ${styles.__image__}`}>
          <LoadingSkeleton>
            <Image
              src={sourceUrl}
              width={800}
              height={500}
              alt={alt || 'image'}
              priority={true}
            />
          </LoadingSkeleton>
        </div>
        <div className={`${styles.__content} md:w-1/2 pr-10 pl-10`}>
          <div className={styles.title__overhead}>
            {subtitle ? (
              <div className="flex">
                {subtitle.map((item, index) => {
                  return (
                    <h3 key={index} className={`${styles.sub__title}`}>
                      {item.title}
                    </h3>
                  )
                })}
              </div>
            ) : null}
            <div className={styles.title__}>
              <h3>{title}</h3>
            </div>
          </div>
          <div
            style={{ fontSize: `${p_size}px` }}
            dangerouslySetInnerHTML={{
              __html: ToAbsoluteUrl(
                locale === 'en' ? english_text || content : content
              )
            }}
            className={styles.content}
          />
          {button || button_eng ? (
            <div className={`mt-10 button`}>
              <Link href={button.url}>
                {locale === 'sv' ? button.title : button_eng || button.title}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ImageACF
