import { cleanAndTransformACFBlocks } from './cleanAndTransformBlocks'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getAllSettings } from '@/graphql/Settings/allSettings'
import { getBuilder } from '@/graphql/Templates/contentBuilder'
import {
  getACFmenu,
  getFlexibleContent
} from '@/pages/api/RESTAPI/fetch'

export const getPageStaticProps = async (context) => {
  const { locale } = context
  const uri = context.params?.slug
    ? `/${context.params.slug.join('/')}/`
    : '/'

  const currentLang = locale === 'sv' ? '' : locale
  const uriWithSlash = uri === '/' ? 'hem' : uri

  const ThemeSettings = await getThemeSettings()
  const allSettings = await getAllSettings()
  const Builder = await getBuilder(uri)
  const menuItems = await getACFmenu()
  const flexibleContent = await getFlexibleContent(
    currentLang,
    uriWithSlash
  )

  const builder = cleanAndTransformACFBlocks(
    Builder.nodeByUri?.template?.builder?.contentBuilder
  )

  return {
    props: {
      allSettings: allSettings,
      ThemeSettings: ThemeSettings?.props,
      Builder: builder,
      flexibleContent,
      socials: ThemeSettings.props?.socials,
      menuItems
    },
    revalidate: 10
  }
}
