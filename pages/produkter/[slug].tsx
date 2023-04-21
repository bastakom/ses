import { GetStaticPaths, GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'
import Link from 'next/link'
import Image from 'next/image'

const NewsPage = ({ response }) => {
  console.log(response)
  const data = response.map((data) => data)
  return (
    <div>
      {...data.map((data, index) => {
        const { products } = data
        console.log(products)
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetProduktSlugs {
        produkter {
          nodes {
            slug
            id
            wpmlLanguage
          }
        }
      }
    `
  })

  const paths = []
  const languages = ['en', 'sv'] // add any other languages here
  data?.produkter?.nodes?.forEach((produkt) => {
    languages.forEach((lang) => {
      paths.push({
        params: { slug: produkt?.slug || produkt?.translated.slug },
        locale: lang
      })
    })
  })

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale
}) => {
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}wp-json/wp/v2/produkter?lang=${locale}&slug=${params.slug}`
  )
  const response = await data.json()

  return {
    props: {
      response,
      mainMenu,
      locale,
      ThemeSettings: ThemeSettings?.props.ThemeSettings,
      allSettings: ThemeSettings?.props
    }
  }
}

export default NewsPage
