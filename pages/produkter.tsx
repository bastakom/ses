import { getMainMenu } from '@/graphql/Templates/mainMenu'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getProdukter } from '@/graphql/PostTypes/produkter'
import Link from 'next/link'

const Home = ({ response }) => {
  return (
    <div className="bg-white py-24 sm:py-32 mt-3 flex flex-col m-3">
      {response.map((data, index) => {
        return (
          <Link key={index} href={`produkter/${data.slug}`}>
            {data.title.rendered}
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  const response = await getProdukter(locale)
  const menuItems = await getMainMenu()
  const ThemeSettings = await getThemeSettings()

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
