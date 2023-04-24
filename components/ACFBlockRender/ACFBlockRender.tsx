import { Accordion } from '../ACFBlocks/Accordion/Accordion'
import Hero from '../ACFBlocks/Hero/Hero'
import ImageACF from '../ACFBlocks/ImageACF/ImageACF'
import Column from '../Column/Column'
import Layout from '../Template/Layout/Layout'

const ACFBlockRender = ({ flexibleContent }) => {
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
                video,
                padding
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
                    padding={padding}
                  />
                </>
              )
            }

            case 'image__text': {
              const {
                id,
                image,
                text,
                settings__image_text,
                altText,
                context: { title, button }
              } = data

              return (
                <Layout key={id}>
                  <ImageACF
                    sourceUrl={image}
                    alt={altText}
                    content={text}
                    title={title}
                    rowReverse={settings__image_text}
                    button={button}
                  />
                </Layout>
              )
            }

            case 'accordion': {
              const { id, tables } = data
              return (
                <Layout key={id}>
                  <Accordion tables={tables} IconColor="#3a3a3a" />
                </Layout>
              )
            }

            case 'column_block': {
              return (
                <Layout key={index}>
                  <Column columns={data} />
                </Layout>
              )
            }

            default: {
              return null
            }
          }
        })
      })}
    </div>
  )
}

export default ACFBlockRender
