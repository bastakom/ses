import Link from 'next/link'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import { Carousel } from 'react-responsive-carousel'
import { Accordion, Table } from '@mantine/core'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { AnimationSettings } from '@/components/Template/AnimationSettings'
import placeholder from '@/assets/images/placeholder.png'
import Image from 'next/image'
import LoadingSkeleton from '@/components/Template/LoadingSkeleton/LoadingSkeleton'
import styles from './slugprodukter.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Head from 'next/head'

const revalidate = 0

const NewsPage = ({ response, locale }) => {
  revalidate
  const data = response.map((data) => data)
  return (
    <div>
      {...data.map((data, index) => {
        const {
          products: {
            marknadsforingsblad,
            cat,
            description,
            table,
            produktblad,
            description_engelska
          }
        } = data

        const maxLength = 120
        let limitedDescription = description.substring(0, maxLength)
        if (description.length > maxLength) {
          limitedDescription += '...'
        }

        const strippedDescription = limitedDescription.replace(
          /(<([^>]+)>)/gi,
          ''
        )

        const skyddsSv =
          cat === 'skyddsmasker' && locale === 'sv' && 'Skyddsmasker'
        const skyddsEng =
          cat === 'skyddsmasker' && locale === 'en' && 'Protective masks'

        const tillbehorSV =
          cat === 'tillbehör' && locale === 'sv' && 'Tillbehör'
        const tillbehorEng =
          cat === 'tillbehör' && locale === 'en' && 'Accessories'

        const skyddsdrakterSV =
          cat === 'skyddsdräkter' && locale === 'sv' && 'Skyddsdräkter'
        const skyddsdrakterEng =
          cat === 'skyddsdräkter' && locale === 'en' && 'Protective suits'

        return (
          <motion.div {...AnimationSettings}>
            <Head>
              <title>{data.title.rendered}</title>
              <meta name="description" content={strippedDescription} />
            </Head>
            <div className={`${styles.pagination} md:ml-10 mt-1 flex gap-2`}>
              <Link href="/produkter">
                {locale === 'sv' ? 'Produkter' : 'Products'}
              </Link>
              {'>'}
              <Link href={`/produkter/#${cat}`}>
                {skyddsSv ||
                  skyddsEng ||
                  tillbehorSV ||
                  tillbehorEng ||
                  skyddsdrakterSV ||
                  skyddsdrakterEng}
              </Link>
              {'>'}
              <a>{data.title.rendered}</a>
            </div>
            <div
              className="m-3 ml-auto mr-auto md:flex gap-10 max-w-7xl justify-center"
              key={index}
            >
              <div className={`${styles.carousel} md:w-6/12 uniq__carousel`}>
                <LoadingSkeleton>
                  <Carousel
                    showStatus={false}
                    showArrows={false}
                    showIndicators={false}
                    dynamicHeight={false}
                    transitionTime={600}
                    swipeable={false}
                  >
                    {data.products.product_pictures ? (
                      data.products.product_pictures.map((doc, index) => {
                        return (
                          <div key={index}>
                            <img className={styles.image} src={doc.url} />
                          </div>
                        )
                      })
                    ) : (
                      <Image
                        src={`${placeholder.src}`}
                        className={styles.image}
                        width={500}
                        height={500}
                        alt={'placeholder'}
                      />
                    )}
                  </Carousel>
                </LoadingSkeleton>
              </div>

              <div className={`${styles.content} md:w-6/12 p-5`}>
                <h4>
                  {skyddsSv ||
                    skyddsEng ||
                    tillbehorSV ||
                    tillbehorEng ||
                    skyddsdrakterSV ||
                    skyddsdrakterEng}
                </h4>
                <h2 className="md:text-4xl mb-5">{data.title.rendered}</h2>
                <div
                  className={styles.paragrah}
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'sv'
                        ? description
                        : description_engelska || description
                  }}
                />

                <div className={`mt-10 mb-10 ${styles.button__produkt}`}>
                  <Link href="/kontakt">
                    {locale === 'sv' ? 'BESTÄLL' : 'ORDER'}
                  </Link>
                </div>

                <div className={styles.accordion}>
                  <Accordion
                    multiple={true}
                    chevron={<AiOutlinePlus size="1rem" />}
                    defaultValue={['TEKNISK']}
                    styles={{
                      chevron: {
                        '&[data-rotate]': {
                          transform: 'rotate(45deg)'
                        }
                      }
                    }}
                  >
                    {table && (
                      <Accordion.Item value="TEKNISK">
                        <Accordion.Control>
                          {locale === 'sv'
                            ? 'TEKNISK SPECIFIKATION'
                            : 'TECHNICAL SPECIFICATION'}
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Table withColumnBorders withBorder>
                            <tbody>
                              {table.map((item, index) => {
                                return (
                                  <tr key={index} style={{ width: '50%' }}>
                                    <td>{item.title}</td>

                                    {item.sub_information ? (
                                      <td>{item.sub_information}</td>
                                    ) : (
                                      <td
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            locale === 'sv'
                                              ? item.information
                                              : item.content_english ||
                                                item.information
                                        }}
                                      />
                                    )}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </Table>
                        </Accordion.Panel>
                      </Accordion.Item>
                    )}

                    <Accordion.Item value="MANUALER">
                      <Accordion.Control>
                        {locale === 'sv' ? 'MANUALER' : 'MANUALS'}
                      </Accordion.Control>
                      <Accordion.Panel>
                        {produktblad || marknadsforingsblad ? (
                          <div>
                            {produktblad
                              ? produktblad.map((doc, index) => {
                                  return (
                                    <div
                                      className={`flex flex-wrap items-center ${styles.links}`}
                                      key={index}
                                    >
                                      <Link
                                        href={`${doc.document}`}
                                        target="_blank"
                                      >
                                        {doc.title}
                                      </Link>
                                    </div>
                                  )
                                })
                              : null}

                            {marknadsforingsblad
                              ? marknadsforingsblad.map((doc, index) => {
                                  return (
                                    <div
                                      className={`flex flex-wrap items-center ${styles.links}`}
                                      key={index}
                                    >
                                      <Link
                                        href={`${doc.document.url}`}
                                        target="_blank"
                                      >
                                        {doc.title}
                                      </Link>
                                    </div>
                                  )
                                })
                              : null}
                          </div>
                        ) : (
                          <>
                            {locale === 'sv' ? 'Kommer snart' : 'Coming soon'}
                          </>
                        )}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/produkter?_fields=slug}`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const slugData = await data.json()

  const paths = slugData.map((item) => ({
    params: { slug: item.slug }
  }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const options = await getOptions()
  const correctLocale = locale === 'sv' ? [] : locale

  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }${correctLocale}/wp-json/wp/v2/produkter?slug=${
      params.slug
    }&_=${Date.now()}`,
    { headers: { 'cache-control': 'no-cache' } }
  )

  const resAllProducts = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/produkter?slug`
  )
  const response = await data.json()
  const resProducts = await resAllProducts.json()

  return {
    props: {
      response,
      options,
      locale,
      resProducts
    },
    revalidate: 5
  }
}

export default NewsPage
