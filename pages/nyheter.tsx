import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import Link from 'next/link'
import { getNyheter } from '@/graphql/PostTypes/news'

export const revalidate = 10

const Home = ({ response }) => {
  console.log(response)
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

export const getStaticProps = async ({ locale }) => {
  const ThemeSettings = await getThemeSettings()
  const menuItems = await getMainMenu()
  const response = await getNyheter(locale)

  return {
    props: {
      response,
      ThemeSettings: ThemeSettings.props,
      menuItems
    },
    revalidate: 10
  }
}

export default Home
