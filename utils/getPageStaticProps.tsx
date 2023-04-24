import { getAllSettings } from '@/graphql/Settings/allSettings'
import {
  getACFmenu,
  getFlexibleContent
} from '@/pages/api/RESTAPI/fetch'
import { revalidate } from '@/pages/nyheter'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

revalidate

export const getPageStaticProps = async (context) => {
  const { locale } = context
  const uri = context.params?.slug
    ? `/${context.params.slug.join('/')}/`
    : '/'

  const currentLang = locale === 'sv' ? '' : locale
  const uriWithSlash = uri === '/' ? 'hem' : uri

  const allSettings = await getAllSettings()
  const menuItems = await getACFmenu()
  const options = await getOptions()
  const flexibleContent = await getFlexibleContent(
    currentLang,
    uriWithSlash
  )

  return {
    props: {
      allSettings: allSettings,
      flexibleContent,
      menuItems,
      options: options
    },
    revalidate: 10
  }
}
