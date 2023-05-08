import { revalidate } from '@/pages/nyheter'

revalidate

export const getFlexibleContent = async (currentLang, uriWithSlash) => {
  const flexibleContentData = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }${currentLang}/wp-json/wp/v2/pages?template=flexible&slug=${uriWithSlash}&_=${Date.now()}`,
    { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }
  )
  const flexibleContent = await flexibleContentData.json()
  return flexibleContent
}

export const getACFmenu = async () => {
  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/acf/v1/menu`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const menuItems = await menuData.json()
  return menuItems
}
