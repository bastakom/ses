import { getServerPageProps } from 'utils/getPageStaticProps'
import Page from '../components/Page/page'

export default Page

export const getStaticProps = getServerPageProps
export const getStaticPaths = async (context) => {

  let slugData = []

  const paths = slugData.map((item) => ({
    params: { slug: item.slug }
  }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}
