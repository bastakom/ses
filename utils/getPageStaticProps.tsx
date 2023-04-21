import {
  cleanAndTransformACFBlocks,
  cleanAndTransformBlocks
} from './cleanAndTransformBlocks'
import { mapMainMenuItems } from './mapMainMenuItems'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getAllSettings } from '@/graphql/Settings/allSettings'
import { getBuilder } from '@/graphql/Templates/contentBuilder'
import { getPageQuery } from '@/graphql/Pages/pageQuery'
import { getColumnBuilder } from '@/graphql/Templates/columnBuilder'

export const getPageStaticProps = async (context) => {
  const { locale } = context
  const uri = context.params?.slug
    ? `/${context.params.slug.join('/')}/`
    : '/'
  const ThemeSettings = await getThemeSettings()
  const allSettings = await getAllSettings()
  const Builder = await getBuilder(uri)
  const Columns = await getColumnBuilder(uri)
  const pageQuery = await getPageQuery(uri)
  const blocks = cleanAndTransformBlocks(
    pageQuery.nodeByUri?.blocksJSON
  )
  const builder = cleanAndTransformACFBlocks(
    Builder.nodeByUri?.template?.builder?.contentBuilder
  )
  const ColumnBuilder =
    Columns.nodeByUri?.template?.builder?.contentBuilder

  const currentLang = locale === 'sv' ? [] : locale
  const uriWithSlash = uri === '/' ? 'hem' : uri

  const flexibleContentData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${currentLang}/wp-json/wp/v2/pages?template=flexible&slug=${uriWithSlash}`
  )

  console.log('lang:', uri)

  const flexibleContentBlocks = await flexibleContentData.json()
  const flexibleContent = flexibleContentBlocks

  return {
    props: {
      blocks,
      mainMenu: mapMainMenuItems(
        pageQuery.acfOptionsMenu.mainMenu.menuItems
      ),
      allSettings: allSettings,
      ThemeSettings: ThemeSettings?.props,
      Builder: builder.filter(
        (obj) =>
          obj.__typename !==
          'Template_Flexible_Builder_ContentBuilder_ColumnBlock'
      ),
      flexibleContent,
      Columns: ColumnBuilder.filter(
        (obj) =>
          obj.__typename ===
          'Template_Flexible_Builder_ContentBuilder_ColumnBlock'
      ),
      socials: ThemeSettings.props?.socials
    },
    revalidate: 10
  }
}
