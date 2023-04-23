import { cleanAndTransformACFBlocks } from './cleanAndTransformBlocks'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getAllSettings } from '@/graphql/Settings/allSettings'
import { getBuilder } from '@/graphql/Templates/contentBuilder'
import { getPageQuery } from '@/graphql/Pages/pageQuery'

export const getPageStaticProps = async (context) => {
  const { locale } = context
  const uri = context.params?.slug
    ? `/${context.params.slug.join('/')}/`
    : '/'
  const ThemeSettings = await getThemeSettings()
  const allSettings = await getAllSettings()
  const Builder = await getBuilder(uri)
  const pageQuery = await getPageQuery(uri)

  const builder = cleanAndTransformACFBlocks(
    Builder.nodeByUri?.template?.builder?.contentBuilder
  )

  const currentLang = locale === 'sv' ? '' : locale
  const uriWithSlash = uri === '/' ? 'hem' : uri

  const flexibleContentData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${currentLang}/wp-json/wp/v2/pages?template=flexible&slug=${uriWithSlash}`
  )
  const flexibleContent = await flexibleContentData.json()

  const menuData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/acf/v1/menu`
  )
  const menuItems = await menuData.json()

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

