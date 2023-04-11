import Image from 'next/image'
import styles from './items.module.scss'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'

export const Items = ({ data, choiceofColumn }) => {
  const choice =
    choiceofColumn === '1'
      ? 'columnfull'
      : choiceofColumn === '2'
      ? 'columnhalf'
      : choiceofColumn === '3'
      ? 'columnthird'
      : null

  return (
    <>
      {data?.map((el, index) => {
        return (
          <div
            key={index}
            className={`${styles.column_choice} ${choice} flex flex-col`}
          >
            {el.itemColumn.map((item, index) => {
              switch (item.__typename) {
                case `Template_Flexible_Builder_ContentBuilder_ColumnBlock_${choice}_ItemColumn_Title`: {
                  return <h1 key={index}>{item.title}</h1>
                }
                case `Template_Flexible_Builder_ContentBuilder_ColumnBlock_${choice}_ItemColumn_Text`: {
                  return (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: ToAbsoluteUrl(item.text)
                      }}
                    />
                  )
                }
                case `Template_Flexible_Builder_ContentBuilder_ColumnBlock_${choice}_ItemColumn_Image`: {
                  return (
                    <Image
                      key={index}
                      src={item.image.sourceUrl}
                      alt={item.alt}
                      fill
                    />
                  )
                }

                default: {
                  return 'There is no column block'
                }
              }
            })}
          </div>
        )
      })}
    </>
  )
}
