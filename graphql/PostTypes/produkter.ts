export const getProdukter = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/produkter?per_page=100`
  )
  const response = await data.json()

  return response
}
