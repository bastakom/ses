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
        template {
          ... on Template_Flexible {
            builder {
              contentBuilder {
                ... on Template_Flexible_Builder_ContentBuilder_Hero {
                  presentationInfo
                  subTitle
                  title
                }
              }
            }
          }
        }
      }
    }
    acfOptionsMenu {
      mainMenu {
        menuItems {
          items {
            label
            url {
              url
            }
          }
          menuItem {
            label
            url {
              target
              title
              url
            }
            page {
              ... on Page {
                id
                uri
              }
            }
          }
        }
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
