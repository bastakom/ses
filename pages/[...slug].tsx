import { getPageStaticProps } from 'utils/getPageStaticProps'
import Page from '../components/Page/page'

export default Page

export const getStaticProps = getPageStaticProps
export const getStaticPaths = async (context) => {
  const { locale } = context

  const currentLang = locale === 'sv' ? '' : locale

  const flexibleContentData = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${currentLang}/wp-json/wp/v2/pages?&_fields=slug`
  )

  let slugData = []


  const paths = slugData.map((item) => ({
    params: { slug: item.slug }
  }))


  return {
    paths: paths,
    fallback: 'blocking'
  }
}
