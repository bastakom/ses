export const getLatest = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/nyheter?per_page=1&orderby=date&order=desc`,
    {
      headers: {
        'cache-control': 'no-cache',
        'x-vercel-cache': 'pass'
      }
    }
  )
  const latest = await data.json()

  return latest
}
