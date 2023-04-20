import Image from 'next/image'
import styles from './items.module.scss'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import { Accordion } from '@/components/ACFBlocks/Accordion/Accordion'

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

                case `Template_Flexible_Builder_ContentBuilder_ColumnBlock_${choice}_ItemColumn_Accordion`: {
                  const { tables } = item
                  return <Accordion tables={tables} IconColor='#3a3a3a'/>
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
