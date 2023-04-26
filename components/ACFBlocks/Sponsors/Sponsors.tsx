import Image from 'next/image'
import styles from './sponsors.module.scss'

const Sponsors = ({ title, galleri }) => {
  return (
    <div
      className={`justify-center items-center h-96 flex flex-col gap-20 ${styles.sponsor__}`}
    >
      <h2 className={`uppercase ${styles.title}`}>{title}</h2>
      <div className="flex gap-20">
        {galleri.map((item, index) => {
          return (
            <Image
              src={item}
              width={119}
              quality={100}
              height={100}
              alt={''}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Sponsors
