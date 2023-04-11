import { GetStaticProps } from 'next'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getNews } from '@/graphql/PostTypes/news'
import { News } from 'interfaces/news'
import Link from 'next/link'

interface Props {
  news: News[]
}

const Home: React.FC<Props> = ({ news }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3">
      {news.map((data) => {
        return <Link href={data.uri}>{data.title}</Link>
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const news = await getNews()
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
