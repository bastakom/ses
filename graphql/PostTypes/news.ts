import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_NEWS = gql`
  query GetQueryNews($language: String!) {
    news(where: { wpmlLanguage: $language }) {
      nodes {
        title
        id
        content
        slug
        uri
        locale {
          locale
        }
      }
    }
  }
`

export default GET_NEWS

export const getNews = async (language) => {
  const { data } = await client.query({
    query: GET_NEWS,
    variables: { language }
  })

  return data?.news?.nodes || []
}
