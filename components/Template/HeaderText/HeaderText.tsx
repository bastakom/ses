import { FC } from 'react'
import styles from './headertext.module.scss'

interface Props {
  title?: string
  content?: string
  height?: string
  align?: string
  width?: string
}

const HeaderText: FC<Props> = ({ title, content, height, align }) => {
  return (
    <div
      className={`${styles.container} flex flex-col ${align} gap-10`}
      style={{ height: `${height}vh` }}
    >
      {title && (
        <div className={`${styles.title}`}>
          <h3>{title}</h3>
        </div>
      )}
      <p
        className={`max-w-3xl text-center ${styles.content}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default HeaderText
