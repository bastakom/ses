export const getMainMenu = async () => {
  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/acf/v1/menu`
  )
  const menuItems = await menuData.json()
  return menuItems
}
