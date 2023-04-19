import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

export const GET_FLEXIBLE_CONTENT = gql`
  query BuilderQuery($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        id
        template {
          ... on Template_Flexible {
            builder {
              contentBuilder {
                ... on Template_Flexible_Builder_ContentBuilder_Accordion {
                  fieldGroupName
                  tables {
                    content
                    titleButton {
                      title
                    }
                  }
                }
                ... on Template_Flexible_Builder_ContentBuilder_Hero {
                  presentationInfo
                  subTitle
                  title
                  settings {
                    coverHeight
                    justifyContent
                    contentNoContent
                    imageVideo
                  }
                  video {
                    mediaItemUrl
                  }
                  image {
                    sourceUrl
                  }
                }

                ... on Template_Flexible_Builder_ContentBuilder_ImageText {
                  fieldGroupName
                  text
                  context {
                    title
                    button {
                      title
                      url
                    }
                  }
                  settingsImageText
                  image {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default GET_FLEXIBLE_CONTENT

export const getBuilder = async (uri) => {
  const { data } = await client.query({
    query: GET_FLEXIBLE_CONTENT,
    variables: { uri }
  })
  return data
}
