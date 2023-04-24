import axios from 'axios'

export const getNyheter = async (locale) => {
  const correctLocale = locale === 'sv' ? [] : locale
  const url = `${
    process.env.NEXT_PUBLIC_WP_URL
  }${correctLocale}/wp-json/wp/v2/nyheter?_=${Date.now()}`

  const response = await axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    }
  })
  return response.data
}
