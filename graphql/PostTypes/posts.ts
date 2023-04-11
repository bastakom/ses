import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        date
        slug
      }
    }
  }
`

export default GET_POSTS

export const getPosts = async () => {
  const { data } = await client.query({ query: GET_POSTS })
  return data.posts.nodes
}
