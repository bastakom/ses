import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { getPageStaticProps } from 'utils/getPageStaticProps'
import Page from '../components/Page/page'

export default Page

export const getStaticProps = getPageStaticProps
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            id
            slug
            uri
            title
          }
        }
      }
    `
  })

  const paths = data.pages.nodes
    .filter((page) => page.uri !== '/')
    .map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length - 1).split('/')
      }
    }))

  return {
    paths,
    fallback: false
  }
}
