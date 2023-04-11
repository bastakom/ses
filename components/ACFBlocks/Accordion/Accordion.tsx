import React, { useRef, useState } from 'react'
import { BiDownArrowCircle } from 'react-icons/bi'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'
import styles from './accordion.module.scss'

export const Accordion = ({ tables }) => {
  const links = tables.map((table) => {
    return table.titleButton.link.map((link) => {
      return {
        title: link?.button?.title,
        url: link?.button?.url
      }
    })
  })

  return (
    <>
      {tables.map((table, index) => (
        <AccordionItem
          key={index}
          title={
            table.titleButton.title
              ? table.titleButton.title
              : 'title missing'
          }
          content={table.content}
          links={links[index]}
        />
      ))}
    </>
  )
}

const AccordionItem = ({ title, content, links }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease')
  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive((prevState) => !prevState)
    setHeight(
      active ? '0px' : `${contentSpace.current.scrollHeight}px`
    )
    setRotate(
      active
        ? 'transform duration-700 ease'
        : 'transform duration-700 ease rotate-180'
    )
  }

  return (
    <div className={`flex flex-col border-b-2 ${styles.accordion}`}>
      <button
        className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        {title && (
          <p className="inline-block text-footnote light text-2xl">
            {title}
          </p>
        )}
        <div className={`${rotate} inline-block`}>
          <BiDownArrowCircle />
        </div>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className={`${styles.content} overflow-auto transition-max-height duration-700 ease-in-out`}
      >
        {content && (
          <p
            dangerouslySetInnerHTML={{
              __html: ToAbsoluteUrl(content)
            }}
            className="pb-10 text-sm pt-3"
          />
        )}

        {!links &&
          links.map((link, index) => (
            <a key={index} href={link.url} className="button mb-4">
              {link.title}
            </a>
          ))}
      </div>
    </div>
  )
}
