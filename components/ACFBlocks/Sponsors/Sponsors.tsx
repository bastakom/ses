import Image from 'next/image'
import styles from './sponsors.module.scss'

const Sponsors = ({ title, galleri }) => {
  return (
    <div
      className={`justify-center items-center md:h-96 flex flex-col gap-20 ${styles.sponsor__}`}
    >
      <h2 className={`uppercase ${styles.title}`}>{title}</h2>
      <div className={`flex gap-20 ${styles.content}`}>
        {galleri.map((item, index) => {
          return (
            <Image
              src={item}
              width={118}
              quality={79}
              height={100}
              alt={''}
              key={index}
              priority={true}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sponsors
