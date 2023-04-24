import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_THEMESETTINGS = gql`
  query GetThemeSettings {
    acfOptionsThemeSettings {
      ThemeSettings {
        contactInfo {
          phone
          email
          socials {
            facebook
            linkedin
            instagram
            twitter
            vimeo
            youtube
          }
        }
        logotype {
          id
          uri
          sourceUrl
        }
      }
    }
  }
`

export default GET_THEMESETTINGS

export const getThemeSettings = async () => {
  const { data } = await client.query({ query: GET_THEMESETTINGS })
  return {
    props: {}
  }
}
