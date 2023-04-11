import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_PORTFOLIOS = gql`
  query GetQueryportfolios {
    portfolios {
        nodes {
          title
          id
          content
          slug
          uri
        }
    }
  }
`

export default GET_PORTFOLIOS

export const getportfolios = async () => {
  const { data } = await client.query({
    query: GET_PORTFOLIOS
  })
  return data.portfolios.nodes
}
