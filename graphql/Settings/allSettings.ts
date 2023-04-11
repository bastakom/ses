import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_ALL_SETTINGS = gql`
  query GetAllSettings {
    allSettings {
      generalSettingsTitle
    }
  }
`

export default GET_ALL_SETTINGS

export const getAllSettings = async () => {
  const { data } = await client.query({ query: GET_ALL_SETTINGS })
  return data?.allSettings?.generalSettingsTitle
}

