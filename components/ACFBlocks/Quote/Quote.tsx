import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './quote.module.scss'

const Quote = ({ person, content, content_engelska, locale }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center md:mt-28 md:mb-28">
      <p
        className={styles.quote}
        dangerouslySetInnerHTML={{
          __html: ToAbsoluteUrl(
            locale === 'sv' ? content : content_engelska || content
          )
        }}
      />
      <h3 className={`mt-10 ${styles.quote__person}`}>{person}</h3>
    </div>
  )
}

export default Quote
