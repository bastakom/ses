import Layout from '@/components/Template/Layout/Layout'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import Image from 'next/image'
import Link from 'next/link'
import styles from './nyhet.module.scss'
import placeholder from '@/assets/images/placeholder.png'

export const revalidate = 10

const NewsPage = ({ response }) => {
  const data = response.map((data) => data)
  return (
    <Layout>
      {...data.map((data, index) => {
        const {
          title: { rendered },
          date,
          content: { rendered: content },
          acf: { picture, meta, cat }
        } = data

        const curr = new Date(`${date}`)
        const formattedDate = curr.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        return (
          <>
            <div
              className={`${styles.title} justify-between flex flex-col items-center md:items-start md:flex-row`}
            >
              <div className="flex gap-4 items-center justify-center">
                <h3>{cat}</h3>
                <span> | </span>
                <h3>{formattedDate}</h3>
              </div>
              <div>
                <Link href="/nyheter">Alla nyheter</Link>
              </div>
            </div>
            <div key={index} className={`flex ${styles.container}`}>
              <div>
                <div className={styles.header}>
                  <div className="flex items-center gap-10 flex-col-reverse md:flex-row justify-between">
                    <div className={`${styles.inner__content} md:w-6/12 mb-10`}>
                      <h2 className="mb-5 flex">{rendered}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: meta
                        }}
                      />
                    </div>

                    <Image
                      className="md:w-6/12 flex"
                      src={picture ? picture : placeholder}
                      alt="Picture of the post"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: content
                    }}
                  />
                </div>
              </div>
            </div>
          </>
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
