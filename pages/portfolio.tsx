import { GetStaticProps } from 'next'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { Portfolio } from 'interfaces/portfolio'
import Link from 'next/link'
import { getportfolios } from '@/graphql/PostTypes/portfolio'

interface Props {
  portfolio: Portfolio[]
}

const Home: React.FC<Props> = ({ portfolio }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3">
      {portfolio.map((data) => {
        return <Link href={data.uri}>{data.title}</Link>
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const portfolio = await getportfolios()
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()

  return {
    props: {
      portfolio,
      mainMenu,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default Home
