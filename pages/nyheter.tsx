import Link from 'next/link'
import { getNyheter } from '@/graphql/PostTypes/news'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

export const revalidate = 10

const Home = ({ response }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3 flex flex-col m-3">
      {response.map((data, index) => {
        return (
          <Link key={index} href={`nyheter/${data.slug}`}>
            {data.title.rendered}
          </Link>
        )
      })}
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const options = await getOptions()
  const response = await getNyheter(locale)

  return {
    props: {
      response,
      options
    }
  }
}

export default Home
