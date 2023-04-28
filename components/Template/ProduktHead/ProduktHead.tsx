import { FC } from 'react'
import styles from './produkthead.module.scss'

interface Props {
  title: string
  content?: string
}

const ProduktHead: FC<Props> = ({ title, content }) => {
  return (
    <div className={`${styles.container} flex flex-col items-center gap-10`}>
      <div className={`${styles.title}`}>
        <h3>{title}</h3>
      </div>
      <p
        className="max-w-4xl text-center"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default ProduktHead
