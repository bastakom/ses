import client from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { mapMainMenuItems } from 'utils/mapMainMenuItems'

const GET_MAINMENU = gql`
  query GetMenu {
    acfOptionsMenu {
      mainMenu {
        menuItems {
          items {
            url {
              url
              title
            }
            label
          }
          menuItem {
            url {
              url
            }
            page {
              ... on Page {
                id
                uri
              }
            }
            label
          }
        }
      }
    }
  }
`
export default GET_MAINMENU

export const getMainMenu = async () => {
  const { data } = await client.query({ query: GET_MAINMENU })
  return mapMainMenuItems(data.acfOptionsMenu.mainMenu.menuItems)
}
