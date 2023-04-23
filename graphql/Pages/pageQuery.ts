import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        id
        title
        content
        blocksJSON
      }
    }
  }
`
export default GET_PAGE_QUERY

export const getPageQuery = async (uri) => {
  const { data } = await client.query({
    query: GET_PAGE_QUERY,
    variables: { uri }
  })

  return data
}
