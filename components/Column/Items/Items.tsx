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
            {el.item_column.map((item, index) => {
              switch (item.acf_fc_layout) {
                case `Title`: {
                  return <h1 key={index}>{item.title}</h1>
                }
                case `text`: {
                  return (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: ToAbsoluteUrl(item.text)
                      }}
                    />
                  )
                }
                case `image`: {
                  return (
                    <Image
                      key={index}
                      src={item.image}
                      alt={item.alt}
                      fill
                    />
                  )
                }

                case `accordion`: {
                  const { tables } = item
                  return (
                    <Accordion tables={tables} IconColor="#3a3a3a" />
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
