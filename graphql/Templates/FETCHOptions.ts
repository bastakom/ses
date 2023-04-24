export const getOptions = async () => {
  const FETCHoptions = await fetch(
    `${
      process.env.NEXT_PUBLIC_WP_URL
    }wp-json/acf/v1/themeoptions?_=${Date.now()}`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const options = await FETCHoptions.json()
  return options
}
