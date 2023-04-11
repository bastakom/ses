import { getTextAlign } from 'utils/fonts'
import { ToAbsoluteUrl } from 'utils/ToAbsoluteUrl'

export const Paragraph = ({ textAlign = 'left', content }) => {
  const justify =
    textAlign === 'right'
      ? 'justify-end'
      : textAlign === 'left'
      ? 'justify-start'
      : textAlign === 'center'
      ? 'justify-center'
      : ''
  return (
    <div className={`${justify} w-full flex`}>
      <p
        className={`max-w-3xl ${getTextAlign(textAlign)}`}
        dangerouslySetInnerHTML={{
          __html: ToAbsoluteUrl(content)
        }}
      />
    </div>
  )
}
