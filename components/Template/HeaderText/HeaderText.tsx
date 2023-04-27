import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './headertext.module.scss'
const HeaderText = ({ title, content }) => {
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

export default HeaderText
