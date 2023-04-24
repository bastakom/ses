import Layout from '@/components/Template/Layout/Layout'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

export const revalidate = 10

const NewsPage = ({ response }) => {
  const data = response.map((data) => data)
  return (
    <Layout>
      {...data.map((data, index) => {
        return (
          <div className="m-5 w-8/12" key={index}>
            <h2 className="text-4xl mb-5">{data.title.rendered}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.content.rendered
              }}
            />
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
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }${correctLocale}/wp-json/wp/v2/nyheter?slug=${
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
