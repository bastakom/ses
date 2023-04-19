import { GetStaticPaths, GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { getThemeSettings } from '@/graphql/Settings/themeSettings'
import { getMainMenu } from '@/graphql/Templates/mainMenu'

type Props = {
  products
}

const PortfolioPage = ({ products }) => {
  const {
    products: {
      description = '',
      marknadsforingsblad = [],
      produktblad = []
    } = {}
  } = products || {}

  // const file = products.products.marknadsforingsblad.document
  // const fileId = file.id
  // const baseUrl = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2`

  // const response = await fetch(`${baseUrl}/media/${fileId}`)
  // const data = await response.json()
  // const fileUrl = data.source_url

  const documents = produktblad?.map((document, index) => {
    console.log('product', document.document.mediaItemUrl)
    return (
      <div key={index}>
        <ul>
          <li>{document.title}</li>
        </ul>
        <a href={document.document.mediaItemUrl} target="_blank">
          {document.title}
        </a>
      </div>
    )
  })

  return (
    <>
      <h1>{products.title}</h1>
      {documents}
      {/* <p
        dangerouslySetInnerHTML={{
          __html: ToAbsoluteUrl(description)
        }}
      /> */}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query GetProductsSlug {
        products {
          nodes {
            slug
          }
        }
      }
    `
  })

  const paths = data?.products?.nodes?.map((products) => ({
    params: { slug: products?.slug }
  }))

  return { paths, fallback: false }
}
export const getStaticProps = async ({ params }) => {
  console.log(params)
  const mainMenu = await getMainMenu()
  const ThemeSettings = await getThemeSettings()
  const { data } = await client.query({
    query: gql`
      query GetProductsBy($uri: String!) {
        productBy(uri: $uri) {
          title
          id
          slug
          uri
          products {
            description
            marknadsforingsblad {
              title
              document {
                mediaItemUrl
              }
            }
            productPictures {
              sourceUrl
            }
            produktblad {
              title
              document {
                mediaItemUrl
              }
            }
          }
        }
      }
    `,

    variables: { uri: params?.slug }
  })

  return {
    props: {
      products: data.productBy,
      mainMenu,
      ThemeSettings: ThemeSettings.props.ThemeSettings,
      allSettings: ThemeSettings?.props
    }
  }
}

export default PortfolioPage
