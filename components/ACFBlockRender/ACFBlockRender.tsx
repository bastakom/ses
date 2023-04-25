import { Accordion } from '../ACFBlocks/Accordion/Accordion'
import CTA from '../ACFBlocks/CTA/CTA'
import Hero from '../ACFBlocks/Hero/Hero'
import ImageACF from '../ACFBlocks/ImageACF/ImageACF'
import Quote from '../ACFBlocks/Quote/Quote'
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
                full_width,
                altText,
                context: { button, bg },
                sub_title,
                title
              } = data

              return (
                <div
                  className="w-full pt-10 pb-10"
                  style={{ background: `${bg}` }}
                >
                  <Layout key={id} full={full_width}>
                    <ImageACF
                      sourceUrl={image}
                      alt={altText}
                      content={text}
                      title={title}
                      subtitle={sub_title}
                      rowReverse={settings__image_text}
                      button={button}
                    />
                  </Layout>
                </div>
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

            case 'quote': {
              const { quote_person, Content, button } = data
              return (
                <Layout key={index}>
                  <Quote
                    person={quote_person}
                    content={Content}
                    button={button}
                  />
                </Layout>
              )
            }

            case 'cta': {
              const {
                sub_title,
                title,
                bg,
                text_with_title__button
              } = data

              return (
                <CTA
                  subtitle={sub_title}
                  title={title}
                  bg={bg}
                  repeater={text_with_title__button}
                />
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
