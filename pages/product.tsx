import { GetStaticProps } from 'next'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { Portfolio } from 'interfaces/portfolio'
import Link from 'next/link'
import { getportfolios } from '@/graphql/PostTypes/portfolio'

interface Props {
  products: Portfolio[]
}

const Home: React.FC<Props> = ({ products }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3">
      {products.map((data, index) => {
        return (
          <div key={index}>
            <Link href={data.uri}>{data.title}</Link>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await getportfolios()
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()

  return {
    props: {
      products,
      mainMenu,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default Home
