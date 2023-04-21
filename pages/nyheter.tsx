import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import Link from 'next/link'
import { getNyheter } from '@/graphql/PostTypes/news'

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
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const response = await getNyheter(locale)

  return {
    props: {
      response,
      mainMenu,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default Home
