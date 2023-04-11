export interface mainMenu {
  acfOptionsMenu: {
    mainMenu: {
      menuItems: {
        items: {
          url: {
            url: string
            title: string
          }
          label: string
        }
        menuItem: {
          url: {
            url: string
          }
          page: {
            page: {
              id: string
              uri: string
            }
          }
          label: string
        }
      }
    }
  }
}
