import Link from 'next/link'
import { Accordion } from '../ACFBlocks/Accordion/Accordion'
import CTA from '../ACFBlocks/CTA/CTA'
import Form from '../ACFBlocks/Form/Form'
import Hero from '../ACFBlocks/Hero/Hero'
import ImageACF from '../ACFBlocks/ImageACF/ImageACF'
import Quote from '../ACFBlocks/Quote/Quote'
import Sponsors from '../ACFBlocks/Sponsors/Sponsors'
import Column from '../Column/Column'
import HeaderText from '../Template/HeaderText/HeaderText'
import Layout from '../Template/Layout/Layout'

const ACFBlockRender = ({ flexibleContent, locale }) => {
  return (
    <div>
      {flexibleContent.map((flexible) => {
        return flexible.acf.content_builder.map((data, index) => {
          switch (data.acf_fc_layout) {
            case 'hero': {
              const {
                id,
                head_title,
                image,
                title,
                sub_title,
                presentation_info,
                settings,
                video,
                padding,
                first_button,
                second_button,
                second_button_engelska,
                first_button_engelska
              } = data

              return (
                <>
                  <Hero
                    locale={locale}
                    firstBtn_engelska={first_button_engelska}
                    secondBtn_engelska={second_button_engelska}
                    headTitle={head_title}
                    firstBtn={first_button}
                    secBtn={second_button}
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
                context: { button, bg, button_eng },
                sub_title,
                title,
                p_size,
                english_text
              } = data

              return (
                <div
                  className="w-full pt-10 pb-10"
                  style={{ background: `${bg}` }}
                >
                  <Layout key={id} full={full_width}>
                    <ImageACF
                      english_text={english_text}
                      locale={locale}
                      p_size={p_size}
                      sourceUrl={image}
                      alt={altText}
                      content={text}
                      title={title}
                      subtitle={sub_title}
                      rowReverse={settings__image_text}
                      button={button}
                      button_eng={button_eng}
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
              const { quote_person, Content, content_engelska } = data
              return (
                <Layout key={index}>
                  <Quote
                    locale={locale}
                    person={quote_person}
                    content={Content}
                    content_engelska={content_engelska}
                  />
                </Layout>
              )
            }

            case 'cta': {
              const { sub_title, title, bg, text_with_title__button, center } =
                data
              return (
                <CTA
                  locale={locale}
                  center={center}
                  key={index}
                  subtitle={sub_title}
                  title={title}
                  bg={bg}
                  repeater={text_with_title__button}
                />
              )
            }

            case 'sponsor': {
              const { cooperation_partners, title } = data
              return (
                <Layout key={index}>
                  <Sponsors galleri={cooperation_partners} title={title} />
                </Layout>
              )
            }

            case 'contact_form': {
              const { title, content, content_engelska } = data
              return (
                <div key={index}>
                  <HeaderText
                    title={title}
                    content={
                      locale === 'sv' ? content : content_engelska || content
                    }
                    align="items-center"
                    height="60"
                  />
                  <Form locale={locale} bg={data.bg} />
                </div>
              )
            }

            case 'order_form': {
              const { title, content } = data
              return (
                <div key={index}>
                  <HeaderText
                    title={title}
                    content={content || null}
                    align="items-center"
                    height="60"
                  />
                  <div
                    className="button flex justify-center pb-10"
                    style={{
                      marginTop: '-10px',
                      background: '#f5f5f5',
                      paddingBottom: '150px'
                    }}
                  >
                    <Link href="/kontakt#form">BESTÄLL HÄR</Link>
                  </div>
                </div>
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
