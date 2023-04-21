import { Accordion } from '../ACFBlocks/Accordion/Accordion'
import Hero from '../ACFBlocks/Hero/Hero'
import ImageACF from '../ACFBlocks/ImageACF/ImageACF'
import Column from '../Column/Column'
import Layout from '../Template/Layout/Layout'

const ACFBlockRender = ({ Builder, Columns, flexibleContent }) => {
  const grouped = [...Builder, ...Columns, ...flexibleContent]

  return (
    <div>
      {flexibleContent.map((flexible) => {
        return flexible.acf.content_builder.map((data, index) => {
          switch (data.acf_fc_layout) {
            case 'hero': {
              const {
                id,
                image,
                title,
                sub_title,
                presentation_info,
                settings,
                video
              } = data
              return (
                <>
                  <Hero
                    height={settings.cover_height}
                    key={id}
                    noContent={settings.content__no_content}
                    imageVideo={settings.image__video}
                    image={image}
                    video={video}
                    title={title}
                    content={presentation_info}
                    subtitle={sub_title}
                    justify={settings.justify_content_}
                  />
                </>
              )
            }

            default: {
              return <div>NULL</div>
            }
          }
        })
      })}
      {grouped.map((build, index) => {
        switch (build.__typename) {
          // case 'Template_Flexible_Builder_ContentBuilder_Hero': {
          //   const {
          //     id,
          //     image,
          //     title,
          //     subtitle,
          //     presentationInfo,
          //     settings,
          //     video
          //   } = build
          //   return (
          //     <Hero
          //       height={settings.coverHeight}
          //       key={id}
          //       noContent={settings.contentNoContent}
          //       imageVideo={settings.imageVideo}
          //       image={image?.sourceUrl}
          //       video={video?.mediaItemUrl}
          //       title={title}
          //       content={presentationInfo}
          //       subtitle={subtitle}
          //       justify={settings.justifyContent}
          //     />
          //   )
          // }

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
                <Accordion tables={tables} IconColor="#3a3a3a" />
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
