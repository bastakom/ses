import Layout from '@/components/Template/Layout/Layout'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'

const NewsPage = ({ response, mainMenu }) => {
  console.log(mainMenu)
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
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/nyheter?_fields=slug`,
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
  const menuItems = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const correctLocale = locale === 'sv' ? [] : locale

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/nyheter?slug=${params.slug}`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const response = await data.json()
  return {
    props: {
      response,
      menuItems,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default NewsPage
