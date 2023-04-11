import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

export const GET_FLEXIBLE_COLUMN = gql`
  query BuilderQuery($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        id
        template {
          ... on Template_Flexible {
            builder {
              contentBuilder {
                ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock {
                  fieldGroupName
                  howManyColumn
                  columnfull {
                    itemColumn {
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnfull_ItemColumn_Title {
                        fieldGroupName
                        title
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnfull_ItemColumn_Text {
                        fieldGroupName
                        text
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnfull_ItemColumn_Image {
                        fieldGroupName
                        image {
                          sourceUrl
                          altText
                        }
                      }
                    }
                  }
                  columnhalf {
                    itemColumn {
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnhalf_ItemColumn_Title {
                        fieldGroupName
                        title
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnhalf_ItemColumn_Text {
                        fieldGroupName
                        text
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnhalf_ItemColumn_Image {
                        fieldGroupName
                        image {
                          sourceUrl
                          altText
                        }
                      }
                    }
                  }
                  columnthird {
                    itemColumn {
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnthird_ItemColumn_Title {
                        fieldGroupName
                        title
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnthird_ItemColumn_Text {
                        fieldGroupName
                        text
                      }
                      ... on Template_Flexible_Builder_ContentBuilder_ColumnBlock_columnthird_ItemColumn_Image {
                        fieldGroupName
                        image {
                          sourceUrl
                          altText
                        }
                      }
                    }
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

export default GET_FLEXIBLE_COLUMN

export const getColumnBuilder = async (uri) => {
  const { data } = await client.query({
    query: GET_FLEXIBLE_COLUMN,
    variables: { uri }
  })
  return data
}
