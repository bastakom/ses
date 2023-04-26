import styles from './cta.module.scss'

const CTA = ({ repeater, title, subtitle, bg }) => {
  return (
    <div
      className="h-screen flex flex-col justify-center bg-cover items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`max-w-7xl ${styles.content}`}>
        <h3>{subtitle}</h3>
        <h2>{title}</h2>
        <div className={`flex gap-32 ${styles.repeater}`}>
          {repeater.map((item, index) => {
            return (
              <div className="mt-10 " key={index}>
                <h4>{item.title}</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CTA
