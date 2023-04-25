import { getFlexibleContent } from '@/pages/api/RESTAPI/fetch'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import { revalidate } from '@/pages/nyheter'
import { getNyheter } from '@/graphql/PostTypes/news'
import { getProdukter } from '@/graphql/PostTypes/produkter'

revalidate

export const getServerSideProps = async (context) => {
  const { locale } = context
  const uri = context.params?.slug
    ? `/${context.params.slug.join('/')}/`
    : '/'

  const currentLang = locale === 'sv' ? '' : locale
  const uriWithSlash = uri === '/' ? 'hem' : uri

  const options = await getOptions()
  const nyheter = await getNyheter(locale)
  const response = await getProdukter(locale)
  const flexibleContent = await getFlexibleContent(
    currentLang,
    uriWithSlash
  )

  return {
    props: {
      flexibleContent,
      options: options ? options : null,
      nyheter,
      response
    },
    revalidate: 5
  }
}
