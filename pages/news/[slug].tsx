import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'

const NewsPage = ({ news }) => {
  const router = useRouter()
  const { locale, defaultLocale } = router

  const isDefaultLocale = locale === defaultLocale

  return (
    <div>
      <h1>
        {isDefaultLocale ? news.title : news.translated.length ? news.translated[0].title : news.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: isDefaultLocale
            ? news.content
            : news.translated.length ? news.translated[0].content : news.content
        }}
      />
    </div>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetNewsSlugs {
        news {
          nodes {
            slug
            id
            uri
          }
        }
      }
    `
  })

  const paths = []
  const languages = ["en", "sv"] // add any other languages here
  data?.news?.nodes?.forEach((news) => {
    languages.forEach((lang) => {
      paths.push({
        params: { slug: news?.slug },
        locale: lang
      })
    })
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale
}) => {
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const { data } = await client.query({
    query: gql`
      query GetnewsBy($uri: String!) {
        newBy(uri: $uri) {
          title
          id
          content
          slug
          uri
          translated {
            title
            content
          }
        }
      }
    `,

    variables: { uri: params?.slug }
  })

  return {
    props: {
      news: data?.newBy,
      mainMenu,
      ThemeSettings: ThemeSettings?.props.ThemeSettings,
      allSettings: ThemeSettings?.props
    }
  }
}

export default NewsPage
