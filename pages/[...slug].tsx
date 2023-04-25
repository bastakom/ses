import Page from '../components/Page/page'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import { getNyheter } from '@/graphql/PostTypes/news'
import { getProdukter } from '@/graphql/PostTypes/produkter'
import { getFlexibleContent } from './api/RESTAPI/fetch'

export default Page

export const getStaticProps = async (context) => {
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
