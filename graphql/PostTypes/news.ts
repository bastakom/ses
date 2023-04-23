import axios from 'axios'

export const getNyheter = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const url = `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/nyheter`

  const response = await axios.get(url, {
    params: { _cache: Date.now() },
    headers: { 'Cache-Control': 'no-cache' }
  })

  return response.data
}
