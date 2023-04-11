import Image from 'next/image'
import styles from './mediatext.module.scss'

const MediaText = ({ mediaUrl, mediaWidth, mediaPosition, children }) => {
  return (
    <div
      className={`flex justify-between w-full  gap-20 items-center ${
        mediaPosition === 'right'
          ? 'flex-col md:flex-row '
          : 'flex-col md:flex-row-reverse '
      }`}
    >
      <div className="md:w-1/2 md:p-0 p-5 ">{children}</div>
      <div className={`${styles.image__container} p-2 md:w-1/2 md:p-0 `}>
        <Image fill src={mediaUrl} alt="" className={styles.image} />
      </div>
    </div>
  )
}

export default MediaText
