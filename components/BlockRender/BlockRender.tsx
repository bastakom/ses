import { Heading } from '@/Blocks/Heading/Heading'
import { Cover } from '@/Blocks/Cover/Cover'
import { Paragraph } from '@/Blocks/Paragraph/Paragraph'
import { theme } from 'theme'
import { ImageBlock } from '../Blocks/Image/Image'
import { Video } from '../Blocks/Video/Video'
import { Columns } from '../Blocks/Columns'
import { Column } from '../Blocks/Column/Column'
import MediaText from '../Blocks/MediaText/MediaText'
import Layout from '../Template/Layout/Layout'

export const BlockRender = ({ blocks }) => {
  return blocks.map((block) => {
    const {
      attributes: { content, level, textAlign, textColor, align }
    } = block

    switch (block.name) {
      case 'core/heading': {
        return (
          <Layout key={block.id}>
            <Heading textAlign={textAlign} content={content} level={level} />
          </Layout>
        )
      }

      case 'core/video': {
        return (
          <Layout key={block.id}>
            <Video
              src={block.attributes.src}
              autoplay={block.attributes.autoplay}
              controls={block.attributes.controls}
              loop={block.attributes.loop}
            />
          </Layout>
        )
      }

      case 'core/image': {
        return (
          <Layout key={block.id}>
            <ImageBlock
              url={block.attributes.url}
              height={block.attributes.height}
              width={block.attributes.width}
              alt={block.attributes.alt || ''}
            />
          </Layout>
        )
      }

      case 'core/paragraph': {
        return (
          <Layout key={block.id}>
            <Paragraph
              textAlign={align}
              content={content}
              textColor={
                theme[textColor] || block.attributes.style?.text?.color
              }
            />
          </Layout>
        )
      }
      case 'core/cover': {
        return (
          <Cover
            key={block.id}
            background={block.attributes.url}
            backgroundType={block.attributes.backgroundType}
            frame={block.attributes.style?.spacing?.padding.bottom}
          >
            <BlockRender blocks={block.innerBlocks} />
          </Cover>
        )
      }

      case 'core/columns': {
        return (
          <Layout key={block.id}>
            <Columns
              isStackedOnMobile={block.attributes.isStackedOnMobile}
              verticalAlignment={block.attributes.verticalAlignment}
            >
              <BlockRender blocks={block.innerBlocks} />
            </Columns>
          </Layout>
        )
      }
      case 'core/column': {
        return (
          <Layout key={block.id}>
            <Column
              width={block.attributes.width}
              verticalAlignment={block.attributes.verticalAlignment}
            >
              <BlockRender blocks={block.innerBlocks} />
            </Column>
          </Layout>
        )
      }

      case 'core/media-text': {
        return (
          <Layout key={block.id}>
            <MediaText
              mediaUrl={block.attributes.mediaUrl}
              mediaWidth={block.attributes.mediaWidth || null}
              mediaPosition={block.attributes.mediaPosition || null}
            >
              <BlockRender blocks={block.innerBlocks} />
            </MediaText>
          </Layout>
        )
      }

      default: {
        return null
      }
    }
  })
}
