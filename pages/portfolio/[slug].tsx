import { GetStaticPaths, GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { Portfolio } from 'interfaces/portfolio'

type Props = {
  portfolio?: Portfolio
}

const PortfolioPage: React.FC<Props> = ({ portfolio }) => {
  return <div>{portfolio.title}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetPortfoliosSlug {
        portfolios {
          nodes {
            slug
          }
        }
      }
    `
  })

  const paths = data?.portfolios?.nodes?.map((portfolio: Portfolio) => ({
    params: { slug: portfolio?.slug }
  }))

  return { paths, fallback: false }
}
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const { data } = await client.query({
    query: gql`
      query GetPortfoliosBy($uri: String!) {
        portfolioBy(uri: $uri) {
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
      portfolio: data.portfolioBy,
      mainMenu,
      ThemeSettings: ThemeSettings.props.ThemeSettings,
      allSettings: ThemeSettings?.props
    }
  }
}

export default PortfolioPage
