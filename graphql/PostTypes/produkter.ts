export const getProdukter = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/produkter`,

    {
      headers: {
        'cache-control': 'no-cache',
        'x-vercel-cache': 'pass'
      }
    }
  )
  const response = await data.json()

  return response
}
