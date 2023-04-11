import { GetStaticPaths, GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { News } from 'interfaces/news'

type Props = {
  news?: News
}

const NewsPage: React.FC<Props> = ({ news }) => {
  return <div>{news.title}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetNewsSlug {
        news {
          nodes {
            slug
          }
        }
      }
    `
  })

  const paths =
    data?.news?.nodes?.map((news: News) => ({
      params: { slug: news?.slug }
    })) || []

  return { paths, fallback: false }
}
export const getStaticProps: GetStaticProps<Props> = async ({
  params
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
