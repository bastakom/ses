export const getMainMenu = async () => {
  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/acf/v1/menu`
  )
  const menuItems = await menuData.json()
  return menuItems
}


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

export const getMainMenutest = async () => {
  const { data } = await client.query({ query: GET_MAINMENU })
  return mapMainMenuItems(data.acfOptionsMenu.mainMenu.menuItems)
}
