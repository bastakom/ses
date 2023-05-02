import Link from 'next/link'
import { getNyheter } from '@/graphql/PostTypes/news'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import { getLatest } from '@/graphql/PostTypes/latestnews'
import LatestItem from '@/components/PageComponents/Nyheter/LatestItem'
import Layout from '@/components/Template/Layout/Layout'
import OtherItems from '@/components/PageComponents/Nyheter/OtherItems'
import HeaderText from '@/components/Template/HeaderText/HeaderText'

export const revalidate = 10

const Home = ({ response, latest }) => {
  return (
    <div className="md:py-20 py-5" style={{ background: '#f5f5f5' }}>
      <Layout>
        <div className="pl-5 md:pl-0">
          <HeaderText
            title={'NYHETER'}
            align={'place-items-start'}
            height="15"
          />
        </div>
        <LatestItem data={latest} />
        <div className="md:flex md:flex-wrap ">
          {response.map((data, index) => {
            return (
              <div className={`md:w-6/12 border-b-2`}>
                <OtherItems data={data} index={index} />
              </div>
            )
          })}
        </div>
      </Layout>
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const options = await getOptions()
  const response = await getNyheter(locale)
  const latest = await getLatest(locale)

  return {
    props: {
      response,
      options,
      latest
    }
  }
}

export default Home
