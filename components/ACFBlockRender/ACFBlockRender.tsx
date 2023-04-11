import { Accordion } from '../ACFBlocks/Accordion/Accordion'
import Hero from '../ACFBlocks/Hero/Hero'
import ImageACF from '../ACFBlocks/ImageACF/ImageACF'
import Column from '../Column/Column'
import Layout from '../Template/Layout/Layout'

const ACFBlockRender = ({ Builder, Columns }) => {
  const grouped = [...Builder, ...Columns]

  return (
    <div>
      {grouped.map((build, index) => {
        switch (build.__typename) {
          case 'Template_Flexible_Builder_ContentBuilder_Hero': {
            const {
              id,
              image,
              title,
              subtitle,
              presentationInfo,
              settings,
              video
            } = build
            return (
              <Hero
                height={settings.coverHeight}
                key={id}
                noContent={settings.contentNoContent}
                imageVideo={settings.imageVideo}
                image={image?.sourceUrl}
                video={video?.mediaItemUrl}
                title={title}
                content={presentationInfo}
                subtitle={subtitle}
                justify={settings.justifyContent}
              />
            )
          }

          case 'Template_Flexible_Builder_ContentBuilder_ImageText': {
            const {
              id,
              image,
              text,
              settingsImageText,
              altText,
              context: { title, button }
            } = build

            return (
              <Layout key={id}>
                <ImageACF
                  sourceUrl={image?.sourceUrl}
                  alt={altText}
                  content={text}
                  title={title}
                  rowReverse={settingsImageText}
                  button={button}
                />
              </Layout>
            )
          }
          case 'Template_Flexible_Builder_ContentBuilder_Accordion': {
            const { id, tables } = build

            return (
              <Layout key={id}>
                <Accordion tables={tables} />
              </Layout>
            )
          }

          case 'Template_Flexible_Builder_ContentBuilder_ColumnBlock': {
            return (
              <Layout key={index}>
                <Column columns={build} />
              </Layout>
            )
          }

          default: {
            return null
          }
        }
      })}
    </div>
  )
}

export default ACFBlockRender
