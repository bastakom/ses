import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getProdukter } from '@/graphql/PostTypes/produkter'
import Link from 'next/link'

const Home = ({ produkter }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3 flex flex-col m-3">
      {produkter.map((data, index) => {
        console.log(data.slug)
        return (
          <Link key={index} href={`produkter/${data.slug}`}>
            {data.title}
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  const produkter = await getProdukter(locale)
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()

  return {
    props: {
      produkter,
      mainMenu,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default Home
