import { getProdukter } from '@/graphql/PostTypes/produkter'
import Link from 'next/link'
import { getOptions } from '@/graphql/Templates/FETCHOptions'
import ProduktHead from '@/components/Template/ProduktHead/ProduktHead'
import ProductItems from '@/components/PageComponents/Produkter/ProductItems'

const Home = ({ response, options }) => {
  return (
    <div>
      <ProductItems response={response} options={options} />
    </div>
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
