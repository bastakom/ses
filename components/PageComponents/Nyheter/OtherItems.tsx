import Link from 'next/link'
import styles from './otheritems.module.scss'

const OtherItems = ({ data, index }) => {
  const date = new Date(`${data.date}`)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const isOdd = index % 2 === 0 ? false : true

  const {
    title: { rendered },
    slug,
    acf: { cat }
  } = data

  return (
    <div className={`${styles.content} flex flex-col`}>
      <div
        className={`${isOdd ? styles.odd : styles.even} ${
          styles.border_bottom
        }`}
      >
        <div className={`${styles.date}`}>
          <span>{cat}</span>
          <span>{formattedDate}</span>
        </div>

        <h2>{rendered}</h2>
        <Link key={index} href={`nyheter/${slug}`}>
          Läs mer
        </Link>
      </div>
    </div>
  )
}

export default OtherItems
