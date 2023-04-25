import { getFlexibleContent } from '@/pages/api/RESTAPI/fetch'
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

  const options = await getOptions()
  const flexibleContent = await getFlexibleContent(
    currentLang,
    uriWithSlash
  )

  return {
    props: {
      flexibleContent,
      options: options ? options : null
    },
    revalidate: 10
  }
}
