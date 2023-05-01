import { FC } from 'react'
import Image from 'next/image'
import styles from './latestitem.module.scss'
import Link from 'next/link'

interface Props {
  data?: any
}

const LatestItem: FC<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((item, index) => {
          const maxLength = 200
          let limitedDescription = item.content.rendered.substring(0, maxLength)
          if (item.content.rendered.length > maxLength) {
            limitedDescription += '...'
          }

          const date = new Date(`${item.date}`)
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          return (
            <div key={index} className={`${styles.container} md:flex p-5 md:p-0 `}>
              <div className="md:w-6/12 gap-5 flex-col flex">
                <div>
                  <div className={`${styles.header}`}>
                    <div className={`flex`}>
                      <p>senaste nytt</p>
                      <p>{formattedDate}</p>
                    </div>
                    <h3>{item.acf.cat}</h3>
                  </div>
                </div>
                <div className={styles.content}>
                  <h2>{item.title.rendered}</h2>
                  <div
                    className={styles.html}
                    dangerouslySetInnerHTML={{ __html: limitedDescription }}
                  />
                  <Link href={`/nyheter/${item.slug}`}>Läs mer</Link>
                </div>
              </div>

              <div className={`${styles.image} md:w-6/12 pt-10 md:pt-0`}>
                <Image src={item.acf.picture} width={481} height={431} alt="" />
              </div>
            </div>
          )
        })}
    </>
  )
}

export default LatestItem
