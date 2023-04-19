import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_PORTFOLIOS = gql`
  query GetQueryproducts {
    products {
      nodes {
        title
        id
        slug
        uri
        products {
          description
          marknadsforingsblad {
            title
            document {
              sourceUrl
            }
          }
          productPictures {
            sourceUrl
          }
          produktblad {
            title
            document {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export default GET_PORTFOLIOS

export const getportfolios = async () => {
  const { data } = await client.query({
    query: GET_PORTFOLIOS
  })
  return data.products.nodes
}
