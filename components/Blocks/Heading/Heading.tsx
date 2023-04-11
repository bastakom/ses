import { createElement } from 'react'
import { getTextAlign } from 'utils/fonts'

export const Heading = ({ textAlign, level, content }) => {
  const tag = createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading my-5 relative z-20 md:text-6xl text-4xl
    )} ${getTextAlign(textAlign)}`,
  })

  return tag
}
