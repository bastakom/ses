import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_NEWS = gql`
  query GetQueryNews {
    news {
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

export default GET_NEWS

export const getNews = async () => {
  const { data } = await client.query({
    query: GET_NEWS
  })
  return data.news.nodes
}
