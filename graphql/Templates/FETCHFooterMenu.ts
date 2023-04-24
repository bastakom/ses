export const getOptions = async () => {
  const FETCHFooterMenu = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/acf/v1/themeoptions`,
    { headers: { 'cache-control': 'no-cache' } }
  )
  const FooterMenu = await FETCHFooterMenu.json()
  return FooterMenu.menu
}
