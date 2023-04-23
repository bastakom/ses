import { v4 as uuid } from 'uuid'

export const mapMainMenuItems = (menuItems) => {
  if (!menuItems) {
    return null
  }
  return menuItems.map((data) => ({
    id: uuid(),
    url: data.menuItem?.url?.url || null,
    page: data.menuItem?.page?.uri || null,
    label: data.menuItem.label || null,
    subMenuItems: (data.items || []).map((subMenuItem) => ({
      id: uuid(),
      link: subMenuItem.url?.url,
      label: subMenuItem.label
    }))
  }))
}

export const mapMenu = (menuItems) => {
  if (!menuItems) {
    return null
  }
  return menuItems.map((data) => ({
    id: uuid(),
    url: data.menuItem?.url?.url || null,
    page: data.menuItem?.page?.uri || null,
    label: data.menuItem.label || null,
    subMenuItems: (data.items || []).map((subMenuItem) => ({
      id: uuid(),
      link: subMenuItem.url?.url,
      label: subMenuItem.label
    }))
  }))
}
