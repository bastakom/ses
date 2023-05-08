import { getProdukter } from '@/graphql/PostTypes/produkter'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import ProductItems from '@/components/PageComponents/Produkter/ProductItems'
import Head from 'next/head'

const Home = ({ response, options }) => {
  return (
    <>
      <Head>
        <title>Produkter</title>
        <meta
          name="description"
          content="Skydda dig mot kemiska och biologiska ämnen samt radioaktiva partiklar. Våra ansiktsskydd i kombination med filter säkrar tillgång till andningsbar luft."
        />
      </Head>
      <div>
        <ProductItems response={response} options={options} />
      </div>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const options = await getOptions()
  const response = await getProdukter(locale)

  return {
    props: {
      response,
      options
    }
  }
}

export default Home
