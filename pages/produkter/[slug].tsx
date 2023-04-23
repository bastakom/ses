import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import Link from 'next/link'
import Image from 'next/image'

const NewsPage = ({ response }) => {
  const data = response.map((data) => data)
  return (
    <div>
      {...data.map((data, index) => {
        const { products } = data
        return (
          <div className="m-5 w-8/12" key={index}>
            <h2 className="text-4xl mb-5">{data.title.rendered}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: products.description
              }}
            />
            {products.marknadsforingsblad
              ? products.marknadsforingsblad.map((doc, index) => {
                  return (
                    <div
                      className="flex flex-wrap items-center mt-4"
                      key={index}
                    >
                      <h2 className="text-1xl mr-2">{doc.title}</h2>
                      <Link
                        href={`${doc.document.url}`}
                        target="_blank"
                      >
                        Document
                      </Link>
                    </div>
                  )
                })
              : null}

            {products?.produktblad
              ? products.produktblad.map((doc, index) => {
                  return (
                    <div
                      className="flex flex-wrap items-center mt-4"
                      key={index}
                    >
                      <h2 className="text-1xl mr-2">{doc.title}</h2>
                      <Link href={`${doc.document}`} target="_blank">
                        Document
                      </Link>
                    </div>
                  )
                })
              : null}

            {products.product_pictures
              ? products.product_pictures.map((doc, index) => {
                  return (
                    <div
                      className="flex flex-wrap items-center mt-4"
                      key={index}
                    >
                      <Image
                        src={doc.url}
                        width={450}
                        height={450}
                        alt={`${doc.alt}` || 'image'}
                      />
                    </div>
                  )
                })
              : null}
          </div>
        )
      })}
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/produkter?_fields=slug&_=${Date.now()}`
  )
  const slugData = await data.json()

  const paths = slugData.map((item) => ({
    params: { slug: item.slug }
  }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const menuItems = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const correctLocale = locale === 'sv' ? [] : locale

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}${correctLocale}/wp-json/wp/v2/produkter?slug=${params.slug}&_=${Date.now()}`
  )
  const response = await data.json()

  return {
    props: {
      response,
      menuItems,
      ThemeSettings: ThemeSettings.props
    }
  }
}

export default NewsPage
