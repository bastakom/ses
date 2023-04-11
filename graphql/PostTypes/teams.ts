import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      nodes {
        title
        uri
        id
        Team {
          description
          email
          fieldGroupName
          phone
          role
          portrait {
            sourceUrl
          }
        }
      }
    }
  }
`
export default GET_TEAMS

export const getTeams = async () => {
  const { data } = await client.query({ query: GET_TEAMS })
  return data?.teams.nodes
}


