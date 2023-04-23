export const getNyheter = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/nyheter?cache=${Math.random()}`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const response = await data.json()


  return response
}
