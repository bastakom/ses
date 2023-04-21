import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_PRODUKTER = gql`
  query GetQueryNews($language: String!) {
    produkter(where: { wpmlLanguage: $language }) {
      nodes {
        title
        slug
      }
    }
  }
`

export default GET_PRODUKTER

export const getProdukter = async (language) => {
  const { data } = await client.query({
    query: GET_PRODUKTER,
    variables: { language }
  })

  return data?.produkter?.nodes || []
}
