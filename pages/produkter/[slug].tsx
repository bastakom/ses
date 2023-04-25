import Link from 'next/link'
import Image from 'next/image'
import { revalidate } from '../nyheter'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import styles from './slugprodukter.module.scss'

const NewsPage = ({ response }) => {
  revalidate
  const data = response.map((data) => data)
  return (
    <div>
      {...data.map((data, index) => {
        const { products } = data
        return (
          <div className="m-5 flex gap-10" key={index}>
            <div
              className={`${styles.carousel} w-5/12 uniq__carousel`}
            >
              <Carousel
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                dynamicHeight={false}
                thumbWidth={200}
              >
                {data.products.product_pictures
                  ? data.products.product_pictures.map(
                      (doc, index) => {
                        return (
                          <div key={index}>
                            <img
                              className={styles.image}
                              src={doc.url}
                            />
                          </div>
                        )
                      }
                    )
                  : null}
              </Carousel>
            </div>
            <div className="w-7/12 p-5">
              <h2 className="text-4xl mb-5">{data.title.rendered}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: products.description
                }}
              />
              {products.marknadsforingsblad
                ? products.marknadsforingsblad.map((doc, index) => {
                    return (
                      <div
                        className="flex flex-wrap items-center mt-4"
                        key={index}
                      >
                        <h2 className="text-1xl mr-2">{doc.title}</h2>
                        <Link
                          href={`${doc.document.url}`}
                          target="_blank"
                        >
                          Document
                        </Link>
                      </div>
                    )
                  })
                : null}

              {products?.produktblad
                ? products.produktblad.map((doc, index) => {
                    return (
                      <div
                        className="flex flex-wrap items-center mt-4"
                        key={index}
                      >
                        <h2 className="text-1xl mr-2">{doc.title}</h2>
                        <Link
                          href={`${doc.document}`}
                          target="_blank"
                        >
                          Document
                        </Link>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }/wp-json/wp/v2/produkter?_fields=slug&_=${Date.now()}`,
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
  const response = await data.json()

  return {
    props: {
      response,
      options
    },
    revalidate: 10
  }
}

export default NewsPage
