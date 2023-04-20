import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getNews } from '@/graphql/PostTypes/news'
import Link from 'next/link'

const Home = ({ news }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3 flex flex-col m-3">
      {news.map((data, index) => {
        return (
          <Link key={data.id} href={`news/${data.slug}`}>
            {data.title}
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  const news = await getNews(locale)
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()

  return {
    props: {
      news,
      mainMenu,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default Home
