import Layout from '@/components/Template/Layout/Layout'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import styles from './nyhet.module.scss'
import Image from 'next/image'

export const revalidate = 10

const NewsPage = ({ response }) => {
  const data = response.map((data) => data)

  return (
    <Layout>
      {...data.map((data, index) => {
        const {
          title: { rendered },
          content: { rendered: content },
          acf: { picture }
        } = data

        return (
          <div key={index} className={`flex flex-wrap ${styles.container}`}>
            <div>
              <div className={styles.header}>
                <div className="flex flex-wrap">
                  <h2 className="text-4xl mb-5">{rendered}</h2>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: content
                    }}
                  />
                </div>
                <Image
                  src={picture}
                  alt="Picture of the post"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}
export const getStaticPaths = async () => {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }/wp-json/wp/v2/nyheter?_fields=slug&_=${Date.now()}`,
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
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/nyheter?slug=${params.slug}`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const response = await data.json()
  return {
    props: {
      response,
      options
    },
    revalidate: 5
  }
}

export default NewsPage
